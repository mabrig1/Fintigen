export interface Lesson {
  id: string;
  title: string;
  /** Paragraphs of lesson content. */
  content: string[];
  /** Optional bullet points rendered after the paragraphs. */
  bullets?: string[];
  /** Optional code / formula block. */
  code?: { label: string; body: string };
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface CourseModule {
  id: string;
  week: number;
  title: string;
  objective: string;
  lessons: Lesson[];
  lab: { title: string; description: string; steps: string[] };
  quiz: QuizQuestion[];
}

export interface CourseMeta {
  slug: string;
  title: string;
  tagline: string;
  duration: string;
  pace: string;
  level: string;
  prerequisites: string[];
  overview: string[];
  objectives: string[];
  tools: { category: string; items: string }[];
  grading: { component: string; weight: string; detail: string }[];
}

export const courseMeta: CourseMeta = {
  slug: "agentic-ai",
  title: "Agentic AI & Autonomous Agents",
  tagline:
    "Building and Orchestrating Multi-Agent Systems for the Enterprise (2026 Edition)",
  duration: "8 Weeks",
  pace: "6–8 hours/week",
  level: "Intermediate to Advanced",
  prerequisites: [
    "Strong proficiency in Python",
    "Basic familiarity with Generative AI / LLMs (Prompt Engineering, API integration)",
    "Basic asynchronous programming",
  ],
  overview: [
    "In 2026, the paradigm of Generative AI has shifted from passive, conversational chatbots to Autonomous Agents — systems capable of reasoning, planning, utilizing external tools, maintaining state, and collaborating with other agents to solve highly complex, multi-step problems.",
    "This course provides a comprehensive hands-on deep dive into the architecture, design patterns, and deployment of single-agent and multi-agent systems. You will master cutting-edge orchestration frameworks, build self-correcting agent loops, implement human-in-the-loop safeguards, and deploy production-grade autonomous systems.",
  ],
  objectives: [
    "Architect autonomous agents using the ReAct (Reasoning and Acting) framework and graph-based state machines.",
    "Implement robust tool-calling, long-term memory, and state-management protocols.",
    "Orchestrate multi-agent systems utilizing hierarchical, sequential, and decentralized topologies.",
    "Build production-ready agent workflows using LangGraph, Microsoft AutoGen, and CrewAI.",
    "Apply advanced cognitive patterns such as self-reflection, planning-and-execution, and human-in-the-loop override.",
    "Deploy, monitor, and evaluate agent performance, safety boundaries, cost control, and latency optimization.",
  ],
  tools: [
    {
      category: "Orchestration & State Management",
      items: "LangGraph, LangChain, AutoGen (v0.4+), CrewAI",
    },
    {
      category: "Models",
      items:
        "OpenAI GPT models (including reasoning models), Anthropic Claude, and local LLMs (Ollama, Llama-3.x)",
    },
    { category: "Memory & Retrieval", items: "Pinecone, ChromaDB, Mem0" },
    {
      category: "Evaluation & Observability",
      items: "LangSmith, Arize Phoenix, or Phoenix-Agent-Ops",
    },
    {
      category: "Development Environment",
      items: "Python 3.11+, Poetry, Docker",
    },
  ],
  grading: [
    {
      component: "Weekly Labs",
      weight: "40%",
      detail:
        "Practical coding assignments testing implementation of specific frameworks.",
    },
    {
      component: "Midterm Assessment",
      weight: "20%",
      detail:
        "Multi-agent architecture design document and system design presentation.",
    },
    {
      component: "Capstone Project",
      weight: "40%",
      detail:
        "End-to-end deployed agent system, assessed on robustness, state handling, tool-call accuracy, safety safeguards, and evaluation metrics.",
    },
  ],
};

export const courseModules: CourseModule[] = [
  {
    id: "module-1",
    week: 1,
    title: "The Agentic Paradigm & Core Architectures",
    objective:
      "Understand what distinguishes an “agent” from a standard LLM chatbot, and master the foundational cognitive frameworks.",
    lessons: [
      {
        id: "m1-l1",
        title: "From Chatbots to Autonomous Agents",
        content: [
          "A chatbot answers; an agent acts. Standard LLM chatbots are passive — they receive a prompt and return text. Autonomous agents close the loop: they reason about a goal, decide on actions, execute those actions against the real world (APIs, databases, code), observe the results, and keep going until the goal is achieved.",
          "This shift — from single-turn text generation to goal-directed, multi-step execution — is the defining change in Generative AI in 2026. In this lesson you'll learn the properties that make a system genuinely 'agentic': autonomy, tool use, statefulness, and the ability to plan and self-correct.",
        ],
        bullets: [
          "Chatbots are reactive; agents are proactive and goal-directed.",
          "Agents maintain state across many steps, not just chat history.",
          "Agents interact with the environment through tools, not just text.",
          "Agents can evaluate their own progress and change course.",
        ],
      },
      {
        id: "m1-l2",
        title: "The Agent Taxonomy: Single-Agent vs. Multi-Agent Systems",
        content: [
          "Not every problem needs a swarm. A single agent with the right tools can handle research, coding, or analysis tasks end-to-end. Multi-agent systems shine when a task naturally decomposes into specialized roles — a researcher, a writer, a reviewer — or when parallelism and debate improve quality.",
          "You'll learn to classify systems along two axes: how many agents participate, and how control flows between them (sequential pipelines, hierarchical manager-worker trees, and decentralized peer-to-peer conversations).",
        ],
        bullets: [
          "Single-agent: one reasoning loop, many tools.",
          "Multi-agent sequential: output of one agent feeds the next.",
          "Multi-agent hierarchical: a manager agent delegates and integrates.",
          "Multi-agent decentralized: peers converse and negotiate to converge.",
        ],
      },
      {
        id: "m1-l3",
        title: "The ReAct Framework: Thought → Action → Observation",
        content: [
          "ReAct (Reasoning + Acting) is the foundational cognitive loop of modern agents. Instead of answering in one shot, the model interleaves explicit reasoning ('Thought'), tool invocations ('Action'), and the results of those invocations ('Observation') — repeating the cycle until it can produce a final answer.",
          "This loop is what lets an LLM use a calculator, query a database, or browse the web reliably: each observation grounds the next thought in real data instead of hallucination.",
        ],
        code: {
          label: "Agentic state transition (formal notation)",
          body: "S(t+1) = Transition(S(t), A(t), O(t))\n\nwhere S = state, A = action, O = environmental observation",
        },
        bullets: [
          "Thought: the agent reasons about what to do next.",
          "Action: the agent calls a tool with structured arguments.",
          "Observation: the environment returns a result.",
          "The loop repeats until the agent emits a final answer.",
        ],
      },
      {
        id: "m1-l4",
        title: "Introduction to Tool Use",
        content: [
          "Tools are how agents touch the world. A tool is a function the model can call — defined by a name, a description, and a typed schema for its arguments. The quality of your schema definitions (typically written with Pydantic in Python) directly determines how reliably the model calls your tools.",
          "You'll also learn why execution sandboxes matter: any code or command an agent runs must be isolated, so a confused (or manipulated) agent cannot damage real systems.",
        ],
        bullets: [
          "Function calling: the model emits structured JSON matching your schema.",
          "Pydantic schemas: typed, validated argument definitions.",
          "Execution sandboxes: isolate agent actions from production systems.",
          "Good tool descriptions are prompts — write them carefully.",
        ],
      },
    ],
    lab: {
      title: "Build a Vanilla Python Agent from Scratch",
      description:
        "Build a zero-dependency Python agent using raw API function calling to query external databases and APIs — no frameworks, so you understand every moving part of the loop.",
      steps: [
        "Set up Python 3.11+ and an LLM API key (OpenAI or Anthropic).",
        "Define two tools with typed schemas: a database query function and a web API lookup.",
        "Implement the ReAct loop by hand: send messages, parse tool calls, execute, append observations.",
        "Add a stopping condition and a maximum-iteration guard.",
        "Test the agent on a multi-step question that requires both tools.",
      ],
    },
    quiz: [
      {
        question:
          "What is the key difference between an autonomous agent and a standard LLM chatbot?",
        options: [
          "Agents use bigger models than chatbots",
          "Agents can reason, plan, use tools, maintain state, and act toward goals across multiple steps",
          "Agents always require multiple LLMs working together",
          "Agents never interact with humans",
        ],
        answerIndex: 1,
        explanation:
          "Model size and agent count are irrelevant — what makes a system agentic is the closed loop of reasoning, acting with tools, observing results, and maintaining state until a goal is achieved.",
      },
      {
        question: "In the ReAct framework, what is the correct cycle?",
        options: [
          "Action → Thought → Observation",
          "Observation → Answer → Thought",
          "Thought → Action → Observation, repeated until a final answer",
          "Plan → Execute → Deploy",
        ],
        answerIndex: 2,
        explanation:
          "ReAct interleaves an explicit Thought (reasoning), an Action (tool call), and an Observation (tool result), looping until the agent can answer.",
      },
      {
        question:
          "In the state transition S(t+1) = Transition(S(t), A(t), O(t)), what does O represent?",
        options: [
          "The agent's objective",
          "The environmental observation returned after an action",
          "The output token count",
          "The orchestration framework",
        ],
        answerIndex: 1,
        explanation:
          "O(t) is the environmental observation — the feedback the agent receives after taking action A(t) in state S(t).",
      },
    ],
  },
  {
    id: "module-2",
    week: 2,
    title: "Stateful Single-Agent Systems with LangGraph",
    objective:
      "Build robust single agents that maintain complex state, branch dynamically, and handle cyclic workflows.",
    lessons: [
      {
        id: "m2-l1",
        title: "Why Linear Chains Fail: The Necessity of Cyclic Graphs",
        content: [
          "Classic LLM 'chains' run in a straight line: prompt → step 1 → step 2 → output. Real agent behavior is cyclic — an agent may need to search again, re-plan, or retry a failed tool call. Linear pipelines cannot express 'go back and try again'.",
          "LangGraph models agent workflows as graphs with cycles, which makes retries, self-correction loops, and dynamic branching first-class citizens instead of hacks.",
        ],
        bullets: [
          "Linear chains cannot loop, so they cannot self-correct.",
          "Cycles let agents retry, refine, and re-plan.",
          "Graphs make control flow explicit, inspectable, and testable.",
        ],
      },
      {
        id: "m2-l2",
        title: "LangGraph Fundamentals: Nodes, Edges, State, Compile",
        content: [
          "A LangGraph application is built from four pieces. State is a typed, shared data structure that flows through the graph. Nodes are functions that read state and return updates. Edges connect nodes, defining what runs next. Compile turns the graph definition into a runnable, checkpointable application.",
          "You'll practice designing the state schema first — the most important design decision in any LangGraph app — then wiring nodes and edges around it.",
        ],
        code: {
          label: "Minimal LangGraph shape (Python)",
          body: 'from langgraph.graph import StateGraph\n\ngraph = StateGraph(AgentState)\ngraph.add_node("research", research_node)\ngraph.add_node("write", write_node)\ngraph.add_edge("research", "write")\ngraph.set_entry_point("research")\napp = graph.compile()',
        },
      },
      {
        id: "m2-l3",
        title: "Short-Term vs. Long-Term Memory",
        content: [
          "Short-term memory is the state inside a single run: the conversation so far, intermediate results, scratch notes. Long-term memory persists across sessions — user preferences, facts learned last week — usually stored in a vector database (Pinecone, ChromaDB) or a memory layer like Mem0.",
          "The craft is deciding what to remember, when to write it, and how to retrieve just the relevant slice back into the context window without drowning the model.",
        ],
        bullets: [
          "Short-term: thread state, checkpoints, in-run scratchpads.",
          "Long-term: vector stores and memory layers that outlive a session.",
          "Retrieval discipline: fetch the minimum relevant memory per step.",
        ],
      },
      {
        id: "m2-l4",
        title: "Dynamic Routing, Retries, and Resilience",
        content: [
          "Conditional edges route execution based on the current state — 'if the draft has gaps, go back to research; otherwise finish'. This is how agents make decisions about their own workflow.",
          "Production agents also face a hostile reality: APIs fail, rate limits hit, models time out. You'll implement retry policies with exponential backoff, fallbacks between models, and graceful degradation so one flaky dependency doesn't kill a long-running workflow.",
        ],
        bullets: [
          "Conditional edges = state-driven branching.",
          "Retries with exponential backoff for transient failures.",
          "Rate-limit resilience: queuing, caching, and fallback models.",
        ],
      },
    ],
    lab: {
      title: "Stateful Research Agent",
      description:
        "Build a stateful research agent that writes a comprehensive report, performs automated web searches, remembers user feedback across cycles, and self-corrects based on content gaps.",
      steps: [
        "Design the state schema: topic, search results, draft, feedback, gap list.",
        "Add nodes: plan → search → draft → critique → revise.",
        "Wire a conditional edge from critique: loop back to search while gaps remain.",
        "Persist user feedback into state so revisions respect earlier notes.",
        "Add retry handling around the search tool and cap the total loop count.",
      ],
    },
    quiz: [
      {
        question: "Why do standard linear chains fail for agentic workflows?",
        options: [
          "They are too slow to execute",
          "They cannot express cycles, so agents can't retry, re-plan, or self-correct",
          "They only work with OpenAI models",
          "They cannot call tools at all",
        ],
        answerIndex: 1,
        explanation:
          "Agent behavior is inherently cyclic — search again, critique, revise. Linear chains have no way to 'go back', which is why LangGraph uses cyclic graphs.",
      },
      {
        question:
          "In LangGraph, which component defines the shared data that flows through the workflow?",
        options: ["Edges", "Nodes", "State", "Compile"],
        answerIndex: 2,
        explanation:
          "State is the typed shared data structure. Nodes read and update it, edges define execution order, and compile produces the runnable app.",
      },
      {
        question:
          "Which is an example of long-term memory rather than short-term memory?",
        options: [
          "The current conversation's message list",
          "An intermediate draft held in graph state",
          "User preferences stored in a vector database across sessions",
          "The tool call the agent just made",
        ],
        answerIndex: 2,
        explanation:
          "Long-term memory persists beyond a single run — typically in vector stores like Pinecone/ChromaDB or memory layers like Mem0.",
      },
    ],
  },
  {
    id: "module-3",
    week: 3,
    title: "Advanced Cognitive Patterns",
    objective:
      "Implement self-correcting and planning strategies to allow agents to handle open-ended, highly complex problems.",
    lessons: [
      {
        id: "m3-l1",
        title: "Planning Patterns: Plan-and-Execute, Tree-of-Thoughts, Self-Ask",
        content: [
          "For complex goals, 'just start doing things' fails. Plan-and-Execute separates a planner (which decomposes the goal into steps) from an executor (which performs each step) — cheaper, more controllable, and easier to audit.",
          "Tree-of-Thoughts (ToT) explores multiple reasoning branches in parallel and prunes weak ones, like a chess engine for reasoning. Self-Ask teaches the agent to explicitly pose and answer sub-questions before tackling the main question.",
        ],
        bullets: [
          "Plan-and-Execute: decompose first, act second, re-plan when reality diverges.",
          "Tree-of-Thoughts: branch, evaluate, prune, continue best paths.",
          "Self-Ask: surface hidden sub-questions explicitly.",
        ],
      },
      {
        id: "m3-l2",
        title: "Reflexion and Self-Correction",
        content: [
          "The single biggest quality upgrade for agents is making them their own harshest critic. In the Reflexion pattern, a critique agent grades the generation agent's output against explicit criteria and produces actionable feedback; the generator then revises. Two or three critique cycles routinely transform mediocre output into excellent output.",
          "You'll design the feedback rubric, decide when to stop iterating, and guard against 'critique loops' that burn tokens without improving quality.",
        ],
        bullets: [
          "Separate generator and critic roles — even if it's the same model.",
          "Critique against an explicit rubric, not vibes.",
          "Always bound the number of reflection cycles.",
        ],
      },
      {
        id: "m3-l3",
        title: "RAG-Agent Integration: Corrective RAG and Self-RAG",
        content: [
          "Naive RAG retrieves once and hopes for the best. Agentic RAG puts the agent in charge of retrieval: Corrective RAG (CRAG) grades retrieved documents and, when they're weak, rewrites the query or falls back to web search. Self-RAG lets the model decide when retrieval is needed at all, and to critique whether retrieved passages actually support its claims.",
          "The result is retrieval that adapts to the question instead of a fixed pipeline that treats every query the same.",
        ],
        bullets: [
          "CRAG: grade documents → rewrite query or fall back when weak.",
          "Self-RAG: the model decides when to retrieve and self-verifies support.",
          "Agents dynamically choose: retrieve, rewrite, or generate.",
        ],
      },
    ],
    lab: {
      title: "Self-Debugging Coding Agent",
      description:
        "Develop an autonomous coding agent that writes code, executes it in a sandboxed Docker container, parses runtime error logs, and iteratively debugs its own code until it passes a unit-test suite.",
      steps: [
        "Stand up a sandboxed Docker container for code execution.",
        "Give the agent tools: write_file, run_tests, read_error_log.",
        "Implement the loop: generate code → run tests → parse failures → patch.",
        "Add a Reflexion step that summarizes what went wrong before each retry.",
        "Stop on green tests or after a bounded number of attempts.",
      ],
    },
    quiz: [
      {
        question: "What does the Plan-and-Execute pattern separate?",
        options: [
          "Frontend and backend code",
          "A planner that decomposes the goal from an executor that performs each step",
          "Training and inference",
          "Retrieval and generation",
        ],
        answerIndex: 1,
        explanation:
          "Plan-and-Execute splits goal decomposition (planner) from step execution (executor), making complex work cheaper, more controllable, and auditable.",
      },
      {
        question: "In the Reflexion pattern, what drives improvement?",
        options: [
          "Using a larger context window",
          "A critique agent grading output against explicit criteria, feeding revisions",
          "Running the same prompt multiple times and picking randomly",
          "Fine-tuning the model between steps",
        ],
        answerIndex: 1,
        explanation:
          "Reflexion pairs a generator with a critic that grades against a rubric and produces actionable feedback for the next revision cycle.",
      },
      {
        question: "What does Corrective RAG (CRAG) do when retrieved documents are weak?",
        options: [
          "Silently generates an answer anyway",
          "Crashes with an error",
          "Grades the documents, then rewrites the query or falls back to another source",
          "Increases the model temperature",
        ],
        answerIndex: 2,
        explanation:
          "CRAG evaluates retrieval quality and actively corrects — rewriting queries or falling back (e.g., to web search) instead of generating from bad context.",
      },
    ],
  },
  {
    id: "module-4",
    week: 4,
    title: "Multi-Agent Orchestration with CrewAI",
    objective:
      "Understand role-playing autonomous agents and sequential/hierarchical task execution using CrewAI.",
    lessons: [
      {
        id: "m4-l1",
        title: "CrewAI Building Blocks: Agents, Tasks, Crews, Processes",
        content: [
          "CrewAI organizes multi-agent work the way a company organizes people. An Agent is a role with a goal and a backstory. A Task is a unit of work with an expected output. A Crew binds agents and tasks together, and a Process topology defines how work flows between them.",
          "This role-playing framing is surprisingly powerful: giving each agent a narrow persona and a concrete goal consistently outperforms one generalist prompt trying to do everything.",
        ],
        bullets: [
          "Agent = role + goal + backstory + tools.",
          "Task = description + expected output + assigned agent.",
          "Crew = agents + tasks + process topology.",
        ],
      },
      {
        id: "m4-l2",
        title: "Personas, Goals, and Backstories that Actually Work",
        content: [
          "Persona configuration is prompt engineering with structure. A good backstory constrains the agent's voice and priorities ('a meticulous SEO specialist who refuses to keyword-stuff'); a good goal is measurable ('produce a headline scoring 8+ on clarity'). Verbose output mode lets you watch each agent's reasoning during development.",
          "You'll learn the difference between decorative backstories (useless) and behavioral backstories (which measurably change output quality).",
        ],
        bullets: [
          "Write goals as verifiable outcomes, not vibes.",
          "Backstories should encode priorities and constraints.",
          "Use verbose mode during development, disable in production.",
        ],
      },
      {
        id: "m4-l3",
        title: "Hierarchical vs. Sequential Delegation",
        content: [
          "In a sequential process, tasks run in order and each output feeds the next — simple and predictable. In a hierarchical process, a manager agent decides who does what, reviews results, and can send work back — more flexible, more expensive, and harder to debug.",
          "You'll also handle task dependencies and asynchronous execution paths, running independent tasks in parallel to cut wall-clock time.",
        ],
        bullets: [
          "Sequential: fixed pipeline, predictable cost.",
          "Hierarchical: a manager agent delegates, reviews, and integrates.",
          "Async execution: parallelize independent tasks.",
        ],
      },
    ],
    lab: {
      title: "Autonomous Content Marketing Team",
      description:
        "Build a crew of four agents — Trend Researcher, Content Writer, SEO Specialist, and Quality Assurance — that outputs a fully formatted, SEO-optimized blog series.",
      steps: [
        "Define the four agents with distinct personas, goals, and tools.",
        "Create tasks with explicit expected outputs and dependencies.",
        "Run the crew sequentially first; inspect each hand-off.",
        "Switch to a hierarchical process with a manager agent and compare results.",
        "Add the QA agent as a final gate that can reject and return drafts.",
      ],
    },
    quiz: [
      {
        question: "In CrewAI, what binds agents and tasks together?",
        options: ["A Chain", "A Crew", "A Graph", "A Swarm"],
        answerIndex: 1,
        explanation:
          "A Crew combines agents and tasks with a process topology (sequential or hierarchical) that defines how work flows.",
      },
      {
        question:
          "When is a hierarchical process preferable to a sequential one?",
        options: [
          "When you want the lowest possible cost",
          "When the workflow is fixed and predictable",
          "When work needs dynamic delegation, review, and possible rework by a manager agent",
          "When you only have one agent",
        ],
        answerIndex: 2,
        explanation:
          "Hierarchical topologies add a manager that delegates and reviews — valuable for dynamic work, at the price of cost and debuggability.",
      },
      {
        question: "What makes an agent backstory useful rather than decorative?",
        options: [
          "It is long and entertaining",
          "It encodes priorities and constraints that change the agent's behavior",
          "It mentions the agent's favorite color",
          "It repeats the task description word for word",
        ],
        answerIndex: 1,
        explanation:
          "Behavioral backstories act as structured prompt engineering — they constrain voice, priorities, and quality bars in ways that measurably shift output.",
      },
    ],
  },
  {
    id: "module-5",
    week: 5,
    title: "Conversational & Event-Driven Agents with AutoGen",
    objective:
      "Build conversational, event-driven agent systems that solve tasks through peer-to-peer dialogues using Microsoft AutoGen.",
    lessons: [
      {
        id: "m5-l1",
        title: "AutoGen Architecture: ConversableAgent and Friends",
        content: [
          "AutoGen's core abstraction is the ConversableAgent — an agent that can send and receive messages, execute code or tools, and optionally involve a human. Complex behavior emerges from conversations between agents rather than from a central graph.",
          "You'll configure assistant agents (LLM-backed), user-proxy agents (which can execute code and represent humans), and custom agents with specialized reply logic.",
        ],
        bullets: [
          "ConversableAgent: the universal message-passing building block.",
          "Assistant agents think; user-proxy agents execute and represent humans.",
          "Behavior emerges from dialogue, not a hard-coded pipeline.",
        ],
      },
      {
        id: "m5-l2",
        title: "Conversation Topologies: Two-Agent, Group Chat, Managed Chat",
        content: [
          "The simplest AutoGen system is two agents talking — an assistant proposing and a user-proxy executing until the task is done. Group chats add multiple specialists in one thread; a GroupChatManager decides who speaks next, either by rules or by LLM-driven selection.",
          "Choosing the topology is an engineering decision: dynamic chats are flexible but non-deterministic; managed chats trade some flexibility for control.",
        ],
        bullets: [
          "Two-agent loops: propose → execute → repeat.",
          "Group chat: many specialists, one conversation.",
          "Manager-orchestrated chat: a manager selects the next speaker.",
        ],
      },
      {
        id: "m5-l3",
        title: "Humans in the Loop and Local LLMs with Ollama",
        content: [
          "AutoGen makes human participation a configuration flag: NEVER (fully autonomous), TERMINATE (human reviews at the end), or ALWAYS (human approves each step). This lets you dial autonomy up or down per deployment without rewriting the system.",
          "You'll also point AutoGen at local models served by Ollama (Llama-3.x family) — essential for cost control, privacy-sensitive workloads, and offline development.",
        ],
        bullets: [
          "human_input_mode: NEVER / TERMINATE / ALWAYS.",
          "Local LLMs via Ollama cut cost and keep data on-premises.",
          "Mix models: cheap local models for routine steps, frontier models for hard ones.",
        ],
      },
    ],
    lab: {
      title: "Collaborative Software Engineering Scrum Team",
      description:
        "Build a Product Manager + Developer + QA Tester agent team that takes a prompt, drafts a PR, reviews it, asks for human input at critical stages, and refines the code.",
      steps: [
        "Configure three ConversableAgents with distinct roles and a group chat.",
        "Give the Developer code-execution capability in a sandbox.",
        "Set human_input_mode so the human approves the final PR before 'merge'.",
        "Run the full loop: requirements → implementation → QA review → revision.",
        "Swap the Developer's model to a local Llama-3.x via Ollama and compare.",
      ],
    },
    quiz: [
      {
        question: "What is AutoGen's core building block?",
        options: [
          "The StateGraph",
          "The ConversableAgent",
          "The Crew",
          "The Prompt Template",
        ],
        answerIndex: 1,
        explanation:
          "AutoGen builds systems from ConversableAgents that exchange messages; complex behavior emerges from their conversations.",
      },
      {
        question:
          "Which human_input_mode makes an AutoGen agent ask for approval at every step?",
        options: ["NEVER", "TERMINATE", "ALWAYS", "AUTO"],
        answerIndex: 2,
        explanation:
          "ALWAYS requests human input at each step; TERMINATE only at the end; NEVER runs fully autonomously.",
      },
      {
        question: "Why integrate local LLMs (via Ollama) into agent systems?",
        options: [
          "Local models are always more accurate",
          "Cost control, privacy, and offline development",
          "Cloud APIs cannot do function calling",
          "It is required by AutoGen",
        ],
        answerIndex: 1,
        explanation:
          "Local models trade some capability for major wins in cost, data privacy, and the ability to develop without cloud dependencies.",
      },
    ],
  },
  {
    id: "module-6",
    week: 6,
    title: "Human-in-the-Loop & Trustworthy Agents",
    objective:
      "Design safety guardrails, state interruptions, and interactive UI boundaries to keep humans in control.",
    lessons: [
      {
        id: "m6-l1",
        title: "The Spectrum of Autonomy: HITL, HOTL, and Beyond",
        content: [
          "Autonomy is a dial, not a switch. Human-in-the-loop (HITL) systems require approval before consequential actions. Human-on-the-loop (HOTL) systems act autonomously while a human monitors and can intervene. Human-out-of-the-loop systems run unsupervised — appropriate only for low-stakes, well-bounded tasks.",
          "The engineering skill is matching the autonomy level to the blast radius of a mistake: a research summarizer can run free; an agent that moves money cannot.",
        ],
        bullets: [
          "HITL: approval gates before consequential actions.",
          "HOTL: autonomous execution with human monitoring and override.",
          "Match autonomy to the cost of a wrong action.",
        ],
      },
      {
        id: "m6-l2",
        title: "State Interruption and Time-Travel in LangGraph",
        content: [
          "LangGraph checkpoints let you pause a running agent at any node, inspect its state, edit it manually, and resume — or rewind ('time-travel') to an earlier checkpoint and replay with corrections. This is the mechanism behind approval workflows: interrupt before the dangerous node, wait for a human decision, then continue.",
          "You'll build interrupts as first-class workflow steps rather than bolted-on hacks.",
        ],
        bullets: [
          "interrupt_before: pause execution ahead of sensitive nodes.",
          "Manual state editing: fix the agent's view of the world mid-run.",
          "Time-travel: rewind to a checkpoint and replay differently.",
        ],
      },
      {
        id: "m6-l3",
        title: "Guardrails and Securing Agent Execution",
        content: [
          "Guardrail frameworks (NVIDIA NeMo Guardrails, Llama Guard) validate inputs and outputs against policy: blocking jailbreaks, filtering unsafe content, and constraining agents to approved topics and tools.",
          "Agents raise the stakes on prompt injection: a malicious web page or document the agent reads can try to hijack its instructions and weaponize its tools. You'll learn layered defenses — input sanitization, least-privilege tool scopes, sandboxed execution, and treating all retrieved content as untrusted data, never as instructions.",
        ],
        bullets: [
          "Validate both inputs and outputs against explicit policy.",
          "Prompt injection: retrieved content is data, never instructions.",
          "Least privilege: agents get only the tools and scopes they need.",
          "Sandbox everything an agent can execute.",
        ],
      },
    ],
    lab: {
      title: "Enterprise Financial Analyst Agent with Approval Gates",
      description:
        "Implement a financial analyst agent that processes stock transactions but automatically pauses execution and requests human administrator approval (via an API endpoint or Slack app) when transaction amounts exceed a threshold.",
      steps: [
        "Build the transaction-processing graph with a checkpointer enabled.",
        "Add interrupt_before on the execute-transaction node.",
        "Route to auto-approve below the threshold; pause above it.",
        "Expose an approval endpoint (or Slack action) that resumes the graph.",
        "Log every decision — human and agent — for audit.",
      ],
    },
    quiz: [
      {
        question:
          "What distinguishes human-ON-the-loop (HOTL) from human-IN-the-loop (HITL)?",
        options: [
          "HOTL means the human approves every action in advance",
          "HOTL means the agent acts autonomously while a human monitors and can intervene",
          "HOTL means no human is ever involved",
          "They are identical",
        ],
        answerIndex: 1,
        explanation:
          "HITL gates actions on human approval; HOTL lets the agent act while a human supervises with the power to step in.",
      },
      {
        question:
          "In LangGraph, what mechanism enables pausing before a sensitive action for human approval?",
        options: [
          "Deleting the node",
          "Checkpoints with interrupt_before on the sensitive node",
          "Lowering the model temperature",
          "Running the graph twice",
        ],
        answerIndex: 1,
        explanation:
          "Checkpointing plus interrupt_before pauses execution ahead of a node; the run resumes after a human approves (optionally editing state first).",
      },
      {
        question:
          "What is the core defense principle against prompt injection in agent systems?",
        options: [
          "Use a bigger model",
          "Treat retrieved/external content as untrusted data, never as instructions — plus least-privilege tools and sandboxing",
          "Disable all tools permanently",
          "Only run agents at night",
        ],
        answerIndex: 1,
        explanation:
          "Layered defense starts with never letting external content act as instructions, then limits blast radius via least-privilege tool scopes and sandboxed execution.",
      },
    ],
  },
  {
    id: "module-7",
    week: 7,
    title: "Evaluation, Observability & Cost Optimization",
    objective:
      "Measure, profile, and optimize agentic loops — which are notoriously non-deterministic, expensive, and latency-heavy.",
    lessons: [
      {
        id: "m7-l1",
        title: "Observability: Tracing Runs in LangSmith and Phoenix",
        content: [
          "You cannot fix what you cannot see. Observability tools like LangSmith and Arize Phoenix record every step of an agent run — each LLM call, tool invocation, latency, and token cost — and visualize the full execution graph.",
          "Traces turn 'the agent did something weird' into 'step 7 retrieved the wrong document, which poisoned the plan in step 8' — a debuggable, fixable statement.",
        ],
        bullets: [
          "Trace every LLM call, tool call, and hand-off.",
          "Visualize execution graphs to spot loops and dead ends.",
          "Attach cost and latency to every span.",
        ],
      },
      {
        id: "m7-l2",
        title: "Evaluating Agents: LLM-as-a-Judge and Trajectory Evaluation",
        content: [
          "Agent evaluation goes beyond 'is the final answer right?'. G-Eval-style LLM-as-a-judge scoring grades outputs against rubrics. Task-completion benchmarks measure end-to-end success rates. Trajectory evaluation inspects the path: did the agent call the right tools, in a sensible order, without wasted steps?",
          "Because agents are non-deterministic, you'll learn to evaluate over many runs with synthetic datasets, tracking distributions rather than single scores.",
        ],
        bullets: [
          "LLM-as-a-judge: rubric-based grading at scale.",
          "Task completion: did the agent actually finish the job?",
          "Trajectory evaluation: judge the path, not just the destination.",
          "Non-determinism demands repeated runs and distribution thinking.",
        ],
      },
      {
        id: "m7-l3",
        title: "Cost & Latency: Budgets, Caching, and Early Stopping",
        content: [
          "An unbounded agent loop is an unbounded invoice. Token budget enforcement caps spend per run; response caching avoids re-paying for repeated sub-tasks; hallucination early-stopping detects when an agent is spinning (repeating actions, making no progress) and kills the run.",
          "You'll also route intelligently: cheap, fast models for routine steps and frontier models only where reasoning quality actually matters.",
        ],
        bullets: [
          "Hard token/cost budgets per run — enforced in code, not hoped for.",
          "Cache repeated tool results and sub-answers.",
          "Detect no-progress loops and stop early.",
          "Model routing: cheap models for easy steps.",
        ],
      },
    ],
    lab: {
      title: "Trace, Benchmark, and Score a Multi-Agent System",
      description:
        "Set up LangSmith tracing on a complex multi-agent system, design a synthetic evaluation dataset, and run automated evaluations scoring agent precision, tool-use correctness, and overall latency.",
      steps: [
        "Instrument last week's agent system with LangSmith tracing.",
        "Build a synthetic dataset of 25+ tasks with expected outcomes.",
        "Write evaluators: answer correctness, tool-use correctness, latency.",
        "Run the suite across multiple configurations (models, prompts).",
        "Produce a report: where does the agent fail, and what does it cost?",
      ],
    },
    quiz: [
      {
        question: "What does trajectory evaluation measure?",
        options: [
          "Only whether the final answer is correct",
          "The path the agent took — tool choices, ordering, and wasted steps",
          "The GPU utilization of the model",
          "The length of the final answer",
        ],
        answerIndex: 1,
        explanation:
          "Trajectory evaluation judges the journey: correct tools, sensible order, no redundant loops — not just the destination.",
      },
      {
        question:
          "Why must agent evaluations run over many trials with datasets rather than a single test?",
        options: [
          "Because agents are non-deterministic — single runs don't represent behavior",
          "Because APIs require it",
          "Because one run is too cheap to matter",
          "Because datasets are easier to create than single tests",
        ],
        answerIndex: 0,
        explanation:
          "Agentic loops are non-deterministic; you evaluate distributions of outcomes across repeated runs to get a trustworthy picture.",
      },
      {
        question: "Which is NOT one of the cost-mitigation techniques covered?",
        options: [
          "Token budget enforcement",
          "Response caching",
          "Hallucination early-stopping",
          "Doubling the temperature to finish faster",
        ],
        answerIndex: 3,
        explanation:
          "Budgets, caching, and early-stopping control cost. Raising temperature does nothing for cost and usually hurts reliability.",
      },
    ],
  },
  {
    id: "module-8",
    week: 8,
    title: "Capstone Project & Deployment",
    objective:
      "Design, build, and deploy a production-grade, multi-agent autonomous system.",
    lessons: [
      {
        id: "m8-l1",
        title: "Deploying Agentic Graphs as Cloud Services",
        content: [
          "A notebook agent is a demo; a deployed agent is a product. You'll package agent graphs behind FastAPI endpoints, containerize with Docker, and look at managed options like LangGraph Cloud. Deployment forces the questions demos skip: authentication, secrets management, concurrency, and versioning of prompts and graphs.",
        ],
        bullets: [
          "FastAPI + Docker: the default self-hosted deployment stack.",
          "Managed platforms (LangGraph Cloud) trade control for operations.",
          "Version prompts and graph definitions like code — because they are.",
        ],
      },
      {
        id: "m8-l2",
        title: "Streaming, Persistence, and Scale",
        content: [
          "Users won't stare at a spinner for ninety seconds. Streaming intermediate steps — thoughts, tool calls, partial outputs — to the frontend in real time transforms perceived latency and builds trust by showing the agent's work.",
          "Production persistence layers must handle many concurrent sessions with thread safety: checkpoint stores backed by Postgres or Redis, session isolation, and recovery of interrupted runs.",
        ],
        bullets: [
          "Stream agent steps to clients in real time (SSE/WebSockets).",
          "Durable checkpoint stores: Postgres/Redis-backed persistence.",
          "Design for concurrent sessions and crash recovery from day one.",
        ],
      },
      {
        id: "m8-l3",
        title: "The Future of Agentic AI",
        content: [
          "The course closes with where the field is heading: physical agents (robotics driven by the same reasoning loops), web-browsing agents that operate real websites, and OS-world agents that control entire desktop environments.",
          "The architectures you've learned — ReAct loops, graph state machines, multi-agent topologies, human oversight — are the common foundation beneath all of them.",
        ],
        bullets: [
          "Physical agents: reasoning loops embodied in robotics.",
          "Web-browsing agents: operating real sites end-to-end.",
          "OS-world agents: controlling full desktop environments.",
        ],
      },
      {
        id: "m8-l4",
        title: "Capstone Briefing: Autonomous Customer Success & Ops System",
        content: [
          "Your capstone is a fully autonomous customer success and operations system, packaged cleanly in a Docker-compose environment. It brings together every module of the course: tools, state, multi-agent orchestration, human escalation, and full observability.",
        ],
        bullets: [
          "Read incoming support or operations tickets.",
          "Use tools to check a mocked SQL database, run API searches, and execute refund/action policies.",
          "Escalate complex queries to a human Slack channel when uncertain.",
          "Automatically reply to the customer with an empathetic, context-aware solution.",
          "Fully trace and monitor performance, packaged in Docker-compose.",
        ],
      },
    ],
    lab: {
      title: "Capstone: Ship Your Autonomous System",
      description:
        "Build and deploy the full Customer Success & Ops System — assessed on robustness, state handling, tool-call accuracy, safety safeguards, and evaluation metrics.",
      steps: [
        "Design the architecture: agents, tools, state schema, escalation paths.",
        "Implement the ticket-processing graph with database and API tools.",
        "Add the human-escalation gate for low-confidence cases.",
        "Instrument tracing and build an evaluation suite for the system.",
        "Package everything with Docker-compose and write the runbook.",
      ],
    },
    quiz: [
      {
        question:
          "Why is streaming intermediate agent steps to the frontend important in production?",
        options: [
          "It reduces the actual compute cost of the run",
          "It transforms perceived latency and builds trust by showing the agent's work",
          "It is required by all LLM APIs",
          "It replaces the need for evaluation",
        ],
        answerIndex: 1,
        explanation:
          "Long agent runs feel broken behind a spinner. Streaming thoughts, tool calls, and partial output keeps users engaged and builds trust.",
      },
      {
        question:
          "Which is NOT a required capability of the capstone Customer Success & Ops System?",
        options: [
          "Reading incoming support tickets",
          "Escalating uncertain cases to a human Slack channel",
          "Training a new foundation model from scratch",
          "Executing refund/action policies via tools",
        ],
        answerIndex: 2,
        explanation:
          "The capstone orchestrates existing models with tools, escalation, and observability — it does not involve training foundation models.",
      },
      {
        question:
          "What backs a production-grade persistence layer for agent checkpoints?",
        options: [
          "In-memory Python dictionaries only",
          "Durable stores like Postgres or Redis with session isolation and thread safety",
          "Screenshots of the terminal",
          "A single JSON file shared by all users",
        ],
        answerIndex: 1,
        explanation:
          "Production persistence needs durable, concurrent-safe storage — typically Postgres- or Redis-backed checkpoint stores with session isolation.",
      },
    ],
  },
];

/** Total number of completable items (lessons + labs + quizzes) across the course. */
export function totalCourseItems(): number {
  return courseModules.reduce(
    (sum, m) => sum + m.lessons.length + 2, // +1 lab, +1 quiz per module
    0
  );
}
