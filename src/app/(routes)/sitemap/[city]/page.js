import { notFound } from "next/navigation";
import CityCoursePage from "@/components/CitySitemap/CityCoursePage";

// This data would ideally come from your CMS or API
const cityData = {
  pune: {
    name: "Pune",
    description:
      "Explore our comprehensive range of professional courses in Pune, Maharashtra's educational hub.",
  },
  mumbai: {
    name: "Mumbai",
    description:
      "Discover top-rated professional training programs in Mumbai, India's financial capital.",
  },
  delhi: {
    name: "Delhi",
    description:
      "Enhance your skills with professional courses in Delhi, India's capital city.",
  },
  kolkata: {
    name: "Kolkata",
    description:
      "Discover professional courses in Kolkata, Eastern India's educational and cultural hub.",
  },
  chennai: {
    name: "Chennai",
    description:
      "Find specialized training programs in Chennai, a major educational and cultural center.",
  },
  bangalore: {
    name: "Bangalore",
    description:
      "Advance your career with specialized courses in Bangalore, India's technology hub.",
  },
  hyderabad: {
    name: "Hyderabad",
    description:
      "Pursue quality professional training in Hyderabad, a major tech and educational center.",
  },
  ahmedabad: {
    name: "Ahmedabad",
    description:
      "Enhance your career with quality training programs in Ahmedabad, Gujarat's largest city.",
  },
  jaipur: {
    name: "Jaipur",
    description:
      "Get trained in top professional courses in Jaipur, Rajasthan's capital and cultural hub.",
  },
  lucknow: {
    name: "Lucknow",
    description:
      "Discover professional development opportunities in Lucknow, known for its heritage and education.",
  },
  kanpur: {
    name: "Kanpur",
    description:
      "Advance your skills with professional courses in Kanpur, an important industrial and educational center.",
  },
  nagpur: {
    name: "Nagpur",
    description:
      "Find quality training programs in Nagpur, the geographical center of India.",
  },
  patna: {
    name: "Patna",
    description:
      "Explore career-advancing courses in Patna, Bihar's capital and educational hub.",
  },
  indore: {
    name: "Indore",
    description:
      "Expand your professional capabilities in Indore, Madhya Pradesh's commercial capital.",
  },
  bhopal: {
    name: "Bhopal",
    description:
      "Learn from industry experts in Bhopal, the capital city of Madhya Pradesh.",
  },
  visakhapatnam: {
    name: "Visakhapatnam",
    description:
      "Gain valuable skills with professional courses in Visakhapatnam, a major port city.",
  },
  vadodara: {
    name: "Vadodara",
    description:
      "Enhance your professional profile with quality training in Vadodara, an educational center in Gujarat.",
  },
  ludhiana: {
    name: "Ludhiana",
    description:
      "Upgrade your skills with professional courses in Ludhiana, Punjab's largest city.",
  },
  agra: {
    name: "Agra",
    description:
      "Discover practical training programs in Agra, home to world-renowned heritage sites.",
  },
  nashik: {
    name: "Nashik",
    description:
      "Develop your career with professional courses in Nashik, an emerging educational hub in Maharashtra.",
  },
  rajkot: {
    name: "Rajkot",
    description:
      "Explore quality training programs in Rajkot, one of Gujarat's fastest-growing cities.",
  },
  varanasi: {
    name: "Varanasi",
    description:
      "Find specialized courses in Varanasi, one of the world's oldest continuously inhabited cities.",
  },
  kerala: {
    name: "Kerala",
    description:
      "Advance your skills with professional training across Kerala, known for its high literacy rate.",
  },
  surat: {
    name: "Surat",
    description:
      "Gain valuable expertise in Surat, Gujarat's commercial and educational powerhouse.",
  },
  dehradun: {
    name: "Dehradun",
    description:
      "Discover quality education in Dehradun, Uttarakhand's capital known for prestigious institutions.",
  },
  madurai: {
    name: "Madurai",
    description:
      "Explore professional development opportunities in Madurai, one of Tamil Nadu's major cities.",
  },
  mysore: {
    name: "Mysore",
    description:
      "Enhance your skills in Mysore, a city known for its cultural and educational heritage.",
  },
  pondicherry: {
    name: "Pondicherry",
    description:
      "Find specialized courses in Pondicherry, a unique cultural and educational destination.",
  },
  ranchi: {
    name: "Ranchi",
    description:
      "Advance your career with professional training in Ranchi, Jharkhand's capital city.",
  },
  coimbatore: {
    name: "Coimbatore",
    description:
      "Develop your expertise in Coimbatore, a major educational and industrial hub in Tamil Nadu.",
  },
  chandigarh: {
    name: "Chandigarh",
    description:
      "Explore quality professional courses in Chandigarh, a well-planned city with excellent infrastructure.",
  },
  bhubaneswar: {
    name: "Bhubaneswar",
    description:
      "Gain valuable skills in Bhubaneswar, Odisha's capital and a growing IT hub.",
  },
  tirupati: {
    name: "Tirupati",
    description:
      "Find professional training opportunities in Tirupati, a prominent educational center in Andhra Pradesh.",
  },
  vizag: {
    name: "Vizag",
    description:
      "Enhance your professional qualifications in Vizag, a major port city on the east coast.",
  },
  trivandrum: {
    name: "Trivandrum",
    description:
      "Develop your career with quality courses in Trivandrum, Kerala's capital and educational hub.",
  },
  jalandhar: {
    name: "Jalandhar",
    description:
      "Upgrade your skills with professional training in Jalandhar, one of Punjab's major industrial cities.",
  },
  mohali: {
    name: "Mohali",
    description:
      "Explore specialized courses in Mohali, an emerging IT and educational hub in Punjab.",
  },
  raipur: {
    name: "Raipur",
    description:
      "Find quality professional training in Raipur, the capital city of Chhattisgarh.",
  },
  cochin: {
    name: "Cochin",
    description:
      "Advance your career with courses in Cochin, Kerala's major port city and commercial hub.",
  },
  mangalore: {
    name: "Mangalore",
    description:
      "Gain professional expertise in Mangalore, a major port city and educational center in Karnataka.",
  },
};

export async function generateMetadata({ params }) {
  const city = params.city.toLowerCase();

  if (!cityData[city]) {
    return {
      title: "City Not Found",
      description: "The requested city page could not be found.",
    };
  }

  return {
    title: `Courses in ${cityData[city].name} | Connecting Dots ERP`,
    description: cityData[city].description,
    keywords: `courses in ${cityData[city].name}, SAP training ${cityData[city].name}, IT courses ${cityData[city].name}, professional training ${cityData[city].name}`,
  };
}

export default function CityPage({ params }) {
  const city = params.city.toLowerCase();

  // Check if the city exists in our data
  if (!cityData[city]) {
    notFound();
  }

  return (
    <main>
      <CityCoursePage city={city} cityInfo={cityData[city]} />
    </main>
  );
}
