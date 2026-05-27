import { CurrencyPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Icon } from "../../../shared/components/icon/icon";
import type { Zone } from "../zone.model";

@Component({
	selector: "app-zone-card",
	imports: [CurrencyPipe, RouterLink, Icon],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: "./zone-card.html",
})
export class ZoneCard {
	readonly zone = input.required<Zone>();
}
