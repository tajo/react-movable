# 🔀 react-movable

![Basic list](https://raw.githubusercontent.com/tajo/react-movable/master/assets/react-movable.gif?raw=true)

## Installation

```
yarn add react react-dom react-movable
```

## Usage

```jsx
import * as React from 'react';
import { List, arrayMove } from '../src/index';

class SuperSimple extends React.Component {
  state = {
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']
  };
  render() {
    return (
      <List
        values={this.state.items}
        onChange={({ oldIndex, newIndex }) =>
          this.setState(prevState => ({
            items: arrayMove(prevState.items, oldIndex, newIndex)
          }))
        }
        renderList={({ children, props }) => <ul {...props}>{children}</ul>}
        renderItem={({ value, props }) => <li {...props}>{value}</li>}
      />
    );
  }
}
```

## Features

- **Vertical drag and drop for your lists and tables**
- No wrapping divs or additional markup
- Simple single component, no providers or HoCs
- Unopinionated styling, great for **CSS in JS** too
- **Accessible**, made for keyboards and screen readers
- **Touchable**, works on mobile devices
- Full control over the dragged item, it's a portaled React component
- **Autoscrolling** when dragging (both for containers and the window)
- Scrolling with the mousewheel / trackpad when dragging
- Works with semantic table rows too
- **Smooth animations**, can be disabled
- Varying heights of items supported
- Optional lock of the horizontal axis when dragging
- Typescript and Flow type definitions
- **No dependencies, less than 4kB (gzipped)**

## Motivation

There are two main ways how you can implement drag and drop today:

- **[HTML5 drag and drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)**. However, it has some [severe limitations](https://www.quirksmode.org/blog/archives/2009/09/the_html5_drag.html).
- Mouse and touch events. It's very low level. You have the full control but it has no concept of DnD.

There are multiple great libraries in React's ecosystem already. DnD can get pretty complicated so each one of them covers different use-cases and has different goals:

[react-dnd](https://github.com/react-dnd/react-dnd) is a general purpose DnD library that makes amazing job abstracting quirky HTML5 API. It provides well thought out lower-level DnD primitives and let you build anything you want.

[react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd) is a really beautiful DnD library for lists. It comes with a great support for accesibility and it's packed with awesome features. It doesn't use HTML5 API so it doesn't impose any of its limitations.

[react-sortable-hoc](https://github.com/clauderic/react-sortable-hoc) provides a set of higher order components to make your lists dnd-able. It has many features and approaches similar to react-beautiful-dnd but it's more minimalistic and lacks some features as accesibility or unopinionated styling.

So why react-movable was created? There are two main goals:

- **Small footprint**. It's about 10 times smaller than `react-dnd` or `react-beautiful-dnd` (~3kB vs ~30kB) and half of the size of `react-sortable-hoc` (~7kB). That's especially important when you intend to use `react-movable` as a dependency in your own library. However, that also means that some features are left out - the horizontal DnD is not supported.
- **Simple but not compromised**. - Every byte counts but not if it comes down to the support for accesibility, screen readers, keyboards and touch devices. The goal is to support a limited set of use cases but without compromises.

### Features that are not supported (and never will be)

- Vertical sorting.
- DnD between multiple list.
- Combining items / multi drag support.
- Supporting older versions of React. The minimum required version is `16.3` since the new `createRef` and `createPortal` APIs are used.

If you need those, please give a try to `react-beautiful-dnd`. It's a really well-designed library with all those features and gives you a lot of power to customize! If you are bulding an application heavy on DnD interactions, it might be your best bet!

### Planned features

- Built-in virtualization / windowing.

## Contributing

```
git clone https://github.com/tajo/react-movable
cd react-movable
yarn
yarn storybook
```

## Prior work

The popular React DnD libraries were already mentioned in the motivation part. Big shotout to `react-beautiful-dnd` ❤️ ️ for supporting multiple great features and adding first-class support for accesibility! It was strongly used as an inspiration for `react-movable`!

## Author

Vojtech Miksu 2019, [miksu.cz](https://miksu.cz), [@vmiksu](https://twitter.com/vmiksu)
