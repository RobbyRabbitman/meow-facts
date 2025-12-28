import { bootstrapApplication } from '@angular/platform-browser';
import { MEOW_FACTS_APP_CONFIGURATION, MeowFactsApp } from './app/app';

bootstrapApplication(MeowFactsApp, MEOW_FACTS_APP_CONFIGURATION).catch(console.error);
