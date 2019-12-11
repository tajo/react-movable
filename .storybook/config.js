import { configure, addParameters } from '@storybook/react';

addParameters({
  options: {
    theme: {
      brandTitle: 'react-movable',
      brandUrl: 'https://github.com/tajo/react-movable'
    },
    showPanel: false
  }
});

function loadStories() {
  require('./example.stories.js');
}

configure(loadStories, module);
