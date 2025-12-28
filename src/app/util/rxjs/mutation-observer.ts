import { Observable } from 'rxjs';

export function mutationObserver(target: Node, options?: MutationObserverInit) {
  return new Observable<MutationRecord[]>((s) => {
    const observer = new MutationObserver((records) => s.next(records));
    observer.observe(target, options);
    return () => observer.disconnect();
  });
}
