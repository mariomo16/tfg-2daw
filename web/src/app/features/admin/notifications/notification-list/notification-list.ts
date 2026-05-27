import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { NotificationService } from '../../../../shared/data-access/notification/notification.service';
import { DataTable } from '../../../../shared/ui/data-table/data-table';
import { ErrorState } from '../../../../shared/ui/error-state/error-state';
import { LoadingState } from '../../../../shared/ui/loading-state/loading-state';

@Component({
  selector: 'app-notification-list',
  imports: [RouterLink, DataTable, DatePipe, LoadingState, ErrorState],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './notification-list.html',
})
export class NotificationList {
  readonly #notificationService = inject(NotificationService);
  readonly #destroyRef = inject(DestroyRef);

  protected readonly notificationsResource = rxResource({
    stream: () => this.#notificationService.getAll(),
  });

  protected readonly columns: string[] = ['USUARIO', 'MENSAJE', 'TIPO', 'FECHA'];

  protected readonly actions = true;

  protected onDelete(id: number): void {
    this.#notificationService
      .delete(id)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: () => this.notificationsResource.reload(),
        error: (error) => console.error('No se ha podido eliminar,', error),
      });
  }
}
