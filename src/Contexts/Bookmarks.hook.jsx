import { useContext } from "react";
import { BookmarkContext } from "./Bookmarks.context";

function useBookmark() {
  return useContext(BookmarkContext);
}
export default useBookmark;
