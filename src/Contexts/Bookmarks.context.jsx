import { createContext, useState } from "react";
const BookmarkContext = createContext();

// eslint-disable-next-line react/prop-types
const BookmarksProvider = ({ children }) => {
  const [bookmarksData, setBookmarksData] = useState([]);

  return (
    <BookmarkContext.Provider value={{ bookmarksData, setBookmarksData }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export { BookmarksProvider, BookmarkContext };
