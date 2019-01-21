import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Basic from '../examples/Basic';
import Table from '../examples/Table';
import SuperSimple from '../examples/SuperSimple';
import Removable from '../examples/Removable';
import Handle from '../examples/Handle';
import NoAnimations from '../examples/NoAnimations';
import LockVertically from '../examples/LockVertically';
import VaryingHeights from '../examples/VaryingHeights';
import ScrollingWindow from '../examples/ScrollingWindow';
import ScrollingContainer from '../examples/ScrollingContainer';

storiesOf('List', module)
  .add('Basic', () => <Basic />)
  .add('Table', () => <Table />)
  .add('Super simple', () => <SuperSimple />)
  .add('Removable', () => <Removable />)
  .add('Handle', () => <Handle />)
  .add('No animations', () => <NoAnimations />)
  .add('Lock vertically', () => <Basic lockVertically />)
  .add('Varying heights', () => <VaryingHeights />)
  .add('Scrolling window', () => <ScrollingWindow />)
  .add('Scrolling container', () => <ScrollingContainer />);
