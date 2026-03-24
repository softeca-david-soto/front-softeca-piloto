import { Observable } from 'rxjs';
import { Client, CreateClient, UpdateClient } from './client.model';

export abstract class ClientRepository {
  abstract getAll(): Observable<Client[]>;
  abstract getById(id: number): Observable<Client>;
  abstract create(client: CreateClient): Observable<Client>;
  abstract update(id: number, client: UpdateClient): Observable<Client>;
  abstract delete(id: number): Observable<void>;
}
