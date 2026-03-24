import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ClientRepository } from '../domain/client.repository';
import { Client, CreateClient, UpdateClient } from '../domain/client.model';

@Injectable({ providedIn: 'root' })
export class HttpClientRepository extends ClientRepository {

  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/apiclientes`;

  getAll(): Observable<Client[]> {
    return this.http.get<{ data: Client[] }>(this.baseUrl).pipe(
      map(response => response.data)
    );
  }

  getById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.baseUrl}/${id}`);
  }

  create(client: CreateClient): Observable<Client> {
    return this.http.post<Client>(this.baseUrl, client);
  }

  update(id: number, client: UpdateClient): Observable<Client> {
    return this.http.put<Client>(`${this.baseUrl}/${id}`, client);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
