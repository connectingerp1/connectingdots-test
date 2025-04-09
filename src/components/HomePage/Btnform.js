"use client";

import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "@/styles/HomePage/Btnform.module.css";
import { User, Mail, Phone, MapPin, X, CheckCircle } from "lucide-react";

// Country codes with flags (Unicode) and phone number lengths
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

const Btnform = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    location: "",
    countryCode: "+91",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailPattern.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Get the selected country's phone number requirements
    const selectedCountry = countryCodes.find(
      (country) => country.code === formData.countryCode
    );
    const { minLength, maxLength } = selectedCountry;

    // Check if the phone number length is within the valid range for the selected country
    if (
      !formData.contact ||
      formData.contact.length < minLength ||
      formData.contact.length > maxLength
    ) {
      newErrors.contact = `Please enter a valid ${
        minLength === maxLength ? minLength : `${minLength}-${maxLength}`
      }-digit number for ${selectedCountry.country}`;
    }

    // Check if the contact contains only digits
    if (formData.contact && !/^\d+$/.test(formData.contact)) {
      newErrors.contact = "Phone number should contain only digits";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "contact") {
      // Allow only digits for phone numbers
      const digitsOnly = value.replace(/\D/g, "");
      setFormData((prev) => ({
        ...prev,
        [name]: digitsOnly,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/submit`,
        formData
      );

      setShowThankYou(true);
      setTimeout(() => {
        setShowThankYou(false);
        onClose();
      }, 3000);

      // Reset form
      setFormData({
        name: "",
        email: "",
        contact: "",
        location: "",
        countryCode: "+91",
      });
    } catch (error) {
      alert("An error occurred while submitting the form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Find the selected country to display length requirements
  const selectedCountry = countryCodes.find(
    (country) => country.code === formData.countryCode
  );
  const placeholderText = selectedCountry
    ? `Enter ${
        selectedCountry.minLength === selectedCountry.maxLength
          ? selectedCountry.minLength
          : `${selectedCountry.minLength}-${selectedCountry.maxLength}`
      } digit number`
    : "Enter phone number";

  return (
    <div className={styles.formModal}>
      <div className={styles.formContainer}>
        <button
          onClick={onClose}
          className={styles.closeButton}
          aria-label="Close form"
        >
          <X size={24} />
        </button>

        <div className={styles.formHeader}>
          <img
            src="https://mlir9digcwm2.i.optimole.com/cb:X1mK.5e5cf/w:620/h:191/q:mauto/https://connectingdotserp.in/wp-content/uploads/2024/07/Original-Logo.png"
            alt="Company Logo"
            className={styles.logo}
          />
          <h2>Get In Touch with Our Team!</h2>
          <p>We&apos;d love to hear from you! Fill out the form below.</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.contactForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Full Name</label>
            <div className={styles.inputWrapper}>
              <User className={styles.inputIcon} />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`${styles.formInput} ${
                  errors.name ? styles.inputError : ""
                }`}
              />
            </div>
            {errors.name && (
              <span className={styles.errorText}>{errors.name}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            <div className={styles.inputWrapper}>
              <Mail className={styles.inputIcon} />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`${styles.formInput} ${
                  errors.email ? styles.inputError : ""
                }`}
              />
            </div>
            {errors.email && (
              <span className={styles.errorText}>{errors.email}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="contact">Phone Number</label>
            <div className={styles.phoneInputWrapper}>
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className={styles.countryCodeSelect}
              >
                {countryCodes.map(({ code, country }) => (
                  <option key={code} value={code}>
                    {code} {country}
                  </option>
                ))}
              </select>
              <div className={styles.phoneNumberWrapper}>
                <Phone className={styles.inputIco} />
                <input
                  type="tel"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder={placeholderText}
                  className={`${styles.phoneNumberInput} ${
                    errors.contact ? styles.inputError : ""
                  }`}
                  maxLength={selectedCountry?.maxLength || 15}
                />
              </div>
            </div>
            {errors.contact && (
              <span className={styles.errorText}>{errors.contact}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="location">Location</label>
            <div className={styles.inputWrapper}>
              <MapPin className={styles.inputIcon} />
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter your location"
                className={`${styles.formInput} ${
                  errors.location ? styles.inputError : ""
                }`}
              />
            </div>
            {errors.location && (
              <span className={styles.errorText}>{errors.location}</span>
            )}
          </div>

          <div className={styles.formActions}>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
            <button
              type="reset"
              className={styles.resetButton}
              onClick={() =>
                setFormData({
                  name: "",
                  email: "",
                  contact: "",
                  location: "",
                  countryCode: "+91",
                })
              }
            >
              Clear Form
            </button>
          </div>
        </form>
      </div>

      {showThankYou && (
        <div className={styles.thankYouOverlay}>
          <div className={styles.thankYouContent}>
            <CheckCircle size={64} color="#28a745" />
            <h2>Thank You!</h2>
            <p>Your message has been successfully submitted.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Btnform;
