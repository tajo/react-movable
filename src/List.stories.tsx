import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Basic from './examples/Basic';
import SuperSimple from './examples/SuperSimple';
import RemovableWithHandle from './examples/RemovableWithHandle';
import VaryingHeights from './examples/VaryingHeights';
import Virtualized from './examples/Virtualized';

storiesOf('List', module)
  .add('Basic', () => <Basic />)
  .add('Super Simple', () => <SuperSimple />)
  .add('Removable with handle', () => <RemovableWithHandle />)
  .add('No animations', () => <Basic transitionDuration={0} />)
  .add('Lock vertically', () => <Basic lockVertically />)
  .add('Varying Heights', () => <VaryingHeights />)
  .add('Virtualized', () => <Virtualized />);
