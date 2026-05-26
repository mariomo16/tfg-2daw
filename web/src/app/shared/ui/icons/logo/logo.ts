import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import type { IconSize } from "@shared/models/icon-size.model";

@Component({
	selector: "app-logo",
	imports: [],
	templateUrl: "./logo.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Logo {
	readonly size = input.required<IconSize>();
}
