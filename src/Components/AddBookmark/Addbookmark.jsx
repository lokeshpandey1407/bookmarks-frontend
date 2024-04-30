import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../common/Components/Input/Input";
import "./Addbookmark.css";
const Addbookmark = () => {
  const [Tags, setTags] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    description: "",
  });
  const [message, setMessage] = useState("");
  const tagRef = useRef();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);

  let isEdit = searchParams.get("edit");
  let { id } = useParams();

  function handleAddTags(tag) {
    tag = tag.trim();
    if (!tag) {
      return;
    }
    setTags((prev) => [...prev, tag]);
    tagRef.current.value = "";
  }

  function handleFormValue(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleDeleteTag(tag) {
    const tags = Tags.filter((item) => item != tag);
    setTags(tags);
  }

  async function handleAddBookmark(evt) {
    evt.preventDefault();
    const jsonData = { ...formData };
    jsonData["tags"] = Tags;
    try {
      const response = await fetch("http://localhost:3200/api/bookmark", {
        headers: { "content-type": "application/json" },
        method: "POST",
        body: JSON.stringify(jsonData),
      });
      if (response.ok) {
        setMessage("Bookmarks created Successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setMessage(error);
    }
  }

  async function handleUpdateBookmark(evt) {
    evt.preventDefault();
    const jsonData = { ...formData };
    jsonData["tags"] = Tags;
    try {
      const response = await fetch(`http://localhost:3200/api/bookmark/${id}`, {
        headers: { "content-type": "application/json" },
        method: "PUT",
        body: JSON.stringify(jsonData),
      });
      if (response.ok) {
        setMessage("Bookmarks updated Successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setMessage(error);
    }
  }

  async function getBookmarkData(id) {
    try {
      const response = await fetch(`http://localhost:3200/api/bookmark/${id}`);
      if (!response.ok) {
        setMessage("Something went wrong while fetching data");
        throw new Error("Something went wrong while fetching data");
      }
      const bookmarks = await response.json();
      setFormData({
        ...formData,
        title: bookmarks.data.title,
        url: bookmarks.data.url,
        description: bookmarks.data.description,
      });
      setTags(bookmarks.data.tags);
    } catch (error) {
      console.log(error);
      setMessage("Error fetching data, Please try again");
    }
  }

  useEffect(() => {
    setTags([]);
    if (id) {
      getBookmarkData(id);
    }
  }, [id]);

  return (
    <div className="add-bookmark-container">
      <h3>{isEdit ? "Edit Bookmark" : "Add Bookmark"}</h3>
      <form
        onSubmit={(evt) => {
          isEdit ? handleUpdateBookmark(evt) : handleAddBookmark(evt);
        }}
      >
        {message && (
          <div>
            <b>message</b>
          </div>
        )}
        <div className="form-group">
          <label htmlFor="title">Bookmark Title</label>
          <Input
            id="title"
            name="title"
            placeholder="Enter Title"
            value={formData.title}
            onChange={handleFormValue}
            type="text"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="url">Bookmark Url</label>
          <Input
            id="url"
            name="url"
            placeholder="Enter Url"
            value={formData.url}
            onChange={handleFormValue}
            type="text"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tag">Tags</label>
          <div className="tags-container">
            {Tags.map((tag, index) => {
              return (
                <span
                  key={index}
                  className="bookmark-form-tag"
                  onClick={() => handleDeleteTag(tag)}
                  title="Click here to delete the tag"
                >
                  {tag}
                </span>
              );
            })}
          </div>
          <Input id="tag" placeholder="Tags" type="text" ref={tagRef} />
          <button
            style={{ width: "fit-content" }}
            type="button"
            className="btn add-tag-btn"
            onClick={() => {
              handleAddTags(tagRef.current.value);
            }}
          >
            Add
          </button>
        </div>
        <div className="form-group">
          <label htmlFor="description">Bookmark Description</label>
          <textarea
            className="description"
            id="description"
            name="description"
            placeholder="Enter Description"
            value={formData.description}
            onChange={handleFormValue}
          ></textarea>
        </div>
        <button type="submit" className="btn submit-btn">
          {isEdit ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Addbookmark;
