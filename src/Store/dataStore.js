import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import inboxMessageArray from "../Components/Messages";

const initialState = {
  sentMessages: [],
  draftMessages: [],
  allMessages: [...inboxMessageArray], // You can populate this with the initial data
  starredMessages: [],
  deletedMessages: [],
  spamMessages: [],
  archiveMessages: [],
  inboxMessages: [...inboxMessageArray],
  isMessageDetailOpen: false,
  unreadMessages: [],
    inboxIsClicked: false,
    starIsClicked: false,
  archieveIsClicked : false,
    spamIsClicked: false,
    deleteIsClicked: false,
    sentIsClicked : false,
    draftIsClicked : false,
};

export const fetchSentMessages = createAsyncThunk(
  "dataStore/fetchSentMessages",
  async (userName, thunkAPI) => {
    try {
      const response = await fetch(
        `https://mailboxclient-b4491-default-rtdb.firebaseio.com/store/${userName}.json`
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
        `https://mailboxclient-b4491-default-rtdb.firebaseio.com/draft/${userName}.json`
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
        state.allMessages[messageIndex].unread = false;
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
      
    toggleUnreadMessages: (state) => {
      state.unreadMessages = [];
    },
},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSentMessages.fulfilled, (state, action) => {
        state.sentMessages = action.payload;
      })
      .addCase(fetchDraftMessages.fulfilled, (state, action) => {
        state.draftMessages = action.payload;
      });
  },
});

export const {
  setSentMessages,
  setDraftMessages,
  toggleStarred,
    deleteMessage,
  inboxMessages,
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
  
} = dataStore.actions;
export default dataStore.reducer;