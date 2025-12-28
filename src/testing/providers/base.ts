import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { EnvironmentProviders, Provider } from '@angular/core';
import { MEOW_FACTS_APP_CONFIGURATION } from '../../app/app';

export function buildBaseTestingProviders(options?: {
  httpClient: Parameters<typeof provideHttpClient>;
}) {
  return [
    MEOW_FACTS_APP_CONFIGURATION.providers,
    provideHttpClient(...(options?.httpClient ?? [])),
    provideHttpClientTesting(),
  ] satisfies (Provider | EnvironmentProviders)[];
}

export default buildBaseTestingProviders();
