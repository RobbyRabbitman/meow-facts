import { HttpParams, httpResource } from '@angular/common/http';
import { inject, Injectable, InjectionToken, Provider } from '@angular/core';
import { GetMeowFactsRequestParams, GetMeowFactsResponse, MeowFact } from './types';

export interface MeowFactsApiOptions {
  baseUrl: string;
}

export const MEOW_FACTS_API_OPTIONS = new InjectionToken<MeowFactsApiOptions>(
  'MEOW_FACTS_API_OPTIONS',
);

export function provideMeowFactsApi(options: () => MeowFactsApiOptions) {
  return [
    {
      provide: MEOW_FACTS_API_OPTIONS,
      useFactory: options,
    },
  ] satisfies Provider[];
}

@Injectable({
  providedIn: 'root',
})
export class MeowFactsApi {
  protected readonly options = inject(MEOW_FACTS_API_OPTIONS);

  many(options?: () => Partial<GetMeowFactsRequestParams>) {
    return httpResource<MeowFact[]>(
      () => {
        const { count, lang } = {
          ...options?.(),
        };

        let params = new HttpParams();

        if (lang != null) {
          params = params.set('lang', lang);
        }

        if (count != null) {
          params = params.set('count', count);
        }

        return {
          url: this.options.baseUrl,
          params,
        };
      },
      { defaultValue: [], parse: (body) => (body as GetMeowFactsResponse).data },
    );
  }
}
