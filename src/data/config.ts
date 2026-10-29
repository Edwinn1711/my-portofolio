const config = {
  title: "Devin Edwin Frederico Siahaan | Computer Technology Student",
  description: {
    long: "I'm Devin Edwin Frederico Siahaan, a Diploma in Computer Technology student at Institut Teknologi Del, Indonesia. I'm passionate about cybersecurity, web design, and full-stack development. My project experience includes web application development, backend systems, mobile development, REST API integration, and database management. I enjoy exploring new technologies, designing intuitive digital experiences, and developing practical solutions to real-world challenges. Currently preparing for an internship opportunity to gain industry experience, collaborate with professional teams, and continue growing as a technology professional.",
    short:
      "Devin Siahaan is a Computer Technology student at Institut Teknologi Del, interested in cybersecurity, web design, and full-stack development.",
  },
  keywords: [
    "Devin Siahaan",
    "Devin Portofolio",
    "Full Stack Development",
    "Cybersecurity",
    "web development",
    "Web Design",
    "Full Stack Development",
    "Full Stack Engineer",
    "Software Development",
    "Application Security",
    "API Security",
    "Database & Data Security",
    "MongoDB",
    "MariaDB",
    "PostgreSQL",
    "TypeScript",
    "Go Programming",
    "Postman",
    "React",
    "Next.js",
    "WordPress",
    "Laravel",
    "Docker",
    "Framer Motion",
  ],
  author: "Devin Siahaan",
  email: "devinedwinsiahaan171105@gmail.com",
  site: "http://localhost:3000",

  // for github stars button
  githubUsername: "Edwinn1711",
  githubRepo: "my-portofolio",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    twitter: "",
    linkedin: "https://www.linkedin.com/in/devin-siahaan-603493382",
    instagram: "https://www.instagram.com/devinn.s_?srtk=MzhkbHVtdzVtdDMy",
    facebook: "https://www.facebook.com/share/1Dhymm3sNN/",
    github: "https://github.com/Edwinn1711",
  },
};
export { config };
