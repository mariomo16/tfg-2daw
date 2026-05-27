import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Output,
  signal,
} from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { ProfileService } from '../profile.service';

export interface UpdateProfileDto {
  userId: number;
  name: string;
  email: string;
  image?: File;
}

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-profile.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProfile {
  readonly #formBuilder = inject(NonNullableFormBuilder);
  readonly #authService = inject(AuthService);
  readonly #profileService = inject(ProfileService);

  @Output() cancel = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  protected readonly user = this.#authService.user;
  protected readonly isLoading = signal(false);

  protected readonly image = signal<File | null>(null);

  protected readonly form = this.#formBuilder.group({
    name: [
      this.user()?.name as string,
      [Validators.required, Validators.minLength(3), Validators.maxLength(40)],
    ],
    email: [this.user()?.email as string, [Validators.required, Validators.email]],
  });

  protected onImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    this.image.set(file);
  }

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);

    const data: UpdateProfileDto = {
      ...this.form.getRawValue(),
      userId: Number(this.user()?.id),
    };

    const image = this.image();

    const formData = new FormData();
    formData.append('userId', String(data.userId));
    formData.append('name', data.name);
    formData.append('email', data.email);
    if (image) formData.append('image', image);

    this.#profileService.updateProfile(formData as unknown as UpdateProfileDto).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.saved.emit();
      },
      error: (err) => {
        this.isLoading.set(false);
        console.error('Error al guardar los datos:', err);
      },
    });
  }
}
