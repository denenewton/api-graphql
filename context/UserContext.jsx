"use client";

import { createContext, useState, useEffect } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase.utils";
import { QueryClientProvider } from "@tanstack/react-query";
import { clientReactQuery } from "../utils/cliente";

export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
  userDoc: null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userDoc, setUserDoc] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        const { userDoc } = await createUserDocumentFromAuth(user);
        setUserDoc(userDoc);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = { currentUser, setCurrentUser, userDoc };

  return (
    <QueryClientProvider client={clientReactQuery}>
      <UserContext.Provider value={value}>{children}</UserContext.Provider>
    </QueryClientProvider>
  );
};
