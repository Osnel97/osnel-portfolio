/* ============================================================
   EDIT THIS FILE TO UPDATE YOUR PORTFOLIO — no other code needs
   to change. Save, then refresh the page (or re-run the build)
   to see your changes.
   ============================================================ */

const siteData = {
  name: "Osnel Hosea",
  title: "App Security & Full-Stack Developer",
  tagline:
    "I build software people can rely on — then I try to break it before anyone else can.",

  // Put a photo named "profile.jpg" in public/assets/ and it'll be
  // picked up automatically below.
  photo: "/assets/profile.jpg",
  initials: "OH",

  about: [
    "I'm a full-stack developer with four years of experience who also thinks like an attacker. I don't just build applications — I test them the way someone trying to break in would, so the weak spots get caught before they become real problems.",
    "On a typical project I handle the whole picture: designing the backend and database, building the interface people actually use, deploying it reliably, and keeping an eye on how it behaves once it's live. I work comfortably across Java, Spring Boot, Laravel, and NestJS on the backend, React and Flutter on the frontend, and Docker and Kubernetes for deployment — with security built in from the start, not bolted on at the end.",
    "My focus is simple: build things that work, and make sure they can survive contact with the real world.",
  ],

  stats: [
    { num: "4+ Years", label: "AppSec & DevSecOps experience" },
    { num: "Full-Stack", label: "Frontend, backend & infrastructure" },
    { num: "Security-First", label: "Assessments & penetration testing" },
  ],

  skills: [
    { category: "Backend", items: ["Spring Boot", "Laravel", "NestJS", "REST API", "Microservices"] },
    { category: "Databases", items: ["PostgreSQL", "Oracle DB", "Redis"] },
    { category: "Infrastructure & DevOps", items: ["Docker", "Kubernetes", "AWS", "Cloud Infrastructure", "Linux", "RabbitMQ"] },
    { category: "Observability", items: ["Grafana", "Loki", "Promtail", "Elasticsearch", "Kibana", "APM"] },
    { category: "Frontend & Mobile", items: ["React.js", "Tailwind CSS", "Flutter", "UI/UX"] },
    { category: "Security", items: ["App Security Assessment", "Penetration Testing", "OWASP ZAP", "DevSecOps"] },
  ],

  // Add a new project by copying one of the {} blocks below.
  projects: [
    {
      name: "SwiftParcel",
      description:
        "SwiftParcel is a logistics platform that lets a company track and manage shipments end to end — with a dashboard for staff, native iOS/Android apps, and a self-service portal so customers can check their own deliveries without calling support.",
      highlights: [
        "Built as independent services rather than one large application, so any part can be updated or scaled without affecting the rest of the system.",
        "Services stay in sync in real time through event-driven messaging (RabbitMQ) and internal APIs — no manual syncing, no bottlenecks.",
        "Native iOS and Android apps, built with Flutter, give field staff and customers the same experience as the web app.",
        "Customers can track and manage their own shipments directly, through the website or the app, without needing to call in.",
        "Live shipment tracking on a real map (OpenStreetMap), so people can see exactly where their delivery is.",
        "Automated email and SMS updates keep customers informed without anyone lifting a finger.",
        "Every service is monitored around the clock (Grafana, Loki, Promtail), so issues get caught before customers notice them.",
        "Security-tested end to end — frontend, API, backend, database, and server — using real attack techniques (OWASP ZAP), not just a one-time review.",
      ],
      stack: [
        "NestJS", "React.js", "Tailwind CSS", "Flutter", "iOS", "Android", "REST API",
        "RabbitMQ", "Redis", "PostgreSQL", "Docker", "Kubernetes",
        "Linux", "OpenStreetMap", "Grafana", "Loki", "Promtail", "OWASP ZAP",
      ],
    },
    {
      name: "Application Security Assessment & Penetration Testing",
      description:
        "Independent security testing engagements where I try to break into web applications and infrastructure the way a real attacker would, then hand engineering teams a clear, practical plan to fix what I find.",
      highlights: [],
      stack: ["AppSec", "Penetration Testing", "OWASP ZAP", "DevSecOps"],
    },
  ],

  // Add a new role by copying one of the {} blocks below.
  experience: [
    {
      period: "4 Years",
      role: "Application Security Officer & DevSecOps Engineer",
      org: "Government / Public Sector",
      points: [
        "Led application security assessments and penetration testing across web and backend systems.",
        "Built and maintained secure full-stack applications using Java, Spring Boot, Laravel, and NestJS.",
        "Set up monitoring and alerting (Grafana, Loki, Promtail, Elasticsearch, Kibana, APM) so problems in production get caught before users notice them.",
        "Managed containerized deployments with Docker and Kubernetes across AWS and other cloud infrastructure.",
      ],
    },
  ],

  // Add testimonials here, e.g.:
  // { name: "Jane Doe", role: "CTO", company: "Acme Inc", quote: "...", photoUrl: "" }
  testimonials: [],

  // platform: github, linkedin, twitter (or x), instagram, facebook, or email
  //
  // Same handle "devsectz" on every platform (no separator — hyphens,
  // underscores, and periods each work on some platforms but not all,
  // so plain alphanumeric is the only string valid everywhere). Accounts
  // don't exist yet, so these will 404 until registered — confirm the
  // handle is actually available on each platform at signup.
  socialLinks: [
    { platform: "linkedin", label: "LinkedIn", url: "https://linkedin.com/in/devsectz" },
    { platform: "instagram", label: "Instagram", url: "https://instagram.com/devsectz" },
    { platform: "x", label: "X", url: "https://x.com/devsectz" },
    { platform: "facebook", label: "Facebook", url: "https://facebook.com/devsectz" },
  ],

  contact: {
    email: "nellysjonathan12@gmail.com",
    whatsappNumber: "0713766237",
    whatsappCountryCode: "255",
    // Shown as a small status line above the contact cards. Set to "" to hide it.
    availability: "Open to technical collaboration, mentoring, and knowledge-sharing",
  },
};

export default siteData;
