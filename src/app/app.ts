import {
  ApplicationConfig,
  ChangeDetectionStrategy,
  Component,
  inject,
  provideBrowserGlobalErrorListeners,
  provideEnvironmentInitializer,
} from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MeowFactCard } from './components/fact-card';
import { provideMeowFactsApi } from './data/api';
import { MeowFactsStore } from './data/store';
import { wrapMaterialInCssLayer } from './util/wrap-material-in-css-layer';

export const MEOW_FACTS_APP_CONFIGURATION = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideMeowFactsApi(() => ({ baseUrl: 'https://meowfacts.herokuapp.com' })),
    provideEnvironmentInitializer(() => wrapMaterialInCssLayer().subscribe()),
    MeowFactsStore,
  ],
} satisfies ApplicationConfig;

@Component({
  selector: 'meow-app',
  imports: [MeowFactCard, MatToolbar],
  host: {
    class: 'flex flex-col min-h-screen gap-8 px-4 items-center',
  },
  template: `<mat-toolbar>
      <h1 class="mat-sys-title-large mx-auto">Meow Facts</h1>
    </mat-toolbar>
    <main class="flex flex-col gap-6">
      @for (fact of store.all.value(); track fact) {
        <meow-fact-card
          class="max-w-sm"
          [fact]="fact"
          [image]="'cats/' + ($index % store.imageCollectionSize) + '.png'"
          [imagePriority]="$index <= 1"
        />
      }
    </main>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeowFactsApp {
  protected readonly store = inject(MeowFactsStore);
}
