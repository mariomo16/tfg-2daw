import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import type { IconSize } from "../../../models/icon-size.model";

@Component({
	selector: "app-github-icon",
	imports: [],
	templateUrl: "./github-icon.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GithubIcon {
	readonly size = input.required<IconSize>();
}
