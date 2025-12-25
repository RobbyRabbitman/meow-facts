import {
  ApplicationConfig,
  ChangeDetectionStrategy,
  Component,
  provideBrowserGlobalErrorListeners,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

export const appConfig = {
  providers: [provideBrowserGlobalErrorListeners()],
} satisfies ApplicationConfig;

@Component({
  selector: 'meow-app',
  imports: [RouterOutlet],
  template: `<router-outlet />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('meow-facts');
}
