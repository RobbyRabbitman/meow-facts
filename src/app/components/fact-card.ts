import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MeowFact } from '../data/types';

@Component({
  selector: 'meow-fact-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCard, MatCardContent, NgOptimizedImage],
  template: `<mat-card class="max-w-sm m-auto bg-mat-sys-primary-container" appearance="outlined">
    <mat-card-content>
      <p class="mat-sys-title-large text-mat-sys-on-primary-container">
        {{ fact() }}
      </p>
    </mat-card-content>
    <img
      mat-card-image
      [ngSrc]="image()"
      [priority]="imagePriority()"
      width="1024"
      height="1024"
      alt=""
    />
  </mat-card>`,
})
export class MeowFactCard {
  readonly fact = input.required<MeowFact>();

  readonly image = input.required<string>();

  readonly imagePriority = input(false);
}
