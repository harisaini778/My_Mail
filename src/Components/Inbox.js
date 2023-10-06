import React, { useState } from "react";
import { Container, Card, Button, Form} from 'react-bootstrap';
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
  
    const toggleMessageSelection = (messageId) => {
      const updatedSelection = selectedMessages.includes(messageId)
        ? selectedMessages.filter((id) => id !== messageId)
        : [...selectedMessages, messageId];
      setSelectedMessages(updatedSelection);
    };
  
    const filteredMessages = inboxMessageArray.filter((message) => {
      const searchTerm = searchQuery.toLowerCase();
      return (
        message.from.toLowerCase().includes(searchTerm) ||
        message.subject.toLowerCase().includes(searchTerm)
      );
    });
  
    return (
      <Container>
        <Form.Group controlId="search">
          <Form.Control
            type="text"
            placeholder="Search messages"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Form.Group>
  
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
            <input
              type="checkbox"
              checked={selectedMessages.includes(message.id)}
              onChange={() => toggleMessageSelection(message.id)}
              style={{ marginRight: "10px" }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: "bold" }}>{message.from}</div>
              <div>{message.subject}</div>
            </div>
            <div>{message.date}</div>
          </div>
        ))}
  
        <div style={{ marginTop: "20px" }}>
          <Button variant="info">Mark as Read</Button>
        </div>
      </Container>
    );
  };
  
  export default Inbox;