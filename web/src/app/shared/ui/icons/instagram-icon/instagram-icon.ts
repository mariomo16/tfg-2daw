import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import type { IconSize } from "../../../models/icon-size.model";

@Component({
	selector: "app-instagram-icon",
	imports: [],
	templateUrl: "./instagram-icon.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstagramIcon {
	readonly size = input.required<IconSize>();
}
