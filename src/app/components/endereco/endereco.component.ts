import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Endereco } from 'src/app/models/endereco';
import { ViacepService } from 'src/app/services/viacep.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss']
})
export class EnderecoComponent implements OnInit {

  @Output() addNewFavorite: EventEmitter<Endereco>;

  public cep: string;
  public IsLoading: boolean;
  public endereco: Endereco;
  public horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  public verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private snackBarService: MatSnackBar, private viacepService: ViacepService) {
    this.cep = '';
    this.IsLoading = false;
    this.endereco = new Endereco();
    this.addNewFavorite = new EventEmitter<Endereco>();
  }

  ngOnInit(): void {
  }

  public search(): void {
    this.IsLoading = true;
    this.viacepService.get(this.cep).then((data: Endereco) => {
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
      this.cep = '';
    });
  }

  public addToFavorite(): void {
    this.addNewFavorite.emit(this.endereco);
    this.endereco = new Endereco();
  }
}
