//files
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//bootstrap files
import { Card, Row, Col, Button, Container, Spinner } from "react-bootstrap";

//icons
import loginIcon from "../assests/login.png";
import errorIcon from "../assests/error.png";
import successIcon from "../assests/success.png";

//images
import LoginBg from "../assests/LoginBg.jpg";

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false); //Making the login page as the default
  const [spinner, setSpinner] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const toggleView = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    setMessage(""); // Clearing the message when switching between login and sign up
  };

  useEffect(() => {
    // Check if the login was successful and token exists in localStorage
    if (message && !isSignUp) {
      const token = localStorage.getItem("token");

      if (token) {
        // Navigate to MailBox after 3 seconds if token exists
        const timer = setTimeout(() => {
          navigate("/MailBox");
        }, 1000); // 3000 milliseconds = 3 seconds

        // Clear the timer if the component is unmounted or the message changes
        return () => clearTimeout(timer);
      }
    }
  }, [message, isSignUp, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSpinner(true);
    setMessage(""); // Clear previous message

    const signUpUrl =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA8pO5Mdfp_vbYWQIoo5DnPAhC7EdB0OgQ";
    const loginUrl =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA8pO5Mdfp_vbYWQIoo5DnPAhC7EdB0OgQ";

    const authUrl = isSignUp ? signUpUrl : loginUrl;

    fetch(authUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
        returnSecureToken: true,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSpinner(false);
        if (data.error) {
          setMessage(`Error: ${data.error.message}`);
        } else {
          setMessage(
            isSignUp ? "Signed up successfully!" : "Logged in successfully!"
          );
          //displaying the user data on console
          console.log("User Data:", data);

          //for storing token in localStorage
          const token = data.idToken;
          console.log("Show token: ", token);
          localStorage.setItem("token", data.idToken);
          
          //for storing email in localStorage
          const email = data.email;
          console.log("Show email: ", email);
          localStorage.setItem("email", data.email);
        }
      })
      .catch((error) => {
        console.error("Authentication error:", error);
        setSpinner(false);
        setMessage(`Error: ${error}`);
      });
    e.target.email.value = "";
    e.target.password.value = "";
    if (isSignUp) {
      e.target.confirmPassword.value = "";
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", backgroundColor: "#f0f0f0" }}
    >
      <div
        style={{
          width: "50rem",
          boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.1)",
          backgroundColor: "white",
        }}
      >
        <Card.Body>
          <Row>
            <Col xs={6}>
              <img
                src={LoginBg}
                alt="login-bg"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Col>
            <Col xs={5}>
              <Container style={{ margin: "1rem" }}>
                <div className="d-flex justify-content-center align-items-center">
                  <Card.Title
                    style={{
                      textAlign: "center",
                      color: "#4B0082",
                      marginRight: "1rem",
                    }}
                  >
                    {isSignUp ? "Sign Up" : "Login"}
                  </Card.Title>
                  <img
                    src={loginIcon}
                    alt="login-icon"
                    style={{
                      width: "50px",
                      height: "50px",
                      marginBottom: "10px",
                    }}
                  />
                </div>
                <div className="d-flex flex-column align-items-center">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="text"
                        id="email"
                        className="form-control"
                        style={{ maxWidth: "300px" }}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        style={{ maxWidth: "300px" }}
                        required
                      />
                    </div>
                    {isSignUp && (
                      <div className="form-group">
                        <label htmlFor="confirmPassword">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          className="form-control"
                          style={{ maxWidth: "300px" }}
                          required
                        />
                      </div>
                    )}
                    <div className="d-flex justify-content-center m-2">
                      {spinner && (
                        <>
                          <Spinner
                            animation="grow"
                            variant="primary"
                            className="mr-2"
                          />
                          <Spinner
                            animation="grow"
                            variant="secondary"
                            className="mr-2"
                          />
                          <Spinner
                            animation="grow"
                            variant="success"
                            className="mr-2"
                          />
                          <Spinner
                            animation="grow"
                            variant="danger"
                            className="mr-2"
                          />
                          <Spinner animation="grow" variant="warning" />
                        </>
                      )}
                    </div>

                    <div className="d-flex flex-column align-items-center">
                      {message && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: message.includes("successfully")
                              ? "lightgreen"
                              : "lightcoral",
                            padding: "0.25rem",
                            paddingLeft: "1rem",
                            paddingRight: "1rem",
                            border: "0.1rem solid green",
                            boxShadow: "0 2px 5px"
                          }}
                        >
                          {message.includes("successfully") ? (
                            <img
                              src={successIcon}
                              alt="Success"
                              style={{
                                marginRight: "10px",
                                width: "20px",
                                height: "20px",
                              }}
                            />
                          ) : (
                            <img
                              src={errorIcon}
                              alt="Failure"
                              style={{
                                marginRight: "10px",
                                width: "20px",
                                height: "20px",
                              }}
                            />
                          )}
                          <span>{message}</span>
                        </div>
                      )}
                      <Button
  type="submit"
  className="m-1"
  style={{ backgroundColor: "#4B0082", border: "none", width: "100%" }}
>
  {isSignUp ? "Sign Up" : "Login"}
</Button>


                      {isSignUp ? null : (
                        <span style={{ color: "blue", marginTop: "0.25rem" }}>
                          Forgot Password?
                        </span>
                      )}
                    </div>
                    <hr />
                    <div className="d-flex flex-column align-items-center">
                      <span>
                        {isSignUp
                          ? "Already have an account? "
                          : "Don't have an account? "}
                        <Button
                          variant="link"
                          onClick={toggleView}
                          style={{ padding: 0 }}
                        >
                          {isSignUp ? "Login" : "Sign Up"}
                        </Button>
                      </span>
                    </div>
                  </form>
                </div>
              </Container>
            </Col>
          </Row>
        </Card.Body>
      </div>
    </div>
  );
};

export default LoginPage;
