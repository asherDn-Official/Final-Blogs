import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "./global";
import moment from "moment";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  RedditShareButton,
  RedditIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";

export default function Pagedetail() {
  const { id } = useParams();
  const [suggestedBlogs, setSuggestedBlogs] = useState([]);
  const [blog, setBlog] = useState({});
  const [popupOpened, setPopupOpened] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    const fetchBlog = async () => {
      try {
        console.log(`Fetching blog with ID: ${id}`);
        const response = await axios.get(`${API_URL}/blog/get/${id}`);
        if (isMounted) {
          setBlog(response.data);
        }
      } catch (error) {
        console.error("Error fetching Blog:", error);
      }
    };

    const incrementViews = async () => {
      try {
        await axios.put(`${API_URL}/blog/view/${id}`);
      } catch (error) {
        console.error("Error incrementing view count:", error);
      }
    };

    fetchBlog();
    incrementViews();

    return () => {
      isMounted = false;
    };
  }, [id]);

  useEffect(() => {
    if (blog.type) {
      const fetchBlogs = async () => {
        try {
          console.log(`Fetching blogs of type: ${blog.type}`);
          const response = await axios.get(
            `${API_URL}/blog/all?type=${blog.type}`
          );
          setSuggestedBlogs(response.data);
        } catch (error) {
          console.error("Error fetching suggested blogs:", error);
        }
      };

      fetchBlogs();
    }
  }, [blog.type]);

  useEffect(() => {
    if (location.hash === "#popup1") {
      setPopupOpened(true);
    }
  }, [location.hash]);

  const handlePopupClose = () => {
    setPopupOpened(false);
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  const handleReadMore = (blogId) => {
    navigate(`/blogtype/${blogId}`);
  };

  const handleLike = async () => {
    try {
      await axios.put(`${API_URL}/blog/like/${id}`);
    } catch (error) {
      console.error("Error liking Blog:", error);
    }
  };

  return (
    <div>
      <section className="blog-posts">
        <div className="heading-section">
          <div className="latest-news1">
            <h1 className="heading">{blog.title}</h1>
            <div
              className="PagedetailsPageidres"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
            <div className="same-div">
              <p className="author-info-blog">
                By {blog.author} &nbsp;
                {moment(blog.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                <span className="icon-container">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                      className="BlogsCounteButtondsifh"
                      style={{ alignContent: "center" }}
                    >
                      {Math.round(blog.views / 2)}
                    </div>
                    <div>
                      <img
                        src="/images/zondicons_view-show.png"
                        alt="View Icon"
                        className="icon"
                      />
                    </div>
                    <div className="box">
                      {!popupOpened && (
                        <a href="#popup1" onClick={() => setPopupOpened(true)}>
                          <img
                            src="/images/solar_share-bold.png"
                            alt="Share Icon"
                          />
                        </a>
                      )}
                    </div>
                  </div>
                </span>
              </p>
            </div>
          </div>

          <div id="popup1" className={`overlay ${popupOpened ? "open" : ""}`}>
            <div className="popup">
              <div style={{ display: "flex", alignItems: "center" }}>
                <h2>Share the Blog</h2>
                <a className="close" href="#" onClick={handlePopupClose}>
                  &times;
                </a>
              </div>
              <div className="content">
                <FacebookShareButton
                  style={{ marginRight: "7px" }}
                  url={`${window.location.origin}/blogtype/${encodeURIComponent(
                    id
                  )}`}
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
                <TwitterShareButton
                  style={{ marginRight: "7px" }}
                  url={`${window.location.origin}/blogtype/${id}`}
                  title={blog.title}
                >
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
                <WhatsappShareButton
                  style={{ marginRight: "7px" }}
                  url={`${window.location.origin}/blogtype/${id}`}
                  title={blog.title}
                >
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
                <RedditShareButton
                  style={{ marginRight: "7px" }}
                  url={`${window.location.origin}/blogtype/${id}`}
                  title={blog.title}
                >
                  <RedditIcon size={32} round />
                </RedditShareButton>
                <TelegramShareButton
                  style={{ marginRight: "7px" }}
                  url={`${window.location.origin}/blogtype/${id}`}
                  title={blog.title}
                >
                  <TelegramIcon size={32} round />
                </TelegramShareButton>
              </div>
            </div>
          </div>

          <div className="trending-articles">
            <h2 className="heading2">Related Articles</h2>
            {suggestedBlogs &&
              suggestedBlogs.map((blogitem) => (
                <article key={blogitem._id} className="card3">
                  <div className="card-image2">
                    <img
                      className="Imageofthedivjsdfghghds"
                      src={blogitem.thumbnail}
                      alt={blogitem.title}
                      title={blogitem.title}
                    />
                  </div>
                  <div className="card-content2">
                    <h3>{blogitem.title.slice(0, 20)}...</h3>
                    <p>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: blogitem.content
                            .replace(/<img[^>]*>/g, "")
                            .slice(0, 50),
                        }}
                      />
                      <span
                        style={{ color: "blue" }}
                        onClick={() => handleReadMore(blogitem._id)}
                      >
                        ... Read more
                      </span>
                    </p>
                    <p className="author-info">
                      By {blogitem.author}
                      <span className="dete">
                        {moment(blogitem.createdAt).format("MMMM Do YYYY")}
                      </span>
                    </p>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
