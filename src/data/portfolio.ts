export const personalInfo = {
  name: "Riya Sharma",
  title: "Software Engineer",
  roles: ["Backend Engineer", "Microservices Architect", "AI Agentic Workflow Engineer", "Cloud & DevOps Enthusiast"],
  location: "Gurugram, India",
  email: "official5riyasharma@gmail.com",
  phone: "+91-8929741039",
  linkedin: "https://www.linkedin.com/in/riya-sharma",
  github: "https://github.com/riyasharma07/About-Me",
  bio: "Passionate Software Engineer specializing in high-throughput backend systems, microservices architecture, and AI-powered applications. I build scalable solutions that serve 85,000+ daily active users and deliver measurable impact.",
  stats: [
    { label: "Daily Active Users", value: "85K+" },
    { label: "RPS in Production", value: "800+" },
    { label: "API Latency Reduction", value: "70%" },
    { label: "Records Per Batch", value: "100K+" },
  ],
};

export const skills = {
  languages: [
    { name: "TypeScript", level: 95 },
    { name: "JavaScript (ES6+)", level: 95 },
    { name: "Node.js", level: 92 },
    { name: "SQL", level: 88 },
  ],
  frameworks: [
    { name: "NestJS", level: 93 },
    { name: "Microservices", level: 90 },
    { name: "Docker", level: 88 },
    { name: "Kubernetes (K8s)", level: 82 },
  ],
  databases: [
    { name: "PostgreSQL", level: 90 },
    { name: "Redis", level: 88 },
    { name: "CosmosDB", level: 80 },
    { name: "MSSQL", level: 85 },
  ],
  cloudAI: [
    { name: "Azure / AKS", level: 85 },
    { name: "Azure OpenAI (GPT-4)", level: 88 },
    { name: "RAG / LangChain", level: 85 },
    { name: "RabbitMQ / Azure Queue", level: 87 },
  ],
};

export const techStack = [
  { name: "Node.js", category: "lang" },
  { name: "TypeScript", category: "lang" },
  { name: "NestJS", category: "framework" },
  { name: "PostgreSQL", category: "db" },
  { name: "Redis", category: "db" },
  { name: "Docker", category: "devops" },
  { name: "Kubernetes", category: "devops" },
  { name: "Azure", category: "cloud" },
  { name: "RabbitMQ", category: "messaging" },
  { name: "Azure OpenAI", category: "ai" },
  { name: "LangChain", category: "ai" },
  { name: "RAG", category: "ai" },
  { name: "LangGraph", category: "ai" },
  { name: "Grafana", category: "monitoring" },
  { name: "Sentry", category: "monitoring" },
  { name: "Git / GitHub", category: "tools" },
];

export const experiences = [
  {
    company: "FieldAssist",
    role: "Software Developer",
    period: "Aug 2022 – Present",
    location: "Gurugram, Haryana",
    type: "Full-time",
    projects: [
      {
        name: "Distributor Management System (DMS)",
        tech: ["NestJS", "TypeScript", "RabbitMQ", "Azure Queue", "Redis", "SQL", "Kubernetes"],
        highlights: [
          {
            icon: "⚡",
            title: "Microservices at Scale",
            desc: "Architected NestJS + TypeScript microservices serving 85,000+ daily active users at 800+ RPS in production.",
          },
          {
            icon: "🚀",
            title: "Bulk Processing Engine",
            desc: "Designed high-throughput engine using Azure Queue & RabbitMQ, handling 100K+ records per batch asynchronously.",
          },
          {
            icon: "📊",
            title: "Large Data Processing",
            desc: "Re-architected report workflows previously failing at 30–40 lakh records, enabling stable large-scale processing.",
          },
          {
            icon: "⏱️",
            title: "70% API Latency Reduction",
            desc: "Reduced API latency from 5s to 800ms through query optimization, indexing, materialized views, and Redis caching.",
          },
          {
            icon: "📈",
            title: "90% Reporting Optimization",
            desc: "Improved analytics performance by 90%, eliminating timeout errors in large CSV generation.",
          },
          {
            icon: "🔐",
            title: "Security & Distributed Systems",
            desc: "Implemented JWT refresh token rotation, fine-grained RBAC, rate limiting, DLQs, and backpressure handling.",
          },
          {
            icon: "☁️",
            title: "Cloud & DevOps",
            desc: "Deployed on Kubernetes (AKS) with HPA auto-scaling, Grafana & Sentry observability, and automated release notes via Azure DevOps + Slack.",
          },
        ],
      },
      {
        name: "MapGPT & AI Stock Allocation Engine",
        tech: ["Azure OpenAI", "LangChain", "RAG", "Microservices", "LangGraph"],
        highlights: [
          {
            icon: "🤖",
            title: "MapGPT LLM Platform",
            desc: "Designed and built an LLM-powered assistant using Azure OpenAI (GPT-4) integrated with backend microservices.",
          },
          {
            icon: "🧠",
            title: "RAG Architecture",
            desc: "Implemented Retrieval-Augmented Generation using embeddings and structured DB queries to improve response accuracy.",
          },
          {
            icon: "🗺️",
            title: "AI Agents & Tool Calling",
            desc: "Built multi-step tool-calling agents using LangChain to interact with internal APIs and geospatial datasets.",
          },
          {
            icon: "🎯",
            title: "AI Stock Allocation Engine",
            desc: "Developed AI-driven decision automation workflows integrating LLM reasoning with rule-based inventory logic.",
          },
        ],
      },
    ],
  },
];

export const education = [
  {
    institution: "GLA University",
    degree: "Bachelor of Technology",
    field: "Computer Science",
    period: "2019 – 2023",
    grade: "79%",
    location: "Mathura, Uttar Pradesh",
  },
];
