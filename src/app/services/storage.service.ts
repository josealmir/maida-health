import { Injectable } from '@angular/core';
import { Dexie } from 'dexie';
import { Endereco } from '../models/endereco';

@Injectable({
  providedIn: 'root'
})
export class StorageService extends Dexie {

    endereco: Dexie.Table<Endereco, number>;

    constructor() {
        super("EnderecoDB");
        this.version(1)
        .stores({
            enderecos: '++id, cep, logradouro, complemento, bairro, localidade, uf, latitute, longitude'
        });

        this.endereco = this.table("enderecos");
    }

    public save(endereco: Endereco){
        return this.endereco.add(endereco);
    }

    public getById(id: number){
        return this.endereco.get(id);
    }

    public deleteAll(){
      return this.endereco.clear();
    }

    public get() {
      return this.endereco.toArray();
    }

}
