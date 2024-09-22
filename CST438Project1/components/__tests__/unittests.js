import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Index from "./app/index";
import Favorite from "./app/favorite";
import Practice from "./app/practice";
import Explore from "./app/explore";

beforeEach(() => {
  mockNavigate.mockClear();
});

//Checks to see if the index page renders
test("renders the Index screen", () => {
  const { getByText } = render(<Index />);

  expect(getByText("index.html")).toBeTruthy();
});

//Checks to see if the favorite page renders
test("renders the favorite screen", () => {
  const { getByText } = render(<Favorite />);

  expect(getByText("favorite.html")).toBeTruthy();
});

//Checks to see if the practice page renders
test("renders the practice screen", () => {
  const { getByText } = render(<Practice />);

  expect(getByText("practice.html")).toBeTruthy();
});

//Checks to see if the explore page renders
test("renders the explore screen", () => {
  const { getByText } = render(<Explore />);

  expect(getByText("explore.html")).toBeTruthy();
});

test("should show prompt when new user is created", async () => {
  const { getByPlaceholderText, getByText, queryByText } = render(
    <LoginScreen />
  );

  // Simulate entering username and password
  fireEvent.changeText(getByPlaceholderText("Username"), "Bob1234");
  fireEvent.changeText(getByPlaceholderText("Password"), "Greg5678");

  // Simulate login button click
  fireEvent.press(getByText("Login"));

  // Assert that the prompt is displayed
  await waitFor(() => {
    expect(queryByText("New user created")).toBeTruthy();
  });
});


test("should not allow access to practice words page without login", async () => {
  const { getByText, queryByText } = render(<MainScreen />);

  // Click practice words button without logging in
  fireEvent.press(getByText("Practice Words"));

  // Assert that the user is shown a prompt to log in
  await waitFor(() => {
    expect(queryByText("Please log in to access this page")).toBeTruthy();
  });
});


test("should generate a new word when random word button is clicked", async () => {
  const { getByText, queryByText } = render(<MainScreen />);

  // Click the random word button
  fireEvent.press(getByText("Random Word"));

  // Assert that a new word is generated and displayed
  await waitFor(() => {
    expect(queryByText(/Word:/)).toBeTruthy(); // Assuming "Word:" is part of the displayed text
  });
});

test('Displays the Login form when the Login Button is pressed', () => {
  const { getByText, queryByPlaceholderText } = render(<HomeScreen />);

  // Find the login button and ensure it's rendered
  const loginButton = getByText('Login');
  expect(loginButton).toBeTruthy();

  // Simulate pressing the login button
  fireEvent.press(loginButton);

  // Check if the login form's username input appears
  const usernameInput = queryByPlaceholderText('Username');
  expect(usernameInput).toBeTruthy();
});

test('handles user input', () => {
  const { getByPlaceholderText, getByText } = render(<index />);
  fireEvent.press(getByText('Login'));
  const usernameInput = getByPlaceholderText('Username');
  fireEvent.changeText(usernameInput, 'testuser');

  expect(usernameInput.props.value).toBe('TestUser');
});


