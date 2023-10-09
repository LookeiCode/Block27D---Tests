/**
 * @jest-environment jsdom
 */

import React from "react";

import { render, screen, fireEvent } from "@testing-library/react";

//lets you create snapshot tests
import renderer from 'react-test-renderer'

import "@testing-library/jest-dom";

import App from "../App";

// * you can write tests with the "test" keyword or the "it" keyword
// * both are the same/interchangeable

// 1. if component renders
// 2. if the button text starts with "0"
// 3. if the button is clickable
// 4. once we click, button text should be "1"
// 5. simple snapshot test
// 6. typing into the input field

describe("<App />", () => {
 // 1
  test('renders without crashing', () => {
    render(<App />);
  });
// 2
  test('if button starts with "0"', () => {
    //render component (that has the button)
    render(<App />);

    //select the button element
    //there's a few ways to select this element
    /*
     - getByRole - if it does not have  a "role" attribute, it would take the HTML tag (const button = screen.getByRole('button'))
     - getByText - takes in a string and checks for that string, OR a regex (regular expression) (const button = screen.getByText('count is 0'))
     - getByLabelText - ???
     - getByTestId - you can assign a (data-testid="name") to a element and use the value ("name" in this case) to select the element (const button = screen.getByTestId('name')) - if there's multiple elements with the same test id, it will only test the FIRST element with this test id
     - getByAllTestId - the same as above, except that if you have more than one of the SAME ELEMENT with the SAME TEST ID, it'll run the test on all of those elements (example: if we had multiple buttons with the same test id)
     */
    const button = screen.getByTestId('testBtn');
  })
// 3
  test('if the button is clickable', () => {
    render(<App />);
    const button = screen.getByTestId('testBtn');
    fireEvent.click(button);
  })
// 4
  test('once we click, button text should be "1"', () => {
    render(<App />);
    const button = screen.getByTestId('testBtn');
    fireEvent.click(button);
    expect(button).toHaveTextContent('count is 1');
  })
// 5
  test('simple snapshot test', () => {
    const reactTree = renderer.create(<App />);
    // if running for the FIRST time, takes a snapshot of the rendered "tree" - call it the X (first/initial) snapshot
    // if it runs for a second time and onwards, it takes a snapshot called Y snapshot - it compares the X snapshot to the Y snapshot and sees if there's a change - if there's a change, the test fails - this is used for components that don't change, or change often
    expect(reactTree).toMatchSnapshot();
    // if you want to update a changed snapshot (make a new X snapshot) type npm test -- -u in the terminal
  })
// 6
  test('typing into the input field', () => {
    render(<App />);
    const input = screen.getByTestId('testInput');
    fireEvent.change(input, { target: { value: 'some input' } });
    expect(input).toHaveValue('some input');
  })
});

// if we ever want our tests to not be positive (expect "something to exist" aka expect().toHaveTextContent) we can add the .not to it. This just inverts it. example --> expect().not.toHaveTextContent
/* 
expect(button).toHaveTextContent('count is 1');
expect(button).not.toHaveTextContent('count is 0');

I guess you can say this double checked that the button updated from 0 to 1 and didn't stay at 0
*/
