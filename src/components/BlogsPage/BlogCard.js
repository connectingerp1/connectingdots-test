"use client";

import Link from "next/link";
import styles from "@/styles/BlogPage/Components/BlogCard.module.css";

const BlogCard = ({ blog, BASE_URL }) => {
  return (
    <div className={styles.blogCard}>
      <Link href={`/blogs/${blog.category}/${blog._id}`} className={styles.linkTag}>
        <div className={styles.imageContainer}>
          <img
            src={blog.image?.startsWith("http") ? blog.image : `${BASE_URL}${blog.image}`}
            alt={blog.title}
            className={styles.blogImage}
            loading="lazy"
          />
        </div>
        <div className={styles.overlay}>
          <h3 className={styles.blogTitle}>{blog.title}</h3>
          <p className={styles.blogCategory}>
            {blog.category} • {blog.subcategory}
          </p>
          <p className={styles.blogAuthor}>By {blog.author}</p>
          <span className={styles.readMore}>Read More →</span>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;