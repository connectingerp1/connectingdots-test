"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "@/styles/BlogPage/CategoryPage.module.css";
import BlogCard from "@/components/BlogsPage/BlogCard";
import Breadcrumb from "@/components/BlogsPage/Breadcrumb";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const CategoryPage = () => {
  const { category } = useParams() || {};
  const [blogs, setBlogs] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState("All");
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    if (category) {
      fetchAllSubcategories();
      fetchBlogs();
    }
  }, [category, selectedSubcategory]);

  const fetchAllSubcategories = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/blogs?category=${category}`
      );
      const data = await response.json();

      const uniqueSubcategories = [
        "All",
        ...new Set(
          data.map((blog) => blog.subcategory?.trim()).filter(Boolean)
        ),
      ];

      setSubcategories(uniqueSubcategories);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const fetchBlogs = async () => {
    setLoading(true); // Start loading
    try {
      let url = `${BASE_URL}/api/blogs?category=${encodeURIComponent(category)}`;

      if (selectedSubcategory.toLowerCase() !== "all") {
        url += `&subcategory=${encodeURIComponent(selectedSubcategory.trim())}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok || !Array.isArray(data)) {
        throw new Error("Invalid response format");
      }

      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="p-4">
      <Breadcrumb />
      <div className={styles.categoryPage}>
        <h1 className={styles.categoryTitle}>{category?.toUpperCase()}</h1>

        <div className={styles.subcategoryContainer}>
          {subcategories.map((sub, index) => (
            <button
              key={index}
              className={selectedSubcategory === sub ? styles.active : ""}
              onClick={() => setSelectedSubcategory(sub)}
            >
              {sub}
            </button>
          ))}
        </div>

        {/* Loading Indicator */}
        {loading ? (
          <div className={styles.loadingIndicator}>
            <p>Loading blogs...</p>
            <div className={styles.spinner}></div> {/* Add spinner styles */}
          </div>
        ) : (
          <div className={styles.blogsContainer}>
            {blogs.length === 0 ? (
              <p className={styles.noBlogs}>
                No blogs found for {category}
                {selectedSubcategory !== "All"
                  ? ` - ${selectedSubcategory}`
                  : ""}
                .
              </p>
            ) : (
              blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
