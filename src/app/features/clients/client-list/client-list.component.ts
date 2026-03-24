import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClientRepository } from '../../../core/clients/domain/client.repository';
import { Client } from '../../../core/clients/domain/client.model';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-list.component.html'
})
export class ClientListComponent implements OnInit {

  private readonly repo = inject(ClientRepository);
  private readonly router = inject(Router);

  clients = signal<Client[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  selectedClient = signal<Client | null>(null);

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.loading.set(true);
    this.repo.getAll().subscribe({
      next: (data) => {
        this.clients.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Error al cargar los clientes');
        this.loading.set(false);
      }
    });
  }

  goToCreate(): void {
    this.router.navigate(['/clients/new']);
  }

  goToEdit(id: number): void {
    this.router.navigate(['/clients', id, 'edit']);
  }

  openDetail(client: Client): void {
    this.selectedClient.set(client);
  }

  closeDetail(): void {
    this.selectedClient.set(null);
  }

  delete(id: number): void {
    if (!confirm('¿Seguro que quieres eliminar este cliente?')) return;
    this.repo.delete(id).subscribe({
      next: () => {
        this.closeDetail();
        this.loadClients();
      },
      error: () => this.error.set('Error al eliminar el cliente')
    });
  }
}
