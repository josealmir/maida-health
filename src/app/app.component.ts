import { Component, OnInit } from '@angular/core';
import { Endereco } from './models/endereco';
import { GoogleMapsService } from './services/google-maps.service';
import { StorageService } from './services/storage.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAlertComponent } from './components/dialog-alert/dialog-alert.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  public title: string;
  public favoritos: Endereco[];
  public lat: string;
  public lng: string;

  constructor(private googleMapsService: GoogleMapsService, 
    private storegeService: StorageService,
    private matDialog :MatDialog) {
    this.title = 'Diário de Bordo.';
    this.favoritos = [];
  }

  ngOnInit(): void {
    this.storegeService.get().then((enderecos) => { 
      console.log(enderecos);
      enderecos.map((item)=> this.favoritos.push(item));
    });
  }
  
  public receiveNewFavorite(endereco: Endereco): void {

    const cepExist = this.favoritos.some(s => s.cep === endereco.cep);
    if (cepExist) {
      this.matDialog.open(DialogAlertComponent);
      return;
    }

    this.googleMapsService.get(endereco.logradouro + ', ' + endereco.bairro + ', ' + endereco.localidade + ' - ' + endereco.uf)
    .subscribe( data => { 
      endereco.latitute = data.results[0].geometry.location.lat;
      endereco.longitude = data.results[0].geometry.location.lng;
      this.favoritos.push(endereco);
      this.storegeService.save(endereco);
    });
  }

  public onExpansion(cep: string): void {
    const endereco = this.favoritos.find(x=>x.cep === cep);
    this.lat = endereco.latitute;
    this.lng = endereco.longitude;
  }

  public deleteTodos(): void {
    this.favoritos = []
    this.storegeService.deleteAll(); 
  }

}
