"use client";

import React, { useEffect, useState, useContext } from "react";
import { CityContext } from "@/context/CityContext";
import styles from "@/styles/CoursesComponents/Description.module.css";

const Description = ({ pageId, sectionIndex }) => {
  const [content, setContent] = useState(null);
  const { city } = useContext(CityContext);

  useEffect(() => {
    localStorage.clear();

    const fetchData = async () => {
      try {
        const response = await fetch("/Jsonfolder/Descriptiondata.json");
        const data = await response.json();
        const pageContent = data.find((item) => item.pageId === pageId);

        if (pageContent) {
          const updatedContent = {
            ...pageContent,
            title: pageContent.title.replace(/{city}/g, city),
            paragraphs: pageContent.paragraphs.map((p) =>
              p.replace(/{city}/g, city)
            ),
            listItem1: pageContent.listItem1 || [],
            secondTitle:
              pageContent.secondTitle?.replace(/{city}/g, city) || "",
            secondParagraphs:
              pageContent.secondParagraphs?.map((p) =>
                p.replace(/{city}/g, city)
              ) || [],
            listItem2: pageContent.listItem2 || [],
            highlights: pageContent.highlights || [],
          };
          setContent(updatedContent);
        }
      } catch (error) {
        console.error("Error fetching the content:", error);
      }
    };

    fetchData();
  }, [pageId, city]);

  const applyHighlights = (text, highlights) => {
    if (!highlights || highlights.length === 0) return text;

    const validHighlights = highlights.filter(
      (word) => typeof word === "string" && word.trim() !== ""
    );
    if (validHighlights.length === 0) return text;

    const regex = new RegExp(`(${validHighlights.join("|")})`, "gi");
    return text.split(regex).map((part, index) => {
      if (
        typeof part === "string" &&
        validHighlights.some(
          (word) => word.toLowerCase() === part.toLowerCase()
        )
      ) {
        return (
          <span key={index} className={styles.highlightDescJson}>
            {part}
          </span>
        );
      }
      return part;
    });
  };

  if (!content) {
    return <p>Loading content...</p>;
  }

  return (
    <div
      className={`${styles.descriptionContainer} ${
        sectionIndex % 2 === 0 ? styles.videoLeft : styles.videoRight
      }`}
    >
      {content.videoUrl && (
        <div className={styles.descriptionVideo}>
          <video src={content.videoUrl} loop autoPlay muted playsInline />
        </div>
      )}

      <div className={styles.descriptionContent}>
        <h2 className={styles.descriptionTitle}>{content.title}</h2>
        {content.paragraphs.map((paragraph, index) => (
          <p key={index} className={styles.descriptionParagraph}>
            {applyHighlights(paragraph, content.highlights)}
          </p>
        ))}

        {content.listItem1.length > 0 && (
          <ul className={styles.descriptionList}>
            {content.listItem1.map((item, index) => (
              <li key={index} className={styles.listItem}>
                {item}
              </li>
            ))}
          </ul>
        )}

        {content.secondTitle && (
          <>
            <h2 className={styles.descriptionTitle}>{content.secondTitle}</h2>
            {content.secondParagraphs.map((paragraph, index) => (
              <p key={index} className={styles.descriptionParagraph}>
                {applyHighlights(paragraph, content.highlights)}
              </p>
            ))}
          </>
        )}

        {content.listItem2.length > 0 && (
          <ul className={styles.descriptionList}>
            {content.listItem2.map((item, index) => (
              <li key={index} className={styles.listItem}>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Description;
