export const addToWindow = (key: string, value: unknown) => {
  Object.assign(window, { [key]: value} );
};
