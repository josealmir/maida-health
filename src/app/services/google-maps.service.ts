import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeoCoordenadas } from '../models/geo-coordenadas';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {

  private readonly KEY_GOOGLE_MAPS = 'AIzaSyBzwbD1WErqzCLa6J50nzkQoJqZCMfgscE';
  constructor(private http: HttpClient) { }

  public get(endereco: string): any {
    return this.http.get<any>(`https://maps.googleapis.com/maps/api/geocode/json?address='${endereco}&key=${this.KEY_GOOGLE_MAPS}`);
  }
}
