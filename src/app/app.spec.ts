import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import apiAvailableProviders from '../testing/providers/api-available';
import apiUnavailableProviders from '../testing/providers/api-unavailable';

import { MeowFactsApp } from './app';
import { MeowFactCard } from './components/fact-card';

describe('MeowFactsApp', () => {
  describe('api is available', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: apiAvailableProviders,
      });
    });

    it('should create', async () => {
      const test = TestBed.createComponent(MeowFactsApp);
      await test.whenStable();

      expect(test.componentInstance).toBeInstanceOf(MeowFactsApp);
    });

    it('should have a title', async () => {
      const test = TestBed.createComponent(MeowFactsApp);
      await test.whenStable();

      expect(test.debugElement.query(By.css('h1'))?.nativeElement.textContent).toMatch(
        /Meow Facts/,
      );
    });

    it('should render all facts', async () => {
      const test = TestBed.createComponent(MeowFactsApp);
      await test.whenStable();

      const factCards = test.debugElement.queryAll(By.directive(MeowFactCard));
      expect(factCards).toHaveLength(3);
    });
  });

  describe('api is unavailable', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: apiUnavailableProviders,
      });
    });

    it('should inform the user when fetching facts fails', async () => {
      const test = TestBed.createComponent(MeowFactsApp);
      await test.whenStable();

      const errorMessage = test.debugElement.query(By.css('main > p'));
      expect(errorMessage).toBeTruthy();
      expect(errorMessage?.nativeElement.textContent).toMatch(
        /Oh no! Meow facts are currently unavailable. Try again later./,
      );
    });
  });
});
