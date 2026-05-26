import { ChangeDetectionStrategy, Component } from "@angular/core";
import { NormalButton } from "../normal-button/normal-button";

@Component({
	selector: "app-not-found",
	imports: [NormalButton],
	templateUrl: "./not-found.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFound {}
