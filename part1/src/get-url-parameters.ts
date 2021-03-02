import { Theme } from './types/theme';

export const getUrlParameters = () => {
  const url = new URL(window.location.href);
  const slideNumber = parseInt(url.searchParams.get('slide') ?? '1') - 1;
  const theme = (url.searchParams.get('theme') ?? 'dark') as Theme;
  return { slideNumber, theme };
};
