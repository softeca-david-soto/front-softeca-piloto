import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClientRepository } from '../../../core/clients/domain/client.repository';
import { ClientType } from '../../../core/clients/domain/client-type.enum';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './client-form.component.html'
})
export class ClientFormComponent implements OnInit {

  private readonly repo = inject(ClientRepository);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);

  clientTypes = Object.values(ClientType);
  isEdit = signal(false);
  clientId = signal<number | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  form = this.fb.group({
    name:         ['', Validators.required],
    email:        ['', [Validators.required, Validators.email]],
    phone:        ['', Validators.required],
    zipcode:      ['', Validators.required],
    provincia_id: [0, Validators.required],
    vendedor_id:  [0, Validators.required],
    tipo:         [ClientType.TRADICIONAL, Validators.required]
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit.set(true);
      this.clientId.set(+id);
      this.loadClient(+id);
    }
  }

  loadClient(id: number): void {
    this.loading.set(true);
    this.repo.getById(id).subscribe({
      next: (client) => {
        this.form.patchValue({
          name:         client.name,
          email:        client.email,
          phone:        client.phone,
          zipcode:      client.zipcode,
          provincia_id: client.provincia_id,
          vendedor_id:  client.vendedor_id,
          tipo:         client.tipo
        });
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Error al cargar el cliente');
        this.loading.set(false);
      }
    });
  }

  submit(): void {
    if (this.form.invalid) return;
    this.loading.set(true);
    const value = this.form.getRawValue() as any;

    const request$ = this.isEdit()
      ? this.repo.update(this.clientId()!, value)
      : this.repo.create(value);

    request$.subscribe({
      next: () => this.router.navigate(['/clients']),
      error: () => {
        this.error.set('Error al guardar el cliente');
        this.loading.set(false);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/clients']);
  }
}
