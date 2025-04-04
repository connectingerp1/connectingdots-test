import Image from "next/image";
import styles from "@/styles/HomePage/OurClients.module.css";

// Use a smaller subset of logos to reduce DOM elements while maintaining variety
const clientLogos = [
  "Artboard 2.avif", "Artboard 10.avif", "Artboard 11.avif", "Artboard 12.avif",
  "Artboard 13.avif", "Artboard 14.avif", "Artboard 15.avif", "Artboard 16.avif",
  "Artboard 17.avif", "Artboard 18.avif", "Artboard 19.avif", "Artboard 20.avif",
  "Artboard 21.avif"
];

const Marquee = ({ reverse = false }) => (
  <div className={`${styles.marquee} ${reverse ? styles.marqueeReverse : ""}`}>
    <div className={styles.marqueeContent}>
      {/* First set of logos */}
      {clientLogos.map((logo, index) => (
        <div key={`first-${index}`} className={styles.clientLogoContainer}>
          <Image 
            src={`/Ourclients/${logo}`} 
            alt={`Client ${index + 1}`} 
            width={180} 
            height={90} 
            className={styles.clientLogo} 
          />
        </div>
      ))}
      
      {/* Second set of logos for seamless looping */}
      {clientLogos.map((logo, index) => (
        <div key={`second-${index}`} className={styles.clientLogoContainer}>
          <Image 
            src={`/Ourclients/${logo}`} 
            alt={`Client ${index + 1}`} 
            width={180} 
            height={90} 
            className={styles.clientLogo} 
          />
        </div>
      ))}
    </div>
  </div>
);

const OurClients = () => (
  <section className={styles.ourClientsSection}>
    <h2 className={styles.sectionTitle}>Our Clients</h2>
    <div className={styles.titleUnderline}></div>
    <div className={styles.marqueeContainer}>
      <Marquee /> {/* Normal direction */}
      <Marquee reverse /> {/* Reversed direction for the middle marquee */}
      <Marquee /> {/* Normal direction */}
    </div>
  </section>
);

export default OurClients;