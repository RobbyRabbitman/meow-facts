import { DOCUMENT, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { mutationObserver } from './rxjs/mutation-observer';

/**
 * TODO: Remove me when https://github.com/angular/components/issues/26451 is fixed.
 *
 * Wraps Angular Material styles in a CSS layer to enable better control over specificity and
 * layering. Implementation is based on https://github.com/angular/components/issues/26451.
 */
export function wrapMaterialInCssLayer(options?: { name?: string }) {
  const document = inject(DOCUMENT);
  const materialClassNamePrefixes = ['.mat-', '.cdk-'];
  const cssLayerName = options?.name ?? 'components';

  return mutationObserver(document.head, { childList: true }).pipe(
    takeUntilDestroyed(),
    tap((records) => {
      for (const styleElement of records
        .flatMap((record) => Array.from(record.addedNodes))
        .filter((node) => node instanceof HTMLStyleElement)) {
        const styleContent = styleElement.textContent || '';

        if (
          !styleContent ||
          styleElement.attributes.length !== 0 ||
          materialClassNamePrefixes.every((prefix) => !styleContent.startsWith(prefix))
        ) {
          return;
        }

        styleElement.textContent = `@layer ${cssLayerName} { ${styleContent} }`;
      }
    }),
  );
}
