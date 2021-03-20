1) Change 1 – the project wouldn't start because of incorrect types in a single file. Typescript identified this file, so was trivial to fix.
2) Change 2 - webpack started with npm start took a god-awful amount of time to rebuild assets. Turned out its mode, if not specified explicitly, is production. Changed it to development. The rebuild time went down from over a dozen of seconds to hundreds of milliseconds.
3) Fixed an obvious mistake intended as a trap for the inattentive:

```
document.querySelector<HTMLDivElement>('.next').addEventListener('click', () => dispatch(actionPrev()));
```

a button with a `next` class was calling a `previous` action
