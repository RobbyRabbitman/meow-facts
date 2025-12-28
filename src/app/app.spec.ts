import { TestBed } from '@angular/core/testing';
import { MeowFactsApp } from './app';

describe('MeowFactsApp', () => {
  it('should create', async () => {
    const test = TestBed.createComponent(MeowFactsApp);
    await test.whenStable();

    expect(test.componentInstance).toBeInstanceOf(MeowFactsApp);
  });
});
