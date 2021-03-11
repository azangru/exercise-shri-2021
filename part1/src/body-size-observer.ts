import { Observable } from 'rxjs';
import { share, startWith } from 'rxjs/operators';


const createBodySizeObservable = () => {
  return new Observable<{ width: number, height: number }>(subscriber => {
    const resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        subscriber.next({
          width,
          height 
        })
      }
    });
    resizeObserver.observe(window.document.body);
  });
};

const { width: initialWidth, height: initialHeight } = window.document.body.getBoundingClientRect();

export const bodySize$ = createBodySizeObservable().pipe(
  startWith({ width: initialWidth, height: initialHeight }),
  share()
);
