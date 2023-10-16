
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllMessages, toggleMessageDetail,allMessages } from "../Store/dataStore";
import { Container, Button } from "react-bootstrap";
import { BsArrowLeft } from "react-icons/bs";
import { useEffect } from "react";

const InboxMessagesDetail = ({ messageId }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => { 
    dispatch(fetchAllMessages());
  }, [dispatch]);


  const messageDetail = useSelector((state) =>
    state.dataStore.allMessages.find((message) => (messageId === message.id))
  );

  if (!messageDetail) return null;

  //for the back arrow click
  const handleBackClick = () => {
    dispatch(toggleMessageDetail());
    navigate("/MailBox");
  };

  return (
    <Container>
      <Button onClick={handleBackClick}>
        <BsArrowLeft />
        Back
      </Button>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
          borderBottom: "1px solid #ccc",
        }}
      >
        <div style={{ fontWeight: "bold", textAlign: "center" }}>
          {messageDetail.from}
        </div>
        <div style={{ textAlign: "center" }}>{messageDetail.subject}</div>
        <div style={{ textAlign: "right" }}>{messageDetail.date}</div>
      </div>
    </Container>
  );
};
export default InboxMessagesDetail;
