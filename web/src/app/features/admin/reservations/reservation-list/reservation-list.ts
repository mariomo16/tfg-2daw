import { CurrencyPipe, DatePipe } from "@angular/common";
import {
	ChangeDetectionStrategy,
	Component,
	inject,
	resource,
} from "@angular/core";
import { firstValueFrom } from "rxjs";
import { LoadingIcons } from "../../../../shared/icons/icons";
import { SafeHtmlPipe } from "../../../../shared/pipes/safe-html.pipe";
import { ReservationService } from "../../../reservations/reservation.service";

@Component({
	selector: "app-reservation-list",
	imports: [SafeHtmlPipe, DatePipe, CurrencyPipe],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: "./reservation-list.html",
})
export class ReservationList {
	readonly #reservationService = inject(ReservationService);
	protected readonly loadingIcon = LoadingIcons.spinner;

	protected readonly reservationsResource = resource({
		loader: () => firstValueFrom(this.#reservationService.getAll()),
	});

	protected readonly columns = [
		{ key: "id", label: "ID" },
		{ key: "user", label: "USUARIO" },
		{ key: "computer", label: "EQUIPO" },
		{ key: "date", label: "FECHA" },
		{ key: "time", label: "HORARIO" },
		{ key: "status", label: "ESTADO" },
		{ key: "price", label: "PRECIO" },
	] as const;
}
