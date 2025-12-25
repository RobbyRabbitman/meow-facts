import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  it('should create the app', async () => {
    const test = TestBed.createComponent(App);
    await test.whenStable();

    expect(test.componentInstance).toBeTruthy();
  });
});
