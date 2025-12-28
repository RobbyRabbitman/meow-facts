import { withInterceptors } from '@angular/common/http';
import { EnvironmentProviders, Provider } from '@angular/core';
import { meowFactsApiStub, provideMeowFactsApiTesting } from '../data/api';
import { buildBaseTestingProviders } from './base';

export default [
  ...buildBaseTestingProviders({
    httpClient: [withInterceptors([meowFactsApiStub])],
  }),
  provideMeowFactsApiTesting(),
] satisfies (Provider | EnvironmentProviders)[];
