// src/components/BlogsPage/BlogClientContent.js
"use client"; // This component handles client-side interactions/rendering

import { useEffect, useState } from "react";
// Import necessary components used previously in blogs/page.js
import styles from "@/styles/BlogPage/BlogsPage.module.css"; // Assuming styles needed
import Breadcrumb from "@/components/BlogsPage/Breadcrumb";
import CategoryFilter from "@/components/BlogsPage/CategoryFilter";
import BlogCarousel from "@/components/BlogsPage/BlogCarousel";
import BlogHorizontalCarousel from "@/components/BlogsPage/BlogHorizontalCarousel";

const BASE_URL = "https://blog-page-panel.onrender.com"; // Define your BASE_URL

const BlogClientContent = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [blogs, setBlogs] = useState([]);
  const [trendingBlogs, setTrendingBlogs] = useState([]);
  const [recommendedBlogs, setRecommendedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- All the useEffect and fetch logic remains the same ---
  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (blogs.length > 0) {
      const trending = blogs.filter((blog) => blog.status === "Trending");
      const recommended = blogs.filter((blog) => blog.status === "Recommended");
      setTrendingBlogs(trending);
      setRecommendedBlogs(recommended);
      const uniqueCategories = Array.from(
        new Set(blogs.map((blog) => blog.category))
      );
      setCategories(uniqueCategories);
      setLoading(false);
    }
  }, [blogs]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null); // Reset error on retry
      const response = await fetch(`${BASE_URL}/api/blogs`);
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError("Failed to load blogs. Please try again later.");
      setLoading(false);
    }
  };

  const filteredBlogs = // Keep filter logic if needed elsewhere, maybe not for this structure
    selectedCategory === "all"
      ? blogs
      : blogs.filter((blog) => blog.category === selectedCategory);
  // --- End of existing logic ---

  // No Head component needed here

  return (
    // This div replaces the static content area upon hydration
    <div className={styles.blogsPageContainer}>
      <Breadcrumb />

      <div className={styles.blogsHero}>
        <h1 className={styles.blogsHeading}>Explore Our Latest Blogs</h1>
        <p className={styles.blogsSubheading}>
          Let's start career with the following domains
        </p>
      </div>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {loading ? (
        <div className={styles.loadingState}>
          <div className={styles.spinnerContainer}>
            <div className={styles.spinner}></div>
          </div>
          <p>Loading blogs...</p>
        </div>
      ) : error ? (
        <div className={styles.errorState}>
          <p>{error}</p>
          <button onClick={fetchBlogs} className={styles.retryButton}>
            Retry
          </button>
        </div>
      ) : (
        <>
          {/* Render carousels based on fetched data */}
          {recommendedBlogs.length > 0 && ( // Assuming you meant recommended here based on variable name
            <BlogHorizontalCarousel
              blogs={recommendedBlogs}
              title="Recommended Blogs" // Changed title to match variable
              BASE_URL={BASE_URL}
            />
          )}

          {trendingBlogs.length > 0 && (
            <BlogCarousel
              blogs={trendingBlogs}
              title="Trending Blogs"
              BASE_URL={BASE_URL}
            />
          )}
          {/* Removed duplicate recommended carousel - adjust if needed */}
        </>
      )}
    </div>
  );
};

export default BlogClientContent;
