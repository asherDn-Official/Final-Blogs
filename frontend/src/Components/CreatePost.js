import { useRef, useState } from "react";
import axios from "axios";
import API_URL from "../Components/global";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate } from "react-router-dom";
export default function CreatePost() {
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState({
    type: "Bike",
    title: "",
    author: "",
    content: "",
    thumbnail: "",
  });
  const [loading, setLoading] = useState(false);
  const editorRef = useRef(null);
  const [initialImage] = useState("/images/Thumbnailpreview.png");
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    await handleUpload(file);
  };
  const handleThumbnail = async (event) => {
    const file = event.target.files[0];
    await handleUpload(file, true);
  };
  const handleUpload = async (file, isThumbnail = false) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("sampleFile", file);
      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
        },
      });
      setLoading(false);
      if (isThumbnail) {
        setBlogData((prevData) => ({
          ...prevData,
          thumbnail: response.data.link,
        }));
      } else {
        if (editorRef.current) {
          const editor = editorRef.current;
          editor.execCommand(
            "mceInsertContent",
            false,
            `<img className="ImportIamgeWItdh" src="${response.data.link}" alt="Uploaded Image" />`
          );
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Error uploading image:", error);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/blog/create`, blogData);

      if (response.data === true) {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div>
        <h2 className="createpostheadingdiv">Create Blog</h2>

        <div className="FlexMiddleofthedivmain">
          <div className="createpostdivwidthj">
            <div className="postionofimage">
              <form onSubmit={handleSubmit}>
                <div className="cforumtopics">
                  <div className="headingcreatepost">Blog Type</div>
                  <div className="cmarginleft">
                    <label htmlFor="createpost">
                      <select
                        type="text"
                        placeholder="Select the Heading"
                        required
                        value={blogData.type}
                        onChange={(e) => {
                          setBlogData({ ...blogData, type: e.target.value });
                        }}
                      >
                        <option value="Bike">Bike</option>
                        <option value="Car">Car</option>
                        <option value="Rider">Rider</option>
                        <option value="Technical">Technical</option>
                      </select>
                    </label>
                  </div>
                </div>
                <div className="cheadingtopics">
                  <div className="headingcreatepost">Title</div>
                  <div className="cinputforumcreatepost">
                    <input
                      value={blogData.title}
                      onChange={(e) => {
                        setBlogData({ ...blogData, title: e.target.value });
                      }}
                      type="text"
                      placeholder="Title"
                      required
                    />
                  </div>
                </div>
                <div className="cheadingtopics">
                  <div className="headingcreatepost">Author</div>
                  <div className="cinputforumcreatepost">
                    <input
                      type="text"
                      value={blogData.author}
                      onChange={(e) => {
                        setBlogData({ ...blogData, author: e.target.value });
                      }}
                      placeholder="Author Name"
                      required
                    />
                  </div>
                </div>
                <div className="thumbnailsecrionforcreatepost">
                  <div className="thumbnailtextscreatepost">Thumbnail</div>
                  <div className="imagethumbnailpreviewdivtag">
                    <div>
                      <div className="file-input">
                        <input
                          type="file"
                          name="sampleFile"
                          id="file-input"
                          className="file-input__input"
                          onChange={handleThumbnail}
                        />
                        <label
                          className="file-input__label"
                          htmlFor="file-input"
                        >
                          <img src="./images/tabler_photo.png" alt="" />
                          <span className="uploadimagecreatepost">
                            Select Thumbnail
                          </span>
                        </label>
                      </div>
                      <div className="recommenededsizees">
                        Recommended 900x350 px
                      </div>
                    </div>
                    <div className="previewwimagesizee">
                      {blogData && blogData.thumbnail ? (
                        <img
                          src={blogData.thumbnail}
                          alt=""
                          style={{
                            width: "200px",
                            height: "77.78px",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <img
                          src={initialImage}
                          alt=""
                          style={{
                            width: "200px",
                            height: "77.78px",
                            objectFit: "cover",
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="thumbnailsecrionforcreatepost11">
                  <div className="thumbnailtextscreatepost">Post</div>
                  <div className="imagethumbnailpreviewdivtag">
                    <div>
                      <div className="file-input">
                        <input
                          type="file"
                          name="sampleFile"
                          className="file-input__input"
                          id="file-insert"
                          onChange={handleFileChange}
                        />
                        <label
                          className="file-input__label"
                          htmlFor="file-insert"
                        >
                          <img src="./images/tabler_photo.png" alt="" />
                          <span className="uploadimagecreatepost">
                            Insert Image
                          </span>
                        </label>
                      </div>
                      <div className="recommenededsizees"></div>
                    </div>
                  </div>
                </div>
                <div className="Lateudffbdfshfsffg"></div>
                <div>
                  <Editor
                    apiKey="2edzfx0mgryctyfre9pj8d0fikd96259j7w4wvz15jcfma3g"
                    init={{
                      plugins:
                        "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
                      toolbar1:
                        "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                      toolbar2:
                        "link image media table mergetags | align lineheight",
                      tinycomments_mode: "embedded",
                      tinycomments_author: "Author name",
                      mergetags_list: [
                        { value: "First.Name", title: "First Name" },
                        { value: "Email", title: "Email" },
                      ],
                      setup: (editor) => {
                        editorRef.current = editor;
                      },
                    }}
                    onEditorChange={(content) => {
                      setBlogData({ ...blogData, content });
                    }}
                    style={{ width: "100%", height: "500px" }}
                  />
                </div>
                <div className="buttonsubmit">
                  <button type="submit" disabled={loading}>
                    {loading ? "Uploading..." : "Upload your Post"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
