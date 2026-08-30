import type { CourseMeta, CourseModule } from "@/lib/courses/types";

export const courseMeta: CourseMeta = {
  slug: "digital-skills-foundation",
  title: "Digital Skills Foundation & Employability Bootcamp",
  tagline:
    "Practical digital literacy, productivity, online safety, content creation, AI, and income-ready skills for Africa",
  duration: "8 Weeks",
  pace: "4–6 hours/week",
  level: "Beginner",
  prerequisites: [
    "A smartphone, tablet, or computer with internet access",
    "No programming experience required",
    "Willingness to complete practical weekly tasks",
  ],
  overview: [
    "This course is a practical entry point into the modern digital economy. It is designed for students, job seekers, entrepreneurs, small-business owners, and first-time technology learners who need useful skills they can apply immediately.",
    "The programme is optimized for mobile and low-bandwidth learning. Every module combines short lessons, a practical lab, and a quiz. Learners finish with a digital portfolio, a professional online presence, safer internet habits, stronger productivity skills, and a clear pathway into deeper FINTIGEN courses.",
  ],
  objectives: [
    "Use computers, smartphones, browsers, files, cloud storage, and search engines confidently.",
    "Create professional documents, spreadsheets, presentations, and collaborative workspaces.",
    "Communicate professionally through email, messaging, video meetings, and remote-work tools.",
    "Protect accounts, devices, personal data, and money from common online threats and scams.",
    "Create useful digital content for school, work, business, and social media.",
    "Use generative AI responsibly for learning, research, writing, planning, and productivity.",
    "Build a basic digital portfolio and prepare for freelancing, remote work, internships, and digital entrepreneurship.",
  ],
  tools: [
    { category: "Productivity", items: "Google Docs, Sheets, Slides, Drive; Microsoft Office or free equivalents" },
    { category: "Communication", items: "Gmail, Google Meet, Zoom, WhatsApp, Slack/Teams concepts" },
    { category: "Creation", items: "Canva, CapCut or equivalent browser/mobile creative tools" },
    { category: "AI", items: "ChatGPT and other responsible generative-AI assistants" },
    { category: "Career", items: "LinkedIn, GitHub/portfolio concepts, freelance marketplaces and job boards" },
  ],
  grading: [
    { component: "Weekly Practical Labs", weight: "50%", detail: "Hands-on tasks completed at the end of each module." },
    { component: "Module Quizzes", weight: "20%", detail: "Short knowledge checks covering essential concepts and safe practices." },
    { component: "Digital Portfolio Capstone", weight: "30%", detail: "A simple portfolio containing a CV, sample work, professional profile, and personal digital-growth plan." },
  ],
};

export const courseModules: CourseModule[] = [
  {
    id: "digital-foundations",
    week: 1,
    title: "Digital Foundations: Devices, Files, Browsers & Search",
    objective: "Build confidence using everyday digital devices and organizing information efficiently.",
    lessons: [
      {
        id: "df-1",
        title: "How Digital Devices and the Internet Work",
        content: [
          "A digital device is useful when you understand the relationship between hardware, software, storage, networks, and online services. You do not need to be a technician to learn the habits that prevent most everyday problems.",
          "The internet is a network connecting devices and services. A browser is the application you use to access websites, while a search engine helps you discover information. Knowing the difference makes troubleshooting and safe browsing much easier.",
        ],
        bullets: [
          "Identify operating-system settings, browser settings, downloads, and storage.",
          "Recognize common file types such as PDF, DOCX, XLSX, JPG, PNG, MP4, and ZIP.",
          "Use clear folders and filenames instead of leaving everything in Downloads.",
        ],
      },
      {
        id: "df-2",
        title: "Smart Search and Information Checking",
        content: [
          "Good searching is a professional skill. Use specific keywords, quotation marks for exact phrases, and trusted domains when you need authoritative information.",
          "Before sharing information, check the author, date, evidence, original source, and whether other reliable sources agree. Viral does not mean true.",
        ],
        bullets: [
          "Search with specific nouns, dates, locations, and file types.",
          "Prefer primary sources for official facts and policies.",
          "Cross-check claims before acting on financial, health, academic, or security information.",
        ],
      },
    ],
    lab: {
      title: "Create Your Digital Workspace",
      description: "Organize a clean folder system and demonstrate a reliable search workflow.",
      steps: [
        "Create a main folder named FINTIGEN-Digital-Skills.",
        "Inside it create Documents, Projects, Images, CV, and Certificates folders.",
        "Download one PDF and one image, rename them clearly, and move them into the correct folders.",
        "Search for one official Nigerian government or university resource and save the source link in a text document.",
      ],
    },
    quiz: [
      {
        question: "Which tool is primarily used to open and view websites?",
        options: ["Search engine", "Web browser", "Spreadsheet", "File compressor"],
        answerIndex: 1,
        explanation: "A browser such as Chrome, Edge, Firefox, or Safari displays websites; a search engine helps you find them.",
      },
      {
        question: "What is the strongest first step before sharing an important online claim?",
        options: ["Forward it quickly", "Check the original source and evidence", "Count the likes", "Ask only one friend"],
        answerIndex: 1,
        explanation: "Verification begins with the original source, evidence, date, and independent confirmation.",
      },
    ],
  },
  {
    id: "productivity",
    week: 2,
    title: "Workplace Productivity: Documents, Spreadsheets & Cloud Collaboration",
    objective: "Create and share professional digital work using common productivity tools.",
    lessons: [
      {
        id: "prod-1",
        title: "Professional Documents and Presentations",
        content: [
          "Professional documents are readable, consistent, and purposeful. Use headings, spacing, lists, tables, and page structure to make information easy to scan.",
          "Presentations should support a speaker, not become a wall of text. One clear idea per slide, readable type, relevant visuals, and a logical story are more effective than excessive animation.",
        ],
        bullets: ["Use styles for headings instead of manually resizing every heading.", "Keep consistent fonts and spacing.", "Export final documents to PDF when layout must remain fixed."],
      },
      {
        id: "prod-2",
        title: "Spreadsheet Thinking",
        content: [
          "Spreadsheets are not only for accountants. They help track expenses, attendance, inventory, survey responses, sales, and project progress.",
          "Learn the difference between data, formulas, and formatting. A clean table has one header row, one record per row, and consistent values in each column.",
        ],
        bullets: ["Start with SUM, AVERAGE, COUNT, MIN, and MAX.", "Avoid merging cells inside data tables.", "Use filters and sorting to explore information quickly."],
      },
    ],
    lab: {
      title: "Build a Personal Training Tracker",
      description: "Create a spreadsheet that tracks study hours, tasks, and weekly progress.",
      steps: [
        "Create columns for Date, Skill, Task, Minutes Studied, Status, and Notes.",
        "Enter at least seven sample rows.",
        "Use SUM to calculate total minutes and AVERAGE for average study time.",
        "Share the file using view-only access and verify the permission before sending the link.",
      ],
    },
    quiz: [
      { question: "Which formula totals a range of numbers?", options: ["SUM", "SORT", "TEXT", "LINK"], answerIndex: 0, explanation: "SUM adds numeric values in a selected range." },
      { question: "What is safest when sharing a cloud document publicly?", options: ["Always allow editing", "Check the exact sharing permission first", "Disable passwords everywhere", "Use an unknown shortened link"], answerIndex: 1, explanation: "Always verify whether recipients can view, comment, or edit before sharing." },
    ],
  },
  {
    id: "communication",
    week: 3,
    title: "Professional Communication & Remote Work",
    objective: "Communicate clearly and reliably in digital workplaces and learning environments.",
    lessons: [
      {
        id: "com-1",
        title: "Email, Messaging and Digital Etiquette",
        content: [
          "Professional communication saves time. A good email has a useful subject, a respectful greeting, the purpose early in the message, the necessary context, and a clear next action.",
          "Messaging apps are faster but can create confusion. Use concise messages, avoid sending many fragmented messages when one complete message will do, and respect working hours unless something is genuinely urgent.",
        ],
        bullets: ["Use descriptive subject lines.", "Proofread names, dates, attachments, and links before sending.", "Do not share confidential information in public groups."],
      },
      {
        id: "com-2",
        title: "Meetings, Collaboration and Remote Reliability",
        content: [
          "Remote work rewards reliability: respond on time, document decisions, keep tasks visible, and communicate blockers early. Being online is not the same as being productive.",
          "For video meetings, test audio, join on time, mute when appropriate, and write down decisions and assigned actions. A short written recap prevents many misunderstandings.",
        ],
        bullets: ["Confirm deadlines in writing.", "Use calendars and reminders.", "Report progress before a deadline becomes a crisis."],
      },
    ],
    lab: {
      title: "Write a Professional Application Email",
      description: "Prepare an email applying for an internship or entry-level digital role.",
      steps: ["Write a specific subject line.", "Introduce yourself in one sentence.", "Explain the value or skills you bring in two to three sentences.", "Add a clear request and professional closing.", "Attach or link a sample CV and double-check the attachment name."],
    },
    quiz: [
      { question: "Which subject line is most professional?", options: ["Hello", "URGENT!!!", "Application for Digital Marketing Intern — Ada Okafor", "Read this"], answerIndex: 2, explanation: "A good subject line tells the recipient exactly what the message is about." },
      { question: "What should you do when a remote-work deadline may be missed?", options: ["Disappear", "Wait until after the deadline", "Communicate the blocker early and propose a recovery plan", "Delete the task"], answerIndex: 2, explanation: "Early communication gives the team time to adjust and shows reliability." },
    ],
  },
  {
    id: "cyber-safety",
    week: 4,
    title: "Cybersecurity, Privacy & Scam Prevention",
    objective: "Protect accounts, devices, identity, money, and sensitive information online.",
    lessons: [
      {
        id: "safe-1",
        title: "Passwords, MFA and Account Security",
        content: [
          "Most account attacks succeed because passwords are reused, weak, or stolen through phishing. Use a unique long password for important accounts and enable multi-factor authentication wherever possible.",
          "Never send verification codes, one-time passwords, recovery codes, or passwords to someone who contacts you unexpectedly. Legitimate support staff should not need your secret authentication codes.",
        ],
        bullets: ["Use unique passwords for email, banking, social media, and work accounts.", "Turn on MFA/2FA.", "Keep recovery email and phone information current."],
      },
      {
        id: "safe-2",
        title: "Phishing, Fraud and Unsafe Links",
        content: [
          "Phishing messages create urgency, fear, curiosity, or greed so that you click before thinking. Attackers may impersonate banks, schools, employers, delivery companies, government agencies, or people you know.",
          "Pause before clicking. Inspect the sender, domain, spelling, payment request, and destination. When money or credentials are involved, open the official app or website yourself instead of following the message link.",
        ],
        bullets: ["Be suspicious of unexpected payment requests.", "Do not install unknown APKs or remote-access software.", "Back up important files separately from your main device."],
      },
    ],
    lab: {
      title: "Personal Security Checkup",
      description: "Strengthen three important accounts and identify phishing warning signs.",
      steps: ["Choose three important accounts.", "Confirm each uses a unique password.", "Enable MFA where available.", "Review recent login activity and remove unfamiliar sessions.", "Write five warning signs you will use to identify suspicious messages."],
    },
    quiz: [
      { question: "A caller claiming to be your bank asks for your OTP. What should you do?", options: ["Share it quickly", "Share only half", "Refuse and contact the bank through its official channel", "Post it in a group for advice"], answerIndex: 2, explanation: "OTPs and verification codes are secrets. Contact the institution using an independently verified official channel." },
      { question: "Why is password reuse dangerous?", options: ["It makes typing faster", "One breached service can expose access to other accounts", "It improves encryption", "It prevents phishing"], answerIndex: 1, explanation: "Attackers test stolen username/password combinations across other services." },
    ],
  },
  {
    id: "content-creation",
    week: 5,
    title: "Digital Content Creation & Personal Branding",
    objective: "Create clear, credible digital content and present yourself professionally online.",
    lessons: [
      {
        id: "create-1",
        title: "Designing Useful Visual Content",
        content: [
          "Strong design begins with the message. Decide who the content is for, what they should understand, and what action they should take. Templates can help, but clarity matters more than decoration.",
          "Use hierarchy: headline first, supporting information second, call-to-action last. Keep contrast high and avoid overcrowding small mobile screens.",
        ],
        bullets: ["Use one main message per graphic.", "Choose readable fonts and adequate contrast.", "Use images and music only when you have permission or a valid licence."],
      },
      {
        id: "create-2",
        title: "Professional Profiles and Digital Footprints",
        content: [
          "Your digital footprint is the collection of information about you that exists online. Employers, clients, collaborators, and schools may see public profiles before they speak with you.",
          "A strong professional profile communicates who you are, what you can do, evidence of your work, and how someone can contact you. Projects often speak louder than claims.",
        ],
        bullets: ["Use a clear profile headline.", "Show projects, certificates, or case studies.", "Review old public posts and privacy settings."],
      },
    ],
    lab: {
      title: "Create a One-Page Personal Brand Kit",
      description: "Build a simple professional profile and one shareable visual.",
      steps: ["Write a 40-word professional bio.", "List five skills you can demonstrate with evidence.", "Create a simple profile banner or service flyer.", "Add one clear call-to-action and contact method.", "Export the visual in a mobile-friendly format."],
    },
    quiz: [
      { question: "What should determine a design before colours and effects?", options: ["The message and audience", "The number of animations", "The most expensive template", "The file size only"], answerIndex: 0, explanation: "Purpose and audience should drive design decisions." },
      { question: "Which is strongest evidence on a professional profile?", options: ["Saying you are the best", "A relevant completed project with a clear explanation", "Many unrelated hashtags", "A copied biography"], answerIndex: 1, explanation: "Visible, relevant work demonstrates capability more credibly than unsupported claims." },
    ],
  },
  {
    id: "ai-productivity",
    week: 6,
    title: "AI Literacy & Responsible Productivity",
    objective: "Use generative AI as a productivity tool without surrendering judgment, privacy, or originality.",
    lessons: [
      {
        id: "ai-1",
        title: "Prompting for Useful Work",
        content: [
          "A strong prompt gives context, a clear task, useful constraints, and the desired output format. You can also provide examples or ask the model to identify missing information before answering.",
          "AI output is a draft or assistant contribution, not automatic truth. Verify important facts, calculations, references, legal claims, health claims, and academic citations independently.",
        ],
        bullets: ["State the role, task, context, constraints, and output format.", "Break complex work into smaller steps.", "Ask for uncertainty and assumptions to be stated."],
      },
      {
        id: "ai-2",
        title: "Privacy, Academic Integrity and Human Review",
        content: [
          "Do not paste confidential client data, passwords, private records, unpublished research, or sensitive personal information into AI tools unless your organization explicitly allows it and appropriate safeguards are in place.",
          "Use AI to learn, brainstorm, outline, critique, summarize your own notes, or automate repetitive drafting. Keep human responsibility for final decisions and follow your institution's rules on AI-assisted work.",
        ],
        bullets: ["Remove sensitive data before using external AI tools.", "Verify citations instead of trusting generated references.", "Disclose AI assistance when required by school or workplace policy."],
      },
    ],
    lab: {
      title: "Build a Reusable Productivity Prompt",
      description: "Create and test a prompt template for a real task you repeat often.",
      steps: ["Choose a recurring task such as drafting emails, study questions, captions, meeting notes, or project plans.", "Write the context and goal.", "Add constraints for tone, length, audience, and format.", "Test it with two different examples.", "Review the outputs and document what still requires human verification."],
    },
    quiz: [
      { question: "Which AI output should be independently verified?", options: ["Only jokes", "Important facts, references, and high-stakes claims", "Nothing", "Only headings"], answerIndex: 1, explanation: "Generative models can produce plausible but incorrect information, especially citations and precise facts." },
      { question: "Which data should generally not be pasted into a public AI service?", options: ["A public press release", "A generic practice paragraph", "Passwords and confidential client records", "A public job advert"], answerIndex: 2, explanation: "Secrets and confidential personal or client data require strict protection." },
    ],
  },
  {
    id: "income-career",
    week: 7,
    title: "Digital Careers, Freelancing & Entrepreneurship",
    objective: "Translate digital skills into credible opportunities, services, and income pathways.",
    lessons: [
      {
        id: "career-1",
        title: "From Skill to Offer",
        content: [
          "A marketable skill becomes an offer when it solves a specific problem for a specific person. Instead of saying 'I do digital work,' say what you deliver, for whom, and what outcome it supports.",
          "Beginners can build proof through personal projects, volunteer work, simulated client briefs, internships, campus organizations, or small local businesses before pursuing larger contracts.",
        ],
        bullets: ["Choose one primary skill to sell first.", "Create two or three evidence-based sample projects.", "Define scope, deadline, revision limits, and payment terms before starting paid work."],
      },
      {
        id: "career-2",
        title: "Job Search, Freelance Platforms and Reputation",
        content: [
          "Do not depend on one platform. Combine referrals, local networks, LinkedIn, job boards, communities, direct outreach, and appropriate freelance marketplaces.",
          "Protect yourself from fake jobs and fake clients. Be cautious when asked to pay large fees before employment, move conversations to suspicious channels, receive or forward unexplained funds, or reveal banking credentials.",
        ],
        bullets: ["Tailor applications to the role.", "Track applications and follow-ups.", "Collect testimonials and permission to show completed work."],
      },
    ],
    lab: {
      title: "Create Your First Digital Service Offer",
      description: "Package one skill into a simple, clear service that could be offered locally or online.",
      steps: ["Choose one service such as CV formatting, social-media design, spreadsheet cleanup, data entry, website setup, or video editing.", "Define the target customer.", "Write the deliverables and turnaround time.", "Create a sample before-and-after or demonstration project.", "Write a short outreach message focused on the customer's problem rather than begging for work."],
    },
    quiz: [
      { question: "What makes a digital skill easier to sell?", options: ["A vague claim", "A clear offer tied to a customer problem and evidence", "No deadline", "Copying another person's portfolio"], answerIndex: 1, explanation: "Specific outcomes and proof reduce uncertainty for potential clients or employers." },
      { question: "Which is a common job-scam warning sign?", options: ["A written role description", "A normal interview", "A demand for unusual upfront payment or secret financial transfers", "A company website"], answerIndex: 2, explanation: "Unexpected payments and unexplained money transfers are major fraud warning signs." },
    ],
  },
  {
    id: "capstone",
    week: 8,
    title: "Capstone: Build Your Digital Opportunity Portfolio",
    objective: "Combine the course into a portfolio that demonstrates readiness for further training, work, or business.",
    lessons: [
      {
        id: "cap-1",
        title: "Building Evidence, Not Just Certificates",
        content: [
          "Certificates show that you completed training; a portfolio shows what you can actually do. Your capstone should contain small, credible artifacts from this course and explain the problem, process, tools, and result.",
          "Keep the portfolio simple enough to open on a phone. A cloud folder, one-page website, PDF portfolio, or professional profile can work when it is organized and easy to verify.",
        ],
        bullets: ["Include a CV or professional bio.", "Include at least three project artifacts.", "Add contact information and a next-step learning goal."],
      },
      {
        id: "cap-2",
        title: "Your 90-Day Digital Growth Plan",
        content: [
          "Progress accelerates when you choose a specific next skill and practice consistently. Select one FINTIGEN pathway, define a weekly schedule, and decide what evidence you will produce every month.",
          "Avoid trying to master every digital skill at once. Build a foundation, choose a direction, create evidence, seek feedback, and improve deliberately.",
        ],
        bullets: ["Choose one specialization.", "Set weekly learning hours.", "Plan one portfolio project per month.", "Track applications, clients, or practical outcomes."],
      },
    ],
    lab: {
      title: "Publish Your Digital Opportunity Portfolio",
      description: "Assemble the evidence created during the programme into one shareable portfolio.",
      steps: ["Add your professional bio and CV.", "Include your spreadsheet tracker, brand visual, AI prompt template, and service offer or equivalent projects.", "Write a short description of what you learned from each artifact.", "Check that private information is removed.", "Share the finished portfolio with a mentor or peer for feedback and record three improvements to make next."],
    },
    quiz: [
      { question: "Why is a portfolio valuable alongside a certificate?", options: ["It replaces all learning", "It provides evidence of practical ability", "It hides your work", "It guarantees employment"], answerIndex: 1, explanation: "A portfolio demonstrates how you apply skills through visible work products." },
      { question: "What is the best next step after finishing a foundation course?", options: ["Stop learning", "Try every specialization at once", "Choose a focused pathway and keep producing evidence", "Delete your projects"], answerIndex: 2, explanation: "Focused practice and visible projects create deeper skill and stronger career evidence." },
    ],
  },
];
