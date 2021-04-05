# Description

Yandex, a Russian tech giant, runs a series of educational programs on a regular basis. One of such programs is the _School of Interface Development,_ which is intended for frontend web developers. The challenges for the candidates tend to be fairly sophisticated, and, much like the advent of code challenges, offer a good learning opportunity.

As is Yandex's tradition, it offers three challenges. The first one is to build a web page (or pages) based on the provided design; the second one is to munge some data, and the third one is to identify and fix bugs in a broken code base. This year, the first challenge, which was to build several slides, tied in together nicely with the third one, which was to fix a player that could display those slides.

The repositories for this year's challenges are [here](https://github.com/yndx-shri). In case they get removed later, the expected design is exported both [here](https://www.figma.com/file/0HYYteSLpxex9QeAka6JGr/IDC-2021-test-work?node-id=138%3A1981) or [here](https://yndx-shri.github.io/shri-2021-task-1/), and thus may outlive the repositories. The mock-ups have also been exported as images, which can be found [here](./reference/shri-2021-task-1/screenshots).

This repository is an exercise in solving the first of the challenges using web components. To make the work with web components bearable, I am using `lit-element`, Google's library that adds some convenience methods to the HTMLElement class to make its properties observable. As this is my first attempt to go full in on web components, I have recorded my impression of them in the [notes](notes/thoughts-on-web-components.md). I have also solved the third challenge in order to be able to play the slides.
