import React, { useState, useEffect } from 'react';
import { Container, ListGroup, Row, Col, Stack,Button,Badge } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'; 
//import { fetchSentMessages } from '../store/dataStore';
//import { toggleMessageDetail } from '../store/dataStore';
import { fetchSentMessages } from '../Store/dataStore';
import { toggleMessageDetail } from '../Store/dataStore';
import SentboxMessagesDetails from './SentboxMessagesDetail';
import "./SentMessages.css";
import { MdDelete } from 'react-icons/md';


const SentMessages = () => {
  const [isSmaller, setIsSmaller] = useState(window.innerWidth <= 576);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const isMessageDetailOpen = useSelector((state) => state.dataStore.isMessageDetailOpen);
  const sentMessages = useSelector((state) => state.dataStore.sentMessages); 
  const sent = sentMessages ? Object.values(sentMessages) : [];
  const dispatch = useDispatch(); 

    const handleListItemClick = (messageId) => {
    setSelectedMessageId(messageId);
    dispatch(toggleMessageDetail());
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmaller(window.innerWidth <= 576);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    //const recipientName = localStorage.getItem("recipientName");
    dispatch(fetchSentMessages(userName));
  }, [dispatch]);

  function stripHtmlTags(html) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
  }

  const deleteSentHandler = (id, event) => {
    const userName = localStorage.getItem("userName");
    //const recipientName = localStorage.getItem("recipientName");
    const sentKey = `sent_${userName}_${id}`;
    event.stopPropagation();

  const sentMessageDeleteRequest = async (id) => {
    try {
      const url = `https://connect-mails-default-rtdb.firebaseio.com/sent/${userName}/${sentKey}.json`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        // Successfully deleted
        const data = response.json();
        alert("Your message has been deleted successfully!");
        console.log("sent data deleted is :", data);
        console.log("Sent message deleted with ID:", id);
        dispatch(fetchSentMessages(userName));
      } else {
        // Handle the error case here
        console.log("Error deleting the sent message. Status:", response.status);
        console.log("Error message:", response.statusText);
      }
    } catch (error) {
      console.log("Error in deleting the sent message:", error);
    }
  };

  sentMessageDeleteRequest(id);
};


  return (
    <Container className="mt-3">
      
       {selectedMessageId && isMessageDetailOpen && (
        <SentboxMessagesDetails messageId={selectedMessageId} sent={sent} />
      )}
      {!isMessageDetailOpen && <ListGroup>
        { !!sent.length===true && sent.map((message) => (
    <ListGroup.Item
    key={message.id}
  onClick={() => handleListItemClick(message.id)}
>
  <Row className=''>
    <Col>
      <input type="checkbox" />
    </Col>
    <Col style={{ fontWeight: 'bold' }} className="truncate-text-sent">
      To: {message.to}
    </Col>
    {!isSmaller && (
      <Col>
        <Stack direction="horizontal" gap="1">
          <span>{message.ccBccOption} : </span>
          <span>{message.ccBccValue}</span>
        </Stack>
      </Col>
    )}
    <Col style={{ fontWeight: 'bold' }} className="truncate-text-sent">
      {message.subject}
    </Col>
    <Col className="truncate-text-sent">
      {stripHtmlTags(message.message)}
    </Col>
              <Col className="truncate-text-sent">
                <Badge className='bg bg-primary' onClick={(event) => deleteSentHandler(message.id, event)}>
                <MdDelete  size={18} />    
                </Badge>      
    </Col>
  </Row>
</ListGroup.Item>
        ))}
        {!!sent.length===false && <Container>You do not have any sent messages yet!</Container>}
      </ListGroup>}
    </Container>
  );
};

export default SentMessages;