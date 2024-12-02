import { createContext, useState } from "react";
import React from "react";

export const SearchContext = createContext({
  visible: false,
  showSearchField: (visibility: boolean) => {},
});

const SearchContextProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);

  function showSearchField(visibility: boolean) {
    setVisible(visibility);
  }

  const ctxValue = {
    visible,
    showSearchField,
  };

  return (
    <SearchContext.Provider value={ctxValue}>{children}</SearchContext.Provider>
  );
};

export default SearchContextProvider;
