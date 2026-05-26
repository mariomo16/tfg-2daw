import { ChangeDetectionStrategy, Component, input } from "@angular/core";

@Component({
	selector: "app-empty-state",
	imports: [],
	templateUrl: "./empty-state.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyState {
	readonly text = input<string | null>(null);
}
