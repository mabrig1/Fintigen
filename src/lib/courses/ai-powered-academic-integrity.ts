import type { CourseMeta, CourseModule } from "@/lib/courses/types";

export const courseMeta: CourseMeta = {
  slug: "ai-powered-academic-integrity",
  title: "AI-Powered Academic Integrity",
  tagline: "Master generative AI for rigorous, transparent, defensible research and scholarly writing",
  duration: "4 Weeks",
  pace: "6–8 hours/week",
  level: "Intermediate → Advanced",
  prerequisites: [
    "Active engagement in academic research or scholarly writing",
    "Basic familiarity with at least one generative AI platform",
    "One active research project, manuscript, thesis, grant concept, or scholarly workflow for practice",
  ],
  overview: [
    "Generative AI can accelerate literature work, critique, drafting, coding support, synthesis, and workflow organization, but it does not carry scholarly responsibility. This course teaches researchers to use AI as an auditable research assistant while retaining responsibility for claims, citations, interpretation, originality, consent, confidentiality, authorship, and final submission.",
    "The programme is organized around six modules delivered across four weeks. Participants build a research-lifecycle AI map, versioned prompt library, claim–evidence verification logs, disclosure statements, a data-use decision matrix, and a reproducible capstone workflow.",
    "The central principle is augmentation without abdication: automation should reduce mechanical burden without transferring intellectual judgment. Every major AI-assisted output is treated as a candidate that must be checked against evidence, method, policy, and human expertise.",
  ],
  objectives: [
    "Design transparent and reproducible AI-augmented research workflows.",
    "Detect hallucinations, fabricated citations, factual drift, overconfident wording, and subtle bias.",
    "Build precise evidence-bounded prompts for literature, methods, results, and discussion tasks.",
    "Apply current institutional, publisher, funder, ethics, and data-governance requirements.",
    "Create personal verification protocols suitable for peer review and research audit.",
    "Decide when AI should not be used because of confidentiality, consent, validity, or policy constraints.",
    "Document AI use through prompt logs, source records, decision notes, and version control.",
    "Preserve authentic academic voice and human authorship accountability.",
    "Classify research data before selecting AI tools and environments.",
    "Integrate verification, disclosure, governance, and reproducibility into one capstone research system.",
  ],
  tools: [
    { category: "Research", items: "Institutional library databases, DOI/metadata lookup, reference managers, primary-source repositories" },
    { category: "AI", items: "Institutionally permitted generative AI systems used under evidence-bounded prompts" },
    { category: "Documentation", items: "Prompt logs, claim–evidence ledgers, decision logs, version-controlled notes" },
    { category: "Governance", items: "Current university, publisher, funder, ethics, privacy, and data-management policies" },
    { category: "Reproducibility", items: "Research folders, code/data records, workflow README files, verification and disclosure templates" },
  ],
  grading: [
    { component: "Research Lifecycle AI Map", weight: "10%", detail: "Map AI use, risk, evidence, verification, and human decision points across one live project." },
    { component: "Prompt Architecture Library", weight: "20%", detail: "Versioned scholarly prompts with evidence boundaries, failure modes, and performance notes." },
    { component: "Verification Protocol Portfolio", weight: "25%", detail: "Three claim–evidence logs covering bibliographic, numerical/methodological, and interpretive claims." },
    { component: "Disclosure + Academic Voice Portfolio", weight: "15%", detail: "Four disclosure statements plus a personal Academic Voice Charter." },
    { component: "Data-Use Decision Matrix", weight: "10%", detail: "Data classification, permitted environments, approvals, verification, and retention expectations." },
    { component: "Capstone Workflow + Presentation", weight: "20%", detail: "A complete reproducible AI-augmented research workflow and audit-ready evidence package." },
  ],
};

export const courseModules: CourseModule[] = [
  {
    id: "research-lifecycle-foundations",
    week: 1,
    title: "Foundations of Generative AI in the Research Lifecycle",
    objective: "Map legitimate, high-risk, and prohibited AI uses across the full research lifecycle.",
    lessons: [
      {
        id: "aiai-1-1",
        title: "Capability Is Not Epistemic Authority",
        content: [
          "Generative systems can re-express, compare, brainstorm, extract, summarize, classify, and explore ideas conversationally. Fluency does not establish that a statement is true, a citation exists, a method is valid, or an interpretation is novel.",
          "Treat generated claims as candidate statements until they are supported by traceable evidence. Verification requirements should increase as the model moves farther from evidence you supplied directly.",
        ],
        bullets: [
          "Separate linguistic competence from scholarly authority.",
          "Do not ask a model to function as a source of record.",
          "Preserve the researcher as the final decision-maker for claims, methods, and interpretation.",
        ],
      },
      {
        id: "aiai-1-2",
        title: "The Research Lifecycle as a Risk Chain",
        content: [
          "Research quality depends on linked decisions: problem framing, discovery, methods, data preparation, analysis, writing, submission, and peer-review response. An error introduced early can propagate into every later stage.",
          "The practical question is not only whether AI can perform a task, but what happens downstream if the output is wrong, incomplete, biased, or unauthorized.",
        ],
        bullets: [
          "Lower-risk uses include formatting, keyword expansion, checklist creation, and critique of supplied text.",
          "Higher-risk uses include invented references, unsupervised interpretation, sensitive-data processing, and conclusions generated before evidence review.",
          "Classify each task before choosing the tool.",
        ],
      },
      {
        id: "aiai-1-3",
        title: "Integrity Violations and the Five-Level Risk Model",
        content: [
          "AI-related integrity failures include fabrication, falsification, unattributed appropriation, unauthorized assistance, confidentiality breaches, and misrepresentation of human or tool contributions.",
          "Use a five-level model: Transform, Assist, Influence, Sensitive, and Do Not Use. The control burden rises from simple fidelity checks to source tracing, expert review, formal authorization, or complete prohibition.",
        ],
      },
    ],
    lab: {
      title: "Research Lifecycle AI Map",
      description: "Map one active project and define where AI may assist, what can go wrong, and who retains final authority.",
      steps: [
        "List the major stages of one live research project.",
        "For each stage, state the intended AI use and assign a risk level from 1 to 5.",
        "Record the evidence supplied, verification method, data restriction, and final human decision-maker.",
        "Identify one attractive AI use you will avoid because its risk exceeds its value.",
      ],
    },
    quiz: [
      {
        question: "Which statement best captures the course's core principle?",
        options: ["Fluent output is usually reliable", "AI may assist, but scholarly responsibility remains human", "Citations generated by AI are acceptable if plausible", "Verification is only needed for numerical work"],
        answerIndex: 1,
        explanation: "The course is built on augmentation without abdication: AI can assist defined tasks, but researchers retain responsibility and verification.",
      },
      {
        question: "Which task normally requires the strongest control?",
        options: ["Reformatting headings", "Brainstorming keywords", "Interpreting sensitive participant data", "Turning notes into a checklist"],
        answerIndex: 2,
        explanation: "Sensitive data and substantive interpretation require formal governance, approved environments, and strong human review.",
      },
      {
        question: "Why is downstream impact important when classifying AI risk?",
        options: ["Because every tool has the same failure rate", "Because an early error can contaminate later research decisions", "Because AI should only be used at submission", "Because formatting errors are irreversible"],
        answerIndex: 1,
        explanation: "Research stages are interdependent, so errors can propagate through the workflow.",
      },
    ],
  },
  {
    id: "prompt-architecture",
    week: 1,
    title: "Precision Prompt Architecture for Scholarly Tasks",
    objective: "Build controlled, evidence-bounded prompts that are testable, reusable, and easy to verify.",
    lessons: [
      {
        id: "aiai-2-1",
        title: "The R-C-E-T-C-O-V Framework",
        content: [
          "Strong scholarly prompts define Role, Context, Evidence, Task, Constraints, Output, and Verification. This architecture reduces ambiguity and makes the resulting output easier to inspect.",
          "Evidence boundaries are more important than instructions such as 'do not hallucinate'. A workflow that limits the model to verified material and requires claim tracing creates a real control.",
        ],
        bullets: [
          "Role: the perspective required.",
          "Context: the scholarly purpose and disciplinary setting.",
          "Evidence: the material the model may rely on.",
          "Task and Constraints: the operation and prohibited behavior.",
          "Output and Verification: the structure plus how uncertainty and evidence support must be shown.",
        ],
      },
      {
        id: "aiai-2-2",
        title: "Evidence-Bounded Literature Synthesis",
        content: [
          "For literature synthesis, supply verified abstracts, extracted findings, or a structured evidence matrix. Then ask the model to compare, cluster, identify contradictions, or surface unresolved questions without adding sources.",
          "When AI is used for discovery, treat suggestions only as leads. Titles, authors, DOI values, statistics, quotations, and study descriptions must be independently located and checked before use.",
        ],
      },
      {
        id: "aiai-2-3",
        title: "Prompt Chains, Epistemic Humility, and Version Control",
        content: [
          "Complex outputs are safer when decomposed into checkpoints: extract verified findings, compare with selected literature, propose labeled interpretations, generate rival explanations, test claims against evidence, then draft prose.",
          "A professional prompt library stores versions, intended task, required input, prohibited input, expected output, known failure modes, verification steps, and performance notes.",
        ],
      },
    ],
    lab: {
      title: "Versioned Prompt Architecture Library v1",
      description: "Create five reusable scholarly prompts and document their behavior.",
      steps: [
        "Create prompts for literature comparison, argument critique, methods review, results narration, and discussion counterarguments.",
        "Define an explicit evidence boundary and prohibited behaviors for each prompt.",
        "Test each prompt twice on controlled material.",
        "Record failure modes and revise at least one prompt with a version note.",
      ],
    },
    quiz: [
      {
        question: "What is the strongest way to reduce invented citations?",
        options: ["Ask the model to be truthful", "Use a longer prompt", "Supply verified evidence and prohibit adding sources", "Generate the bibliography first"],
        answerIndex: 2,
        explanation: "A bounded evidence workflow is a real control; a verbal request not to hallucinate is not.",
      },
      {
        question: "Why are prompt chains useful in scholarly work?",
        options: ["They remove the need for verification", "They create visible checkpoints for complex reasoning", "They guarantee identical outputs", "They replace disciplinary expertise"],
        answerIndex: 1,
        explanation: "Decomposition makes errors easier to detect and correct before they contaminate later stages.",
      },
      {
        question: "A prompt library becomes reproducible when it records:",
        options: ["Only the final prompt wording", "Prompt wording plus purpose, inputs, failure modes, verification, and revisions", "Only the model name", "Only successful outputs"],
        answerIndex: 1,
        explanation: "Performance history and verification requirements turn prompting into a documented method.",
      },
    ],
  },
  {
    id: "verification-source-integrity",
    week: 2,
    title: "Hallucination Detection, Verification & Source Integrity",
    objective: "Verify bibliographic, factual, numerical, methodological, and interpretive claims at claim level.",
    lessons: [
      {
        id: "aiai-3-1",
        title: "Soft Hallucinations and Factual Drift",
        content: [
          "Research-risk hallucinations include more than invented facts. A model may merge studies, reverse a finding, transport results to a different population, strengthen an association into causation, or invent an apparently plausible quotation.",
          "Break prose into discrete propositions and verify each proposition rather than asking whether an entire paragraph 'looks accurate'.",
        ],
      },
      {
        id: "aiai-3-2",
        title: "The Three-Layer Verification Protocol",
        content: [
          "Layer 1 checks existence and identity: confirm the source, dataset, policy, instrument, statistic, or event actually exists and is correctly identified.",
          "Layer 2 checks claim fidelity: open the source and confirm it supports the exact wording, including qualifiers.",
          "Layer 3 checks context and interpretation: verify population, geography, time period, method, limitations, and whether the claim has been generalized beyond the original evidence.",
        ],
      },
      {
        id: "aiai-3-3",
        title: "Claim–Evidence Ledgers and Red-Team Review",
        content: [
          "A claim–evidence ledger links each material statement to retrievable support, the verification performed, corrections made, and the final disposition.",
          "Red-team review is especially valuable for polished prose because fluency can hide subtle distortions. The goal is a repeatable inspection habit that works whether the first draft came from AI or a human collaborator.",
        ],
      },
    ],
    lab: {
      title: "Three Claim–Evidence Verification Logs",
      description: "Build evidence trails for outputs from your own scholarly workflow.",
      steps: [
        "Verify one bibliographic claim.",
        "Verify one numerical or methodological claim.",
        "Verify one interpretive claim.",
        "For each log, retain the original output, evidence checked, correction made, and final disposition.",
      ],
    },
    quiz: [
      {
        question: "What is a soft hallucination?",
        options: ["Only a completely invented source", "A plausible claim that distorts real information, scope, or inference", "A spelling error", "A transparent statement of uncertainty"],
        answerIndex: 1,
        explanation: "Soft hallucinations mix recognizable facts with subtle distortion and can survive casual checking.",
      },
      {
        question: "Layer 2 of the verification protocol asks:",
        options: ["Does the source exist?", "Does the source actually support the claim as written?", "Is the prose elegant?", "Was the prompt short?"],
        answerIndex: 1,
        explanation: "Claim fidelity requires opening the source and checking that the cited evidence supports the actual statement.",
      },
      {
        question: "Why verify at claim granularity?",
        options: ["Because paragraphs cannot contain citations", "Because a paragraph can mix accurate and distorted propositions", "Because models only generate single sentences", "Because context never matters"],
        answerIndex: 1,
        explanation: "A polished paragraph may contain both correct and misleading claims, so propositions should be checked separately.",
      },
    ],
  },
  {
    id: "disclosure-voice-authorship",
    week: 3,
    title: "Ethical Disclosure, Academic Voice & Authorship",
    objective: "Disclose AI assistance proportionately while preserving human authorship, responsibility, and intellectual voice.",
    lessons: [
      {
        id: "aiai-4-1",
        title: "Disclosure as Research Transparency",
        content: [
          "Useful disclosure helps another person understand how the work was produced. It should identify the tool or class of tool where required, the purpose, scope, input restrictions, human verification, and responsibility for the final work.",
          "Disclosure rules vary by institution, journal, funder, assessment, and research context. Check the current authoritative policy rather than relying on a permanent template.",
        ],
      },
      {
        id: "aiai-4-2",
        title: "Academic Voice as Intellectual Evidence",
        content: [
          "Academic voice reveals how a scholar defines a problem, weighs evidence, handles uncertainty, positions theory, and connects findings. Generic AI prose can flatten these choices even when grammar improves.",
          "Write your position, key claims, definitions, and interpretive commitments in your own words first. Use AI for critique and clarity, then restore disciplinary precision, local context, and your intellectual fingerprint.",
        ],
      },
      {
        id: "aiai-4-3",
        title: "Authorship, Translation, and Paraphrase",
        content: [
          "Authorship is a human responsibility relationship. A model cannot independently consent, accept accountability, disclose conflicts, defend methodological decisions, or respond ethically to post-publication concerns.",
          "AI-supported translation and paraphrase require fidelity checks because technical terms, participant meaning, cultural nuance, causal language, and uncertainty can change during transformation.",
        ],
      },
    ],
    lab: {
      title: "Disclosure Statement Suite + Academic Voice Charter",
      description: "Create reusable transparency language and define the boundaries of your own scholarly voice.",
      steps: [
        "Draft disclosure statements for journal submission, grant preparation, thesis/dissertation front matter, and collaborative research.",
        "State tool purpose, affected scope, data restrictions, verification, and human responsibility.",
        "Write a one-page Academic Voice Charter describing your preferred reasoning and writing characteristics.",
        "Identify tasks AI may assist with and tasks you will not delegate.",
      ],
    },
    quiz: [
      {
        question: "Which disclosure is most informative?",
        options: ["AI was used", "AI helped improve the paper", "A named/classified tool was used for a specific task and outputs were checked against stated evidence", "No explanation is ever needed"],
        answerIndex: 2,
        explanation: "Proportionate, specific disclosure makes the production process understandable and auditable.",
      },
      {
        question: "Why is academic voice more than writing style?",
        options: ["It shows how the scholar reasons, defines, qualifies, and interprets", "It only concerns vocabulary", "It is determined by the model", "It eliminates uncertainty"],
        answerIndex: 0,
        explanation: "Voice reflects intellectual judgment, not merely surface wording.",
      },
      {
        question: "Why should AI not be listed as a human author?",
        options: ["AI cannot generate text", "AI cannot carry authorship accountability and ethical responsibility", "AI is always prohibited in research", "AI cannot summarize"],
        answerIndex: 1,
        explanation: "Authorship requires responsibility, approval, accountability, and ethical agency that a tool cannot assume.",
      },
    ],
  },
  {
    id: "privacy-bias-governance",
    week: 3,
    title: "Privacy, Bias, Data Governance & Institutional Compliance",
    objective: "Classify data before tool selection and build safe, reviewable rules for AI-assisted research.",
    lessons: [
      {
        id: "aiai-5-1",
        title: "Data Classification and Minimization",
        content: [
          "Ask 'What is this data?' before asking which model to use. Distinguish public, internal, confidential, personal, sensitive personal, proprietary, contract-restricted, embargoed, and unpublished material using your institution's categories.",
          "Minimize exposure by using excerpts, neutral labels, schemas, synthetic examples, or summaries when the full underlying material is unnecessary.",
        ],
      },
      {
        id: "aiai-5-2",
        title: "Bias as a Workflow Property",
        content: [
          "Bias can enter through the research question, search strategy, source selection, collection, labels, prompt framing, model behavior, interpretation, or reporting. It should not be treated only as a defect inside the model.",
          "Interrupt bias by seeking missing perspectives, rival explanations, local expertise, and assumptions embedded in labels or interpretations.",
        ],
      },
      {
        id: "aiai-5-3",
        title: "Confidentiality, Human Subjects, and Acceptable Use",
        content: [
          "Unpublished manuscripts, grant applications, reviewer comments, industry data, teaching materials, software, and collaborative documents may be governed by contracts or confidentiality duties. Escalate when authorization is unclear.",
          "Human-subject research may require ethics, privacy, or data-steward review before introducing external AI processing. A durable acceptable-use policy defines data classes, task classes, controls, prohibited uses, documentation, and approval routes.",
        ],
      },
    ],
    lab: {
      title: "Data-Use Decision Matrix",
      description: "Create a governance matrix that can guide real research decisions.",
      steps: [
        "Define at least five data categories used in your environment.",
        "Define at least three AI task categories.",
        "For each combination, record permitted tool conditions, required verification, approval authority, and retention expectations.",
        "Apply the matrix to one sensitive-research scenario and explain your final decision.",
      ],
    },
    quiz: [
      {
        question: "What should happen before selecting an AI tool for research data?",
        options: ["Classify the data and task", "Upload the full dataset first", "Remove only the participant names", "Assume every commercial tool is approved"],
        answerIndex: 0,
        explanation: "Data and task classification determine whether processing is permitted and what controls are required.",
      },
      {
        question: "Why may deleting names be insufficient for anonymization?",
        options: ["Names are never personal data", "Rare attributes, quotations, and variable combinations can re-identify people", "AI ignores context", "Anonymization is only needed for surveys"],
        answerIndex: 1,
        explanation: "Re-identification can occur through indirect identifiers and distinctive context.",
      },
      {
        question: "A useful acceptable-use policy should primarily define:",
        options: ["A permanent list of chatbot brands", "Data classes, tasks, controls, documentation, approvals, and prohibited uses", "Only password rules", "Only writing style"],
        answerIndex: 1,
        explanation: "Task- and data-based governance survives changes in vendors and model names.",
      },
    ],
  },
  {
    id: "reproducible-workflows-capstone",
    week: 4,
    title: "Reproducible AI-Augmented Workflows & Capstone Integration",
    objective: "Integrate prompts, evidence, governance, verification, disclosure, and human checkpoints into an auditable research system.",
    lessons: [
      {
        id: "aiai-6-1",
        title: "Reproducibility in a Non-Deterministic Environment",
        content: [
          "Reproducibility does not require a model to produce the same sentence every time. Preserve the conditions needed to understand and evaluate the workflow: tool/version when known, date, prompt, source inputs, retained outputs, transformations, checks, and final decisions.",
          "For quantitative or computational work, executable code, data transformations, specifications, and outputs remain the authoritative record. AI may assist with explanation or debugging but should not replace the reproducible analysis.",
        ],
      },
      {
        id: "aiai-6-2",
        title: "Decision Logs and Reproducibility Packages",
        content: [
          "A decision log records where AI materially influenced the research process: purpose, evidence supplied, output used or rejected, verification, risk classification, and final decision.",
          "A substantial project may package prompt records, claim–evidence logs, verification checklists, data-classification decisions, code, relevant output excerpts, change logs, disclosure statements, and a workflow README—subject to confidentiality and access restrictions.",
        ],
      },
      {
        id: "aiai-6-3",
        title: "Mentoring, Leadership, and Local Policy",
        content: [
          "AI rules should protect the learning objective. If an assignment is designed to teach argument construction, delegating the argument can defeat the educational purpose even if the output is accurate.",
          "Departments should build local policy from task mapping, stakeholder consultation, integrity rules, law, privacy, procurement, accessibility, and disciplinary differences rather than copying another institution's wording without analysis.",
        ],
      },
    ],
    lab: {
      title: "Capstone AI-Augmented Research Workflow",
      description: "Design an auditable workflow for one live scholarly task.",
      steps: [
        "Define the scholarly task and why AI adds value.",
        "Set the evidence boundary, data classification, prompt architecture, and likely failure modes.",
        "Specify source, claim, numerical, and interpretive verification plus human decision checkpoints.",
        "Add bias review, version control, disclosure decision, reproducibility package, and failure-response plan.",
        "Prepare a short presentation explaining where the workflow could fail silently and what evidence would cause you to stop using it.",
      ],
    },
    quiz: [
      {
        question: "What is the authoritative computational record in an AI-assisted quantitative study?",
        options: ["The chat transcript", "Executable code, data transformations, specifications, and outputs", "The model's explanation alone", "A screenshot of the prompt"],
        answerIndex: 1,
        explanation: "The reproducible analysis must remain independently inspectable outside the AI narrative.",
      },
      {
        question: "What should a research decision log capture?",
        options: ["Only successful prompts", "Material AI influence, evidence, verification, risk, and the final human decision", "Only model temperature", "Only publication date"],
        answerIndex: 1,
        explanation: "The log makes material AI-assisted decisions explainable months later.",
      },
      {
        question: "What is the best basis for local AI policy?",
        options: ["Copying another university word-for-word", "A task-, stakeholder-, law-, integrity-, privacy-, and discipline-aware local analysis", "Banning all technology", "Vendor advertising"],
        answerIndex: 1,
        explanation: "Local governance must fit the institution's actual risks, obligations, learning goals, and disciplines.",
      },
    ],
  },
];
