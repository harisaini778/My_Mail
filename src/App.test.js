// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
// Import necessary libraries and the component
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from './Components/LoginPage';

describe('LoginPage Component', () => {
  // ... Other test cases

  // Update the query to be more specific
  test('displays error message for weak password during sign up', async () => {
    const { getByText, getByLabelText } = render(<LoginPage />);
    fireEvent.click(getByText('Sign Up'));
    fireEvent.change(getByLabelText('Password'), { target: { value: 'weak' } });

    // Change the query to be more specific
    fireEvent.submit(getByLabelText('Sign Up'));

    await waitFor(() => expect(getByText('Error: The password must be 6 characters long or more.')).toBeInTheDocument());
  });

  // Update the query to be more specific
  test('displays error message for existing email during sign up', async () => {
    const { getByText, getByLabelText } = render(<LoginPage />);
    fireEvent.click(getByText('Sign Up'));
    fireEvent.change(getByLabelText('Email'), { target: { value: 'existing@example.com' } });

    // Change the query to be more specific
    fireEvent.submit(getByLabelText('Sign Up'));

    await waitFor(() => expect(getByText('Error: The email address is already in use by another account.')).toBeInTheDocument());
  });

  // Update the query to be more specific
  test('displays success message upon successful sign up', async () => {
    const { getByText, getByLabelText } = render(<LoginPage />);
    fireEvent.click(getByText('Sign Up'));
    fireEvent.change(getByLabelText('Email'), { target: { value: 'newuser@example.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'strongpassword' } });
    fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'strongpassword' } });

    // Change the query to be more specific
    fireEvent.submit(getByLabelText('Sign Up'));

    await waitFor(() => expect(getByText('Signed up successfully!')).toBeInTheDocument());
  });
});