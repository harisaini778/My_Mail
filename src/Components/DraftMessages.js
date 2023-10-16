import React, { useState, useEffect } from 'react';
import { Container, ListGroup, Row, Col, Stack,Badge } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'; 
//import { fetchDraftMessages } from '../store/dataStore'; 
//import { toggleMessageDetail } from '../store/dataStore';
import { fetchDraftMessages } from '../Store/dataStore';
import { toggleMessageDetail } from '../Store/dataStore';
import DraftboxMessages from './DraftBoxMessagesDetails';
import { MdDelete } from 'react-icons/md';
import "./SentMessages.css";

const DraftMessages = () => {
  const [isSmaller, setIsSmaller] = useState(window.innerWidth <= 576);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const isMessageDetailOpen = useSelector((state) => state.dataStore.isMessageDetailOpen);
  const draftMessages = useSelector((state) => state.dataStore.draftMessages); 
  const draft = draftMessages ? Object.values(draftMessages) : [];
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
    dispatch(fetchDraftMessages(userName));
  }, [dispatch]);

  function stripHtmlTags(html) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
  }

    const deleteDraftHandler = (id, event) => {
    const userName = localStorage.getItem("userName");
    const emailKey = `draft_${userName}_${id}`;
     event.stopPropagation();

  const draftMessageDeleteRequest = async (id) => {
    try {
      const url = `https://mailbox-client-29c1e-default-rtdb.firebaseio.com/drafts/${userName}/${emailKey}.json`;
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
        dispatch(fetchDraftMessages(userName));
      } else {
        // Handle the error case here
        console.log("Error deleting the sent message. Status:", response.status);
        console.log("Error message:", response.statusText);
      }
    } catch (error) {
      console.log("Error in deleting the sent message:", error);
    }
  };

  draftMessageDeleteRequest(id);
};


  return (
    <Container className="mt-3">
      
       {selectedMessageId && isMessageDetailOpen && (
        <DraftboxMessages messageId={selectedMessageId} draft={draft} />
      )}
      {!isMessageDetailOpen && <ListGroup>
        { draftMessages ? draft.map((message) => (
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
              <Col>
                <Badge onClick={(event)=>deleteDraftHandler(message.id,event)}>
                  <MdDelete size={18} />
              </Badge>
              </Col>
  </Row>
</ListGroup.Item>
        )) : <Container>You do not have any draft messages yet!</Container>}
      </ListGroup>}
    </Container>
  );
};

export default DraftMessages;