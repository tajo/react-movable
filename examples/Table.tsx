import * as React from "react";
import { List, arrayMove } from "../src/index";

const tableStyles = {
  background: "#eaebec",
  borderSpacing: 0,
};

const thStyles = {
  borderBottom: "2px solid #ddd",
  padding: "30px",
  background: "#ededed",
  color: "#666",
  textAlign: "center",
  fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
} as React.CSSProperties;

const tdStyles = {
  borderBottom: "1px solid #ddd",
  color: "#666",
  fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
  padding: "24px",
  textAlign: "center",
  width: "150px",
} as React.CSSProperties;

const Table: React.FC = () => {
  const [items, setItems] = React.useState([
    {
      first_name: "Oralie",
      last_name: "Blaszkiewicz",
      car_make: "Volkswagen",
      car_model: "Eurovan",
    },
    {
      first_name: "Marylin",
      last_name: "Seagar",
      car_make: "BMW",
      car_model: "X3",
    },
    {
      first_name: "Cristy",
      last_name: "Carberry",
      car_make: "Chevrolet",
      car_model: "Camaro",
    },
    {
      first_name: "Oliviero",
      last_name: "Methven",
      car_make: "Chevrolet",
      car_model: "Impala",
    },
    {
      first_name: "Eduardo",
      last_name: "Rowan",
      car_make: "Mercedes-Benz",
      car_model: "M-Class",
    },
    {
      first_name: "Georgianne",
      last_name: "Rainville",
      car_make: "Mitsubishi",
      car_model: "Mirage",
    },
    {
      first_name: "Cristi",
      last_name: "Kollach",
      car_make: "Cadillac",
      car_model: "Seville",
    },
  ]);

  return (
    <div
      style={{
        padding: "3em",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <List
        values={items}
        onChange={({ oldIndex, newIndex }) =>
          setItems(arrayMove(items, oldIndex, newIndex))
        }
        renderList={({ children, props, isDragged }) => (
          <table
            style={{
              ...tableStyles,
              cursor: isDragged ? "grabbing" : undefined,
            }}
          >
            <thead>
              <tr>
                <th style={thStyles}>First name</th>
                <th style={thStyles}>Last name</th>
                <th style={thStyles}>Car maker</th>
                <th style={thStyles}>Car model</th>
              </tr>
            </thead>
            <tbody {...props}>{children}</tbody>
          </table>
        )}
        renderItem={({ value, props, isDragged, isSelected }) => {
          const row = (
            <tr
              {...props}
              key={props.key}
              style={{
                ...props.style,
                cursor: isDragged ? "grabbing" : "grab",
                backgroundColor: isDragged || isSelected ? "#EEE" : "#fafafa",
              }}
            >
              <td style={tdStyles}>{value.first_name}</td>
              <td style={tdStyles}>{value.last_name}</td>
              <td style={tdStyles}>{value.car_make}</td>
              <td style={tdStyles}>{value.car_model}</td>
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
};

export default Table;
