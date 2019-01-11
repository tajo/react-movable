import { configure, addDecorator } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

addDecorator(
  withOptions({
    name: 'react-movable',
    url: 'https://github.com/tajo/react-movable',
    showAddonPanel: false,
    showSearchBox: false
  })
);

function loadStories() {
  const req = require.context('../src', true, /\.stories\.tsx$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
