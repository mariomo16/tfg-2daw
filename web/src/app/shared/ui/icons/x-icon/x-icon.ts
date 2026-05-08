import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import type { IconSize } from "../../../models/icon-size.model";

@Component({
	selector: "app-x-icon",
	imports: [],
	templateUrl: "./x-icon.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XIcon {
	readonly size = input.required<IconSize>();
}
