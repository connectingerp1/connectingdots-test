"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "@/styles/BlogPage/BlogsPage.module.css";
import Breadcrumb from "@/components/BlogsPage/Breadcrumb";
import CategoryFilter from "@/components/BlogsPage/CategoryFilter";
import BlogCarousel from "@/components/BlogsPage/BlogCarousel";
import BlogHorizontalCarousel from "@/components/BlogsPage/BlogHorizontalCarousel";

const BASE_URL = "https://blog-page-panel.onrender.com";

const BlogsPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [blogs, setBlogs] = useState([]);
  const [trendingBlogs, setTrendingBlogs] = useState([]);
  const [recommendedBlogs, setRecommendedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (blogs.length > 0) {
      // Filter blogs by status
      const trending = blogs.filter((blog) => blog.status === "Trending");
      const recommended = blogs.filter((blog) => blog.status === "Recommended");

      setTrendingBlogs(trending);
      setRecommendedBlogs(recommended);

      // Extract unique categories
      const uniqueCategories = Array.from(
        new Set(blogs.map((blog) => blog.category))
      );

      setCategories(uniqueCategories);
      setLoading(false);
    }
  }, [blogs]);

  // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/blogs`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError("Failed to load blogs. Please try again later.");
      setLoading(false);
    }
  };

  // Filter blogs by category
  const filteredBlogs =
    selectedCategory === "all"
      ? blogs
      : blogs.filter((blog) => blog.category === selectedCategory);

  return (
    <>
      <Head>
        <title>Blogs | Connecting Dots ERP | SAP Training Institute In Pune</title>
        <meta 
          name="description" 
          content="Explore our latest blogs on SAP, IT, Digital Marketing, and HR careers. Stay updated with industry trends and expert insights from Connecting Dots ERP." 
        />
      </Head>

      <div className={styles.blogsPageContainer}>
        <Breadcrumb />

        <div className={styles.blogsHero}>
          <h1 className={styles.blogsHeading}>Explore Our Latest Blogs</h1>
          <p className={styles.blogsSubheading}>
            Let's start career with the following domains
          </p>
        </div>

        {/* Category Filters */}
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
            {/* Recommended Blogs Horizontal Carousel */}
            {trendingBlogs.length > 0 && (
              <BlogHorizontalCarousel
                blogs={recommendedBlogs}
                title="Trending Blogs"
                BASE_URL={BASE_URL}
              />
            )}

            {/* Trending Blogs Carousel */}
            {trendingBlogs.length > 0 && (
              <BlogCarousel
                blogs={trendingBlogs}
                title="Trending Blogs"
                BASE_URL={BASE_URL}
              />
            )}

            {/* Recommended Blogs Carousel */}
            {/* {recommendedBlogs.length > 0 && (
              <BlogCarousel
                blogs={recommendedBlogs}
                title="Recommended Blogs"
                BASE_URL={BASE_URL}
              />
            )} */}
          </>
        )}
      </div>
    </>
  );
};

export default BlogsPage;