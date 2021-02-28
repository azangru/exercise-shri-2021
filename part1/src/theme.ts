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

export const getTheme = () => {
  const rootThemedElement = getRootThemedElement();
  return [...rootThemedElement.classList.values()]
    .find(className => className.startsWith('theme'))
    ?.split('_').pop() as Theme;
};
