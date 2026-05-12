import { ChangeDetectionStrategy, Component, input } from "@angular/core";

@Component({
	selector: "app-error-state",
	imports: [],
	templateUrl: "./error-state.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorState {
	readonly text = input<string | null>(null);
}
