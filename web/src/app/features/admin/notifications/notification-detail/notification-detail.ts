import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../../../shared/data-access/notification/notification.service';

@Component({
  selector: 'app-notification-detail',
  imports: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './notification-detail.html',
})
export class NotificationDetail {
  readonly #notificationService = inject(NotificationService);
  readonly #route = inject(ActivatedRoute);

  readonly #notificationId = Number(this.#route.snapshot.paramMap.get('id'));

  protected readonly notificationResource = rxResource({
    stream: () => this.#notificationService.getById(this.#notificationId),
  });
}
