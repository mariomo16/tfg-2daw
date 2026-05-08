import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
	selector: "app-gaming-button",
	imports: [RouterLink],
	templateUrl: "./gaming-button.html",
	styleUrl: "./gaming-button.css",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamingButton {
	readonly asLink = input<boolean>(true);
	readonly useRouterLink = input<boolean>(true);

	readonly label = input.required<string>();
	readonly href = input<string>();
	readonly type = input<"button" | "submit">("button");
}
