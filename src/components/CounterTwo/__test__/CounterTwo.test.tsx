import { render, screen } from "@testing-library/react";
import { CounterTwo } from "../CounterTwo";
import userEvent from "@testing-library/user-event";

describe("CounterTwo", () => {
  test("Should render correctly", () => {
    render(<CounterTwo count={0} />);
    const title = screen.getByRole("heading", { name: "Counter Two" });
    expect(title).toBeInTheDocument();
  });

  test("handlers are called correctly", async () => {
    const incrementHandler = jest.fn();
    const decrementHandler = jest.fn();
    render(
      <CounterTwo
        count={0}
        handleIncrement={incrementHandler}
        handleDecrement={decrementHandler}
      />,
    );

    const incrementButton = screen.getByRole("button", { name: "Increment" });
    const decrementButton = screen.getByRole("button", { name: "Decrement" });

    await userEvent.click(incrementButton);
    await userEvent.click(decrementButton);

    expect(incrementHandler).toHaveBeenCalledTimes(1);
    expect(decrementHandler).toHaveBeenCalledTimes(1);
  });
});
