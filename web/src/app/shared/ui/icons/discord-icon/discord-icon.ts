import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import type { IconSize } from "../../../models/icon-size.model";

@Component({
	selector: "app-discord-icon",
	imports: [],
	templateUrl: "./discord-icon.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscordIcon {
	readonly size = input.required<IconSize>();
}
