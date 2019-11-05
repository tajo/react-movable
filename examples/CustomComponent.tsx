import * as React from 'react';
import { List, arrayMove } from '../src/index';
import { IItemProps } from '../src/types';

const CustomItem = React.forwardRef(({ children, ...props }: IItemProps & {
    children: string,
}, ref: React.LegacyRef<HTMLLIElement>) => (
    <li
        ref={ref}
        {...props}
    >
        {children}
    </li>
));

class CustomComponent extends React.Component<{}, { items: string[] }> {
  state = {
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']
  };
  render() {
    return (
      <List
        values={this.state.items}
        onChange={({ oldIndex, newIndex }) =>
          this.setState((prevState: { items: string[] }) => ({
            items: arrayMove(prevState.items, oldIndex, newIndex)
          }))
        }
        renderList={({ children, props }) => <ul {...props}>{children}</ul>}
        renderItem={({ value, props }) => <CustomItem {...props}>{value}</CustomItem>}
      />
    );
  }
}

export default CustomComponent;