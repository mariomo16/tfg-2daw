import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-user-menu",
	imports: [],
	templateUrl: "./user-menu.html",
	styleUrl: "./user-menu.css",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMenu {}
