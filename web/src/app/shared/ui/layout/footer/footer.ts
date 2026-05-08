import { ChangeDetectionStrategy, Component } from "@angular/core";
import type { IconSize } from "../../../models/icon-size.model";
import { DiscordIcon } from "../../icons/discord-icon/discord-icon";
import { GithubIcon } from "../../icons/github-icon/github-icon";
import { InstagramIcon } from "../../icons/instagram-icon/instagram-icon";
import { XIcon } from "../../icons/x-icon/x-icon";

@Component({
	selector: "app-footer",
	imports: [InstagramIcon, GithubIcon, DiscordIcon, XIcon],
	templateUrl: "./footer.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
	protected readonly size: IconSize = {
		width: 24,
		height: 24,
	};
}
