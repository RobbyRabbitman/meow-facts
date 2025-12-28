import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject, Provider } from '@angular/core';
import { of } from 'rxjs';
import { MEOW_FACTS_API_OPTIONS } from '../../app/data/api';

export function provideMeowFactsApiTesting() {
  return [
    {
      provide: MEOW_FACTS_API_OPTIONS,
      useValue: { baseUrl: 'api' },
    },
  ] satisfies Provider[];
}

export const meowFactsApiStub: HttpInterceptorFn = (req, next) => {
  const options = inject(MEOW_FACTS_API_OPTIONS);

  if (req.url.startsWith(options.baseUrl)) {
    if (req.url === options.baseUrl) {
      let facts = [
        'Cats sleep 70% of their lives.',
        'A group of cats is called a clowder.',
        'Cats have five toes on their front paws, but only four on their back paws.',
      ];

      const idParam = req.params.get('id');

      if (idParam != null) {
        const id = Number(idParam);

        const fact = facts[id];

        if (!fact) {
          return of(new HttpResponse({ status: 404 }));
        }

        facts = [fact];
      }

      return of(
        new HttpResponse({
          body: {
            data: facts,
          },
        }),
      );
    }
  }

  return next(req);
};

export const meowFactsApiAsUnavailableStub: HttpInterceptorFn = (req, next) => {
  const options = inject(MEOW_FACTS_API_OPTIONS);

  if (req.url.startsWith(options.baseUrl)) {
    return of(new HttpResponse({ status: 503 }));
  }

  return next(req);
};
