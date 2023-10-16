import React, { useState, useEffect } from "react";
import {
  Form,
  Container,
  Row,
  Col,
  InputGroup,
  Dropdown,
  Button,
  Stack
} from "react-bootstrap";
import { MdDelete, MdDrafts, MdSend, MdArrowBack } from "react-icons/md";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Header from "./Header";
import Inbox from "./Inbox";
import bgImage from "../assests/bgMailbox.jpg";
import {
  deletedMessages, toggleDeleteIsClicked, deleteIsClicked, inboxIsClicked, toggleInboxIsClicked, sentIsClicked,
  toggleSentIsClicked,sentMessages,draftMessages,draftIsClicked,toggleDraftIsClicked} from "../Store/dataStore";
import { useSelector, useDispatch } from "react-redux";
import TrashMessages from "./TrashMessages";
import SentMessages from "./SentMessages";
import DraftMessages from "./DraftMessages";

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
  const [UserName, setUserName] = useState("");
  const [isInboxVisible, setIsInboxVisible] = useState(false);
  const [CCBCCValue, setCCBCCValue] = useState("");

  const trash = useSelector((state)=>state.dataStore.deletedMessages);
  const trashCount = trash.length;

  const trashIsClicked = useSelector((state)=>state.dataStore.deleteIsClicked);
  const dispatch = useDispatch();

  const inboxMessages  = useSelector((state)=>state.dataStore.allMessages);
  const inbox  =  inboxMessages ? Object.values(inboxMessages) : [];
  const inboxCount = inbox.length;
  const inboxIsClicked = useSelector((state) => state.dataStore.inboxIsClicked);


  const sentMessages = useSelector((state) => state.dataStore.sentMessages);
  const sent = sentMessages ? Object.values(sentMessages) : [];
  const sentCount = sent.length;
  const sentIsClicked = useSelector((state)=>state.dataStore.sentIsClicked);


  const draftMessages = useSelector((state) => state.dataStore.draftMessages);
  const draft = draftMessages ? Object.values(draftMessages) : [];
  const draftCount = draft.length;
  const draftIsClicked = useSelector((state) => state.dataStore.draftIsClicked);

      const isoDateTime = new Date().toISOString();


  const trashHandler = () => {
    console.log("delete is Clicked:", trashIsClicked );
    dispatch(toggleDeleteIsClicked());
    console.log("delete is Clicked:", trashIsClicked );
  }

  const sentBoxDisplayHandler = () => {
    dispatch(toggleSentIsClicked());
  }

  const draftBoxDisplayHandler = () => {
    dispatch(toggleDraftIsClicked());
  }
 
  useEffect(() => {
    const emailId = localStorage.getItem("email");
    const parts = emailId.split("@");
    const name = parts[0];
    setUserName(name);
    localStorage.setItem("userName", name);
  }, []);
  
  useEffect(() => {
    const parts = to.split("@");
    const recipientName = parts[0];
    localStorage.setItem("recipientName", recipientName);
  }, [to]);

  const uniqueId = Math.floor(Math.random() * 100 + 1);

  const ClearFormFieldHandler = () => {
    setTo("");
    setAttachments("");
    setCCBCCOption("");
    setCCBCCValue("");
    setMessage("");
    setSubject("");
  }

  const SendMailHandler = () => {

    const recipientName = localStorage.getItem("recipientName");

    const emailKey = `email_${recipientName}_${uniqueId}`


    const firebaseSentEmailsEndpoint = `https://connect-mails-default-rtdb.firebaseio.com/emails/${recipientName}/${emailKey}.json`;

    const emailData = {
      to,
      ccBccOption,
      CCBCCValue,
      subject,
      message,
      attachments,
      id : uniqueId,
      date : isoDateTime,
    };

    fetch(firebaseSentEmailsEndpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Email sent successfully:", data);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
    
    const userName = localStorage.getItem("userName");

    const sentKey = `sent_${userName}_${uniqueId}`;

     fetch(`https://connect-mails-default-rtdb.firebaseio.com/sent/${userName}/${sentKey}.json`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Email sent successfully:", data);
        alert(`You have successfully sent mail ${to} !`);
        ClearFormFieldHandler();
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });


    
  };

  const DeleteMailHandler = () => {
    ClearFormFieldHandler();
    console.log("Deleting email");
  };

  

  const SaveMailHandler = () => {

    const userName = localStorage.getItem("userName");

    const draftKey = `draft_${userName}_${uniqueId}`;

    const firebaseDraftsEmailsEndpoint = `https://connect-mails-default-rtdb.firebaseio.com/drafts/${userName}/${draftKey}.json`;

    const emailData = {
      to,
      ccBccOption,
      CCBCCValue,
      subject,
      message,
      attachments,
      id: uniqueId,
      date : isoDateTime,
    };

    fetch(firebaseDraftsEmailsEndpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Email saved as draft:", data);
        alert("Your message is saved in the draftbox successfully!");
        ClearFormFieldHandler();
      })
      .catch((error) => {
        console.error("Error saving email as draft:", error);
      });
  };

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    setAttachments([...attachments, ...files]);
  };

  const showInbox = () => {
    // setIsComposeClicked(false);
    // setIsInboxVisible(true);
    dispatch(toggleInboxIsClicked());
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
                  <Stack direction="horizontal" gap={5}>
                    <div
                    href="#inbox"
                    style={{
                      textDecoration: "none",
                      color: "#333",
                      padding: "5px",
                      display: "block",
                      transition: "background-color 0.3s",
                      borderLeft: "solid purple 0.2rem",
                      cursor: "pointer"
                    }}
                    onClick={showInbox}
                  >
                    Inbox
                    </div>
                    <div>
                      {inboxCount}
                    </div>
                        </Stack>
                </li>
              
                  
                <li style={{ marginBottom: "10px" }}>
                  <Stack direction="horizontal" gap={5}>
                     <div onClick={sentBoxDisplayHandler}
                    href="#sent"
                    style={{
                      textDecoration: "none",
                      color: "#333",
                      padding: "5px",
                      display: "block",
                      borderLeft: "solid purple 0.2rem",
                      transition: "background-color 0.3s",
                    }}
                  >
                    Sent
                  </div>
                  <div>{sentCount}</div>
                  </Stack>
                 
                </li>
                <li style={{ marginBottom: "10px" }}>
                  <Stack direction="horizontal" gap={5}>
                        <div onClick={draftBoxDisplayHandler}
                    href="#drafts"
                    style={{
                      textDecoration: "none",
                      color: "#333",
                      padding: "5px",
                      display: "block",
                      borderLeft: "solid purple 0.2rem",
                      transition: "background-color 0.3s",
                    }}
                  >
                    Drafts
                  </div>
                    <div>
                      {draftCount}
                    </div>
                  </Stack>
              
                </li>
                {/* <li style={{ marginBottom: "10px" }}>
                  <a
                    href="#spam"
                    style={{
                      textDecoration: "none",
                      color: "#333",
                      padding: "5px",
                      display: "block",
                      borderLeft: "solid purple 0.2rem",
                      transition: "background-color 0.3s",
                    }}
                  >
                    Spam
                  </a>
                </li> */}
                {/* <li>
                  <Stack direction="horizontal" gap="2">
                  <div
                    href="#trash"
                    style={{
                      textDecoration: "none",
                      color: "#333",
                      padding: "5px",
                      display: "block",
                      borderLeft: "solid purple 0.2rem",
                      transition: "background-color 0.3s",
                      cursor:"pointer"
                    }}
                    onClick={trashHandler}
                  >
                    Trash
                  </div>
                  <div className="me-auto">
                    {trash.length}
                  </div>
                  </Stack>
                </li> */}
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
                          type="text"
                          value = {CCBCCValue}
                          onChange= {(event)=>setCCBCCValue(event.target.value)}
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
                </>
              ) : inboxIsClicked ? (
                <Inbox /> 
              ) :
              trashIsClicked  ? (
                <TrashMessages /> 
                  ) :
                    
                    sentIsClicked ? (
                    <SentMessages/>
                  ) :
                      
                      draftIsClicked ? (
                      <DraftMessages/>
                      )
                    
                    : (
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