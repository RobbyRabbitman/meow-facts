import { inject, Injectable } from '@angular/core';
import { MeowFactsApi } from './api';

@Injectable({
  providedIn: 'root',
})
export class MeowFactsStore {
  protected readonly api = inject(MeowFactsApi);

  /**
   * TODO: This api does not support pagination, and currently only has 100 facts. Just load and
   * render all of them eagerly.
   */
  readonly all = this.api.many(() => ({ count: 1000, lang: 'eng' })).asReadonly();

  readonly imageCollectionSize = 7;
}
