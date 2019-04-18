import * as React from 'react';
import { List, arrayMove } from '../src/index';

interface IAppStateItems {
  items: {
    first_name: string;
    last_name: string;
    info: string;
  }[];
  widths: (string | null)[];
}

const tableStyles = {
  background: '#eaebec',
  borderSpacing: 0
};

const thStyles = {
  borderBottom: '2px solid #ddd',
  padding: '30px',
  background: '#ededed',
  color: '#666',
  textAlign: 'center',
  fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif'
} as React.CSSProperties;

const tdStyles = (width?: string): React.CSSProperties => ({
  borderBottom: '1px solid #ddd',
  color: '#666',
  fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
  padding: '24px',
  textAlign: 'center',
  width
});

class Table extends React.Component<{}, IAppStateItems> {
  state = {
    items: [
      {
        first_name: 'Oralie',
        last_name: 'Blaszkiewicz',
        info:
          'Vestibulum convallis magna at quam interdum rhoncus. Aliquam purus est, sollicitudin non lobortis vitae, pharetra vitae lorem. Cras fermentum rhoncus scelerisque. Vivamus eu vehicula ante, at bibendum purus'
      },
      {
        first_name: 'Marylin Monroe haha',
        last_name: 'Seagar',
        info: 'Mauris scelerisque ligula vel fermentum mattis'
      },
      {
        first_name: 'Cristy',
        last_name: 'Carberry',
        info:
          'Aenean cursus enim quam, et varius libero consequat quis. Nunc nisl odio, dictum pretium metus eu, euismod iaculis risus.'
      }
    ],
    widths: []
  };
  render() {
    return (
      <div
        style={{
          padding: '3em',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <List
          beforeDrag={({ elements, index }) => {
            const cells = Array.from(elements[index].children);
            const widths = cells.map(
              cell => window.getComputedStyle(cell).width
            );
            this.setState({ widths });
          }}
          values={this.state.items}
          onChange={({ oldIndex, newIndex }) =>
            this.setState((prevState: IAppStateItems) => ({
              items: arrayMove(prevState.items, oldIndex, newIndex)
            }))
          }
          renderList={({ children, props, isDragged }) => (
            <table
              style={{
                ...tableStyles,
                cursor: isDragged ? 'grabbing' : undefined
              }}
            >
              <thead>
                <tr>
                  <th style={thStyles}>First name</th>
                  <th style={thStyles}>Last name</th>
                  <th style={thStyles}>Info</th>
                </tr>
              </thead>
              <tbody {...props}>{children}</tbody>
            </table>
          )}
          renderItem={({ value, props, isDragged, isSelected }) => {
            const widths = isDragged ? this.state.widths : [];
            const row = (
              <tr
                {...props}
                style={{
                  ...props.style,
                  cursor: isDragged ? 'grabbing' : 'grab',
                  backgroundColor: isDragged || isSelected ? '#EEE' : '#fafafa'
                }}
              >
                <td style={tdStyles(widths[0])}>{value.first_name}</td>
                <td style={tdStyles(widths[1])}>{value.last_name}</td>
                <td style={tdStyles(widths[2])}>{value.info}</td>
              </tr>
            );
            return isDragged ? (
              <table style={{ ...props.style, borderSpacing: 0 }}>
                <tbody>{row}</tbody>
              </table>
            ) : (
              row
            );
          }}
        />
      </div>
    );
  }
}

export default Table;
