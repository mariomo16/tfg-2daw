import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-error-state',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './error-state.html',
})
export class ErrorState {
  readonly text = input<string>('Error al cargar los datos');
  readonly retry = output<void>();
}
