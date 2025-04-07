"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import styles from "@/styles/PopupForm.module.css";
import axios from "axios";

const PopupForm = ({ onSubmitData }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [location, setLocation] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ text: "", type: "" });

  const pathname = usePathname();

  useEffect(() => {
    const hiddenPages = ["/adminlogin", "/dashboard", "/blogsadmin"];
    const currentPath = pathname?.toLowerCase() || "";

    if (hiddenPages.includes(currentPath)) {
      setIsVisible(false);
      return;
    }

    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(showTimer);
  }, [pathname]);

  useEffect(() => {
    if (isVisible) {
      document.body.classList.add(styles.noScroll);
    } else {
      document.body.classList.remove(styles.noScroll);
    }

    return () => {
      document.body.classList.remove(styles.noScroll);
    };
  }, [isVisible]);

  // Clear status message after 5 seconds
  useEffect(() => {
    if (statusMessage.text) {
      const timer = setTimeout(() => {
        setStatusMessage({ text: "", type: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  const validateForm = () => {
    if (name.length > 50) {
      setStatusMessage({ text: "Name should be less than 50 characters", type: "error" });
      return false;
    }

    if (!/^\d{10}$/.test(mobile)) {
      setStatusMessage({ text: "Please enter a valid 10-digit mobile number", type: "error" });
      return false;
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setStatusMessage({ text: "Please enter a valid email address", type: "error" });
      return false;
    }

    if (course.length > 50) {
      setStatusMessage({ text: "Course name should be less than 50 characters", type: "error" });
      return false;
    }

    if (!isChecked) {
      setStatusMessage({ text: "Please accept the terms and conditions", type: "error" });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const formData = {
      name,
      contact: mobile,
      email,
      coursename: course,
      location,
      date: new Date().toISOString(),
    };

    try {
      await axios.post(
        "https://serverbackend-0nvg.onrender.com/api/submit",
        formData
      );
      
      setStatusMessage({ text: "Registration complete!", type: "success" });

      // Only call onSubmitData if it's provided
      if (typeof onSubmitData === "function") {
        onSubmitData(formData);
      }

      // Reset form fields after successful submission
      setTimeout(() => {
        setName("");
        setMobile("");
        setEmail("");
        setCourse("");
        setLocation("");
        setIsChecked(false);
        setIsVisible(false);
      }, 2000); // Delay closing to allow user to see success message
      
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatusMessage({ 
        text: "An error occurred while submitting the form.", 
        type: "error" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className={styles.popupFormOverlay}>
      <div className={styles.popupFormContainer}>
        {/* Lightning border effect */}
        <div className={styles.lightningBorder}>
          <div className={`${styles.lightningEdge} ${styles.top}`}></div>
          <div className={`${styles.lightningEdge} ${styles.right}`}></div>
          <div className={`${styles.lightningEdge} ${styles.bottom}`}></div>
          <div className={`${styles.lightningEdge} ${styles.left}`}></div>
        </div>
        
        <button
          className={styles.closeButton}
          onClick={() => setIsVisible(false)}
          disabled={isSubmitting}
        >
          X
        </button>
        <div className={styles.headerContainer}>
          <img
            src="https://i.imgur.com/zQll9tI.png"
            alt="Logo"
            className={styles.logo}
          />
          <h2>Register now</h2>
        </div>

        {statusMessage.text && (
          <div className={`${styles.statusMessage} ${styles[statusMessage.type]}`}>
            {statusMessage.text}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name*"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength="50"
            disabled={isSubmitting}
          />
          <input
            type="email"
            placeholder="E-mail*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
          />
          <input
            type="tel"
            placeholder="Mobile Number*"
            value={mobile}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              setMobile(value);
            }}
            required
            pattern="\d{10}"
            maxLength="10"
            disabled={isSubmitting}
          />
          <input
            type="text"
            placeholder="Which course are you looking for?*"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
            maxLength="50"
            disabled={isSubmitting}
          />
          <input
            type="text"
            placeholder="Add your Location*"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            maxLength="20"
            disabled={isSubmitting}
          />
          <div className={styles.termsCheckbox}>
            <span>
              <input
                type="checkbox"
                id="terms"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                required
                disabled={isSubmitting}
              />
            </span>
            <label htmlFor="terms">
              I hereby accept the{" "}
              <a href="/terms" target="_blank" rel="noopener noreferrer">
                terms and conditions
              </a>{" "}
              and
              <a href="/privacy" target="_blank" rel="noopener noreferrer">
                {" "}
                privacy policy
              </a>{" "}
              of Connecting Dots ERP.
            </label>
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={isSubmitting ? styles.submitting : ""}
          >
            {isSubmitting ? (
              <>
                <span className={styles.buttonText}>Registering</span>
                <span className={styles.buttonLoader}></span>
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;