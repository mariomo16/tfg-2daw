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
import { PaymentService } from "../../../payments/payment.service";

@Component({
	selector: "app-payment-list",
	imports: [SafeHtmlPipe, DatePipe, CurrencyPipe],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: "./payment-list.html",
})
export class PaymentList {
	readonly #paymentService = inject(PaymentService);
	protected readonly loadingIcon = LoadingIcons.spinner;

	protected readonly paymentsResource = resource({
		loader: () => firstValueFrom(this.#paymentService.getAll()),
	});

	protected readonly columns = [
		{ key: "id", label: "ID" },
		{ key: "user", label: "USUARIO" },
		{ key: "reservation", label: "RESERVA" },
		{ key: "amount", label: "IMPORTE" },
		{ key: "type", label: "TIPO" },
		{ key: "date", label: "FECHA" },
	] as const;
}
