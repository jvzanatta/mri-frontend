import React from "react";
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import OrdersTable, { Props } from "../components/ordersTable/OrdersTable";

describe("<OrdersTable />", () => {
  const mockOrders = [
    {
      "orderNumber": '100000',
      "customer": {
        "firstName": "John",
        "lastName": "Doe",
        "address": {
          "line1": "123 Main Street",
          "line2": "",
          "city": "Boston",
          "state": "MA",
          "zip": "02215"
        }
      },
      "orderDetails": {
        "value": 137.11,
        "date": "Mon Feb 01 2021 00:00:00 GMT+0000 (GMT)"
      },
      "shippingDetails": {
        "date": "Wed Feb 03 2021 00:00:00 GMT+0000 (GMT)"
      },
      "status": "open"
    },
    {
      "orderNumber": '100005',
      "customer": {
        "firstName": "Mary",
        "lastName": "Smith",
        "address": {
          "line1": "555 Broadway",
          "line2": "",
          "city": "New York",
          "state": "NY",
          "zip": "12345"
        }
      },
      "orderDetails": {
        "value": 157.12,
        "date": "Sun Mar 01 2021 00:00:00 GMT+0000 (GMT)"
      },
      "shippingDetails": {
        "date": "Tue Mar 03 2021 00:00:00 GMT+0000 (GMT)"
      },
      "status": "shipped"
    },
    {
      "orderNumber": '1000101',
      "customer": {
        "firstName": "Dakota",
        "lastName": "Finley",
        "address": {
          "line1": "999 South Bend Road",
          "line2": "",
          "city": "Charleston",
          "state": "MSC",
          "zip": "38672"
        }
      },
      "orderDetails": {
        "value": 98.99,
        "date": "Tue Jan 10 2021 00:00:00 GMT+0000 (GMT)"
      },
      "shippingDetails": {
        "date": "Wed Jan 13 2021 00:00:00 GMT+0000 (GMT)"
      },
      "status": "cancelled"
    }
  ];

  test("should sort the table by id", async () => {
    renderOrdersTable({ orders: mockOrders });
 
    const mapInnerHtmlToId = (item: HTMLElement) => Number(item.innerHTML.slice(2));

    let items = await screen.findAllByText(/# 1000/);
    let values = items.map(mapInnerHtmlToId); 

    // verify that id is sorted ASC
    expect(values[2]).toBeGreaterThan(values[0]);

    // sort DESC
    fireEvent.click(screen.getByText('ORDER NUMBER & DATE'));

    items = await screen.findAllByText(/# 1000/);
    values = items.map(mapInnerHtmlToId);
    
    // verify that id is sorted DESC
    expect(values[0]).toBeGreaterThan(values[2]);
  });

  test("should sort the table by address", async () => {
    const { getAllByTestId } = renderOrdersTable({ orders: mockOrders });

    fireEvent.click(screen.getByText('CUSTOMER ADDRESS'));

    // sort ASC
    let items = getAllByTestId('address-line');

    // verify if sorted ASC
    expect(items[0].innerHTML).toMatch(/^123/);
    expect(items[2].innerHTML).toMatch(/^999/);

    // sort DESC
    fireEvent.click(screen.getByText('CUSTOMER ADDRESS'));

    items = getAllByTestId('address-line');

    // verify if sorted DESC
    expect(items[0].innerHTML).toMatch(/^999/);
    expect(items[2].innerHTML).toMatch(/^123/);
  });
});

function renderOrdersTable(props: Partial<Props> = {}) {
  const defaultProps: Props = {
    orders: [],
  };

  return render(<OrdersTable {...defaultProps} {...props} />);
}
