import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { APP } from '../../../core/constants/app.constants';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './not-found.html',
})
export class NotFound {
  readonly #location = inject(Location);
  protected readonly appName = APP.name;

  protected goBack(): void {
    this.#location.back();
  }
}
