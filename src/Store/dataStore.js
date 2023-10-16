//dataStore.js

import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
  users : ["harisaini607","khushisaini1729"],
  id : "",
  toSent : "",
  userName : "",
  searchQuery: "",
  selectAll : false,
  isRead :  false,
  sentMessages: [],
  draftMessages: [],
  allMessages: [], // You can populate this with the initial data
  starredMessages: [],
  deletedMessages: [],
  spamMessages: [],
  archiveMessages: [],
  inboxMessages: [],
  isMessageDetailOpen: false,
  unreadMessages: [],
    inboxIsClicked: true,
    starIsClicked: false,
  archieveIsClicked : false,
    spamIsClicked: false,
    deleteIsClicked: false,
    sentIsClicked : false,
    draftIsClicked : false,
};

export const fetchAllMessages = createAsyncThunk(
  'dataStore/fetchAllMessages',
  async (_, thunkAPI) => {
    const currentUserName = localStorage.getItem('userName'); // Get the current user's name

    //const senderName = initialState.users.find(user => user !== currentUserName);
    //localStorage.setItem("prevUser", senderName);

    try {
      const response = await fetch(
        `https://connect-mails-default-rtdb.firebaseio.com/emails/${currentUserName}.json`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const data = await response.json();
      const messagesArray = data ? Object.values(data) : [];

      return messagesArray;
    } catch (error) {
      throw error;
    }
  }
);


// Set up a function to periodically fetch data
export const startFetchingAllMessages = (dispatch) => {
  const fetchInterval = 2000; // 2 seconds (in milliseconds)

  // Define a function to fetch data and dispatch the action
  const fetchDataAndDispatch = () => {
    dispatch(fetchAllMessages());
  };

  // Fetch data immediately (when this function is called) and then at regular intervals
  fetchDataAndDispatch();
  setInterval(fetchDataAndDispatch, fetchInterval);
};




export const fetchSentMessages = createAsyncThunk(
  "dataStore/fetchSentMessages",
  async (userName, thunkAPI) => {
    try {
      const response = await fetch(
        `https://connect-mails-default-rtdb.firebaseio.com/sent/${userName}.json`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch sent messages");
      }
      const data = await response.json();
        return data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchDraftMessages = createAsyncThunk(
  "dataStore/fetchDraftMessages",
  async (userName, thunkAPI) => {
    try {
      const response = await fetch(
        `https://connect-mails-default-rtdb.firebaseio.com/drafts/${userName}.json`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch draft messages");
      }
        const data = await response.json();
        return data;
    } catch (error) {
      throw error;
    }
  }
);



const dataStore = createSlice({
  name: "dataStore",
  initialState,
  reducers: {
    setSelectAll: (state) => {
      state.selectAll = !state.selectAll;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSentMessages: (state, action) => {
      state.dataStore.sentMessages = action.payload;
    },
    setDraftMessages: (state, action) => {
      state.draftMessages = action.payload;
    },
    toggleStarred: (state, action) => {
      const messageId = action.payload;
      const messageIndex = state.allMessages.findIndex(
        (message) => message.id === messageId
      );
      if (messageIndex !== -1) {
        state.allMessages[messageIndex].starred = !state.allMessages[
          messageIndex
        ].starred;

        if (state.starredMessages.includes(messageId)) {
          state.starredMessages = state.starredMessages.filter(
            (msgId) => msgId !== messageId
          );
        } else {
          state.starredMessages.push(messageId);
        }
      }
    },
    deleteMessage: (state, action) => {
      const messageId = action.payload;
      const messageIndex = state.allMessages.findIndex(
        (message) => message.id === messageId
      );
      if (messageIndex !== -1) {
        const deletedMessage = state.allMessages[messageIndex];
        state.allMessages.splice(messageIndex, 1);
        state.deletedMessages.push(deletedMessage);
        state.starredMessages = state.starredMessages.filter(
          (msgId) => msgId !== messageId
        );
      }
    },
    markAsSpam: (state, action) => {
      const messageId = action.payload;
      const messageIndex = state.allMessages.findIndex(
        (message) => message.id === messageId
      );
      if (messageIndex !== -1) {
        const spamMessage = state.allMessages[messageIndex];
        state.allMessages.splice(messageIndex, 1);
        state.spamMessages.push(spamMessage);
      }
    },
    markAsRead: (state, action) => {
      const messageId = action.payload;
      const messageIndex = state.allMessages.findIndex(
        (message) => message.id === messageId
      );
      if (messageIndex !== -1) {
        state.allMessages[messageIndex].unread = !state.allMessages[messageIndex].unread ;
      }
    },
    markAsUnread: (state, action) => {
      const messageId = action.payload;
      const message = state.allMessages.find(
        (message) => message.id === messageId
      );
      if (message) {
        state.unreadMessages.push(message);
      }
    },
    archiveMessage: (state, action) => {
      const messageId = action.payload;
      const messageIndex = state.allMessages.findIndex(
        (message) => message.id === messageId
      );
      if (messageIndex !== -1) {
        const archiveMessage = state.allMessages[messageIndex];
        state.allMessages.splice(messageIndex, 1);
        state.archiveMessages.push(archiveMessage);
      }
    },
    toggleStarredMessages: (state) => {
      state.starredMessages = [];
    },
    toggleDeletedMessages: (state) => {
      state.deletedMessages = [];
    },
    toggleSpamMessages: (state) => {
      state.spamMessages = [];
    },
    toggleArchiveMessages: (state) => {
      state.archiveMessages = [];
    },
    toggleSentMessages: (state) => {
      state.sentMessages = [];
    },
    toggleDraftMessages: (state) => {
      state.draftMessages = [];
    },
    toggleMessageDetail: (state) => {
      state.isMessageDetailOpen = !state.isMessageDetailOpen;
      },
      toggleInboxIsClicked: (state) => {
          state.inboxIsClicked = !state.inboxIsClicked;
          state.starIsClicked = false;
          state.archieveIsClicked = false;
          state.spamIsClicked = false;
          state.deleteIsClicked = false;
          state.sentIsClicked = false;
           state.draftIsClicked = false;
    },
      toggleStarIsClicked: (state) => {
          state.starIsClicked = !state.starIsClicked;
          state.inboxIsClicked = false;
          state.archieveIsClicked = false;
          state.spamIsClicked = false;
          state.deleteIsClicked = false;
          state.sentIsClicked = false;
           state.draftIsClicked = false;
      },
      toggleArchieveIsClicked: (state) => {
          state.archieveIsClicked = !state.archieveIsClicked;
          state.starIsClicked = false;
          state.inboxIsClicked = false;
          state.spamIsClicked = false;
          state.deleteIsClicked = false;
          state.sentIsClicked = false;
           state.draftIsClicked = false;
          
      },
       toggleSpamIsClicked: (state) => {
          state.spamIsClicked = !state.spamIsClicked;
          state.starIsClicked = false;
           state.inboxIsClicked = false;
           state.archieveIsClicked = false;
           state.deleteIsClicked = false;
           state.sentIsClicked = false;
            state.draftIsClicked = false;
      },
      toggleDeleteIsClicked: (state) => {
          state.deleteIsClicked = !state.deleteIsClicked; 
          state.spamIsClicked = false;
          state.starIsClicked = false;
           state.inboxIsClicked = false;
          state.archieveIsClicked = false;
          state.sentIsClicked = false;
           state.draftIsClicked = false;
      },
      toggleSentIsClicked: (state) => {
          state.sentIsClicked = !state.sentIsClicked;
          state.deleteIsClicked = false; 
          state.spamIsClicked = false;
          state.starIsClicked = false;
           state.inboxIsClicked = false;
          state.archieveIsClicked = false;
          state.draftIsClicked = false;
      },

      toggleDraftIsClicked: (state) => {
          state.draftIsClicked = !state.draftIsClicked;
          state.sentIsClicked = false;
          state.deleteIsClicked = false; 
          state.spamIsClicked = false;
          state.starIsClicked = false;
           state.inboxIsClicked = false;
            state.archieveIsClicked = false;
      },
    toggleIsReadClicked:(state) => {
      state.isRead = !state.isRead;
       },
    toggleUnreadMessages: (state) => {
      state.unreadMessages = [];
    },
    setToSent: (state,action) => {
      state.toSent = action.payload;
      const parts = state.toSent.split("@");
      const name = parts[0];
      state.userName = name;
      localStorage.setItem("senderName", name);
    },
    setId: (state, action) => {
      state.id = action.payload;
      localStorage.setItem("senderMessageId", state.id);
    },
   setAllMessages: (state, action) => {
  // Since you're fetching an object from Firebase, you need to convert it into an array
  // Assuming the data structure in Firebase is an object with keys as message IDs
  const data = action.payload; // This should be an object with message IDs as keys

  // Convert the object into an array
  const messagesArray = Object.keys(data).map((messageId) => {
    return data[messageId];
  });

  state.allMessages = messagesArray;
  console.log(state.allMessages);
},
},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSentMessages.fulfilled, (state, action) => {
        state.sentMessages = action.payload;
      })
      .addCase(fetchDraftMessages.fulfilled, (state, action) => {
        state.draftMessages = action.payload;
      })
      .addCase(fetchAllMessages.fulfilled, (state, action) => {
        state.allMessages = action.payload;
      })
  },
});

export const {
  setId,
  setToSent,
  id,
  toSent,
  userName,
  setAllMessages,
  selectAll,
  searchQuery,
  setSelectAll,
  setSearchQuery,
  setSentMessages,
  setDraftMessages,
  toggleStarred,
  deleteMessage,
  inboxMessages,
  sentMessages,
  draftMessages,
  markAsSpam,
  markAsRead,
  markAsUnread,
    archiveMessage,
    archiveMessages,
    inboxIsClicked,
    starIsClicked,
   archieveIsClicked,
    spamIsClicked,
    deleteIsClicked,
   sentIsClicked,
   draftIsClicked,
   isRead,
  toggleStarredMessages,
  toggleDeletedMessages,
  toggleSpamMessages,
  toggleInboxMessages,
  toggleArchiveMessages,
  toggleSentMessages,
  toggleDraftMessages,
  toggleMessageDetail,
  toggleUnreadMessages,
    toggleInboxIsClicked,
    toggleStarIsClicked,
    toggleArchieveIsClicked,
    toggleSpamIsClicked,
    toggleDeleteIsClicked,
    toggleSentIsClicked,
    toggleDraftIsClicked,
    toggleIsReadClicked,
  
} = dataStore.actions;
export default dataStore.reducer;