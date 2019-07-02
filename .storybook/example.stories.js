import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Basic from '../examples/Basic';
import Table from '../examples/Table';
import TableAuto from '../examples/TableAuto';
import SuperSimple from '../examples/SuperSimple';
import Removable from '../examples/Removable';
import RemovableByMove from '../examples/RemovableByMove';
import Handle from '../examples/Handle';
import Disabled from '../examples/Disabled';
import NoAnimations from '../examples/NoAnimations';
import LockVertically from '../examples/LockVertically';
import VaryingHeights from '../examples/VaryingHeights';
import ScrollingWindow from '../examples/ScrollingWindow';
import ScrollingContainer from '../examples/ScrollingContainer';

storiesOf('List', module)
  .add('Basic', () => <Basic />)
  .add('Table fixed cell widths', () => <Table />)
  .add('Table auto cell widths', () => <TableAuto />)
  .add('Super simple', () => <SuperSimple />)
  .add('Removable', () => <Removable />)
  .add('Removable by move', () => <RemovableByMove />)
  .add('Handle', () => <Handle />)
  .add('Disabled', () => <Disabled />)
  .add('No animations', () => <NoAnimations />)
  .add('Lock vertically', () => <LockVertically />)
  .add('Varying heights', () => <VaryingHeights />)
  .add('Scrolling window', () => <ScrollingWindow />)
  .add('Scrolling container', () => <ScrollingContainer />);
