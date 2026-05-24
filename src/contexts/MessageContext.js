import React, { createContext, useState, useEffect } from 'react';
import { listenToMessages } from '../services/messagingService';

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [unsubscribe, setUnsubscribe] = useState(null);

  useEffect(() => {
    if (currentConversation) {
      setLoading(true);
      const unsub = listenToMessages(currentConversation, (data) => {
        setMessages(data);
        setLoading(false);
      });
      setUnsubscribe(() => unsub);
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [currentConversation]);

  return (
    <MessageContext.Provider value={{ currentConversation, setCurrentConversation, messages, loading }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => {
  const context = React.useContext(MessageContext);
  if (!context) {
    throw new Error('useMessages must be used within a MessageProvider');
  }
  return context;
};
