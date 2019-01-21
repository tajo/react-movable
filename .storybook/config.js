import { configure, addDecorator } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';

addDecorator(
  withOptions({
    name: 'react-movable',
    url: 'https://github.com/tajo/react-movable',
    showAddonPanel: false,
    showSearchBox: false
  })
);

function loadStories() {
  require('./example.stories.js');
}

configure(loadStories, module);
