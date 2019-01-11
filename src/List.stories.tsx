import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Basic from './examples/Basic';
import RemovableWithHandle from './examples/RemovableWithHandle';
import VaryingHeights from './examples/VaryingHeights';

storiesOf('List', module)
  .add('Basic', () => <Basic />)
  .add('Removable with handle', () => <RemovableWithHandle />)
  .add('No animations', () => <Basic transitionDuration={0} />)
  .add('Lock vertically', () => <Basic lockVertically />)
  .add('Varying Heights', () => <VaryingHeights />);
