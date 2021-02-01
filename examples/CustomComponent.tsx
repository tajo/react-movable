import * as React from 'react';
import { List, arrayMove } from '../src/index';
import type { IItemProps } from '../src/types';

const CustomItem = React.forwardRef(
  (
    {
      children,
      ...props
    }: IItemProps & {
      children: string;
    },
    ref: React.Ref<HTMLLIElement>
  ) => (
    <li ref={ref} {...props}>
      {children}
    </li>
  )
);

const CustomComponent: React.FC = () => {
  const [items, setItems] = React.useState([
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6'
  ]);
  return (
    <List
      values={items}
      onChange={({ oldIndex, newIndex }) =>
        setItems(arrayMove(items, oldIndex, newIndex))
      }
      renderList={({ children, props }) => <ul {...props}>{children}</ul>}
      renderItem={({ value, props }) => (
        <CustomItem {...props}>{value}</CustomItem>
      )}
    />
  );
};

export default CustomComponent;
