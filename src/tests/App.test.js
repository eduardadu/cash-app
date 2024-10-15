import { render, screen } from "@testing-library/react";
import CashApp from "./CashApp";

test("renders learn react link", () => {
  render(<CashApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
