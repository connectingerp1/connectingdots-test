"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/BlogPage/BlogDetails.module.css";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const BlogDetails = () => {
  const { category, id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const contentRef = useRef(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const [tableOfContents, setTableOfContents] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/blogs/${id}`);
        const data = await response.json();

        if (!response.ok || !data || Object.keys(data).length === 0)
          throw new Error("Blog not found");

        setBlog({ ...data, category: data.category || category });

        // Fetch related blogs
        fetchRelatedBlogs(data.category || category, id);

        // Generate table of contents from content
        setTimeout(() => {
          generateTableOfContents();
        }, 500);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBlog();

    // Set up scroll event for reading progress
    const handleScroll = () => {
      if (contentRef.current) {
        const contentElement = contentRef.current;
        const totalHeight = contentElement.clientHeight;
        const windowHeight = window.innerHeight;
        const scrollTop = window.scrollY;
        const currentPosition = scrollTop - contentElement.offsetTop;
        const scrollableHeight = totalHeight - windowHeight;

        if (scrollableHeight > 0) {
          const progressPercentage = (currentPosition / scrollableHeight) * 100;
          setReadingProgress(Math.min(Math.max(progressPercentage, 0), 100));
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [id, category]);

  const fetchRelatedBlogs = async (blogCategory, currentBlogId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/blogs?category=${blogCategory}`
      );
      const data = await response.json();

      if (response.ok && data) {
        // Filter out current blog and limit to 3 related blogs
        const filtered = data
          .filter((b) => b._id !== currentBlogId)
          .slice(0, 3);
        setRelatedBlogs(filtered);
      }
    } catch (error) {
      console.error("Error fetching related blogs:", error);
    }
  };

  const generateTableOfContents = () => {
    if (contentRef.current) {
      const headings = contentRef.current.querySelectorAll("h2, h3");
      const toc = Array.from(headings).map((heading, index) => {
        // Add ID to the heading if it doesn't have one
        if (!heading.id) {
          heading.id = `heading-${index}`;
        }

        return {
          id: heading.id,
          text: heading.textContent,
          level: heading.tagName === "H2" ? 2 : 3,
        };
      });

      setTableOfContents(toc);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown Date";

    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading article...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className={styles.notFoundContainer}>
        <h2>Blog Not Found</h2>
        <p>The article you're looking for doesn't exist or has been removed.</p>
        <button
          className={styles.backButton}
          onClick={() => router.push("/blogs")}
        >
          Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <div className={styles.blogPageContainer}>
      {/* Reading Progress Bar */}
      <div
        className={styles.readingProgressBar}
        style={{ width: `${readingProgress}%` }}
      ></div>

      <div className={styles.blogContainer}>
        {/* Blog Header Section */}
        <header className={styles.blogHeader}>
          <div className={styles.blogCategories}>
            {blog.category && (
              <Link
                href={`/blogs/${blog.category}`}
                className={styles.categoryLink}
              >
                {blog.category}
              </Link>
            )}
            {blog.subcategory && (
              <>
                <span className={styles.categorySeparator}>›</span>
                <span className={styles.subcategoryLink}>
                  {blog.subcategory}
                </span>
              </>
            )}
          </div>

          <h1 className={styles.title}>{blog.title}</h1>

          <div className={styles.metaInfo}>
            <div className={styles.authorInfo}>
              <div className={styles.authorAvatar}>
                {blog.authorAvatar ? (
                  <Image
                    src={
                      blog.authorAvatar.startsWith("http")
                        ? blog.authorAvatar
                        : `${BASE_URL}${blog.authorAvatar}`
                    }
                    alt={blog.author}
                    width={40}
                    height={40}
                  />
                ) : (
                  <div className={styles.defaultAvatar}>
                    {blog.author?.charAt(0).toUpperCase() || "A"}
                  </div>
                )}
              </div>
              <div className={styles.authorDetails}>
                <span className={styles.authorName}>{blog.author}</span>
                <span className={styles.publishDate}>
                  {formatDate(blog.date || blog.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className={styles.featuredImageContainer}>
          <Image
            src={
              blog.image?.startsWith("http")
                ? blog.image
                : `${BASE_URL}${blog.image}`
            }
            alt={blog.title}
            className={styles.blogImage}
            width={1200}
            height={600}
            priority
          />
          {blog.imageCaption && (
            <p className={styles.imageCaption}>{blog.imageCaption}</p>
          )}
        </div>

        <div className={styles.contentContainer}>
          {/* Table of Contents Sidebar */}
          {tableOfContents.length > 0 && (
            <div className={styles.tableOfContents}>
              <h3>Table of Contents</h3>
              <ul>
                {tableOfContents.map((item) => (
                  <li
                    key={item.id}
                    className={item.level === 3 ? styles.tocSubItem : ""}
                  >
                    <a href={`#${item.id}`}>{item.text}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Main Content */}
          <div
            ref={contentRef}
            className={styles.blogContent}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>

        {/* Author Bio Section */}
        {blog.authorBio && (
          <div className={styles.authorBio}>
            <div className={styles.authorBioHeader}>
              <div className={styles.authorAvatarLarge}>
                {blog.authorAvatar ? (
                  <Image
                    src={
                      blog.authorAvatar.startsWith("http")
                        ? blog.authorAvatar
                        : `${BASE_URL}${blog.authorAvatar}`
                    }
                    alt={blog.author}
                    width={80}
                    height={80}
                  />
                ) : (
                  <div className={styles.defaultAvatarLarge}>
                    {blog.author?.charAt(0).toUpperCase() || "A"}
                  </div>
                )}
              </div>
              <div>
                <h3>About the Author</h3>
                <h4>{blog.author}</h4>
              </div>
            </div>
            <p>{blog.authorBio}</p>
          </div>
        )}

        {/* Related Articles Section */}
        {relatedBlogs.length > 0 && (
          <div className={styles.relatedArticles}>
            <h2>Related Articles</h2>
            <div className={styles.relatedArticlesGrid}>
              {relatedBlogs.map((relatedBlog) => (
                <Link
                  href={`/blogs/${relatedBlog.category}/${relatedBlog._id}`}
                  key={relatedBlog._id}
                  className={styles.relatedArticleCard}
                >
                  <div className={styles.relatedArticleImage}>
                    <Image
                      src={
                        relatedBlog.image?.startsWith("http")
                          ? relatedBlog.image
                          : `${BASE_URL}${relatedBlog.image}`
                      }
                      alt={relatedBlog.title}
                      width={300}
                      height={180}
                    />
                  </div>
                  <div className={styles.relatedArticleContent}>
                    <h3>{relatedBlog.title}</h3>
                    <p>
                      {relatedBlog.content
                        ?.replace(/<[^>]*>/g, "")
                        .slice(0, 80)}
                      ...
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
