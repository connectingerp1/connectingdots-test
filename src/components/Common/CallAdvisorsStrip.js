"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "@/styles/Common/CallAdvisorsStrip.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faWhatsapp, faYoutube, faLinkedinIn, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const CallAdvisorsStrip = () => {
  const [advisorsContact, setAdvisorsContact] = useState("");
  const [location, setLocation] = useState("default");

  // useEffect(() => {
  //   fetch("/Jsonfolder/datacontact.json")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setAdvisorsContact(
  //         data[location]?.advisorsContact || data["default"].advisorsContact
  //       );
  //     });
  // }, [location]);

  return (
    <div className={styles.callAdvisorsStrip}>
      {/* Right side content */}
      <div className={styles.rightStripContent}>
        <div>
          <div className={styles.socialIconsStrip}>
            <Link href="https://www.facebook.com/sapinstallation.pune.9">
              <FontAwesomeIcon 
                icon={faFacebookF} 
                className="hover:text-blue-600 transition duration-300" 
                alt="Facebook"
              />
            </Link>
            <Link href="https://wa.me/919004002941">
              <FontAwesomeIcon 
                icon={faWhatsapp} 
                className="hover:text-green-500 transition duration-300" 
                alt="WhatsApp"
              />
            </Link>
            <Link href="https://youtube.com/@connectingdotserp?si=hSKEiEg3MdytdEe_">
              <FontAwesomeIcon 
                icon={faYoutube} 
                className="hover:text-red-600 transition duration-300" 
                alt="YouTube"
              />
            </Link>
            <Link href="https://in.linkedin.com/in/connecting-dots-erp-043039171">
              <FontAwesomeIcon 
                icon={faLinkedinIn} 
                className="hover:text-blue-700 transition duration-300" 
                alt="LinkedIn"
              />
            </Link>
            <Link href="https://www.instagram.com/connecting_dots_sap_training?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
              <FontAwesomeIcon 
                icon={faInstagram} 
                className="hover:text-pink-500 transition duration-300" 
                alt="Instagram"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Left side content (Call Advisors) */}
      <div className={styles.leftStripContent}>
        <span className={styles.phoneIcon}>
          <FontAwesomeIcon icon={faPhone} alt="Phone" />
        </span>
        <span className={styles.advisorText}>
          Get Free Career Counselling: 9004008253
        </span>
        <Link
          href={`tel:${advisorsContact}`}
          className={`${styles.advisorNumber} text-decoration-none`}
        >
          {advisorsContact}
        </Link>
      </div>
    </div>
  );
};

export default CallAdvisorsStrip;
