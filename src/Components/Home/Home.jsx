import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Bookmark from "../bookmarkComponent/Bookmark";
import "./Home.css";
import useBookmark from "../../Contexts/Bookmarks.hook";
import Input from "../../common/Components/Input/Input";
import Button from "../../common/Components/button/Button";

const Home = () => {
  const { bookmarksData, setBookmarksData } = useBookmark();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  let searchText = searchParams.get("search");

  function handleSearch(e) {
    e.preventDefault();
    const text = inputRef.current.value;
    if (!text) {
      return;
    }
    navigate(`/search?search=${text}`);
  }

  useEffect(() => {
    if (searchText === null) {
      searchText = "";
    }
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    async function getBookmarks() {
      try {
        const response = await fetch(
          `http://localhost:3200/api/bookmark?search=${searchText}`
        );
        if (!response.ok) {
          setError("Something went wrong while fetching data");
          setLoading(false);
          throw new Error("Something went wrong while fetching data");
        }
        const bookmarks = await response.json();
        setBookmarksData(bookmarks.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError("Error fetching data, Please try again");
      }
    }
    getBookmarks();
  }, [setBookmarksData, searchText]);

  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div className="home-container">
          <div className="search">
            <Input
              placeholder="Enter Title or Tag"
              type="text"
              ref={inputRef}
              style={{ width: "100%" }}
            />
            <Button type="button" text="Search" onClick={handleSearch} />
          </div>
          {searchText && (
            <div style={{ fontSize: "1.5rem" }}>
              Search results for <b>{searchText}</b>
            </div>
          )}
          <div className="container">
            {error && <div>{error}</div>}
            {bookmarksData.length != 0 ? (
              bookmarksData.map((bookmark) => (
                <Bookmark key={bookmark._id} bookmark={bookmark} />
              ))
            ) : (
              <div>No bookmarks to show here.</div>
            )}
          </div>
          <div className="pagination-container"></div>
        </div>
      )}
    </>
  );
};

export default Home;
