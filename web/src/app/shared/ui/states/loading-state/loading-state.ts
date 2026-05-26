import { ChangeDetectionStrategy, Component, input } from "@angular/core";

@Component({
	selector: "app-loading-state",
	imports: [],
	templateUrl: "./loading-state.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingState {
	readonly text = input<string | null>(null);
}
