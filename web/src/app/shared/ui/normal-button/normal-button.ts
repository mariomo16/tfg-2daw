import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
	selector: "app-normal-button",
	imports: [RouterLink],
	templateUrl: "./normal-button.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NormalButton {
	readonly useRouterLink = input<boolean>(true);
	readonly label = input.required<string>();
	readonly href = input<string>();

	protected readonly buttonStyle =
		"rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light transition-colors duration-150";
}
