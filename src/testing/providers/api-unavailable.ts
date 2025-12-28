import { withInterceptors } from '@angular/common/http';
import { EnvironmentProviders, Provider } from '@angular/core';
import { meowFactsApiAsUnavailableStub, provideMeowFactsApiTesting } from '../data/api';
import { buildBaseTestingProviders } from './base';

export default [
  ...buildBaseTestingProviders({
    httpClient: [withInterceptors([meowFactsApiAsUnavailableStub])],
  }),
  provideMeowFactsApiTesting(),
] satisfies (Provider | EnvironmentProviders)[];
