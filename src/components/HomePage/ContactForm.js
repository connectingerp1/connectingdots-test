"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "@/styles/HomePage/ContactForm.module.css"; // Import module CSS
import axios from "axios";
import { IonIcon } from "@ionic/react";
import { personOutline, mailOutline, callOutline } from "ionicons/icons";

// Define countryCodes array with phone number length requirements
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
  });
  const [errors, setErrors] = useState({});
  const [isThankYouVisible, setThankYouVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const formRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (formData?.fields) {
      const initialFormValues = formData.fields.reduce((acc, field) => {
        acc[field.name] = "";
        return acc;
      }, {});
      setFormValues({ ...initialFormValues, countryCode: "+91" }); // Ensure countryCode is set
    }
  }, [formData]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (formRef.current) observer.observe(formRef.current);

    return () => observer.disconnect();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    
    if (name === "contact") {
      // Allow only digits for phone numbers
      const digitsOnly = value.replace(/\D/g, '');
      setFormValues({ ...formValues, [name]: digitsOnly });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formValues.name || !formValues.name.trim()) {
      newErrors.name = "Name is required";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formValues.email || !emailPattern.test(formValues.email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Get the selected country's phone number requirements
    const selectedCountry = countryCodes.find(country => country.code === formValues.countryCode);
    const { minLength, maxLength } = selectedCountry;
    
    // Check if the phone number length is within the valid range for the selected country
    if (!formValues.contact || formValues.contact.length < minLength || formValues.contact.length > maxLength) {
      newErrors.contact = `Please enter a valid ${minLength === maxLength ? minLength : `${minLength}-${maxLength}`}-digit number for ${selectedCountry.country}`;
    }

    // Check if the contact contains only digits
    if (formValues.contact && !/^\d+$/.test(formValues.contact)) {
      newErrors.contact = "Phone number should contain only digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Validate form before submission
    if (!validate()) {
      // Display first error
      const firstError = Object.values(errors)[0];
      alert(firstError);
      return;
    }
    
    setIsLoading(true); // Start loading

    try {
      await axios.post("https://serverbackend-0nvg.onrender.com/api/submit", formValues);

      setIsLoading(false);
      setThankYouVisible(true);

      setTimeout(() => {
        setThankYouVisible(false);
        onClose(); // Close form after showing Thank You
      }, 3000);
    } catch (error) {
      setIsLoading(false);
      console.error("Error submitting form:", error);

      if (error.response?.status === 400) {
        alert(error.response.data.message || "Email already exists. Try another email.");
      } else {
        alert("An error occurred while submitting the form.");
      }
    }
  };

  if (!formData) return null;

  // Find the selected country to display length requirements in placeholder
  const selectedCountry = countryCodes.find(country => country.code === formValues.countryCode);
  const contactPlaceholder = selectedCountry 
    ? `${selectedCountry.minLength === selectedCountry.maxLength 
        ? selectedCountry.minLength 
        : `${selectedCountry.minLength}-${selectedCountry.maxLength}`} digit number`
    : "Contact Number";

  const buttonText = formData.submitButton?.includes("Demo")
    ? formData.submitButton.replace(/Demo\s*Demo/, "Demo")
    : formData.submitButton || "Submit";

  return (
    <div className={styles.modalOverlay}>
      <div className={`${styles.modalContent} ${isInView ? styles.backgroundLoaded : ""}`} ref={formRef}>
        <span className={styles.closeBtnContact} onClick={onClose}>
          &times;
        </span>

        <form className={styles.contactForm} onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className={styles.contactFormGroup}>
            <div className={styles.inputWithIcon}>
              <input
                type="text"
                id="name"
                name="name"
                value={formValues["name"] || ""}
                onChange={handleChange}
                placeholder="Your Name"
                className={errors.name ? styles.inputError : ""}
                required
              />
              <IonIcon icon={personOutline} />
            </div>
            {errors.name && <span className={styles.errorText}>{errors.name}</span>}
          </div>

          {/* Email Field */}
          <div className={styles.contactFormGroup}>
            <div className={styles.inputWithIcon}>
              <input
                type="email"
                id="email"
                name="email"
                value={formValues["email"] || ""}
                onChange={handleChange}
                placeholder="Your Email"
                className={errors.email ? styles.inputError : ""}
                required
              />
              <IonIcon icon={mailOutline} />
            </div>
            {errors.email && <span className={styles.errorText}>{errors.email}</span>}
          </div>

          {/* Country Code and Contact Number Field */}
          <div className={styles.contactFormGroup}>
            <div className={styles.inputWithIcon}>
              {/* Country Code Dropdown */}
              <select
                id="countryCode"
                name="countryCode"
                value={formValues["countryCode"] || "+91"} // Default to India
                onChange={handleChange}
                className={styles.selectCountryCode}
              >
                {countryCodes.map(({ code, country }) => (
                  <option key={code} value={code}>
                    {`${code} ${country}`} {/* Display both code and country */}
                  </option>
                ))}
              </select>
              {/* Contact Number Input */}
              <input
                type="tel"
                id="contact"
                name="contact"
                value={formValues["contact"] || ""}
                onChange={handleChange}
                placeholder={contactPlaceholder}
                className={errors.contact ? styles.inputError : ""}
                maxLength={selectedCountry?.maxLength || 15}
                required
              />
              <IonIcon icon={callOutline} />
            </div>
            {errors.contact && <span className={styles.errorText}>{errors.contact}</span>}
          </div>

          {/* Submit Button */}
          <button type="submit" className={styles.submitBtnContact} disabled={isLoading}>
            {isLoading ? "Submitting..." : buttonText}
          </button>
        </form>

        {/* Thank You Popup */}
        {isThankYouVisible && (
          <div className={styles.thankYouPopup}>
            <p>🎉 Thank you for submitting! We'll get back to you soon.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactForm;