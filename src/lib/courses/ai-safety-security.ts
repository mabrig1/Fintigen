import type { CourseMeta, CourseModule } from "@/lib/courses/types";

export const courseMeta: CourseMeta = {
  slug: "ai-safety-security",
  title: "AI Safety & Security for Agentic Systems",
  tagline:
    "A practical public-interest pathway for software engineers entering AI assurance, evaluations, information security, and human oversight",
  duration: "6 Weeks",
  pace: "5–7 hours/week",
  level: "Intermediate",
  prerequisites: [
    "Comfort reading code and technical documentation",
    "Basic software-development or cybersecurity experience",
    "No formal degree required",
  ],
  overview: [
    "This course is a practical bridge from general software engineering into work that can contribute to reducing risks from increasingly capable AI systems. It focuses on threat modeling, agent and tool security, model/agent evaluations, evidence quality, human oversight, and reproducible assurance work.",
    "The course is deliberately evidence-first. Learners are taught to separate observed facts from model claims, document uncertainty, avoid overstating security conclusions, and produce public technical work that can be reviewed by mentors, researchers, and prospective employers.",
  ],
  objectives: [
    "Explain major technical risk pathways from increasingly capable and tool-using AI systems without treating uncertain claims as settled facts.",
    "Construct threat models for AI agents, tools, credentials, data, CI/CD, and external-service boundaries.",
    "Design reproducible model and agent evaluations with explicit metrics, baselines, and failure criteria.",
    "Assess when human approval adds meaningful control and when it risks becoming ceremonial oversight.",
    "Apply defensive information-security principles to AI development and evaluation infrastructure.",
    "Produce a capstone assurance report and reproducible evaluation artifact suitable for external review.",
  ],
  tools: [
    {
      category: "Engineering",
      items: "Git, GitHub, JSON, structured logs, isolated test repositories",
    },
    {
      category: "Evaluation",
      items: "Test cases, rubrics, baselines, repeated trials, evidence tables",
    },
    {
      category: "Security",
      items: "Threat modeling, least privilege, secret handling, dependency review, CI/CD controls",
    },
    {
      category: "Open-source lab",
      items: "MABRIG DevShield AI or equivalent defensive repository-analysis tools",
    },
  ],
  grading: [
    {
      component: "Weekly Labs",
      weight: "45%",
      detail:
        "Defensive, reproducible exercises in threat modeling, evaluation design, evidence review, and control boundaries.",
    },
    {
      component: "Module Quizzes",
      weight: "20%",
      detail:
        "Knowledge checks on AI-safety concepts, security assumptions, evaluation design, and uncertainty.",
    },
    {
      component: "Capstone Assurance Project",
      weight: "35%",
      detail:
        "A public or mentor-reviewable evaluation artifact with methods, evidence, limitations, and a reproducibility note.",
    },
  ],
};

export const courseModules: CourseModule[] = [
  {
    id: "transformative-ai-risk",
    week: 1,
    title: "Transformative AI Risk, Evidence & Threat Models",
    objective:
      "Build a careful mental model of advanced-AI risk and translate broad concerns into testable technical questions.",
    lessons: [
      {
        id: "tais-1",
        title: "From Capability Growth to Testable Risk Questions",
        content: [
          "AI-safety work becomes useful when broad concerns are converted into claims that can be examined. Instead of beginning with a conclusion, start with a system, an actor, a capability, a failure mode, and an observable consequence.",
          "Some advanced-AI risks are highly uncertain and contested. Good technical work distinguishes empirical observations, assumptions, forecasts, and value judgments rather than presenting all four as the same kind of evidence.",
        ],
        bullets: [
          "Write the system boundary before writing the risk claim.",
          "Separate observed capability from forecasted future capability.",
          "State what evidence would change your mind.",
          "Prefer falsifiable technical questions over dramatic language.",
        ],
      },
      {
        id: "tais-2",
        title: "Threat Modeling Tool-Using AI Systems",
        content: [
          "A threat model identifies valuable assets, trust boundaries, possible failure modes, and the controls that reduce risk. For agentic systems, the model must include not only the language model but also tools, credentials, retrieval sources, memory, external APIs, CI/CD systems, and humans who approve actions.",
          "The purpose of a threat model is prioritization. It should help a team decide where independent evidence, isolation, least privilege, or human control matters most.",
        ],
        bullets: [
          "Map assets, actors, privileges, tools, and external effects.",
          "Record which boundaries are enforced technically and which depend on convention.",
          "Treat prompts, retrieved content, and tool output as potentially untrusted.",
        ],
      },
    ],
    lab: {
      title: "Build an Agent Trust-Boundary Map",
      description:
        "Create a defensive threat model for a hypothetical coding agent without attacking a real system.",
      steps: [
        "Choose a bounded coding-agent workflow and list its assets, tools, credentials, and external services.",
        "Draw or describe every trust boundary the agent crosses.",
        "Identify five plausible failure modes and label each as observed, assumed, or forecasted.",
        "For each failure mode, propose one preventive control and one independent detection signal.",
        "Write one paragraph explaining the largest uncertainty in your model.",
      ],
    },
    quiz: [
      {
        question: "What is the strongest starting point for a technical AI-risk project?",
        options: [
          "Assume the worst-case scenario is certain",
          "Translate a risk concern into a bounded, testable question",
          "Ask a model whether it is safe",
          "Collect as many tools as possible",
        ],
        answerIndex: 1,
        explanation:
          "A bounded, testable question makes assumptions and evidence visible and allows the work to produce informative positive or negative results.",
      },
      {
        question: "Which item belongs inside an agentic-system threat model?",
        options: [
          "Only the base model",
          "Only the user interface",
          "Tools, credentials, memory, data sources, external services, and human approval points",
          "Only published vulnerabilities",
        ],
        answerIndex: 2,
        explanation:
          "Agent behavior depends on the entire system around the model, especially tool authority and external side effects.",
      },
    ],
  },
  {
    id: "agent-security",
    week: 2,
    title: "Agent Security, Tool Authority & Software Supply Chains",
    objective:
      "Apply defensive information-security principles to AI agents that can modify code, invoke tools, and interact with deployment systems.",
    lessons: [
      {
        id: "tais-3",
        title: "Least Privilege for AI Agents",
        content: [
          "An agent should receive only the permissions required for the current task. Broad credentials, wildcard tool access, write access to production, or unrestricted external calls increase the impact of mistakes and manipulation.",
          "Least privilege is not a guarantee of safety, but it reduces blast radius. Strong systems also log consequential actions, isolate risky execution, and require stronger evidence before privilege is increased.",
        ],
        bullets: [
          "Prefer task-scoped tokens and short-lived credentials.",
          "Separate read, propose, approve, and execute capabilities.",
          "Keep high-impact tools behind explicit policy boundaries.",
        ],
      },
      {
        id: "tais-4",
        title: "Supply-Chain and CI/CD Risk",
        content: [
          "AI-assisted development can increase the rate at which dependencies, actions, containers, and configuration are changed. A secure workflow therefore needs provenance, review, and reproducible evidence around the software supply chain.",
          "Defensive review should focus on what changed, which new authority was introduced, and whether the change expands the system's exposure. Passing one scanner is never proof that a release is secure.",
        ],
        bullets: [
          "Review dependency identity, source, integrity, and maintenance signals.",
          "Treat privileged CI workflows as security-sensitive code.",
          "Prefer immutable references and reproducible builds where practical.",
        ],
      },
    ],
    lab: {
      title: "Review an Agentic Pull Request Defensively",
      description:
        "Use a synthetic repository or a repository you control to inspect a change without exploiting anything.",
      steps: [
        "Select a safe test change involving a dependency, workflow, or tool configuration.",
        "List the new privileges or external dependencies introduced by the change.",
        "Run a defensive repository scanner such as DevShield or an equivalent tool.",
        "Compare machine findings with your manual threat model.",
        "Write a short review that separates verified evidence, uncertainty, and recommended human decisions.",
      ],
    },
    quiz: [
      {
        question: "Why is least privilege important for an AI agent?",
        options: [
          "It makes the model more intelligent",
          "It reduces the impact of mistakes or misuse by limiting authority",
          "It eliminates the need for monitoring",
          "It guarantees no attack is possible",
        ],
        answerIndex: 1,
        explanation:
          "Least privilege limits the authority available to the agent; it reduces blast radius but does not replace monitoring or evaluation.",
      },
      {
        question: "What does a clean automated scan prove?",
        options: [
          "The software is secure",
          "No vulnerability exists",
          "Only that the configured checks did not report a finding in that run",
          "The agent can safely deploy to production",
        ],
        answerIndex: 2,
        explanation:
          "Automated tools have bounded coverage and uncertainty. Absence of a finding is not proof of security.",
      },
    ],
  },
  {
    id: "evaluations",
    week: 3,
    title: "Model & Agent Evaluations",
    objective:
      "Design evaluations that generate interpretable evidence rather than impressive but ambiguous demonstrations.",
    lessons: [
      {
        id: "tais-5",
        title: "What Makes an Evaluation Useful?",
        content: [
          "A useful evaluation defines the behavior being measured, the conditions under which it is tested, the metric, a baseline, and the limitations. The test should be repeatable enough that another reviewer can understand how the result was produced.",
          "Single demonstrations are weak evidence for general capability or safety. Repeated trials, counterexamples, and explicit failure criteria make conclusions more trustworthy.",
        ],
        bullets: [
          "Define success and failure before running the test.",
          "Keep prompts, model settings, tool permissions, and environment conditions when safe to do so.",
          "Report negative and inconclusive results.",
        ],
      },
      {
        id: "tais-6",
        title: "Evaluating Tool-Using Agents",
        content: [
          "Agent evaluations must measure more than final-answer quality. They can track tool selection, policy compliance, unnecessary privilege use, unsafe proposals, recovery from failed tools, and whether the agent stops when a boundary requires human review.",
          "Ground truth is difficult in many AI-safety questions. Use deterministic evidence where it exists and label judgment-based scores clearly when it does not.",
        ],
        bullets: [
          "Measure actions, not only explanations.",
          "Compare against a meaningful baseline.",
          "Do not use the evaluated model as the sole judge of its own safety.",
        ],
      },
    ],
    lab: {
      title: "Write a Reproducible Agent Evaluation",
      description:
        "Create an evaluation plan for a benign, sandboxed agent task.",
      steps: [
        "Define one safety-relevant agent behavior and one task-performance metric.",
        "Write a fixed task, environment assumptions, allowed tools, and stopping rule.",
        "Define at least one baseline condition.",
        "Specify what data will be recorded and what evidence will remain unavailable.",
        "Write the result template before running any experiment.",
      ],
    },
    quiz: [
      {
        question: "Which practice most improves evaluation interpretability?",
        options: [
          "Changing the metric after seeing the result",
          "Defining metrics and failure criteria before running the test",
          "Keeping only successful runs",
          "Letting the model grade itself without independent evidence",
        ],
        answerIndex: 1,
        explanation:
          "Predefining metrics and failure criteria reduces result-driven reinterpretation and makes the evaluation easier to audit.",
      },
      {
        question: "For a tool-using agent, what should an evaluation observe?",
        options: [
          "Only the final prose answer",
          "Actions, tool use, policy compliance, outcomes, and relevant explanations",
          "Only token count",
          "Only model confidence",
        ],
        answerIndex: 1,
        explanation:
          "Agent safety depends heavily on actions and external effects, not only on the final text response.",
      },
    ],
  },
  {
    id: "human-oversight",
    week: 4,
    title: "Human Oversight, Control & Interruptibility",
    objective:
      "Evaluate when human review adds safety and when approval mechanisms risk becoming empty ceremony.",
    lessons: [
      {
        id: "tais-7",
        title: "Approval Is a Mechanism, Not an Outcome",
        content: [
          "Adding an approval button does not automatically create meaningful human control. Reviewers need sufficient evidence, time, authority, and a realistic ability to reject or reverse an action.",
          "Oversight can become ceremonial when humans are overloaded, explanations are misleading, or the system presents a binary decision without the information needed to understand consequences.",
        ],
        bullets: [
          "Measure reviewer decision quality, not approval-button count.",
          "Record what evidence the reviewer saw.",
          "Track whether rejected actions remain interruptible and reversible.",
        ],
      },
      {
        id: "tais-8",
        title: "Control Boundaries and Escalation",
        content: [
          "Not every action needs the same level of human control. Low-impact reversible actions may be delegated, while privileged, irreversible, high-blast-radius, or highly uncertain actions may justify stronger review or blocking.",
          "A transparent control policy should expose why an action is delegated, reviewed, approval-gated, or blocked. It should also allow evidence to overturn the policy rather than hiding the decision inside an opaque score.",
        ],
        bullets: [
          "Separate heuristic recommendations from hard policy constraints.",
          "Use stronger controls for privilege, credentials, irreversibility, and high uncertainty.",
          "Test whether the control actually changes outcomes.",
        ],
      },
    ],
    lab: {
      title: "Human-vs-Agent Control Experiment",
      description:
        "Design a paired, sandboxed comparison between an autonomous condition and a human-controlled condition.",
      steps: [
        "Choose a benign task where an agent can make a consequential but reversible repository change.",
        "Define an autonomous condition and a condition with evidence-rich human review.",
        "Predefine unsafe-outcome and task-success measures.",
        "Record review latency and the evidence presented to the reviewer.",
        "Compare results without treating one paired trial as a population-level causal estimate.",
      ],
    },
    quiz: [
      {
        question: "When can human approval become 'oversight theatre'?",
        options: [
          "Whenever a human is involved",
          "When approval exists but the reviewer lacks meaningful evidence, time, or ability to intervene",
          "Only when a model refuses",
          "Never",
        ],
        answerIndex: 1,
        explanation:
          "A nominal approval step can be ineffective if the human cannot make an informed or consequential decision.",
      },
      {
        question: "Which action most plausibly warrants stronger control?",
        options: [
          "A reversible local formatting change",
          "A read-only search",
          "A high-privilege credential change with external side effects",
          "Opening documentation",
        ],
        answerIndex: 2,
        explanation:
          "Privilege, credential access, external side effects, and limited reversibility are strong reasons to retain a meaningful control boundary.",
      },
    ],
  },
  {
    id: "frontier-infosec",
    week: 5,
    title: "Defensive Information Security for Advanced-AI Infrastructure",
    objective:
      "Understand the defensive security practices that protect models, evaluation systems, credentials, data, and research infrastructure.",
    lessons: [
      {
        id: "tais-9",
        title: "Protecting Models, Data & Credentials",
        content: [
          "Advanced-AI security includes conventional foundations: identity, access control, secret management, hardened endpoints, dependency hygiene, monitoring, backups, and incident response. These controls become more important when models or agents can invoke tools with real authority.",
          "Security work should minimize exposure of sensitive model artifacts, evaluation data, credentials, and unpublished vulnerabilities while preserving enough logging for accountability.",
        ],
        bullets: [
          "Use strong identity and least-privilege access.",
          "Keep secrets out of repositories and prompts.",
          "Log consequential operations without unnecessarily collecting sensitive content.",
        ],
      },
      {
        id: "tais-10",
        title: "Responsible Evaluation & Disclosure",
        content: [
          "Safety and security research can create dual-use information. Responsible work considers whether publishing a test case, exploit detail, credential pattern, or bypass would materially increase risk.",
          "A good disclosure process records the issue, limits unnecessary exposure, contacts the responsible maintainer when appropriate, and publishes only what can be shared safely.",
        ],
        bullets: [
          "Do not test systems you do not own or have permission to assess.",
          "Prefer synthetic or isolated environments for labs.",
          "Document why sensitive details are withheld when responsible disclosure requires it.",
        ],
      },
    ],
    lab: {
      title: "Design a Secure Evaluation Environment",
      description:
        "Create an architecture plan for a safe AI-agent evaluation sandbox.",
      steps: [
        "List the model, tools, datasets, credentials, network access, and storage needed by the evaluation.",
        "Remove privileges that are unnecessary for the test.",
        "Define logging that captures actions without collecting unrelated private data.",
        "Define reset/rollback and incident-stop procedures.",
        "Write a short responsible-disclosure rule for findings discovered during the evaluation.",
      ],
    },
    quiz: [
      {
        question: "What is the safest default for practical security labs?",
        options: [
          "Test public systems without permission",
          "Use isolated or synthetic environments you control",
          "Publish credentials so classmates can share them",
          "Disable logging",
        ],
        answerIndex: 1,
        explanation:
          "Controlled environments support learning and reproducibility without creating unauthorized risk to third parties.",
      },
      {
        question: "Why might an evaluation result need limited disclosure?",
        options: [
          "To hide weak research",
          "Because some operational details could create a concrete security risk before mitigation",
          "Because all AI research should be secret",
          "To avoid documenting limitations",
        ],
        answerIndex: 1,
        explanation:
          "Responsible disclosure can temporarily or permanently limit operational details when publication would materially increase risk.",
      },
    ],
  },
  {
    id: "capstone",
    week: 6,
    title: "Capstone: Reproducible AI Assurance Project",
    objective:
      "Produce a mentor-reviewable work sample that demonstrates careful technical reasoning, reproducibility, and honest limitation reporting.",
    lessons: [
      {
        id: "tais-11",
        title: "From Prototype to Evidence",
        content: [
          "The capstone is not judged by how dramatic the result sounds. It is judged by whether the question is clear, the method is reproducible, the evidence supports the conclusion, and limitations are visible.",
          "A strong project may report that a proposed control did not help. Negative results are valuable when they are generated by a credible method and narrow uncertainty.",
        ],
        bullets: [
          "Keep a methods section and reproducibility checklist.",
          "Separate findings from interpretation.",
          "Publish limitations and failed hypotheses.",
        ],
      },
      {
        id: "tais-12",
        title: "Building a Career-Ready Technical Portfolio",
        content: [
          "A useful AI-safety portfolio shows what you can investigate and explain. Include a concise project summary, repository or artifact, evaluation method, results, limitations, and a short reflection on what you would test next.",
          "Do not claim expertise, partnerships, impact, or adoption that you cannot verify. Credibility is a technical asset.",
        ],
        bullets: [
          "Make the artifact inspectable.",
          "Explain your individual contribution.",
          "Link claims to evidence.",
          "State the next unanswered question.",
        ],
      },
    ],
    lab: {
      title: "Ship the AI Assurance Capstone",
      description:
        "Complete a defensive evaluation or assurance project and package it for mentor review.",
      steps: [
        "Select a bounded topic in agent security, evaluation, oversight, or defensive infrastructure.",
        "Write the research question, threat model, method, metrics, and safety constraints.",
        "Run the work in a controlled environment and preserve reproducibility evidence.",
        "Produce a concise report with findings, limitations, negative results, and next steps.",
        "Prepare a public version only after reviewing privacy, security, licensing, and responsible-disclosure concerns.",
      ],
    },
    quiz: [
      {
        question: "What makes a strong AI-safety capstone?",
        options: [
          "A large claim with no reproducible method",
          "A clear question, inspectable method, evidence, limitations, and reproducibility",
          "The most expensive model",
          "A certificate without project evidence",
        ],
        answerIndex: 1,
        explanation:
          "External reviewers can assess credible work when the question, method, evidence, and limitations are visible.",
      },
      {
        question: "Which statement is best practice in a portfolio?",
        options: [
          "Claim partnerships that are still only planned",
          "Hide negative results",
          "State exactly what you built and what remains unverified",
          "Describe every automated finding as a confirmed vulnerability",
        ],
        answerIndex: 2,
        explanation:
          "Precise, evidence-backed claims protect credibility and make it easier for reviewers to understand your actual contribution.",
      },
    ],
  },
];
