/**
 * SITE CONFIGURATION
 * 
 * Edit this file to customize your profile URLs, project links, screenshots,
 * and service delivery timelines.
 * 
 * RULES & BEHAVIOR:
 * - Empty string ("") values automatically hide their corresponding UI elements.
 * - If `pphProfileUrl` is empty (""), all "Hire me on PeoplePerHour" CTA buttons are safely hidden.
 * - Do NOT put email addresses, phone numbers, or external contact links here.
 */

const SITE_CONFIG = {
  // PeoplePerHour Profile URL
  // PASTE YOUR PPH PROFILE URL BELOW (e.g. "https://www.peopleperhour.com/freelancer/technology-programming/gokul-...")
  // If left empty (""), all "Hire me on PeoplePerHour" buttons are automatically hidden.
  pphProfileUrl: "",

  // External Developer Profiles (Empty string hides the icon/link)
  github: "https://github.com/gokulnathangd-max",
  linkedin: "", // e.g. "https://www.linkedin.com/in/your-profile"

  // Typical Delivery Times shown on Services page (Empty string hides the badge)
  deliveryTimes: {
    fixAndFinish: "2 - 5 business days",
    integrations: "3 - 7 business days",
    dashboards: "1 - 2 weeks",
    threeJsViewers: "1 - 3 weeks",
    mentoring: "1-hour dedicated sessions"
  },

  // Project Details & Assets (Empty string hides the corresponding link/image block)
  projects: {
    hillCoastConnect: {
      github: "", // e.g. "https://github.com/gokulnathangd-max/hillcoast-connect"
      live: "",   // e.g. "https://hillcoast.example.com"
      screenshot: "", // e.g. "../assets/hillcoast-preview.webp" or absolute path
      specificContribution: "" // e.g. "Sole backend developer responsible for Spring Boot APIs, MySQL schema, and Google Maps API integration."
    },
    agriTwin: {
      github: "", // e.g. "https://github.com/gokulnathangd-max/agri-twin"
      live: "",   // e.g. "https://agri-twin.example.com"
      screenshot: "", // e.g. "../assets/agritwin-preview.webp"
      specificContribution: "" // e.g. "Developed the Fastify backend service and implemented Three.js spatial heatmaps for grain silo telemetry."
    }
  }
};
