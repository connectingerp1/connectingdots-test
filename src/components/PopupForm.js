"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import styles from "@/styles/PopupForm.module.css";
import axios from "axios";

const PopupForm = ({ onSubmitData }) => {
  const [isVisible, setIsVisible] = useState(false);
  // Form state
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState(""); // This will now hold the select value
  const [location, setLocation] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [countryCode] = useState("+91");

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ text: "", type: "" });

  const pathname = usePathname();

  // Course options - same as StickyForm
  const courseOptions = [
    { value: "", label: "Select a course", disabled: true },
    { value: "SAP Course", label: "SAP Course" },
    { value: "IT Course", label: "IT Course" },
    { value: "Digital Marketing", label: "Digital Marketing" },
    { value: "Data Visualisation", label: "Data Visualisation" },
    { value: "HR Course", label: "HR Course" },
  ];

  useEffect(() => {
    const hiddenPages = [
      "/adminlogin",
      "/dashboard",
      "/blogsadmin",
      "/superadmin",
    ];

    const currentPath = pathname?.toLowerCase() || "";

    if (hiddenPages.some((page) => currentPath.startsWith(page))) {
      setIsVisible(false);
      return;
    }

    const showTimer = setTimeout(() => {
      if (!document.body.classList.contains(styles.popupClosedManually)) {
        setIsVisible(true);
      }
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

  useEffect(() => {
    let timer;
    if (statusMessage.text) {
      timer = setTimeout(() => {
        setStatusMessage({ text: "", type: "" });
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [statusMessage]);

  const validateForm = () => {
    if (!name.trim()) {
      setStatusMessage({ text: "Name is required.", type: "error" });
      return false;
    }
    if (!email.trim()) {
      setStatusMessage({ text: "Email is required.", type: "error" });
      return false;
    }
    if (!mobile.trim()) {
      setStatusMessage({ text: "Mobile number is required.", type: "error" });
      return false;
    }
    // Updated validation for select dropdown
    if (!course || course === "") {
      setStatusMessage({
        text: "Please select a course.",
        type: "error",
      });
      return false;
    }
    if (!location.trim()) {
      setStatusMessage({ text: "Location is required.", type: "error" });
      return false;
    }

    if (name.length > 50) {
      setStatusMessage({
        text: "Name should be less than 50 characters.",
        type: "error",
      });
      return false;
    }
    if (!/^\d{10}$/.test(mobile.replace(/\D/g, ""))) {
      setStatusMessage({
        text: "Please enter a valid 10-digit mobile number.",
        type: "error",
      });
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatusMessage({
        text: "Please enter a valid email address.",
        type: "error",
      });
      return false;
    }
    if (location.length > 100) {
      setStatusMessage({ text: "Location seems too long.", type: "error" });
      return false;
    }
    if (!isChecked) {
      setStatusMessage({
        text: "Please accept the terms and conditions.",
        type: "error",
      });
      return false;
    }

    setStatusMessage({ text: "", type: "" });
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setStatusMessage({ text: "", type: "" });

    const formData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      contact: mobile.replace(/\D/g, ""),
      countryCode: countryCode,
      coursename: course, // Now contains the selected course value
      location: location.trim(),
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      if (!apiUrl) {
        console.error("API URL (NEXT_PUBLIC_API_URL) is not set.");
        alert("Configuration error. Cannot submit form.");
        setIsSubmitting(false);
        return;
      }

      console.log("Submitting formData:", formData);

      const response = await axios.post(`${apiUrl}/api/submit`, formData);

      console.log("PopupForm submitted successfully:", response.data);
      setStatusMessage({
        text: response.data.message || "Registration complete!",
        type: "success",
      });

      if (typeof onSubmitData === "function") {
        onSubmitData(formData);
      }

      setTimeout(() => {
        setName("");
        setMobile("");
        setEmail("");
        setCourse(""); // Reset to empty value
        setLocation("");
        setIsChecked(false);
        setStatusMessage({ text: "", type: "" });
        setIsVisible(false);
        document.body.classList.add(styles.popupClosedManually);
      }, 2500);
    } catch (error) {
      console.error("--- Error During PopupForm Submission ---");
      console.error("Raw Error Object:", error);

      let alertMessage =
        "An error occurred while submitting. Please try again.";

      if (axios.isAxiosError(error)) {
        if (error.response) {
          const status = error.response.status;
          const responseData = error.response.data;
          console.error(`Response Status: ${status}`);
          console.error("Raw Response Data:", responseData);

          if (status === 400) {
            alertMessage =
              responseData?.message ||
              "Submission failed. Please check your input.";
            console.log("Backend 400 message for alert:", alertMessage);
          } else {
            alertMessage = `Submission failed due to a server issue (Status: ${status}). Please try again later.`;
          }
        } else if (error.request) {
          alertMessage =
            "Cannot reach the server. Check connection or try again later.";
        } else {
          alertMessage = `Application error before sending: ${error.message}`;
        }
      } else {
        alertMessage = `Unexpected application error: ${error.message || "Unknown error"}`;
      }
      alert(alertMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle manual close button click
  const handleClose = () => {
    setIsVisible(false);
    document.body.classList.add(styles.popupClosedManually);
  };

  // Handle click outside form to close
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Prevent form container clicks from closing the popup
  const handleFormClick = (e) => {
    e.stopPropagation();
  };

  if (!isVisible) return null;

  return (
    <div className={styles.popupFormOverlay} onClick={handleOverlayClick}>
      <div className={styles.popupFormContainer} onClick={handleFormClick}>
        {/* Video Background */}
        <video
          className={styles.videoBackground}
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/bg/bg7.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Enhanced lightning border effect */}
        <div className={styles.lightningBorder}>
          <div className={`${styles.lightningEdge} ${styles.top}`}></div>
          <div className={`${styles.lightningEdge} ${styles.right}`}></div>
          <div className={`${styles.lightningEdge} ${styles.bottom}`}></div>
          <div className={`${styles.lightningEdge} ${styles.left}`}></div>
        </div>

        {/* Enhanced close button */}
        <button
          className={styles.closeButton}
          onClick={handleClose}
          disabled={isSubmitting}
          aria-label="Close registration form"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4L4 12M4 4L12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className={styles.headerContainer}>
          <img
            src="/Navbar/Connecting Logo.avif"
            alt="Connecting Dots ERP Logo"
            className={styles.logo}
          />
          <h2>Register Now!</h2>
        </div>

        {statusMessage.text && (
          <div
            id="popup-status"
            className={`${styles.statusMessage} ${styles[statusMessage.type]}`}
            role={statusMessage.type === "error" ? "alert" : "status"}
            aria-live="polite"
          >
            {statusMessage.text}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            placeholder="Name*"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength="50"
            disabled={isSubmitting}
            aria-describedby="popup-status"
          />
          <input
            type="email"
            placeholder="E-mail*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
            aria-describedby="popup-status"
          />
          <input
            type="tel"
            inputMode="numeric"
            placeholder="Mobile Number*"
            value={mobile}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              if (value.length <= 10) {
                setMobile(value);
              }
            }}
            required
            pattern="\d{10}"
            maxLength="10"
            disabled={isSubmitting}
            aria-describedby="popup-status"
          />
          
          {/* REPLACED: Text input with Select dropdown */}
          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
            disabled={isSubmitting}
            aria-describedby="popup-status"
            className={styles.courseSelect} // Add specific class for styling if needed
          >
            {courseOptions.map((option) => (
              <option 
                key={option.value} 
                value={option.value} 
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Add your Location*"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            maxLength="100"
            disabled={isSubmitting}
            aria-describedby="popup-status"
          />
          <div className={styles.termsCheckbox}>
            <span>
              <input
                type="checkbox"
                id="popup-terms"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                required
                disabled={isSubmitting}
                aria-describedby="popup-status"
              />
            </span>
            <label htmlFor="popup-terms">
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