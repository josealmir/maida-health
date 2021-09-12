import { Component } from '@angular/core';
import { Endereco } from './models/endereco';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: string;
  public panelOpenState: boolean;
  public favoritos: Endereco[];

  constructor() {
    this.title = 'Diário de Bordo.';
    this.panelOpenState = false;
    this.favoritos = [];
  }
  
  public receiveNewFavorite(event: any): void {
    this.favoritos.push(event);
  }
}
