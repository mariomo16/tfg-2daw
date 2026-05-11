import { httpResource } from "@angular/common/http";
import { ChangeDetectionStrategy, Component, effect } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
	selector: "app-root",
	imports: [RouterOutlet],
	templateUrl: "./app.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
	resource = httpResource(() => "http://localhost:8000/api/v1/");

	constructor() {
		effect(() => {
			console.log(this.resource.value());
		});
	}
}
