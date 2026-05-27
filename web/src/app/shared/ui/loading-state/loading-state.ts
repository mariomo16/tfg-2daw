import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-loading-state',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './loading-state.html',
})
export class LoadingState {
  readonly text = input<string>('Cargando datos');
}
