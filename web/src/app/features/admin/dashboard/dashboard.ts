import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ComputerService } from '../../../shared/data-access/computer/computer.service';
import { PaymentService } from '../../../shared/data-access/payment/payment.service';
import { ReservationService } from '../../../shared/data-access/reservation/reservation.service';
import { UserService } from '../../../shared/data-access/user/user.service';
import { DashboardCard, type StatCardData } from './card/dashboard-card';

@Component({
  selector: 'app-dashboard',
  imports: [DashboardCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.html',
})
export class Dashboard {
  // #region Dependencies
  readonly #reservationService = inject(ReservationService);
  readonly #userService = inject(UserService);
  readonly #paymentService = inject(PaymentService);
  readonly #computerService = inject(ComputerService);
  // #endregion

  // #region Reservations
  readonly #reservationsResource = rxResource({
    stream: () => this.#reservationService.getAll(),
  });

  readonly #totalReservations = computed(() => this.#reservationsResource.value()?.length ?? 0);
  // #endregion

  // #region Users
  readonly #usersResource = rxResource({
    stream: () => this.#userService.getAll(),
  });

  readonly #newUsersThisWeek = computed(() => {
    const users = this.#usersResource.value();
    if (!users?.length) return 0;

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    return users.filter((user) => new Date(user.created_at) > oneWeekAgo).length;
  });
  // #endregion

  // #region Payments
  readonly #paymentsResource = rxResource({
    stream: () => this.#paymentService.getAll(),
  });

  readonly #weeklyRevenue = computed(() => {
    const payments = this.#paymentsResource.value();

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const weeklyRevenue =
      payments
        ?.filter((payment) => new Date(payment.created_at) > oneWeekAgo)
        .reduce((total, payment) => {
          const isRefund = payment.type === 'refund';
          const amount = payment.amount || 0;

          return isRefund ? total - amount : total + amount;
        }, 0) || 0;

    return `${weeklyRevenue} €`;
  });
  // #endregion

  // #region Computers
  readonly #computersResource = rxResource({
    stream: () => this.#computerService.getAll(),
  });

  readonly #totalComputers = computed(() => this.#computersResource.value()?.length ?? 0);

  // readonly #computerStats = computed(() => {
  // 	const computers = this.#computersResource.value() ?? [];
  // 	return {
  // 		available: computers.filter(
  // 			(c) => c.status === COMPUTER_STATUS_LABELS.available,
  // 		),
  // 		occupued: computers.filter(
  // 			(c) => c.status === COMPUTER_STATUS_LABELS.occupied,
  // 		),
  // 		maintenance: computers.filter(
  // 			(c) => c.status === COMPUTER_STATUS_LABELS.maintenance,
  // 		),
  // 	};
  // });
  // #endregion

  protected readonly data = computed<StatCardData[]>(() => [
    {
      // TODO: mostrar reservas de hoy o activas
      isLoading: this.#reservationsResource.isLoading,
      error: this.#reservationsResource.error,
      title: 'Reservas',
      info: this.#totalReservations,
      iconColor: 'text-sky-400',
      linkRoute: '/admin/reservations/new',
      linkColor: 'hover:border-sky-500/30 hover:bg-sky-500/5',
    },
    {
      isLoading: this.#usersResource.isLoading,
      error: this.#usersResource.error,
      title: 'Usuarios',
      info: this.#newUsersThisWeek,
      iconColor: 'text-amber-400',
      linkRoute: '/admin/users/new',
      linkColor: 'hover:border-amber-500/30 hover:bg-amber-500/5',
    },
    {
      isLoading: this.#paymentsResource.isLoading,
      error: this.#paymentsResource.error,
      title: 'Ganancias semanales',
      info: this.#weeklyRevenue,
      iconColor: 'text-success-light',
      linkRoute: '/admin/payments/new',
      linkColor: 'hover:border-success/30 hover:bg-success/5',
    },
    {
      // TODO: mostrar ordenadores disponibles/ocupados
      isLoading: this.#computersResource.isLoading,
      error: this.#computersResource.error,
      title: 'Ordenadores',
      info: this.#totalComputers,
      iconColor: 'text-violet-400',
      linkRoute: '/admin/computers/new',
      linkColor: 'hover:border-violet-500/30 hover:bg-violet-500/5',
    },
  ]);
}
