import { createContext, useReducer } from "react";
import { useContext } from "react";
import AuthContext from "./AuthContext";

const ChatContext = createContext({
  user: {},
  chatId: null,
  changeUser: (user) => {},
});

const DEFAULT_STATE = {
  chatId: null,
  user: {},
};

export const ChatProvider = (props) => {
  const { currentUser } = useContext(AuthContext);

  const chatReducer = (state, action) => {
    if (action.type === "CHANGE_USER") {
      return {
        user: action.user,
        chatId:
          currentUser.uid > action.user.uid
            ? currentUser.uid + action.user.uid
            : action.user.uid + currentUser.uid,
      };
    }
    return state;
  };

  const [chatState, dispatch] = useReducer(chatReducer, DEFAULT_STATE);

  const changeUserHandler = (payload) => {
    dispatch({ type: "CHANGE_USER", user: payload });
  };

  const chatContext = {
    chatId: chatState.chatId,
    user: chatState.user,
    changeUser: changeUserHandler,
  };

  return (
    <ChatContext.Provider value={chatContext}>
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatContext;
