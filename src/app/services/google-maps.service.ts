import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {

  private readonly KEY_GOOGLE_MAPS = 'AIzaSyBzwbD1WErqzCLa6J50nzkQoJqZCMfgscE';
  constructor(private http: HttpClient) { }

  public get(endereco: string): any {
    return this.http.get<any>(`${environment.googlemaps}'${endereco}&key=${environment.googlemapskey}`);
  }
}
