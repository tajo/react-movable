import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Basic from './examples/Basic';
import RemovableWithHandle from './examples/RemovableWithHandle';

storiesOf('List', module)
  .add('Basic', () => <Basic />)
  .add('Removable with handle', () => <RemovableWithHandle />);
