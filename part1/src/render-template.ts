import './slides/leaders';

const templateToComponentMap = {
  leaders: 'slide-leaders',
  vote: 'slide-vote',
  chart: 'slide-chart',
  diagram: 'slide-diagram',
  activity: 'slide-activity'
};

export const renderTemplate = (templateName: keyof typeof templateToComponentMap, data: unknown) => {
  const component = templateToComponentMap[templateName];
  const stringifiedData = JSON.stringify(data);

  document.body.innerHTML = `<${component} data='${stringifiedData}'></${component}>`;
};
