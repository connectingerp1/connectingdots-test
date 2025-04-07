"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaSearch,
  FaFilter,
  FaBuilding,
} from "react-icons/fa";
import { MdEmail, MdLocationCity } from "react-icons/md";
import styles from "@/styles/CitySitemap/CitySitemap.module.css";

const CitySitemap = () => {
  // States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [filteredCities, setFilteredCities] = useState([]);

  // Cities data with added region for filtering
  const cities = [
    { name: "Pune", slug: "pune", region: "West", popular: true },
    { name: "Katraj", slug: "katraj", region: "West", popular: true },
    { name: "Pimpri-Chinchwad", slug: "pimpri-chinchwad", region: "West", popular: true }, 
    { name: "Mumbai", slug: "mumbai", region: "West", popular: true },
    { name: "Delhi", slug: "delhi", region: "North", popular: true },
    { name: "Kolkata", slug: "kolkata", region: "East", popular: true },
    { name: "Chennai", slug: "chennai", region: "South", popular: true },
    { name: "Bangalore", slug: "bangalore", region: "South", popular: true },
    { name: "Hyderabad", slug: "hyderabad", region: "South", popular: true },
    { name: "Ahmedabad", slug: "ahmedabad", region: "West", popular: false },
    { name: "Jaipur", slug: "jaipur", region: "North", popular: false },
    { name: "Lucknow", slug: "lucknow", region: "North", popular: false },
    { name: "Kanpur", slug: "kanpur", region: "North", popular: false },
    { name: "Nagpur", slug: "nagpur", region: "West", popular: false },
    { name: "Patna", slug: "patna", region: "East", popular: false },
    { name: "Indore", slug: "indore", region: "Central", popular: false },
    { name: "Bhopal", slug: "bhopal", region: "Central", popular: false },
    {
      name: "Visakhapatnam",
      slug: "visakhapatnam",
      region: "South",
      popular: false,
    },
    { name: "Vadodara", slug: "vadodara", region: "West", popular: false },
    { name: "Ludhiana", slug: "ludhiana", region: "North", popular: false },
    { name: "Agra", slug: "agra", region: "North", popular: false },
    { name: "Nashik", slug: "nashik", region: "West", popular: false },
    { name: "Rajkot", slug: "rajkot", region: "West", popular: false },
    { name: "Varanasi", slug: "varanasi", region: "North", popular: false },
    { name: "Kerala", slug: "kerala", region: "South", popular: false },
    { name: "Surat", slug: "surat", region: "West", popular: false },
    { name: "Dehradun", slug: "dehradun", region: "North", popular: false },
    { name: "Madurai", slug: "madurai", region: "South", popular: false },
    { name: "Mysore", slug: "mysore", region: "South", popular: false },
    {
      name: "Pondicherry",
      slug: "pondicherry",
      region: "South",
      popular: false,
    },
    { name: "Ranchi", slug: "ranchi", region: "East", popular: false },
    { name: "Coimbatore", slug: "coimbatore", region: "South", popular: false },
    { name: "Chandigarh", slug: "chandigarh", region: "North", popular: false },
    {
      name: "Bhubaneswar",
      slug: "bhubaneswar",
      region: "East",
      popular: false,
    },
    { name: "Tirupati", slug: "tirupati", region: "South", popular: false },
    { name: "Vizag", slug: "vizag", region: "South", popular: false },
    { name: "Trivandrum", slug: "trivandrum", region: "South", popular: false },
    { name: "Jalandhar", slug: "jalandhar", region: "North", popular: false },
    { name: "Mohali", slug: "mohali", region: "North", popular: false },
    { name: "Raipur", slug: "raipur", region: "Central", popular: false },
    { name: "Cochin", slug: "cochin", region: "South", popular: false },
    { name: "Mangalore", slug: "mangalore", region: "South", popular: false },
  ];

  // Regions for filtering
  const regions = ["All", "North", "South", "East", "West", "Central"];

  // Popular cities section
  const popularCities = cities.filter((city) => city.popular);

  // Filtering logic
  useEffect(() => {
    const results = cities.filter((city) => {
      const matchesSearch = city.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesRegion =
        selectedRegion === "All" || city.region === selectedRegion;
      return matchesSearch && matchesRegion;
    });
    setFilteredCities(results);
  }, [searchTerm, selectedRegion]);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.sitemapContainer}>
        {/* Header Section */}
        <div className={styles.sitemapHeader}>
          <h2>Find Training Programs in Your City</h2>
          <p>
            Connecting Dots ERP offers specialized training programs across
            India
          </p>
        </div>

        {/* Popular Cities Section */}
        <div className={styles.popularCitiesSection}>
          <h3>Popular Training Locations</h3>
          <div className={styles.popularCitiesGrid}>
            {popularCities.map((city, index) => (
              <Link
                href={`/sitemap/${city.slug}`}
                key={index}
                className={styles.popularCityCard}
              >
                <MdLocationCity className={styles.cityIcon} />
                <h3>{city.name}</h3>
                <span className={styles.popularBadge}>Popular</span>
              </Link>
            ))}
          </div>
        </div>

        {/* All Cities Grid */}
        <div className={styles.allCitiesSection}>
          <h3>
            All Training Locations{" "}
            {filteredCities.length > 0 && `(${filteredCities.length})`}
          </h3>

          {filteredCities.length === 0 ? (
            <div className={styles.noResults}>
              <p>No cities found matching your search criteria.</p>
            </div>
          ) : (
            <div className={styles.citiesGrid}>
              {filteredCities.map((city, index) => (
                <Link
                  href={`/sitemap/${city.slug}`}
                  key={index}
                  className={styles.cityCard}
                >
                  <div className={styles.cityCardContent}>
                    <h2>{city.name}</h2>
                    <span className={styles.regionTag}>{city.region}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Contact Information Section - Always visible now */}
        <div className={styles.contactSection}>
          <div className={styles.contactInfo}>
            <div className={styles.contactHeader}>
              <h3>CONTACT US</h3>
              <p>Reach out to our offices for more information</p>
            </div>

            <div className={styles.officesContainer}>
              <div className={styles.officeCard}>
                <div className={styles.officeHeader}>
                  <FaBuilding className={styles.officeIcon} />
                  <h4>Pune Office</h4>
                </div>
                <div className={styles.officeDetails}>
                  <div className={styles.contactItem}>
                    <FaMapMarkerAlt />
                    <p>
                      1st Floor, 101, Police, Wireless Colony, Vishal Nagar,
                      Pimple Nilakh, Pune, Pimpri-Chinchwad, Maharashtra 411027
                    </p>
                  </div>
                  <div className={styles.contactItem}>
                    <FaPhone />
                    <p>
                      <a href="tel:+919004002941">+91 9004002941</a>
                    </p>
                  </div>
                  <div className={styles.contactItem}>
                    <FaPhone />
                    <p>
                      <a href="tel:+919004002958">+91 9004002958</a>
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.officeCard}>
                <div className={styles.officeHeader}>
                  <FaBuilding className={styles.officeIcon} />
                  <h4>Mumbai Office</h4>
                </div>
                <div className={styles.officeDetails}>
                  <div className={styles.contactItem}>
                    <FaMapMarkerAlt />
                    <p>
                      4th Floor, Ram Niwas, B-404, Gokhale Rd, near McDonald's,
                      Dada Patil Wadi, Naupada, Thane West, Thane, Maharashtra
                      400602
                    </p>
                  </div>
                  <div className={styles.contactItem}>
                    <FaPhone />
                    <p>
                      <a href="tel:+919004005382">+91 9004005382</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitySitemap;
