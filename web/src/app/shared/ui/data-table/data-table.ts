import {
	ChangeDetectionStrategy,
	Component,
	computed,
	input,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import { EmptyState } from "@shared/ui/states/empty-state/empty-state";

@Component({
	selector: "app-data-table",
	imports: [RouterLink, EmptyState],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: "./data-table.html",
})
export class DataTable {
	readonly title = input.required<string>();
	readonly description = input.required<string>();

	readonly actionRoute = input<string | null>(null);
	readonly actionLabel = input<string | null>(null);

	readonly columns = input.required<string[]>();
	readonly actions = input.required<boolean>();
	readonly totalColumns = computed(() => {
		return this.columns().length + (this.actions() ? 1 : 0);
	});

	readonly isEmpty = input.required<boolean>();
}
