import "./Bookmark.css";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import { AiOutlineCopy } from "react-icons/ai";
import { AiOutlineLink } from "react-icons/ai";
import useBookmark from "../../Contexts/Bookmarks.hook";

const Bookmark = ({ bookmark }) => {
  const [successCopy, setSuccessCopy] = useState(false);
  const [message, setMessage] = useState("");
  const { setBookmarksData } = useBookmark();
  const navigate = useNavigate();
  function handleBookmarkEdit(id) {
    navigate(`/addBookmark/${id}?edit=true`);
  }

  async function handleCopyBookmark(url) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          console.log("Copying to clipboard was successful");
          setSuccessCopy(true);
        })
        .catch((err) => {
          console.error("Copying to clipboard failed:", err);
        });
    }
    setTimeout(() => {
      setSuccessCopy(false);
    }, 2000);
  }

  async function handleConfirmDelete(id) {
    const result = confirm("Are you sure you want to delete the bookmark");
    if (result) {
      handleBookmarkDelete(id);
    }
  }

  async function handleBookmarkDelete(id) {
    try {
      const response = await fetch(`http://localhost:3200/api/bookmark/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setMessage("Bookmarks deleted Successfully");
        setBookmarksData((prevBookmarksData) =>
          prevBookmarksData.filter((bookmark) => bookmark._id !== id)
        );
      }
    } catch (error) {
      console.log(error);
      setMessage(error);
    }
  }

  return (
    <div className="bookmark-container">
      <div className="bookmark-header">
        <h3 className="bookmark-title">{bookmark.title}</h3>
        <div className="bookmark-tags">
          {bookmark.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="bookmark-url">
        <p className="bookmark-url-input">{bookmark.url}</p>
        <div className="bookmark-url-actions">
          {successCopy && (
            <div className="bookmark-success-copy">
              Url Successfully copied to clipboard
            </div>
          )}
          <AiOutlineCopy
            color="black"
            fontSize={"1.3rem"}
            onClick={() => {
              handleCopyBookmark(bookmark.url);
            }}
            style={{ cursor: "pointer" }}
            title="Copy to clipboard"
          />

          <a href={bookmark.url} target="_blank">
            <AiOutlineLink
              color="black"
              fontSize={"1.3rem"}
              title="Open in new window"
            />
          </a>
        </div>
      </div>
      <p className="bookmark-actions">
        <button
          className="btn edit-btn"
          onClick={() => {
            handleBookmarkEdit(bookmark._id);
          }}
        >
          EDIT
        </button>
        <button
          className="btn delete-btn"
          onClick={() => {
            handleConfirmDelete(bookmark._id);
          }}
        >
          DELETE
        </button>
      </p>
    </div>
  );
};

Bookmark.propTypes = {
  bookmark: PropTypes.object,
};

export default Bookmark;
