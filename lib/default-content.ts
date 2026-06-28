export const defaultContent = {
  profile: {
    id: 1,
    name: "Subhash Chandra Yadav",
    title: "Civil Engineer",
    heroHeading: "Building certainty into every site.",
    tagline: "Building with precision. Delivering with purpose.",
    summary: "Skilled Civil Engineer with over one year of experience in construction engineering and site supervision. Proficient in preparing drawings, specifications, and executing engineering tasks independently, with a focus on project quality, safety compliance, and efficient site coordination.",
    aboutText: "My approach combines practical field awareness with accurate design thinking. From construction drawings and inspections to progress coordination and safety compliance, I bring clarity to the details that determine project quality.",
    contactHeading: "Let's build something that lasts.",
    contactIntro: "Open to civil site engineering, quality control, residential design support, and project coordination opportunities.",
    location: "Janaknandani Rural Municipality, Dhanusha, Nepal",
    email: "Subhash24301@gmail.com",
    phone: "+977 9829955194",
    availability: "Available for civil engineering opportunities",
    photoUrl: "/subhash-photo.jpeg",
    cvUrl: "/subhash-chandra-yadav-cv.html",
    yearsExperience: "1+"
  },
  stats: [
    { id: "st1", value: "2", label: "Engineering roles", sortOrder: 1 },
    { id: "st2", value: "8", label: "Core skills", sortOrder: 2 },
    { id: "st3", value: "8.58", label: "Graduate CGPA", sortOrder: 3 },
    { id: "st4", value: "C1", label: "English & Nepali", sortOrder: 4 }
  ],
  skills: [
    { id: "s1", name: "Architectural & Structural Design", category: "Technical", level: 88, levelLabel: "Advanced", sortOrder: 1 },
    { id: "s2", name: "AutoCAD", category: "Software", level: 85, levelLabel: "Advanced", sortOrder: 2 },
    { id: "s3", name: "Site Supervision", category: "Construction", level: 90, levelLabel: "Expert", sortOrder: 3 },
    { id: "s4", name: "Quality Control", category: "Construction", level: 88, levelLabel: "Advanced", sortOrder: 4 },
    { id: "s5", name: "Safety Compliance", category: "Construction", level: 86, levelLabel: "Advanced", sortOrder: 5 },
    { id: "s6", name: "Leadership & Decision Making", category: "Professional", level: 82, levelLabel: "Advanced", sortOrder: 6 },
    { id: "s7", name: "Communication & Teamwork", category: "Professional", level: 88, levelLabel: "Advanced", sortOrder: 7 },
    { id: "s8", name: "Critical Thinking", category: "Professional", level: 84, levelLabel: "Intermediate", sortOrder: 8 }
  ],
  services: [
    { id: "v1", title: "Site Supervision", description: "Daily site oversight, progress tracking, contractor coordination, and workmanship checks that keep construction moving safely and accurately.", icon: "HardHat", sortOrder: 1 },
    { id: "v2", title: "Quality Control", description: "Detailed inspections of materials, tools, execution quality, and compliance with drawings, specifications, and safety standards.", icon: "ClipboardCheck", sortOrder: 2 },
    { id: "v3", title: "Design & Drafting", description: "Architectural and structural drawing support for residential buildings, backed by practical AutoCAD capability.", icon: "DraftingCompass", sortOrder: 3 }
  ],
  projects: [
    { id: "p1", title: "Residential Building Design", category: "Design & Planning", description: "Architectural and structural design support for residential buildings, translating client requirements into practical construction drawings.", location: "Janakpur, Nepal", year: "2023", duration: "Project-based", role: "Design Support", responsibilities: "Prepared design drawings, coordinated requirements, and supported practical construction documentation.", technologies: "AutoCAD, Residential Planning", imageUrl: null, featured: true, sortOrder: 1 },
    { id: "p2", title: "Construction Quality Program", category: "Quality Control", description: "Site inspection and quality assurance work focused on workmanship, safety protocols, and regulatory compliance.", location: "Janakpur, Nepal", year: "2023-2024", duration: "6 months", role: "Quality Controller", responsibilities: "Inspected site execution, checked safety practices, and reviewed construction quality against expected standards.", technologies: "Site Inspection, QA Documentation", imageUrl: null, featured: true, sortOrder: 2 },
    { id: "p3", title: "Active Site Coordination", category: "Site Engineering", description: "Daily field supervision, facility coordination, progress monitoring, and equipment inspection for active building works.", location: "Ithari, Nepal", year: "2024-2025", duration: "13 months", role: "Civil Site Engineer", responsibilities: "Monitored progress, coordinated site facilities, inspected tools and equipment, and supported safe daily execution.", technologies: "Progress Tracking, Site Supervision", imageUrl: null, featured: true, sortOrder: 3 }
  ],
  certifications: [
    { id: "c1", title: "Engineering Training Certification", issuer: "Shivam Engineering Consultancy & Training Pvt. Ltd.", location: null, issuedDate: "", credentialUrl: null, imageUrl: null, description: "Certified construction and engineering training.", sortOrder: 1 }
  ],
  achievements: [
    { id: "a1", title: "Bachelor of Civil Engineering with 8.58 CGPA", organization: "Jain University", year: "2023", description: "Graduated with strong academic performance and practical civil engineering training.", linkUrl: null, sortOrder: 1 },
    { id: "a2", title: "Civil site engineering field experience", organization: "Makalu Builders Pvt. Ltd.", year: "2024-2025", description: "Built hands-on experience in site supervision, progress monitoring, quality checks, and safety coordination.", linkUrl: null, sortOrder: 2 }
  ],
  timeline: [
    { id: "t1", type: "experience", title: "Civil Site Engineer", organization: "Makalu Builders Pvt. Ltd.", location: "Ithari, Nepal", startDate: "Jan 2024", endDate: "Feb 2025", description: "Conducted daily site visits to monitor work quality. Coordinated site facilities, monitored project progress, and inspected tools and equipment to maintain efficiency and safety.", sortOrder: 1 },
    { id: "t2", type: "experience", title: "Building Quality Controller & Designer", organization: "Aarushi Construction Pvt. Ltd.", location: "Janakpur, Nepal", startDate: "Jul 2023", endDate: "Jan 2024", description: "Provided architectural and structural design support for residential buildings, conducted inspections, and ensured compliance with safety protocols and regulations.", sortOrder: 2 },
    { id: "t3", type: "education", title: "Bachelor of Civil Engineering", organization: "Jain University", location: "Bangalore, India", startDate: "", endDate: "2023", description: "Graduated with a CGPA of 8.58 (82.50%).", sortOrder: 3 },
    { id: "t4", type: "education", title: "Engineering Training Certification", organization: "Shivam Engineering Consultancy & Training Pvt. Ltd.", location: null, startDate: "", endDate: "", description: "Certified construction and engineering training.", sortOrder: 4 }
  ],
  socialLinks: [
    { id: "sl1", platform: "Email", url: "mailto:Subhash24301@gmail.com", icon: "Mail", active: true, displayOrder: 1 },
    { id: "sl2", platform: "Phone", url: "tel:+9779829955194", icon: "Phone", active: true, displayOrder: 2 }
  ]
};

export type PortfolioContent = typeof defaultContent;
