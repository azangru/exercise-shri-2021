import { addToWindow } from './helpers/add-to-window';
import { renderTemplate } from './render-template';
import { setTheme } from './theme';
import { getUrlParameters } from './get-url-parameters';

import './styles.css';

const fetchSlideData = async () => {
  return await fetch('/data.json').then(response => response.json());
};

const main = async () => {
  const { slideNumber, theme } = getUrlParameters();
  const allSlidesData = await fetchSlideData();
  const slideData = allSlidesData[slideNumber];

  setTheme(theme);

  if (slideData) {
    const { alias, data } = slideData;
    document.body.innerHTML = renderTemplate(alias, data);
  }
};

// @ts-ignore Injected be webpack define plugin
if (!IS_PRODUCTION) {
  main();
}

addToWindow('renderTemplate', renderTemplate);
