"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "@/styles/HomePage/ContactForm.module.css"; // Import module CSS
import axios from "axios"; // Make sure axios is imported
import { IonIcon } from "@ionic/react";
import { personOutline, mailOutline, callOutline } from "ionicons/icons";

// Define countryCodes array (assuming this is correct for your needs)
const countryCodes = [
  { code: "+1", country: "USA", minLength: 10, maxLength: 10 },
  { code: "+91", country: "India", minLength: 10, maxLength: 10 },
  { code: "+44", country: "UK", minLength: 10, maxLength: 11 },
  { code: "+61", country: "Australia", minLength: 9, maxLength: 9 },
  { code: "+81", country: "Japan", minLength: 10, maxLength: 11 },
  { code: "+49", country: "Germany", minLength: 10, maxLength: 11 },
  { code: "+33", country: "France", minLength: 9, maxLength: 9 },
  { code: "+86", country: "China", minLength: 11, maxLength: 11 },
  { code: "+7", country: "Russia", minLength: 10, maxLength: 10 },
  { code: "+39", country: "Italy", minLength: 9, maxLength: 10 },
  { code: "+55", country: "Brazil", minLength: 10, maxLength: 11 },
  { code: "+34", country: "Spain", minLength: 9, maxLength: 9 },
  { code: "+27", country: "South Africa", minLength: 9, maxLength: 9 },
  { code: "+971", country: "UAE", minLength: 9, maxLength: 9 },
  { code: "+62", country: "Indonesia", minLength: 10, maxLength: 12 },
  { code: "+90", country: "Turkey", minLength: 10, maxLength: 10 },
  { code: "+82", country: "South Korea", minLength: 9, maxLength: 10 },
  { code: "+60", country: "Malaysia", minLength: 9, maxLength: 10 },
  { code: "+31", country: "Netherlands", minLength: 9, maxLength: 9 },
  { code: "+52", country: "Mexico", minLength: 10, maxLength: 10 },
];

const ContactForm = ({ course, formData, onClose }) => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    contact: "",
    countryCode: "+91", // Default country code
    // Add course and location if they should be part of the form state explicitly
    // coursename: course || "",
    // location: "", // Or derive location if needed
  });
  const [errors, setErrors] = useState({});
  const [isThankYouVisible, setThankYouVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  // Initialize form state from formData prop if provided
  // This seems specific to your use case, keeping it as is.
  useEffect(() => {
    if (formData?.fields) {
      const initialFormValues = formData.fields.reduce((acc, field) => {
        acc[field.name] = "";
        return acc;
      }, {});
      setFormValues((prev) => ({
        ...prev, // Keep default country code
        ...initialFormValues,
        countryCode: prev.countryCode || "+91", // Ensure countryCode isn't overwritten if not in fields
      }));
    }
  }, [formData]);

  // Intersection observer for animation/lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // Disconnect once in view
        }
      },
      { threshold: 0.1 } // Trigger when 10% is visible
    );

    const currentFormRef = formRef.current; // Capture ref value
    if (currentFormRef) {
      observer.observe(currentFormRef);
    }

    // Cleanup function
    return () => {
      if (currentFormRef) {
        observer.unobserve(currentFormRef);
      }
      observer.disconnect();
    };
  }, []); // Empty dependency array ensures this runs only on mount/unmount

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    let processedValue = value;
    if (name === "contact") {
      // Allow only digits for phone numbers
      processedValue = value.replace(/\D/g, "");
    }

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: processedValue,
    }));

    // Clear the specific error when the user starts typing in that field
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }
  };

  // Frontend validation logic
  const validate = () => {
    const newErrors = {};
    const { name, email, contact, countryCode } = formValues;

    if (!name || !name.trim()) {
      newErrors.name = "Name is required";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Find selected country for validation rules
    const selectedCountry = countryCodes.find((c) => c.code === countryCode);

    if (selectedCountry) {
      const { minLength, maxLength } = selectedCountry;
      const contactDigits = contact.replace(/\D/g, ""); // Ensure we're checking digits

      if (
        !contactDigits ||
        contactDigits.length < minLength ||
        contactDigits.length > maxLength
      ) {
        newErrors.contact = `Please enter a valid ${minLength === maxLength ? minLength : `${minLength}-${maxLength}`}-digit number for ${selectedCountry.country}`;
      } else if (!/^\d+$/.test(contactDigits)) {
        // This check might be redundant due to the replace(/\D/g, '') in handleChange, but good as a safeguard
        newErrors.contact = "Phone number should contain only digits";
      }
    } else {
      // Fallback if country code somehow isn't found (shouldn't happen with select)
      if (!contact || !/^\d{7,15}$/.test(contact.replace(/\D/g, ""))) {
        // Generic length check
        newErrors.contact = "Please enter a valid phone number";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Perform frontend validation first
    if (!validate()) {
      // Find the first error to alert (optional, errors are shown below fields)
      const firstErrorKey = Object.keys(errors).find((key) => errors[key]);
      if (firstErrorKey) {
        // You could alert here, but inline errors are generally better UX
        // alert(errors[firstErrorKey]);
        console.log("Frontend validation failed:", errors);
      }
      return; // Stop submission if validation fails
    }

    setIsLoading(true); // Show loading indicator

    // Prepare data payload (ensure all necessary fields are included)
    const payload = {
      ...formValues,
      coursename: course || formData?.courseName || "Not Specified", // Include course name if available
      // location: formValues.location || "Not Specified" // Include location if tracked
    };

    try {
      // --- Send data to backend API ---
      // Use environment variable for API URL
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || ""; // Provide a fallback if needed
      if (!apiUrl) {
        console.error(
          "API URL environment variable (NEXT_PUBLIC_API_URL) is not set."
        );
        alert("Configuration error. Cannot submit form.");
        setIsLoading(false);
        return;
      }

      const response = await axios.post(`${apiUrl}/api/submit`, payload);

      // --- Handle Success ---
      console.log("Form submitted successfully:", response.data);
      setIsLoading(false);
      setThankYouVisible(true); // Show thank you message

      // Reset form fields after successful submission (optional)
      // setFormValues({ name: "", email: "", contact: "", countryCode: "+91" });

      // Close the form/modal after a delay
      setTimeout(() => {
        setThankYouVisible(false);
        if (onClose) onClose(); // Call the onClose prop if provided
      }, 3000); // 3 seconds delay
    } catch (error) {
      // --- Handle Errors ---
      setIsLoading(false); // Hide loading indicator
      console.error("Error submitting form:", error); // Log the full error

      let errorMessage =
        "An error occurred while submitting the form. Please try again later."; // Default generic error

      if (axios.isAxiosError(error) && error.response) {
        // Handle HTTP errors from the backend
        console.error("Backend Response Status:", error.response.status);
        console.error("Backend Response Data:", error.response.data);

        if (error.response.status === 400) {
          // Specifically handle 400 Bad Request (validation errors, duplicates)
          // Use the specific message provided by the backend
          errorMessage =
            error.response.data.message ||
            "Submission failed. Please check your input and try again.";
        } else {
          // Handle other server errors (5xx, 404, etc.)
          errorMessage = `Server error (${error.response.status}). Please try again later.`;
        }
      } else if (error.request) {
        // Handle network errors (request made but no response received)
        errorMessage =
          "Network error. Please check your internet connection and try again.";
      } else {
        // Handle other errors (e.g., setup errors in the request)
        errorMessage = `Error: ${error.message}. Please try again.`;
      }

      alert(errorMessage); // Show the determined error message to the user
    }
  };

  // ---- Render Logic ----

  // Return null if essential formData is missing
  if (!formData) {
    console.warn("ContactForm rendered without formData prop.");
    return null; // Or render a placeholder/error state
  }

  // Calculate placeholder text based on selected country
  const selectedCountryInfo = countryCodes.find(
    (c) => c.code === formValues.countryCode
  );
  const contactPlaceholder = selectedCountryInfo
    ? `${
        selectedCountryInfo.minLength === selectedCountryInfo.maxLength
          ? selectedCountryInfo.minLength
          : `${selectedCountryInfo.minLength}-${selectedCountryInfo.maxLength}`
      } digit number`
    : "Contact Number";

  // Determine button text (handling potential "Demo Demo" issue)
  const rawButtonText = formData.submitButton || "Submit";
  const buttonText = rawButtonText.includes("Demo Demo")
    ? rawButtonText.replace(/Demo\s*Demo/, "Demo").trim()
    : rawButtonText;

  return (
    <div className={styles.modalOverlay}>
      {/* Add animation class based on isInView state */}
      <div
        className={`${styles.modalContent} ${isInView ? styles.backgroundLoaded : ""}`}
        ref={formRef}
      >
        {/* Close Button */}
        <span
          className={styles.closeBtnContact}
          onClick={onClose}
          role="button"
          aria-label="Close form"
        >
          &times;
        </span>

        {/* Form Element */}
        <form className={styles.contactForm} onSubmit={handleSubmit} noValidate>
          {/* Form Title/Header (Optional) */}
          {/* <h2>{formData.title || "Contact Us"}</h2> */}

          {/* Name Field */}
          <div className={styles.contactFormGroup}>
            <label htmlFor="name" className={styles.srOnly}>
              Your Name
            </label>{" "}
            {/* Added label */}
            <div className={styles.inputWithIcon}>
              <input
                type="text"
                id="name"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                placeholder="Your Name"
                className={errors.name ? styles.inputError : ""}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                required
              />
              <IonIcon icon={personOutline} aria-hidden="true" />
            </div>
            {errors.name && (
              <span id="name-error" className={styles.errorText} role="alert">
                {errors.name}
              </span>
            )}
          </div>

          {/* Email Field */}
          <div className={styles.contactFormGroup}>
            <label htmlFor="email" className={styles.srOnly}>
              Your Email
            </label>{" "}
            {/* Added label */}
            <div className={styles.inputWithIcon}>
              <input
                type="email"
                id="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                placeholder="Your Email"
                className={errors.email ? styles.inputError : ""}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                required
              />
              <IonIcon icon={mailOutline} aria-hidden="true" />
            </div>
            {errors.email && (
              <span id="email-error" className={styles.errorText} role="alert">
                {errors.email}
              </span>
            )}
          </div>

          {/* Country Code and Contact Number Field */}
          <div className={styles.contactFormGroup}>
            {/* Combine labels logically if possible, or use aria-label */}
            <label htmlFor="countryCode" className={styles.srOnly}>
              Country Code
            </label>
            <label htmlFor="contact" className={styles.srOnly}>
              Contact Number
            </label>
            <div className={styles.inputWithIcon}>
              {/* Country Code Dropdown */}
              <select
                id="countryCode"
                name="countryCode"
                value={formValues.countryCode}
                onChange={handleChange}
                className={styles.selectCountryCode}
                aria-label="Select your country code"
              >
                {countryCodes.map(({ code, country }) => (
                  <option key={code} value={code}>
                    {`${code} (${country})`} {/* Clearer format */}
                  </option>
                ))}
              </select>
              {/* Contact Number Input */}
              <input
                type="tel" // Use "tel" type for semantic meaning and mobile keyboards
                inputMode="numeric" // Suggest numeric keyboard
                id="contact"
                name="contact"
                value={formValues.contact}
                onChange={handleChange}
                placeholder={contactPlaceholder}
                className={`${styles.contactInput} ${errors.contact ? styles.inputError : ""}`} // Added specific class if needed
                maxLength={selectedCountryInfo?.maxLength || 15} // Dynamic max length
                aria-invalid={!!errors.contact}
                aria-describedby={errors.contact ? "contact-error" : undefined}
                required
              />
              <IonIcon icon={callOutline} aria-hidden="true" />
            </div>
            {errors.contact && (
              <span
                id="contact-error"
                className={styles.errorText}
                role="alert"
              >
                {errors.contact}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={styles.submitBtnContact}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : buttonText}
          </button>
        </form>

        {/* Thank You Popup */}
        {isThankYouVisible && (
          <div className={styles.thankYouPopup} role="status">
            {" "}
            {/* Added role */}
            <p>🎉 Thank you for submitting! We'll get back to you soon.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
