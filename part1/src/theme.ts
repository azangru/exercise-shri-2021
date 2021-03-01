import { Observable, from } from 'rxjs'; 
import {
  mergeMap,
  distinctUntilChanged,
  share,
  startWith
} from 'rxjs/operators';

import { Theme } from './types/theme';

const getRootThemedElement = () => 
  document.querySelector('[class^=theme_]') as HTMLElement;

export const setTheme = (theme: Theme) => {
  const className = `theme_${theme}`;
  const rootThemedElement = getRootThemedElement();
  rootThemedElement.classList.forEach(className => {
    if (className.startsWith('theme_')) {
      rootThemedElement.classList.remove(className);
    }
  });

  rootThemedElement.classList.add(className);
};

export const getTheme = (themedElement: HTMLElement) => {
  return [...themedElement.classList.values()]
    .find(className => className.startsWith('theme'))
    ?.split('_').pop() as Theme;
};

const fromMutationObserver = (target: Node, options: MutationObserverInit) =>
  new Observable<MutationRecord[]>(subscriber => {
    const mutationObserver = new MutationObserver((mutationsList) => {
      subscriber.next(mutationsList);
    });
    mutationObserver.observe(target, options);
    return mutationObserver.disconnect;
  });

export const theme$: Observable<string> = fromMutationObserver(getRootThemedElement(), { attributes: true, childList: false, subtree: false })
  .pipe(
    mergeMap((mutationRecords) => {
      const themes = mutationRecords
        .map(({ target }) => getTheme(target as HTMLElement));
      return from(themes);
    }),
    distinctUntilChanged(),
    startWith('dark'),
    share()
  );

