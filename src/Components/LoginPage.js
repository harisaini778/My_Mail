//files
import React from "react";
import { Card, Row, Col, Button, Container, Spinner } from "react-bootstrap";
//icons
import loginIcon from "../assests/login.png";
//images
import LoginBg from "../assests/LoginBg.jpg";

const LoginPage = () => {
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
                  <Card.Title style={{ textAlign: "center", color: "#4B0082", marginRight: "1rem" }}>
                    Sign Up
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
                  <form>
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
                    <div className="form-group">
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <input
                        type="password"
                        id="confirmPassword"
                        className="form-control"
                        style={{ maxWidth: "300px" }}
                        required
                      />
                    </div>
                    <div className="d-flex justify-content-center m-2">
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
                    </div>
                    <hr />
                    <div className="d-flex flex-column align-items-center">
  <Button
    style={{ backgroundColor: "#4B0082", border: "none" }}
    className="m-1"
  >
    Sign Up
  </Button>
  <div className="mt-2">
    <p>Already have an account? Login</p>
  </div>
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
