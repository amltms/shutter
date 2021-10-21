import { render, screen } from "@testing-library/react";
import App from "./App";

it("renders logo", () => {
  render(<App />);
  const linkElement = screen.getByText(/Sweep/i);
  expect(linkElement).toBeInTheDocument();
});

it("", () => {});
