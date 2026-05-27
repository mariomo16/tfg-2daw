import { ChangeDetectionStrategy, Component } from '@angular/core';
import { APP } from '../../../../core/constants/app.constants';
import { Icon } from '../../icon/icon';

@Component({
  selector: 'app-footer',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.html',
})
export class Footer {
  protected readonly app = APP;

  protected socials = [
    {
      icon: 'discord',
      color: 'text-content-muted',
      hover: 'hover:text-[#E0E3FF]',
      to: 'https://discord.gg/umSwM4Z2ST',
    },
    {
      icon: 'github',
      color: 'text-content-muted',
      hover: 'hover:text-white',
      to: 'https://github.com/mariomo16/tfg-web',
    },
  ];
}
