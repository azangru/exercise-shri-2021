1) Change 1 – the project wouldn't start because of incorrect types in a single file. Typescript identified this file, so was trivial to fix.
2) Change 2 - webpack started with npm start took a god-awful amount of time to rebuild assets. Turned out its mode, if not specified explicitly, is production. Changed it to development. The rebuild time went down from over a dozen of seconds to hundreds of milliseconds.
3) Fixed an obvious mistake intended as a trap for the inattentive:

```
document.querySelector<HTMLDivElement>('.next').addEventListener('click', () => dispatch(actionPrev()));
```

a button with a `next` class was calling a `previous` action

4) A similarly obvious CSS mistake: the height of an element that shows the time remaining for displaying a slide (apparently, slides are intended to change after a certain interval) was specified without the units:

```
.slide-progress-value {
    height: 4;
}
```

Fixed that; plus set an initial `transform: scaleX` value to enable the effect of gradually filling in the progress indicator.

5) The progress indicator stopped before it reached the last slide. The reason was that the stream responsible for advancing the slides based on the had a `take` operator that stopped the stream after an arbitrary number of slides:

```
     const changeSlideEffect$ = timerEffect$.pipe(
        withLatestFrom(state$),
        mergeMap(([a, s]) => s.progress >= DELAY ? of(actionNext()) : EMPTY),
        take(5)
     );
```

removed the take operator from the stream.

6) Ok, at this point things have gotten weird. Apparently the player's code generates a number of iframes, one per slide, which get updated when the player advances a slide or switches to the previous slide. I am not yet sure whether it's brilliant or stupid. On the one hand, creating all those iframes sure is wasteful. On the other hand, having them all ready helps with slide transitions.

In any case, dispatching the actions to switch the slides wasn't doing anything because of a sabotage. The observable that was responsible for listening to the changes in which slide to show ended with a `mergeMapTo(EMPTY)`, which immediately completed the stream and rendered it useless:

```
export const createCurrentIndexSelector = (state$: Observable<State>) => state$.pipe(
    map(s => s.index),
    distinctUntilChanged(),
    mergeMapTo(EMPTY),
);
```

There was no reason for this `mergeMapTo` operator to be there; so it was clearly just a crude attempt to mess with the developers who would be debugging this code.

7) According to the spec, the default theme should be dark. It is set to "light" in the default state:

```
const DEFAULT_STATE: State = {
    theme: 'light',
    index: 0,
    progress: 0,
    pause: false,
    stories: [],
};
```

Easy enough to update.

8) When the initial theme got updated, it became obvious that:

- theme classes on the target element were added, not toggled
- the iframe did not receive the proper theme during initialization

When getting the initial value from the state, it turned out that the type of the value returned from the `createState` function was also incorrect. The type was set manually as `Observable` whereas the function was in fact returning a `BehaviorSubject`. There was no reason to specify this type manually at all — typescript is smart enough to infer it correctly all by itself.
