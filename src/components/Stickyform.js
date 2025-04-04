"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "@/styles/Stickyform.module.css";
import { usePathname } from "next/navigation";

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

const SContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    course: "",
    email: "",
    countryCode: "+91",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const footerRef = useRef(null);
  
  const pathname = usePathname();

  useEffect(() => {
    // When component mounts, find the footer element in the DOM
    const footerElement = document.querySelector('footer');
    if (footerElement) {
      footerRef.current = footerElement;
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      setIsMobileView(isMobile);
      
      // On resize, check footer visibility to set form state
      if (!isMobile) {
        checkFooterVisibility();
      } else {
        setIsFormVisible(false);
      }
    };

    // Function to check if any part of the footer is visible
    const checkFooterVisibility = () => {
      if (!footerRef.current) return;
      
      const rect = footerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // If ANY part of the footer is visible in the viewport, hide the form
      if (rect.top < windowHeight && rect.bottom >= 0) {
        setIsFormVisible(false);
      } else {
        // Footer is not in viewport at all
        setIsFormVisible(true);
      }
    };

    const handleScroll = () => {
      if (!isMobileView) {
        checkFooterVisibility();
        
        // Extra check for when scrolled to bottom of page
        const isAtBottom = 
          window.innerHeight + window.scrollY >= 
          document.documentElement.scrollHeight - 20; // 20px buffer
          
        if (isAtBottom) {
          setIsFormVisible(false);
        }
      }
    };

    // Initialize
    handleResize();
    
    // Add event listeners
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobileView, pathname]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "contact") {
      // Allow only digits for phone numbers
      const digitsOnly = value.replace(/\D/g, '');
      setFormData({ ...formData, [name]: digitsOnly });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

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
    const selectedCountry = countryCodes.find(country => country.code === formData.countryCode);
    if (selectedCountry) {
      const { minLength, maxLength } = selectedCountry;
      
      // Check if the phone number length is within the valid range for the selected country
      if (!formData.contact || formData.contact.length < minLength || formData.contact.length > maxLength) {
        newErrors.contact = `Please enter a valid ${minLength === maxLength ? minLength : `${minLength}-${maxLength}`}-digit number for ${selectedCountry.country}`;
      }
    } else {
      newErrors.contact = "Please select a valid country code";
    }

    // Check if the contact contains only digits
    if (formData.contact && !/^\d+$/.test(formData.contact)) {
      newErrors.contact = "Phone number should contain only digits";
    }

    if (!formData.course) {
      newErrors.course = "Please select a course";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      // Show the first error
      alert(Object.values(errors)[0]);
      return;
    }
    
    setIsSubmitting(true);

    const submissionData = {
      name: formData.name.trim(),
      contact: formData.contact,
      countryCode: formData.countryCode,
      email: formData.email.trim(),
      coursename: formData.course,
    };

    try {
      const response = await axios.post("https://serverbackend-0nvg.onrender.com/api/submit", submissionData);

      if (response.status === 200) {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
        setFormData({ name: "", contact: "", course: "", email: "", countryCode: "+91" });
        setIsFormVisible(false);
        alert("Thank You! Form successfully submitted.");
      } else {
        alert("Failed to submit the form. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred while submitting the form.");
    }
    setIsSubmitting(false);
  };

  // Find the selected country to display length requirements in placeholder
  const selectedCountry = countryCodes.find(country => country.code === formData.countryCode);
  const contactPlaceholder = selectedCountry 
    ? `Enter ${selectedCountry.minLength === selectedCountry.maxLength 
        ? selectedCountry.minLength 
        : `${selectedCountry.minLength}-${selectedCountry.maxLength}`} digits`
    : "Enter phone number";

  return (
    <>
      {!isMobileView && isFormVisible && (
        <div className={styles.stickyformContainer}>
          <form onSubmit={handleSubmit} className={styles.contactFormS}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="E.g., Ram" 
                  value={formData.name} 
                  onChange={handleChange} 
                  className={errors.name ? styles.inputError : ""}
                  required 
                  maxLength="50" 
                />
                {errors.name && <span className={styles.errorText}>{errors.name}</span>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="E.g., ram@gmail.com" 
                  value={formData.email} 
                  onChange={handleChange} 
                  className={errors.email ? styles.inputError : ""}
                  required 
                />
                {errors.email && <span className={styles.errorText}>{errors.email}</span>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="contact">Contact Number</label>
                <div className={styles.contactField}>
                  <select 
                    id="countryCode" 
                    name="countryCode" 
                    value={formData.countryCode} 
                    onChange={handleChange}
                  >
                    {countryCodes.map(({ code, country }) => (
                      <option key={code} value={code}>
                        ({code}) {country}
                      </option>
                    ))}
                  </select>
                  <input 
                    type="text" 
                    id="contact" 
                    name="contact" 
                    placeholder={contactPlaceholder} 
                    value={formData.contact} 
                    onChange={handleChange} 
                    className={errors.contact ? styles.inputError : ""}
                    maxLength={selectedCountry?.maxLength || 15} 
                    required 
                  />
                </div>
                {errors.contact && <span className={styles.errorText}>{errors.contact}</span>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="course">Course</label>
                <select 
                  id="course" 
                  name="course" 
                  value={formData.course} 
                  onChange={handleChange}
                  className={errors.course ? styles.inputError : ""}
                  required
                >
                  <option value="" disabled>Select a course</option>
                  <option value="SAP">SAP</option>
                  <option value="IT Courses">IT Courses</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Data Visualisation">Data Visualisation</option>
                  <option value="HR Courses">HR Courses</option>
                </select>
                {errors.course && <span className={styles.errorText}>{errors.course}</span>}
              </div>
              <div className={styles.formGroup}>
                <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {showPopup && <div className={styles.popup}>Thank you for submitting!</div>}
    </>
  );
};

export default SContactForm;