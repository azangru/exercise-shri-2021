import { fromEvent } from 'rxjs';
import { map, startWith, share } from 'rxjs/operators';


const mediaOrientationQuery = window.matchMedia('(orientation: portrait)');
const mqListToOrientation = (mqlist: MediaQueryList | MediaQueryListEvent) => mqlist.matches ? 'portrait' : 'landscape';

export const orientation$ = fromEvent<MediaQueryListEvent>(mediaOrientationQuery, 'change')
  .pipe(
    map(mqListToOrientation),
    startWith(mqListToOrientation(mediaOrientationQuery)),
    share()
  );
