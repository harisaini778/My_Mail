import React, { useState } from "react";
import {
  Form,
  Container,
  Row,
  Col,
  InputGroup,
  Dropdown,
  Button,
} from "react-bootstrap";
import { MdDelete, MdDrafts, MdSend, MdArrowBack } from "react-icons/md";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Header from "./Header";
import bgImage from "../assests/bgMailbox.jpg";

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: "1" }, { header: "2" }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    [{ align: [] }],
    ["clean"],
  ],
};

const formats = [
  "font",
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "link",
  "image",
  "align",
];

const MailBox = () => {
  const [to, setTo] = useState("");
  const [ccBccOption, setCCBCCOption] = useState("cc");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [isComposeClicked, setIsComposeClicked] = useState(false);

  const SendMailHandler = () => {
    console.log("Sending email with message:", message);
  };

  const DeleteMailHandler = () => {
    console.log("Deleting email");
  };

  const SaveMailHandler = () => {
    console.log("Saving email as draft");
  };

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    setAttachments([...attachments, ...files]);
  };

  return (
    <>
      <Header />
      <div
        style={{
          padding: "0.5rem",
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "100vh",
        }}
      >
        <Row>
          <Col md={2} className="pr-0">
            <div
              style={{
                backgroundColor: "rgba(217, 210, 233, 0.7)",
                minHeight: "calc(100vh - 220px)",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              <Button
                block
                variant="primary"
                className="mb-3"
                onClick={() => setIsComposeClicked(!isComposeClicked)}
              >
                Compose
              </Button>
              <ul
                style={{
                  listStyleType: "none",
                  padding: "0",
                  margin: "0",
                  textAlign: "left",
                }}
              >
                <li style={{ marginBottom: "10px" }}>
                  <a
                    href="#inbox"
                    style={{
                      textDecoration: "none",
                      color: "#333",
                      padding: "5px",
                      display: "block",
                      borderRadius: "5px",
                      transition: "background-color 0.3s",
                    }}
                  >
                    Inbox
                  </a>
                </li>
                <li style={{ marginBottom: "10px" }}>
                  <a
                    href="#sent"
                    style={{
                      textDecoration: "none",
                      color: "#333",
                      padding: "5px",
                      display: "block",
                      borderRadius: "5px",
                      transition: "background-color 0.3s",
                    }}
                  >
                    Sent
                  </a>
                </li>
                <li style={{ marginBottom: "10px" }}>
                  <a
                    href="#drafts"
                    style={{
                      textDecoration: "none",
                      color: "#333",
                      padding: "5px",
                      display: "block",
                      borderRadius: "5px",
                      transition: "background-color 0.3s",
                    }}
                  >
                    Drafts
                  </a>
                </li>
                <li style={{ marginBottom: "10px" }}>
                  <a
                    href="#spam"
                    style={{
                      textDecoration: "none",
                      color: "#333",
                      padding: "5px",
                      display: "block",
                      borderRadius: "5px",
                      transition: "background-color 0.3s",
                    }}
                  >
                    Spam
                  </a>
                </li>
                <li>
                  <a
                    href="#trash"
                    style={{
                      textDecoration: "none",
                      color: "#333",
                      padding: "5px",
                      display: "block",
                      borderRadius: "5px",
                      transition: "background-color 0.3s",
                    }}
                  >
                    Trash
                  </a>
                </li>
              </ul>
            </div>
          </Col>

          <Col md={10}>
            <Container
              className="mt-2"
              style={{
                border: "solid 0.1rem #eeeeee",
                borderRadius: "10px",
                padding: "0.5rem",
                backgroundColor: "rgb(243, 246, 244, 0.7)",
              }}
            >
              {isComposeClicked ? (
                <>
                  <Row className="mb-2">
                    <Col>
                      <Button
                        variant="light"
                        className="d-flex align-items-center"
                        onClick={() => setIsComposeClicked(false)}
                      >
                        <MdArrowBack /> Back to Inbox
                      </Button>
                    </Col>
                  </Row>
                  <Form>
                    <Form.Group controlId="to">
                      <Form.Label>To</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Recipient email"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="ccBcc">
                      <Form.Label>CC/BCC</Form.Label>
                      <InputGroup>
                        <Dropdown
                          onSelect={(eventKey) => setCCBCCOption(eventKey)}
                        >
                          <Dropdown.Toggle variant="light">
                            {ccBccOption === "cc" ? "CC" : "BCC"}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item eventKey="cc">CC</Dropdown.Item>
                            <Dropdown.Item eventKey="bcc">BCC</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                        <Form.Control
                          type="email"
                          placeholder={`${
                            ccBccOption === "cc" ? "CC" : "BCC"
                          } email`}
                        />
                      </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="subject">
                      <Form.Label>Subject</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Email subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                      />
                    </Form.Group>
                  </Form>
                  <ReactQuill
                    theme="snow"
                    value={message}
                    onChange={setMessage}
                    modules={modules}
                    formats={formats}
                    style={{ backgroundColor: "smokewhite" }}
                  />
                  <Form.Group controlId="attachments">
                    <Form.Label>Attachments</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="file"
                        multiple
                        onChange={handleFileInputChange}
                      />
                    </InputGroup>
                  </Form.Group>
                  {attachments.length > 0 && (
                    <p>
                      {attachments.map((attachment, index) => (
                        <p key={index}>{attachment.name}</p>
                      ))}
                    </p>
                  )}
                  <Row>
                    <Col className="d-flex justify-content-between">
                      <InputGroup>
                        <Button
                          variant="light"
                          onClick={DeleteMailHandler}
                        >
                          <MdDelete /> Delete
                        </Button>
                        <Button
                          variant="light"
                          onClick={SaveMailHandler}
                        >
                          <MdDrafts /> Save as Draft
                        </Button>
                        <Button
                          variant="primary"
                          onClick={SendMailHandler}
                        >
                          <MdSend /> Send
                        </Button>
                      </InputGroup>
                    </Col>
                  </Row>
                </>
              ) : (
                <div
                  style={{
                    backgroundColor: "smokewhite",
                    borderRadius: "10px",
                    padding: "20px",
                  }}
                >
                  <h3>Welcome to Connect! Mailbox</h3>
                </div>
              )}
            </Container>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default MailBox;
