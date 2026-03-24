import { ClientType } from "./client-type.enum";

export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  zipcode: string;
  provincia_id: number;
  vendedor_id: number;
  tipo: ClientType;
  activo: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface CreateClient {
  name: string;
  email: string;
  phone: string;
  zipcode: string;
  provincia_id: number;
  vendedor_id: number;
  tipo: ClientType;
}

export interface UpdateClient {
  name: string;
  email: string;
  phone: string;
  zipcode: string;
  provincia_id: number;
  vendedor_id: number;
  tipo: ClientType;
}
