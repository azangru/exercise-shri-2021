import { addToWindow } from './helpers/add-to-window';
import { renderTemplate } from './render-template';

import { Theme } from './types/theme';

const getParameters = () => {
  const url = new URL(window.location.href);
  const slideNumber = parseInt(url.searchParams.get('slide') ?? '1');
  const theme = url.searchParams.get('theme') ?? 'dark' as Theme;
  return { slideNumber, theme };
};

const fetchSlideData = async () => {
  return await fetch('/data.json').then(response => response.json());
};

const main = async () => {
  const { slideNumber, theme } = getParameters();
  const allSlidesData = await fetchSlideData();
  const slideData = allSlidesData[slideNumber];

  if (slideData) {
    const { alias, data } = slideData;
    renderTemplate(alias, data);
  }
};

main();

addToWindow('renderTemplate', renderTemplate);

// Options for the observer (which mutations to observe)
// const config = { attributes: true, childList: false, subtree: false };
// const mutationObserverCallback: MutationCallback = (mutationsList) => {
//   for (const mutation of mutationsList) {
//     if (mutation.type === 'attributes') {
//       console.log(mutation.attributeName);
//     }
//   }
// };
// const observer = new MutationObserver(mutationObserverCallback);
// observer.observe(document.body, config);


