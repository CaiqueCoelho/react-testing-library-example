import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "../Login";

jest.mock("axios", () => ({
  __esModule: true,
  default: {
    get: () => ({
      data: { id: 1, name: "John" },
    }),
  },
}));

test("username input should be rendered", () => {
  render(<Login />);
  const usernameInput = screen.getByPlaceholderText(/username/i);
  expect(usernameInput).toBeInTheDocument();
});

test("password input should be rendered", () => {
  render(<Login />);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  expect(passwordInput).toBeInTheDocument();
});

test("login button should be rendered", () => {
  render(<Login />);
  const loginButton = screen.getByRole("button");
  expect(loginButton).toBeInTheDocument();
});

test("username input should be empry", () => {
  render(<Login />);
  const usernameInput = screen.getByPlaceholderText(/username/i);
  expect(usernameInput.textContent).toBe("");
});

test("password input should be empry", () => {
  render(<Login />);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  expect(passwordInput.textContent).toBe("");
});

test("login button should be disabled if we dont have password and username", () => {
  render(<Login />);
  const loginButton = screen.getByRole("button");
  expect(loginButton).toBeDisabled();
});

test("error message should not be visible on the first render", () => {
  render(<Login />);
  const errorMessage = screen.getByTestId("error");
  expect(errorMessage).not.toBeVisible();
});

test("username input should changed", () => {
  render(<Login />);
  const usernameInput = screen.getByPlaceholderText(/username/i);
  const testValue = "test";
  fireEvent.change(usernameInput, { target: { value: testValue } });
  expect(usernameInput.value).toBe(testValue);
});

test("password input should changed", () => {
  render(<Login />);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const testValue = "test";
  fireEvent.change(passwordInput, { target: { value: testValue } });
  expect(passwordInput.value).toBe(testValue);
});

test("login button should not be disabled when we have password and username", () => {
  render(<Login />);
  const testValue = "test";
  const usernameInput = screen.getByPlaceholderText(/username/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  fireEvent.change(usernameInput, { target: { value: testValue } });
  fireEvent.change(passwordInput, { target: { value: testValue } });
  const loginButton = screen.getByRole("button");
  expect(loginButton).not.toBeDisabled();
});

test("loading should not be rendered on the first render", () => {
  render(<Login />);
  const loginButton = screen.getByRole("button");
  expect(loginButton).not.toHaveTextContent(/please wait/i);
});

test("loading should shown after click on login button", () => {
  render(<Login />);
  const loginButton = screen.getByRole("button");
  const testValue = "test";
  const usernameInput = screen.getByPlaceholderText(/username/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  fireEvent.change(usernameInput, { target: { value: testValue } });
  fireEvent.change(passwordInput, { target: { value: testValue } });
  fireEvent.click(loginButton);

  expect(loginButton).toHaveTextContent(/please wait/i);
});

test("loading should not being rendered after fetching user", async () => {
  render(<Login />);
  const loginButton = screen.getByRole("button");
  const testValue = "test";
  const usernameInput = screen.getByPlaceholderText(/username/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  fireEvent.change(usernameInput, { target: { value: testValue } });
  fireEvent.change(passwordInput, { target: { value: testValue } });
  fireEvent.click(loginButton);

  await waitFor(() =>
    expect(loginButton).not.toHaveTextContent(/please wait/i),
  );
});

test("user should be render after fetching", async () => {
  render(<Login />);
  const loginButton = screen.getByRole("button");
  const testValue = "test";
  const usernameInput = screen.getByPlaceholderText(/username/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);

  fireEvent.change(usernameInput, { target: { value: testValue } });
  fireEvent.change(passwordInput, { target: { value: testValue } });
  fireEvent.click(loginButton);

  const userItem = await screen.findByText("John");

  expect(userItem).toBeInTheDocument();
});
