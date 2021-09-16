import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Endereco } from 'src/app/models/endereco';
import { ViacepService } from 'src/app/services/via-cep.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss']
})
export class EnderecoComponent implements OnInit {

  @Output() addNewFavorite: EventEmitter<Endereco>;

  public form: FormGroup;
  public IsLoading: boolean;
  public endereco: Endereco;
  public horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  public verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private formBuilder: FormBuilder, 
              private snackBarService: MatSnackBar, 
              private viacepService: ViacepService) {
    this.IsLoading = false;
    this.endereco = new Endereco();
    this.addNewFavorite = new EventEmitter<Endereco>();
  }

  ngOnInit(): void {
    this.configurationForm();
  }

  public configurationForm(): void {
    this.form = this.formBuilder.group({
      cep: ['', Validators.compose([
            Validators.required,
            Validators.pattern("[0-9]{8}")
      ])],
      },);
  }

  public onSubmit(): void {
    if (this.form.invalid){
      return;
    }

    this.IsLoading = true;

    this.viacepService.get(this.form.value.cep).then((data: Endereco) => {
        this.endereco = data;
        this.snackBarService.open("Pesquisa realizada com sucesso.","OK", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
    }).catch((data)=>{
      console.log(data);
      this.snackBarService.open("Erro ao processar a solicitação.","Cancelar", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });;
    }).finally(()=> { 
      this.IsLoading = false; 
      this.form.reset();
    });
  }

  public addToFavorite(): void {
    this.addNewFavorite.emit(this.endereco);
    this.endereco = new Endereco();
  }

  get f() { return this.form.controls; }

}
