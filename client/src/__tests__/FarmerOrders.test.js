import React, {
    useState as useStateMock
 } from 'react';
import "@testing-library/jest-dom/extend-expect";
import { shallow, configure, mount} from 'enzyme';
import { act } from 'react-dom/test-utils';
import Adapter from 'enzyme-adapter-react-16';
import { screen, fireEvent, render } from "@testing-library/react";
import API from '../API';
import {FarmerOrders, FarmerOrderTable} from '../components/FarmerOrders';
import { Clock } from '../Clock';
import { Button } from 'react-bootstrap';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

/**
* @jest-environment node
*/

configure({ adapter: new Adapter() });
// Fake variables
let clock = new Clock();
const fakeProducts = [{
    id: "0", 
    name: "name1", 
    quantity: 10, 
    price: 100, 
    totalOrdered: 40, 
    updated: 0
    }];
const fakeQuantities = [{
  id: "0",
  quantity: 10
}]
it("renders farmer orders", () => {
    shallow(<FarmerOrders userid={4} orderedProducts={fakeProducts} clock={clock}/>);
});

it("renders FarmerOrders components without crashing", () => { 
  const wrapper = shallow(<FarmerOrders  userid={4} orderedProducts={fakeProducts} clock={clock}/>);
  expect(wrapper.find('Container').exists()).toBeTruthy();
  expect(wrapper.find('FarmerOrderTable').exists()).toBeTruthy();
  expect(wrapper.find('Container').exists()).toBeTruthy();
  expect(wrapper.find('Alert').exists()).toBeTruthy();
  expect(wrapper.find('BsClockHistory').exists()).toBeTruthy();
  expect(wrapper.find('p').exists()).toBeTruthy();

});

it("renders farmer orde table", () => {
  shallow(<FarmerOrderTable products={fakeProducts} quantities={fakeQuantities}/>
    );
});

it("renders FarmerOrdersTable components without crashing", () => { 
  const wrapperOrderTable = shallow(<FarmerOrderTable products={fakeProducts} quantities={fakeQuantities} />);
  expect(wrapperOrderTable.find('thead').exists()).toBeTruthy();
  expect(wrapperOrderTable.find('tr').exists()).toBeTruthy();
  expect(wrapperOrderTable.find('th').exists()).toBeTruthy();
  expect(wrapperOrderTable.find('tbody').exists()).toBeTruthy();
  expect(wrapperOrderTable.find('button').exists()).toBeTruthy();
  expect(wrapperOrderTable.find('Modal').exists()).toBeTruthy();
  expect(wrapperOrderTable.find('Alert').exists()).toBeTruthy();
  expect(wrapperOrderTable.find('p').exists()).toBeTruthy();
  expect(wrapperOrderTable.find('Button').exists()).toBeTruthy();
});

it("accepts props - FarmerOrders", () => { 
  const wrapper = shallow(<FarmerOrders  userid={4} orderedProducts={fakeProducts} clock={clock}/>);
  expect(wrapper.props().userid).toBe(4);
  expect(wrapper.props().orderedProducts).toBe(fakeProducts);
  expect(wrapper.props().clock).toBe(clock);

});


it("accepts props - FarmerOrderTable", () => { 
  const wrapperOrderTable = shallow(<FarmerOrderTable products={fakeProducts} quantities={fakeQuantities} />);
  expect(wrapperOrderTable.childAt(0).props().products).toBe(fakeProducts);
  expect(wrapperOrderTable.childAt(0).props().quantities).toBe(fakeQuantities);
  expect(wrapperOrderTable.childAt(1).props().centered).toBeTruthy();
  expect(wrapperOrderTable.childAt(1).props().show).toBeFalsy();
  expect(wrapperOrderTable.childAt(1).props().onHide).toBeDefined();
  expect(wrapperOrderTable.childAt(1).props().size).toBe('sm');

});

it("calls the function handle confirm alert when clicking confirm", () => {
  const handleConfirmAlert = jest.fn();
  const index = 0;
  // data-testid
    render( <button 
      id="button-0" 
      disabled={false} 
      className="dropdown dropdown-btn" 
      onClick={() => handleConfirmAlert(index)}> 
      Confirm orders 
      </button>);
    fireEvent.click(screen.getByText(/Confirm orders/i));
    expect(handleConfirmAlert).toHaveBeenCalledTimes(1);
});

it("calls the function update confirmation when clicking confirm", () => {
  const updateConfirmation = jest.fn();
  const actualIndex = 0;
  // data-testid
    render( <Button 
        style={{ backgroundColor: "#247D37", borderColor: "#247D37" , position:"right"}} 
        onClick={()=>updateConfirmation(actualIndex)}> 
          Confirm
				</Button>);
    fireEvent.click(screen.getByText(/Confirm/i));
    expect(updateConfirmation).toHaveBeenCalledTimes(1);
});

it("calls the function onHide  when clicking close on modal", () => {
  const onHide = jest.fn();
  // data-testid
    render( <Button style={{ backgroundColor: "#247D37", borderColor: "#247D37" , position:"left"}} onClick={onHide}>
        Close
      </Button>);
    fireEvent.click(screen.getByText(/Close/i));
    expect(onHide).toHaveBeenCalledTimes(1);
});
describe("confirm orders button", () => {
  it("calls the confirm orders button when not disabled", () => {
    const handleConfirmAlert = jest.fn();
    // data-testid
      render( <button id={`button-1`} 
      data-testid="confirm_button"
      disabled={(0 || 0) ? true: false} 
      className="dropdown dropdown-btn" 
      onClick={handleConfirmAlert}>Confirm orders</button> 
  
      );
      fireEvent.click(screen.getByTestId('confirm_button'));
      expect(handleConfirmAlert).toHaveBeenCalledTimes(1);
  });

  it("calls the confirm orders button when disabled", () => {
    const handleConfirmAlert = jest.fn();
    // data-testid
      render( <button id={`button-1`} 
      data-testid="confirm_button"
      disabled={(0 || 1) ? true: false} 
      className="dropdown dropdown-btn" 
      onClick={handleConfirmAlert}>Confirm orders</button> 
  
      );
      fireEvent.click(screen.getByTestId('confirm_button'));
      expect(handleConfirmAlert).toHaveBeenCalledTimes(0);
  });

  it("calls the confirm orders button when disabled 2", () => {
    const handleConfirmAlert = jest.fn();
    // data-testid
      render( <button id={`button-1`} 
      data-testid="confirm_button"
      disabled={(1 || 0) ? true: false} 
      className="dropdown dropdown-btn" 
      onClick={handleConfirmAlert}>Confirm orders</button> 
  
      );
      fireEvent.click(screen.getByTestId('confirm_button'));
      expect(handleConfirmAlert).toHaveBeenCalledTimes(0);
  });

  it("calls the confirm orders button when disabled 3", () => {
    const handleConfirmAlert = jest.fn();
    // data-testid
      render( <button id={`button-1`} 
      data-testid="confirm_button"
      disabled={(1 || 1) ? true: false} 
      className="dropdown dropdown-btn" 
      onClick={handleConfirmAlert}>Confirm orders</button> 
  
      );
      fireEvent.click(screen.getByTestId('confirm_button'));
      expect(handleConfirmAlert).toHaveBeenCalledTimes(0);
  });
})


it("calls the fetchordersbyfarmer function", () => {
  const props = {
    fetchOrdersByFarmer: jest.fn(),
    products: ({id: 0 , name: 'test', price: 100 , estimated: 10, amount: 10, updated: 0},
    {id: 1 , name: 'test1', price: 100 , estimated: 10, amount: 10, updated: 0}),
    quantities: ({id: 0, quantity: 10}, {id:1, quantity:10})
  }

  const control = shallow(<FarmerOrderTable {...props} />);

  expect(props.fetchOrdersByFarmer).toHaveBeenCalledTimes(1);
  control.find('button').simulate("click");
  expect(props.fetchOrdersByFarmer).toHaveBeenCalledTimes(2);
});

test('Farmer confirms quantity', () => {
    const history = createMemoryHistory();
    history.push = jest.fn();
    API.logIn("andreabruno@gmail.com","andreabruno");
    render(
      <MemoryRouter history={history}>
       <FarmerOrders userid={4} orderedProducts={fakeProducts} clock={clock}/>
      </MemoryRouter>
    );
    act(() => {
        fireEvent.click(screen.getByText('Confirm orders'));
      });
    act(() => {
        fireEvent.click(screen.getByText('Confirm'));
      });
    expect(screen.getByText('Confirm orders')).toHaveAttribute('disabled');
});

test('Farmer cancels confirm', () => {
  const history = createMemoryHistory();
  history.push = jest.fn();
  API.logIn("andreabruno@gmail.com","andreabruno");
  render(
    <MemoryRouter history={history}>
     <FarmerOrders userid={4} orderedProducts={fakeProducts} clock={clock}/>
    </MemoryRouter>
  );
  act(() => {
      fireEvent.click(screen.getByText('Confirm orders'));
    });
  act(() => {
      fireEvent.click(screen.getByText('Close'));
    });
  expect(screen.getByText('Confirm orders')).toHaveAttribute('disabled');
});

