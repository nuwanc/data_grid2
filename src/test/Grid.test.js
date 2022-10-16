import {render,screen} from "@testing-library/react";
import Grid from "../Grid";

test("first test",()=> {
  render(<Grid/>);
  const name = screen.getByText(/Users/i);
  expect(name).toBeInTheDocument();
})
