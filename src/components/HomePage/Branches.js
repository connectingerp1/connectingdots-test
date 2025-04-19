"use client";

import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import styles from "@/styles/HomePage/OurBranches.module.css";

// Branches data
const branches = [
  {
    city: "Pune",
    address:
      "1st Floor,101, Police, Wireless Colony, Vishal Nagar, Pimple Nilakh, Pune, Pimpri-Chinchwad, Maharashtra 411027",
    position: { lat: 18.588048051275003, lng: 73.78119014757031 },
    mapLink: "https://maps.app.goo.gl/DNwzKa2Yt1WB6zUB7",
  },
  {
    city: "Mumbai",
    address:
      "4th Floor, Ram Niwas, B-404, Gokhale Rd, near McDonald's, Dada Patil Wadi, Naupada, Thane West, Thane, Maharashtra 400602",
    position: { lat: 19.259055941077712, lng: 72.96564544031934 },
    mapLink: "https://maps.app.goo.gl/i7W3baVVS1mDLmTJ9",
  },
  {
    city: "Raipur",
    address: "New Panchsheel Nagar, Civil Lines, Raipur, Chhattisgarh 492001",
    position: { lat: 21.23944689267376, lng: 81.65363342070017 },
    mapLink: "https://maps.app.goo.gl/1KA1uhcyoF5Tu4Mg6",
  },
];

const Branches = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDBGFl3pJw6rBm6R0eX5vPZNLVkZgfcvh8",
  });

  const containerStyle = {
    width: "100%",
    height: "200px",
  };

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <div className={styles.branchesSection}>
      <h2 className={styles.branchesTitle}>Our Branches</h2>
      <div className={styles.titleUnderline}></div>
      <div className={styles.branchesContainer}>
        {branches.map((branch, index) => (
          <div className={styles.branchCard} key={index}>
            <h3>{branch.city}</h3>

            {/* Accessible area for the Map */}
            <div
              className={styles.mapContainer}
              aria-label={`Map showing the location of our branch in ${branch.city}: ${branch.address}`}
              role="region"
            >
              {/* Visually hidden alternative for screen readers */}
              <span className={styles.srOnly}>
                Map of our {branch.city} branch location: {branch.address}
              </span>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={branch.position}
                zoom={13}
              >
                <Marker position={branch.position} />
              </GoogleMap>
            </div>

            <div className={styles.add2}>
              <a
                href={branch.mapLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {branch.address}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Branches;
