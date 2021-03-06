import './slides/leaders';
import './slides/vote';
import './slides/activity';
import './slides/diagram';
import './slides/chart';

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

  // note: can't use lit-html here, because it currently doesn't support dynamic tags :-(
  return `<${component} data='${stringifiedData}'></${component}>`;
};
