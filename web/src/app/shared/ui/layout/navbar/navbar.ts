import { ChangeDetectionStrategy, Component } from "@angular/core";
import { APP } from "../../../../core/constants/app.constants";
import type { IconSize } from "../../../models/icon-size.model";
import { DiscordIcon } from "../../icons/discord-icon/discord-icon";
import { GithubIcon } from "../../icons/github-icon/github-icon";
import { InstagramIcon } from "../../icons/instagram-icon/instagram-icon";
import { XIcon } from "../../icons/x-icon/x-icon";

@Component({
	selector: "app-navbar",
	imports: [XIcon, InstagramIcon, DiscordIcon, GithubIcon],
	templateUrl: "./navbar.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
	protected readonly appName = APP.name;
	protected readonly size: IconSize = {
		width: 24,
		height: 24,
	};
}
