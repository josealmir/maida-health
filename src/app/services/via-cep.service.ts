import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Endereco } from '../models/endereco';

@Injectable({
  providedIn: 'root'
})
export class ViacepService {

  private readonly API_VIACEP = `${environment.viacep}`; 

  constructor(private http: HttpClient) { }

  public get(cep: string): Promise<Endereco> {
    return this.http.get<Endereco>(`${this.API_VIACEP}/${cep}/json`).toPromise();
  }
}
