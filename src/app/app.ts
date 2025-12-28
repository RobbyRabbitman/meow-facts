import {
  ApplicationConfig,
  ChangeDetectionStrategy,
  Component,
  inject,
  provideBrowserGlobalErrorListeners,
  provideEnvironmentInitializer,
} from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatToolbar } from '@angular/material/toolbar';
import { environment } from '../environments/environment';
import { MeowFactCard } from './components/fact-card';
import { provideMeowFactsApi } from './data/api';
import { MeowFactsStore } from './data/store';
import { wrapMaterialInCssLayer } from './util/wrap-material-in-css-layer';

export const MEOW_FACTS_APP_CONFIGURATION = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideMeowFactsApi(() => ({ baseUrl: environment.apiBaseUrl })),
    provideEnvironmentInitializer(() => wrapMaterialInCssLayer().subscribe()),
    MeowFactsStore,
  ],
} satisfies ApplicationConfig;

@Component({
  selector: 'meow-app',
  imports: [MeowFactCard, MatToolbar, MatProgressBar],
  host: {
    class: 'flex flex-col min-h-screen gap-8 px-4 items-center',
  },
  template: `<mat-toolbar>
      <h1 class="mat-sys-title-large mx-auto">Meow Facts</h1>
    </mat-toolbar>
    <main class="flex flex-col gap-6">
      @if (store.all.isLoading()) {
        <mat-progress-bar mode="indeterminate" aria-label="Loading cat facts." />
      } @else if (!store.all.hasValue()) {
        <p
          aria-live="polite"
          class="p-4 rounded-mat-sys-corner-medium mat-sys-body-large bg-mat-sys-error-container text-mat-sys-on-error-container"
        >
          Oh no! Meow facts are currently unavailable. Try again later.
        </p>
      } @else {
        @for (fact of store.all.value(); track fact) {
          <meow-fact-card
            class="max-w-sm"
            [fact]="fact"
            [image]="'cats/' + ($index % store.imageCollectionSize) + '.png'"
            [imagePriority]="$index <= 1"
          />
        }
      }
    </main>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeowFactsApp {
  protected readonly store = inject(MeowFactsStore);
}
