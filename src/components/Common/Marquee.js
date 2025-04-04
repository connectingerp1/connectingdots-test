import styles from "@/styles/Common/Marquee.module.css";

const Marquee = () => {
  return (
    <div className={styles.mainContainerMarquee}>
      <div className={styles.mainContainerMarqueeTrack}>

        <div className={styles.mainContainerMarqueeItems}>
          <span className={styles.mainContainerMarqueeItem}>
            SAP FICO Batch Starting Soon!
          </span>
          
          <span className={styles.mainContainerMarqueeItem}>
            Data Science A1 batch starting from 15th March!   
          </span>
        </div>
        {/* aria-hidden="true" */}

        <div className={styles.mainContainerMarqueeItems}>
          <span className={styles.mainContainerMarqueeItem}>
               Get exciting benefits by registering before 15th March!
          </span>

          <span className={styles.mainContainerMarqueeItem}>
            SAP HANA batch commencing soon!
          </span>
        </div>
      </div>
    </div>
  );
};

export default Marquee;