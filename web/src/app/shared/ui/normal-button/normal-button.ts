import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
	selector: "app-normal-button",
	imports: [RouterLink],
	templateUrl: "./normal-button.html",
	styleUrl: "./normal-button.css",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NormalButton {
	readonly useRouterLink = input<boolean>(true);
	readonly label = input.required<string>();
	readonly href = input<string>();
}
