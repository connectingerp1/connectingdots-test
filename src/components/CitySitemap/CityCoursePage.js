import Link from "next/link";
import styles from "@/styles/CitySitemap/CityCoursePage.module.css";

const CityCoursePage = ({ city, cityInfo }) => {
  // Modified course categories structure
  const courseCategories = [
    {
      id: "sap",
      name: "SAP S/4 HANA Courses",
      subcategories: [
        {
          title: "SAP Functional",
          courses: [
            { name: "SAP", slug: `/sap-course-in-${city}` },
            { name: "SAP FICO", slug: `/sap-fico-course-in-${city}` },
            { name: "SAP Ariba", slug: `/sap-ariba-course-in-${city}` },
            { name: "SAP MM", slug: `/sap-mm-course-in-${city}` },
            { name: "SAP SD", slug: `/sap-sd-course-in-${city}` },
            { name: "SAP HR/HCM", slug: `/sap-hr-hcm-course-in-${city}` },
            { name: "SAP PP", slug: `/sap-pp-course-in-${city}` },
            { name: "SAP QM", slug: `/sap-qm-course-in-${city}` },
            { name: "SAP PM", slug: `/sap-pm-course-in-${city}` },
            { name: "SAP PS", slug: `/sap-ps-course-in-${city}` },
            { name: "SAP EWM", slug: `/sap-ewm-course-in-${city}` },
            { name: "SAP SCM", slug: `/sap-scm-course-in-${city}` },
            {
              name: "SAP SUCCESSFACTOR",
              slug: `/sap-successfactors-course-in-${city}`,
            },
          ],
        },
        {
          title: "SAP Technical",
          courses: [
            { name: "SAP ABAP", slug: `/sap-abap-course-in-${city}` },
            { name: "SAP S/4 HANA", slug: `/sap-s4-hana-course-in-${city}` },
            { name: "SAP BW/BI", slug: `/sap-bwbi-course-in-${city}` },
            { name: "SAP BASIS", slug: `/sap-basis-course-in-${city}` },
          ],
        },
      ],
    },
    {
      id: "it",
      name: "IT Courses",
      subcategories: [
        {
          title: "Data Science",
          courses: [
            {
              name: "MASTERS IN DATA ANALYTICS",
              slug: `/data-analytics-course-in-${city}`,
            },
            {
              name: "MASTERS IN DATA SCIENCE",
              slug: `/data-science-course-in-${city}`,
            },
            {
              name: "MASTERS IN BUSINESS ANALYTICS",
              slug: `/business-analytics-course-in-${city}`,
            },
            { name: "CHAT GPT & AI", slug: `/chatgpt-course-in-${city}` },
          ],
        },
      ],
      courses: [
        { name: "IT Course", slug: `/it-course-in-${city}` },
        {
          name: "Full Stack Training",
          slug: `/full-stack-developer-course-in-${city}`,
        },
        { name: "JAVA", slug: `/java-course-in-${city}` },
        { name: "MERN Stack", slug: `/mern-stack-course-in-${city}` },
        { name: "UI/UX Design", slug: `/ui-ux-course-in-${city}` },
        { name: "Python", slug: `/python-course-in-${city}` },
        { name: "Salesforce", slug: `/salesforce-training-in-${city}` },
      ],
    },
    {
      id: "data-viz",
      name: "Data Visualisation Courses",
      courses: [
        {
          name: "Data Visualisation Course",
          slug: `/data-visualisation-course-in-${city}`,
        },
        { name: "Tableau", slug: `/tableau-training-in-${city}` },
        { name: "Power BI", slug: `/power-bi-course-in-${city}` },
        { name: "SQL", slug: `/sql-course-in-${city}` },
      ],
    },
    {
      id: "digital",
      name: "Digital Marketing Courses",
      courses: [
        {
          name: "Advance Digital Marketing",
          slug: `/digital-marketing-course-in-${city}`,
        },
        {
          name: "Pay Per Click Training",
          slug: `/digital-marketing-course-in-${city}#pay-per-click`,
          section: "pay-per-click",
        },
        {
          name: "Search Engine Optimization",
          slug: `/digital-marketing-course-in-${city}#search-engine-optimization`,
          section: "search-engine-opti",
        },
        {
          name: "Social Media Marketing",
          slug: `/digital-marketing-course-in-${city}#social-media-marketing`,
          section: "social-media",
        },
        {
          name: "Advance Google Analytics Training",
          slug: `/digital-marketing-course-in-${city}#advance-analytics`,
          section: "advance-analytics",
        },
      ],
    },
    {
      id: "hr",
      name: "HR Courses",
      courses: [
        { name: "HR Training", slug: `/hr-training-course-in-${city}` },
        { name: "Core HR", slug: `/core-hr-course-in-${city}` },
        { name: "HR Payroll", slug: `/hr-payroll-course-in-${city}` },
        { name: "HR Management", slug: `/hr-management-course-in-${city}` },
        { name: "HR Generalist", slug: `/hr-generalist-course-in-${city}` },
        { name: "HR Analytics", slug: `/hr-analytics-course-in-${city}` },
      ],
    },
  ];

  return (
    <div className={styles.cityPageContainer}>
      <div className={styles.cityHeader}>
        <h1>Courses in {cityInfo.name}</h1>
        <p>{cityInfo.description}</p>
      </div>

      <div className={styles.categoriesContainer}>
        {courseCategories.map((category) => (
          <div key={category.id} className={styles.categorySection}>
            <h2 className={styles.categoryTitle}>{category.name}</h2>

            {/* Display subcategories if present */}
            {category.subcategories && (
              <div className={styles.subcategoriesLayout}>
                {category.subcategories.map((subcategory, index) => (
                  <div key={index} className={styles.subcategoryBlock}>
                    <h3 className={styles.subcategoryTitle}>
                      {subcategory.title}
                    </h3>
                    <ul className={styles.courseGrid}>
                      {subcategory.courses.map((course, idx) => (
                        <li key={idx}>
                          <Link
                            href={course.slug}
                            className={styles.courseLink}
                          >
                            <span className={styles.bulletPoint}>•</span>{" "}
                            {course.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Display direct courses if present */}
            {category.courses && (
              <ul className={styles.courseGrid}>
                {category.courses.map((course, idx) => (
                  <li key={idx}>
                    <Link href={course.slug} className={styles.courseLink}>
                      <span className={styles.bulletPoint}>•</span>{" "}
                      {course.name}
                      {course.section && (
                        <span className={styles.sectionTag}>Section</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CityCoursePage;
