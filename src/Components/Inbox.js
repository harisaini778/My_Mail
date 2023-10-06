import React, { useState } from "react";
import { Container, Card, Button, Form } from "react-bootstrap";
import { RiSearch2Line, RiStarFill, RiStarLine } from 'react-icons/ri';

const inboxMessageArray = [
  {
    id: 1,
    from: "John Doe",
    subject: "Meeting Agenda",
    date: "2023-10-06",
  },
  {
    id: 2,
    from: "Alice Smith",
    subject: "Project Update",
    date: "2023-10-05",
  },
  {
    id: 3,
    from: "David Johnson",
    subject: "Vacation Plans",
    date: "2023-10-04",
  },
  {
    id: 4,
    from: "Sarah Lee",
    subject: "Budget Review",
    date: "2023-10-03",
  },
  {
    id: 5,
    from: "Michael Brown",
    subject: "Task Assignments",
    date: "2023-10-02",
  },
  {
    id: 6,
    from: "Emily Davis",
    subject: "Product Launch",
    date: "2023-10-01",
  },
  {
    id: 7,
    from: "Robert Clark",
    subject: "Training Session",
    date: "2023-09-30",
  },
  {
    id: 8,
    from: "Jessica Adams",
    subject: "Team Building Event",
    date: "2023-09-29",
  },
  {
    id: 9,
    from: "Daniel Harris",
    subject: "Client Meeting",
    date: "2023-09-28",
  },
  {
    id: 10,
    from: "Sophia Taylor",
    subject: "Product Demo",
    date: "2023-09-27",
  },
];

const Inbox = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedMessages, setSelectedMessages] = useState([]);
    const [starredMessages, setStarredMessages] = useState([]);
  
    const toggleMessageSelection = (messageId) => {
      const updatedSelection = selectedMessages.includes(messageId)
        ? selectedMessages.filter((id) => id !== messageId)
        : [...selectedMessages, messageId];
      setSelectedMessages(updatedSelection);
    };
  
    const toggleMessageStar = (messageId) => {
      const isStarred = starredMessages.includes(messageId);
      if (isStarred) {
        setStarredMessages(starredMessages.filter((id) => id !== messageId));
      } else {
        setStarredMessages([...starredMessages, messageId]);
      }
    };
  
    const filteredMessages = inboxMessageArray.filter((message) => {
      const searchTerm = searchQuery.toLowerCase();
      return (
        message.from.toLowerCase().includes(searchTerm) ||
        message.subject.toLowerCase().includes(searchTerm)
      );
    });
  
    return (
      <>
        <div style={{ backgroundColor: "#674ea7", boxShadow: "0 2px 9px rgba(0, 0, 0, 0.15)", padding: '0.4rem' }}>
          <Form.Group controlId="search">

            <div style={{ position: 'relative', width: '300px' }}>
              <Form.Control
                type="text"
                placeholder="Search messages"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  paddingRight: '2em',
                  width: '100%',
                }}
              />
              <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '10px' }}>
                <RiSearch2Line style={{ fontSize: '1.2em', color: '#888' }} />
              </div>
            </div>
          </Form.Group>
        </div>
  
        <Container>
          {filteredMessages.map((message) => (
            <div
              key={message.id}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px",
                borderBottom: "1px solid #ccc",
              }}
            >
              {/* Checkbox for selection */}
              <input
                type="checkbox"
                checked={selectedMessages.includes(message.id)}
                onChange={() => toggleMessageSelection(message.id)}
                style={{ marginRight: "10px" }}
              />
  
              {/* Star icon for marking as starred */}
              <div style={{ marginRight: "10px" }}>
                {starredMessages.includes(message.id) ? (
                  <RiStarFill onClick={() => toggleMessageStar(message.id)} style={{ cursor: 'pointer', color: 'gold' }} />
                ) : (
                  <RiStarLine onClick={() => toggleMessageStar(message.id)} style={{ cursor: 'pointer' }} />
                )}
              </div>
  
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: "bold" }}>{message.from}</div>
                <div>{message.subject}</div>
              </div>
              <div>{message.date}</div>
            </div>
          ))}
        </Container>
      </>
    );
  };
  
  export default Inbox;
