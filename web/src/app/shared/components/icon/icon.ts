import { ChangeDetectionStrategy, Component, input } from "@angular/core";

@Component({
	selector: "app-icon",
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: "./icon.html",
})
export class Icon {
	readonly name = input.required<string>();
	readonly filled = input<boolean>(false);
	readonly extraClass = input<string>("");
	readonly strokeWidth = input<string>("1.5");
}
