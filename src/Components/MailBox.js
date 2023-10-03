// //files
// import React from "react";
// import Header from "./Header";

// //bootstrap
// // import { Container } from "react-bootstrap";

// const MailBox = () => {
//     return (
//         <div>
//             <Header/>
//             {/* <div style={{backgroundColor: 'blue', marginLeft: '10%'}}> */}
//                 <h1>Hi</h1>
//             {/* </div> */}
//         </div>
//     )
// }
// export default MailBox;
// src/components/Mailbox.js
import React, { useState } from 'react';
import { Form, Container, Row, Col, InputGroup, Dropdown,Button } from 'react-bootstrap';
import { MdDelete, MdDrafts, MdSend, MdArrowBack } from 'react-icons/md';
import ReactQuill from 'react-quill';
import Header from './Header';
import 'react-quill/dist/quill.snow.css';

// Define custom modules for the Quill toolbar
const modules = {
  toolbar: [
    [{ 'font': [] }],
    [{ 'header': '1' }, { 'header': '2' }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['link', 'image'],
    [{ 'align': [] }],
    ['clean'],
  ],
};

// Define custom formats for the Quill editor
const formats = [
  'font',
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet',
  'link', 'image',
  'align',
];

function MailBox() {
  const [to, setTo] = useState('');
  const [ccBccOption, setCCBCCOption] = useState('cc'); // Default to CC
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const SendMailHandler = () => {
    console.log('Sending email with message:', message);
  };

  const DeleteMailHandler = () => {
    console.log('Deleting email');
  };

  const SaveMailHandler = () => {
    console.log('Saving email as draft');
  };

  return (
    <>
    <Header/>
    <Container className="mt-3">
      <Row className="mb-2">
        <Col>
          <Button variant="light" className="d-flex align-items-center">
            <MdArrowBack /> Back to Inbox
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
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
                <Dropdown onSelect={(eventKey) => setCCBCCOption(eventKey)}>
                  <Dropdown.Toggle variant="light">
                    {ccBccOption === 'cc' ? 'CC' : 'BCC'} 
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="cc">CC</Dropdown.Item>
                    <Dropdown.Item eventKey="bcc">BCC</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Form.Control
                  type="email"
                  placeholder={`${ccBccOption === 'cc' ? 'CC' : 'BCC'} email`}
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
        </Col>
      </Row>
      <Row>
        <Col>
          <ReactQuill
            theme="snow"
            value={message}
            onChange={setMessage}
            modules={modules}
            formats={formats}
          />
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-between">
          <InputGroup>
            <Button variant="light" onClick={DeleteMailHandler}>
              <MdDelete /> Delete
            </Button>
            <Button variant="light" onClick={SaveMailHandler}>
              <MdDrafts /> Save as Draft
            </Button>
            <Button variant="primary" onClick={SendMailHandler}>
              <MdSend /> Send
            </Button>
          </InputGroup>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default MailBox;


