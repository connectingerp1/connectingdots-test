import Link from "next/link";
import styles from "@/styles/CitySitemap/CitySitemap.module.css";

const CitySitemap = () => {
    // Cities data
    const cities = [
        { name: "Pune", slug: "pune" },
        { name: "Mumbai", slug: "mumbai" },
        { name: "Delhi", slug: "delhi" },
        { name: "Kolkata", slug: "kolkata" },
        { name: "Chennai", slug: "chennai" },
        { name: "Bangalore", slug: "bangalore" },
        { name: "Hyderabad", slug: "hyderabad" },
        { name: "Ahmedabad", slug: "ahmedabad" },
        { name: "Jaipur", slug: "jaipur" },
        { name: "Lucknow", slug: "lucknow" },
        { name: "Kanpur", slug: "kanpur" },
        { name: "Nagpur", slug: "nagpur" },
        { name: "Patna", slug: "patna" },
        { name: "Indore", slug: "indore" },
        { name: "Bhopal", slug: "bhopal" },
        { name: "Visakhapatnam", slug: "visakhapatnam" },
        { name: "Vadodara", slug: "vadodara" },
        { name: "Ludhiana", slug: "ludhiana" },
        { name: "Agra", slug: "agra" },
        { name: "Nashik", slug: "nashik" },
        { name: "Rajkot", slug: "rajkot" },
        { name: "Varanasi", slug: "varanasi" },
        { name: "Kerala", slug: "kerala" },
        { name: "Surat", slug: "surat" },
        { name: "Dehradun", slug: "dehradun" },
        { name: "Madurai", slug: "madurai" },
        { name: "Mysore", slug: "mysore" },
        { name: "Pondicherry", slug: "pondicherry" },
        { name: "Ranchi", slug: "ranchi" },
        { name: "Coimbatore", slug: "coimbatore" },
        { name: "Chandigarh", slug: "chandigarh" },
        { name: "Bhubaneswar", slug: "bhubaneswar" },
        { name: "Tirupati", slug: "tirupati" },
        { name: "Vizag", slug: "vizag" },
        { name: "Trivandrum", slug: "trivandrum" },
        { name: "Jalandhar", slug: "jalandhar" },
        { name: "Mohali", slug: "mohali" },
        { name: "Raipur", slug: "raipur" },
        { name: "Cochin", slug: "cochin" },
        { name: "Mangalore", slug: "mangalore" }
      ];
  
    return (
      <div className={styles.sitemapContainer}>
        <div className={styles.sitemapHeader}>
          <h2>City Sitemap</h2>
          <p>Find specialized training programs in your city from Connecting Dots ERP</p>
        </div>
  
        <div className={styles.citiesGrid}>
          {cities.map((city, index) => (
            <Link href={`/sitemap/${city.slug}`} key={index} className={styles.cityCard}>
              <h2>{city.name}</h2>
            </Link>
          ))}
        </div>
      </div>
    );
  };
  
  export default CitySitemap;