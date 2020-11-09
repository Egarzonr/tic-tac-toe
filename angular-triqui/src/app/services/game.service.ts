import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<any>(`${base_url}/games`);
  }

  getField(id: any): Observable<any> {
    return this.http.get<any>(`${base_url}/games/${id}`);
  }

  createGame(started: any, name: any) {
    const data = {
      started,
      name,
    };
    return this.http.post(`${base_url}/gamestarted`, data);
  }

  updateEndGame(started: any, id: any, ganador: any) {
    const data = {
      started,
      ganador,
    };
    console.log(data);
    console.log(id);
    return this.http.put(`${base_url}/gamestarted/${id}`, data);
  }

  savePlay(id: any, field: any) {
    const data = {
      field,
    };
    console.log(data);
    return this.http.put(`${base_url}/savegameplay/${id}`, data);
  }

  deleteGame(id) {
    return this.http.delete(`${base_url}/gamedelete/${id}`);
  }
}
