import type { CourseMeta, CourseModule } from "@/lib/courses/types";

export const courseMeta: CourseMeta = {
  slug: "generative-ai",
  title: "Generative AI, Prompt Engineering & Enterprise AI Literacy",
  tagline:
    "Mastering Advanced LLMs, Multimodal Systems, Fine-Tuning, and Governance (2026 Edition)",
  duration: "8 Weeks",
  pace: "5–7 hours/week",
  level: "Beginner to Intermediate",
  prerequisites: [
    "Basic computer literacy",
    "No advanced programming experience required",
    "Basic familiarity with Python or API environments is helpful for the development modules (optional)",
  ],
  overview: [
    "In 2026, GenAI literacy has evolved far beyond knowing how to write basic chat prompts. To remain competitive, professionals must understand the mechanics of foundation models, orchestrate multimodal creative pipelines, safely build custom applications, leverage lightweight fine-tuning, and navigate complex international AI governance and security frameworks.",
    "This course balances high-impact practical skills (prompt design, coding assistance, and multimodal workflows) with critical analytical skills (evaluation, safety, ethical considerations, and policy compliance). You will transition from a passive consumer of AI tools to an active architect of enterprise-aligned Generative AI solutions.",
  ],
  objectives: [
    "Explain the technical mechanics of Transformers, tokenization, context windows, and embeddings.",
    "Design highly effective prompt structures using systematic engineering frameworks (CoT, ReAct, Metaprompting).",
    "Orchestrate multi-step pipelines combining text, image, video, and audio models for high-quality synthetic content.",
    "Evaluate when to deploy Retrieval-Augmented Generation (RAG) versus Fine-Tuning, and run basic LoRA parameter-efficient fine-tuning pipelines.",
    "Develop lightweight web applications or workflows utilizing structured LLM outputs (JSON schemas).",
    "Implement robust governance, compliance, and mitigation strategies for safety, copyright, bias, and data privacy in corporate environments.",
  ],
  tools: [
    {
      category: "Advanced LLMs",
      items:
        "OpenAI GPT-4o/o3, Anthropic Claude 3.5/4, Google Gemini 1.5/2.0 Pro, Meta Llama-3.x/4 (local via Ollama)",
    },
    {
      category: "Multimodal Systems",
      items:
        "Midjourney, DALL-E 3, Runway Gen-3, ElevenLabs, Suno, Adobe Firefly",
    },
    {
      category: "Application & Code Assistants",
      items: "Cursor, GitHub Copilot, v0 by Vercel, OpenAI Playground / Workbench",
    },
    {
      category: "Fine-Tuning & Datasets",
      items: "Hugging Face, OpenAI Fine-Tuning API, Together AI",
    },
    {
      category: "Governance & Security Frameworks",
      items:
        "OWASP Top 10 for LLMs, EU AI Act compliance templates, Llama Guard",
    },
  ],
  grading: [
    {
      component: "Weekly Action Labs",
      weight: "40%",
      detail:
        "Practical exercises testing prompt engineering, application setup, and pipeline configuration.",
    },
    {
      component: "Midterm Audit Document",
      weight: "20%",
      detail:
        "An ethical/risk analysis of an existing consumer Generative AI system.",
    },
    {
      component: "Capstone Project & Pitch",
      weight: "40%",
      detail:
        "Evaluated on the functionality of the prototype, architectural soundness, security precautions, and clarity of the governance framework.",
    },
  ],
};

export const courseModules: CourseModule[] = [
  {
    id: "module-1",
    week: 1,
    title: "The Foundations of Generative AI & The Attention Mechanism",
    objective:
      "Demystify how Large Language Models think, generate, and calculate probability, building a strong conceptual foundation.",
    lessons: [
      {
        id: "m1-l1",
        title: "From Machine Learning to Deep Learning to Transformers",
        content: [
          "Generative AI didn't appear from nowhere — it's the latest layer on decades of progress. Classical machine learning learned patterns from structured data. Deep learning added many-layered neural networks that learn their own features from raw text and images. The Transformer architecture, introduced in 2017, was the breakthrough that made today's large language models possible.",
          "In this lesson you'll build an intuition for why Transformers won: they process an entire sequence in parallel and learn which words matter to which other words, rather than reading strictly left-to-right. That single idea — attention — is what lets a model keep track of context across long passages.",
        ],
        bullets: [
          "Machine learning: learn patterns from structured features.",
          "Deep learning: multi-layer networks learn features automatically.",
          "Transformers: parallel processing + attention = long-range context.",
          "Foundation models are Transformers trained on internet-scale data.",
        ],
      },
      {
        id: "m1-l2",
        title: "Tokenization, Vocabulary, and the Context Window",
        content: [
          "Models don't see words — they see tokens. A tokenizer breaks text into sub-word pieces (roughly 4 characters, or ¾ of a word each in English) and maps them to numbers. Understanding tokenization explains a lot of 'weird' model behavior: why it miscounts letters, why some languages cost more, and why prompts have length limits.",
          "The context window is the maximum number of tokens a model can consider at once — prompt plus response combined. Everything outside it is invisible to the model. Managing the context window is one of the most practical skills in this course, because it directly controls both cost and quality.",
        ],
        bullets: [
          "Tokens are sub-word pieces, not whole words.",
          "You are billed per token — input and output both count.",
          "The context window caps how much the model can 'see' at once.",
          "Non-English text often uses more tokens for the same meaning.",
        ],
      },
      {
        id: "m1-l3",
        title: "The Mechanics of Scaled Dot-Product Attention",
        content: [
          "Attention is the engine of the Transformer. For every token, the model asks: which other tokens should I pay attention to, and how much? It answers this with three learned projections of each token — a Query, a Key, and a Value. The Query of one token is compared against the Keys of all tokens to produce attention weights, which are then used to blend the Values.",
          "You don't need to derive the math, but seeing the formula demystifies the 'magic': attention is a weighted average, where the weights come from how well queries and keys match, scaled and normalized into probabilities.",
        ],
        code: {
          label: "Scaled dot-product attention",
          body: "Attention(Q, K, V) = softmax( (Q · Kᵀ) / √dₖ ) · V\n\nQ = Query, K = Key, V = Value matrices\ndₖ = dimension of the keys (the √dₖ term keeps scores stable)",
        },
        bullets: [
          "Each token becomes a Query, a Key, and a Value.",
          "Query·Key similarity decides how much attention to pay.",
          "softmax turns raw scores into a probability distribution.",
          "The output is a context-aware blend of Values.",
        ],
      },
      {
        id: "m1-l4",
        title: "Sampling Controls: Temperature, Top-P, Top-K, Penalties",
        content: [
          "An LLM outputs a probability for every possible next token. Sampling settings decide how that distribution becomes actual text. Temperature scales the randomness: low temperature is focused and repetitive, high temperature is creative and risky. Top-P (nucleus) and Top-K restrict sampling to the most likely tokens. Frequency and presence penalties discourage the model from repeating itself.",
          "Knowing these dials turns 'the model is too boring / too chaotic' into a precise adjustment. You'll learn sensible defaults per task — near-zero temperature for extraction and code, higher for brainstorming and creative writing.",
        ],
        bullets: [
          "Temperature: low = deterministic, high = creative.",
          "Top-P / Top-K: limit sampling to the most probable tokens.",
          "Frequency/presence penalties: reduce repetition.",
          "Match settings to the task, not one-size-fits-all.",
        ],
      },
      {
        id: "m1-l5",
        title: "Local LLMs vs. Cloud API Models",
        content: [
          "Not every workload belongs in the cloud. Cloud APIs (GPT, Claude, Gemini) offer the most capable models with zero setup, but send your data off-site and charge per token. Local models run on your own hardware via tools like Ollama — private, free per query, and offline-capable, at the cost of setup effort and (usually) lower peak capability.",
          "The professional skill is matching the deployment to the requirement: frontier cloud models for hard reasoning, local models for privacy-sensitive or high-volume routine tasks.",
        ],
        bullets: [
          "Cloud: most capable, zero setup, per-token cost, data leaves your site.",
          "Local (Ollama, Llama): private, free per query, offline, more setup.",
          "Trade-offs: speed, privacy, cost, and capability.",
          "Hybrid strategies route each task to the right model.",
        ],
      },
    ],
    lab: {
      title: "Tokenizer Playground & Local LLM Benchmark",
      description:
        "Use a Python-based tokenizer playground to visually analyze prompt costs, then set up a local LLM (Ollama + Llama) on your machine and benchmark generation settings.",
      steps: [
        "Open a tokenizer playground and paste several prompts; observe token counts and costs.",
        "Compare how English vs. another language tokenizes for the same sentence.",
        "Install Ollama and pull a Llama-3.x model locally.",
        "Generate the same prompt at temperature 0.2, 0.7, and 1.2; compare outputs.",
        "Record generation speed (tokens/sec) and note the quality trade-offs.",
      ],
    },
    quiz: [
      {
        question: "What is a token in the context of an LLM?",
        options: [
          "A single English word",
          "A sub-word piece of text mapped to a number that the model actually processes",
          "A security credential for the API",
          "One sentence of input",
        ],
        answerIndex: 1,
        explanation:
          "Tokenizers split text into sub-word pieces (~¾ of a word in English) and map them to numbers. Models operate on tokens, not whole words — which is why they're billed per token and have context limits.",
      },
      {
        question:
          "In the attention formula, what role do the Query and Key matrices play?",
        options: [
          "They store the final answer",
          "Their similarity determines how much attention one token pays to another",
          "They set the model's temperature",
          "They compress the context window",
        ],
        answerIndex: 1,
        explanation:
          "The dot product of a token's Query with every Key measures relevance; softmax turns those scores into weights used to blend the Value vectors.",
      },
      {
        question:
          "You need an LLM to extract data into a strict format with maximum consistency. Which setting helps most?",
        options: [
          "A high temperature (e.g. 1.5)",
          "A low temperature (near 0)",
          "A large frequency penalty",
          "A bigger Top-K",
        ],
        answerIndex: 1,
        explanation:
          "Low temperature makes output focused and deterministic — ideal for extraction and code. High temperature and wide sampling add creativity/randomness you don't want for structured tasks.",
      },
      {
        question:
          "What is a key advantage of running a local LLM via Ollama over a cloud API?",
        options: [
          "It is always more accurate than cloud models",
          "Data privacy, no per-query cost, and offline capability",
          "It requires no hardware",
          "It removes the need for prompt engineering",
        ],
        answerIndex: 1,
        explanation:
          "Local models keep data on your hardware, cost nothing per query, and run offline — trading some peak capability and setup effort for privacy and control.",
      },
    ],
  },
  {
    id: "module-2",
    week: 2,
    title: "Professional Prompt Engineering & Cognitive Frameworks",
    objective:
      "Move past simple text strings to master systemic, reproducible prompt design frameworks.",
    lessons: [
      {
        id: "m2-l1",
        title: "The Anatomy of a Perfect Prompt",
        content: [
          "A professional prompt is engineered, not typed. The reliable structure has five parts: Context (background the model needs), Role (the persona it should adopt), Task (the specific instruction), Constraints (format, length, tone, what to avoid), and Examples (demonstrations of the output you want).",
          "This structure is reproducible: change the input, keep the scaffold, and get consistent results. You'll practice converting vague one-liners into structured prompts and see the quality jump immediately.",
        ],
        bullets: [
          "Context: the background the model needs to succeed.",
          "Role: the persona and expertise to adopt.",
          "Task: the precise, unambiguous instruction.",
          "Constraints: format, length, tone, and exclusions.",
          "Examples: show, don't just tell.",
        ],
      },
      {
        id: "m2-l2",
        title: "Zero-shot, One-shot, and Few-shot Learning",
        content: [
          "'Shots' are examples you include in the prompt. Zero-shot gives no example and relies on the model's general ability. One-shot gives a single example to anchor the format. Few-shot gives several, which is the most powerful lever for controlling structure, tone, and edge-case handling without any training.",
          "You'll learn when each is appropriate: zero-shot for simple, well-understood tasks; few-shot when format precision or a specific style matters.",
        ],
        bullets: [
          "Zero-shot: no examples — fast, good for simple tasks.",
          "One-shot: a single example anchors the desired format.",
          "Few-shot: several examples strongly steer structure and tone.",
          "Examples are the cheapest form of customization.",
        ],
      },
      {
        id: "m2-l3",
        title: "Cognitive Strategies: Chain-of-Thought, Self-Consistency, ReAct",
        content: [
          "For anything requiring reasoning, how you ask matters as much as what you ask. Chain-of-Thought (CoT) prompting asks the model to reason step by step before answering, dramatically improving accuracy on math and logic. Self-Consistency samples several reasoning paths and takes the majority answer. ReAct interleaves reasoning with actions (tool calls), grounding each step in real data.",
          "These aren't tricks — they change how the model allocates its computation, and they're the difference between a confident wrong answer and a correct one.",
        ],
        bullets: [
          "Chain-of-Thought: 'think step by step' before answering.",
          "Self-Consistency: sample multiple paths, take the majority.",
          "ReAct: alternate reasoning with tool actions.",
          "Reasoning prompts trade a few tokens for large accuracy gains.",
        ],
      },
      {
        id: "m2-l4",
        title: "Metaprompting and System vs. User Prompts",
        content: [
          "Metaprompting is using an LLM to write or improve prompts for another LLM — a force multiplier once you know what good prompts look like. It's especially useful for generating few-shot examples and refining instructions iteratively.",
          "You'll also master the system/user distinction: the system prompt sets durable rules, persona, and constraints for the whole conversation, while user prompts carry the turn-by-turn requests. Putting the right content in the right place is the difference between an assistant that stays on-role and one that drifts.",
        ],
        bullets: [
          "Metaprompting: use LLMs to draft and refine prompts.",
          "System prompt: durable rules, role, and guardrails.",
          "User prompt: the specific request for this turn.",
          "Right content, right slot = consistent behavior.",
        ],
      },
      {
        id: "m2-l5",
        title: "Prompt Drift and Model-to-Model Adaptation",
        content: [
          "A prompt tuned for one model may underperform on another — different models have different default styles, instruction-following quirks, and context limits. 'Prompt drift' also happens over long conversations as instructions get buried under history.",
          "You'll learn defensive techniques: re-stating key constraints, anchoring with structure, and systematically adapting a prompt when migrating between GPT, Claude, Gemini, and local models.",
        ],
        bullets: [
          "Prompts are not perfectly portable across models.",
          "Long conversations dilute earlier instructions (drift).",
          "Re-anchor critical constraints periodically.",
          "Adapt structure and examples when switching models.",
        ],
      },
    ],
    lab: {
      title: "Dynamic Prompt Template Library",
      description:
        "Build a dynamic prompt template library in the OpenAI Playground / Anthropic Workbench that converts raw, unstructured transcripts into highly polished, structured professional deliverables (such as system audits and marketing collateral).",
      steps: [
        "Design a reusable template with Context / Role / Task / Constraints / Examples slots.",
        "Create a few-shot example set showing raw transcript → polished deliverable.",
        "Test the template on three different transcript types.",
        "Add a system prompt that enforces tone and formatting across all runs.",
        "Save two or three template variants and document when to use each.",
      ],
    },
    quiz: [
      {
        question:
          "Which five components make up the recommended structure of a professional prompt?",
        options: [
          "Title, Body, Footer, Signature, Date",
          "Context, Role, Task, Constraints, Examples",
          "Input, Output, Temperature, Tokens, Model",
          "Question, Answer, Feedback, Retry, Score",
        ],
        answerIndex: 1,
        explanation:
          "The reliable, reproducible prompt scaffold is Context, Role, Task, Constraints, and Examples — keep the scaffold, swap the input.",
      },
      {
        question: "What does Chain-of-Thought (CoT) prompting do?",
        options: [
          "Chains multiple models together in sequence",
          "Asks the model to reason step by step before giving a final answer, improving accuracy",
          "Reduces token cost by skipping reasoning",
          "Encrypts the prompt for security",
        ],
        answerIndex: 1,
        explanation:
          "CoT elicits explicit step-by-step reasoning, which materially improves performance on math, logic, and multi-step tasks.",
      },
      {
        question:
          "Where should durable rules, persona, and guardrails for an assistant be placed?",
        options: [
          "In every user message",
          "In the system prompt",
          "In the model's training data",
          "In the temperature setting",
        ],
        answerIndex: 1,
        explanation:
          "The system prompt sets persistent behavior for the whole conversation; user prompts carry the per-turn requests.",
      },
      {
        question: "What is metaprompting?",
        options: [
          "Prompting about metadata only",
          "Using an LLM to write or improve prompts for another LLM",
          "A prompt that never changes",
          "Prompting with no examples",
        ],
        answerIndex: 1,
        explanation:
          "Metaprompting leverages an LLM to generate and refine prompts (and few-shot examples) for other LLMs — a productivity multiplier.",
      },
    ],
  },
  {
    id: "module-3",
    week: 3,
    title: "Multimodal Synthesis & Creative AI Workflows",
    objective:
      "Blend image, audio, video, and text generation models into cohesive, multi-step production pipelines.",
    lessons: [
      {
        id: "m3-l1",
        title: "How Multimodal Encoders Bridge Pixels, Speech, and Text",
        content: [
          "Multimodal models work by projecting different kinds of data — text, images, audio — into a shared representation space, so a picture of a dog and the word 'dog' land near each other. This shared embedding space is what lets a model 'describe this image' or 'generate an image from this text'.",
          "Understanding this bridge explains both the power and the limits of multimodal AI: it's remarkably good at connecting modalities it saw together in training, and unreliable where those connections are sparse.",
        ],
        bullets: [
          "Different modalities are projected into a shared embedding space.",
          "Related concepts across modalities land near each other.",
          "This enables captioning, generation, and cross-modal search.",
          "Quality depends on how well modalities were paired in training.",
        ],
      },
      {
        id: "m3-l2",
        title: "Advanced Text-to-Image Prompting",
        content: [
          "Great image generation is directed, not wished for. Beyond the subject, you specify style ('watercolor', 'cinematic'), composition ('rule of thirds', 'close-up'), aspect ratio, lighting, and mood. Tools like Midjourney and DALL-E 3 respond to this vocabulary precisely.",
          "You'll also learn seed consistency — reusing a seed to keep a character or style stable across a series of images, essential for coherent marketing sets and storyboards.",
        ],
        bullets: [
          "Direct style, composition, aspect ratio, lighting, and mood.",
          "Stylers and composition directives shape the result.",
          "Seeds enable consistency across a series of images.",
          "Iterate: generate, critique, refine the prompt.",
        ],
      },
      {
        id: "m3-l3",
        title: "Video Generation and Temporal Consistency",
        content: [
          "Video models (Runway Gen-3, Sora, Luma) add the hardest dimension: time. The central challenge is temporal consistency — keeping objects, characters, and lighting stable frame-to-frame so the clip doesn't 'melt'. You'll learn to prompt for motion, camera movement, and duration, and to stitch short clips into longer sequences.",
          "Realistic expectations matter here: current video generation excels at short, stylized shots and struggles with long, precise, physically accurate sequences.",
        ],
        bullets: [
          "Temporal consistency keeps subjects stable across frames.",
          "Prompt for motion, camera moves, and shot duration.",
          "Short clips stitched together beat one long unstable clip.",
          "Know the current limits: short, stylized shots shine.",
        ],
      },
      {
        id: "m3-l4",
        title: "Synthetic Voice, Cloning, and Audio Orchestration",
        content: [
          "Tools like ElevenLabs generate natural speech from text, clone voices from short samples, and control tone and pacing. Combined with music generators (Suno), you can produce full soundtracks — narration, background music, and effects — without a studio.",
          "This power carries responsibility: voice cloning raises consent and impersonation concerns you'll revisit in the ethics module. Here you focus on the craft of clean, well-orchestrated audio.",
        ],
        bullets: [
          "Text-to-speech with controllable tone and pacing.",
          "Voice cloning from short reference samples.",
          "Music and effects generation (e.g. Suno).",
          "Consent and disclosure matter for cloned voices.",
        ],
      },
      {
        id: "m3-l5",
        title: "Multimodal Inputs: Reading Documents, Charts, and Scenes",
        content: [
          "Visual LLMs don't just generate images — they read them. You can hand a model a scanned invoice, a chart, a screenshot, or a photo of a room and ask it to extract data, summarize, or reason about spatial layout. This turns unstructured visual information into structured, actionable output.",
          "You'll practice prompting visual models for reliable extraction and learn where they still stumble (dense tables, tiny text, ambiguous diagrams).",
        ],
        bullets: [
          "Visual LLMs analyze documents, charts, and photos.",
          "Extract structured data from unstructured visuals.",
          "Reason about spatial layout and relationships.",
          "Verify outputs: dense tables and tiny text are error-prone.",
        ],
      },
    ],
    lab: {
      title: "Complete Multimodal Marketing Package",
      description:
        "Design and execute a complete multimodal marketing package — a 30-second video trailer, voiceover narration, background music, and promotional image banners — entirely using generative AI orchestration tools.",
      steps: [
        "Write a creative brief and script for a 30-second product trailer.",
        "Generate promotional image banners with a consistent style and seed.",
        "Produce voiceover narration and background music with audio tools.",
        "Generate and stitch video clips, aiming for temporal consistency.",
        "Assemble the final package and review it against the brief.",
      ],
    },
    quiz: [
      {
        question: "How do multimodal models connect text and images?",
        options: [
          "They translate images into English first",
          "They project both into a shared embedding space where related concepts are near each other",
          "They use a separate model with no shared representation",
          "They cannot connect them at all",
        ],
        answerIndex: 1,
        explanation:
          "Multimodal models map different modalities into a shared representation space, so a concept's image and text land close together — enabling captioning, generation, and cross-modal search.",
      },
      {
        question:
          "In text-to-image generation, what does reusing a seed help achieve?",
        options: [
          "Faster generation only",
          "Consistency of a character or style across a series of images",
          "Lower API cost",
          "Higher image resolution",
        ],
        answerIndex: 1,
        explanation:
          "A fixed seed keeps generation stable, which is essential for coherent series — the same character or style across multiple banners or storyboard frames.",
      },
      {
        question: "What is the central challenge in AI video generation?",
        options: [
          "Choosing a file format",
          "Temporal consistency — keeping subjects and lighting stable across frames",
          "Adding subtitles",
          "Reducing the token count",
        ],
        answerIndex: 1,
        explanation:
          "Video adds time; the hard part is temporal consistency so objects and lighting stay coherent frame-to-frame instead of 'melting'.",
      },
    ],
  },
  {
    id: "module-4",
    week: 4,
    title: "GenAI for Development & Application Building",
    objective:
      "Leverage AI as a programming partner to build functional web applications and secure structured data outputs.",
    lessons: [
      {
        id: "m4-l1",
        title: "Maximizing Productivity with AI IDEs",
        content: [
          "AI coding assistants have moved into the editor itself. Tools like Cursor and VS Code with GitHub Copilot autocomplete lines, generate whole functions, explain unfamiliar code, and answer questions about your project — all in context. Used well, they multiply a developer's throughput; used blindly, they introduce subtle bugs.",
          "You'll learn the productive workflow: describe intent clearly, review every suggestion, and keep the human firmly in the loop as the architect and reviewer.",
        ],
        bullets: [
          "AI IDEs autocomplete, generate, and explain code in context.",
          "Cursor and Copilot are partners, not replacements.",
          "Always review suggestions — trust but verify.",
          "You stay the architect; the AI accelerates the typing.",
        ],
      },
      {
        id: "m4-l2",
        title: "Prompting for Code: Refactoring, Debugging, Tests",
        content: [
          "LLMs are excellent at well-scoped coding tasks. For refactoring, give the code and the goal ('extract this into a reusable function'). For debugging, paste the error and the relevant code and ask for hypotheses. For testing, ask for unit tests covering edge cases — a task humans often skip.",
          "The key is scope: small, specific requests with the right context succeed; vague 'fix my app' requests fail. You'll practice framing coding prompts that consistently produce usable results.",
        ],
        bullets: [
          "Refactor: provide code plus a clear goal.",
          "Debug: paste the error and relevant code, ask for hypotheses.",
          "Test: ask for unit tests including edge cases.",
          "Narrow scope + right context = reliable code output.",
        ],
      },
      {
        id: "m4-l3",
        title: "Structured Outputs: JSON Schema and Pydantic",
        content: [
          "For applications, free-form text is a liability — you need predictable structure. Modern LLMs can be forced to respond in strict JSON matching a schema you define, typically with Pydantic models or JSON Schema. This turns the model into a reliable component you can plug into code.",
          "Structured outputs are what separate a chat toy from a production feature: the model's answer arrives as clean, validated data your program can act on without fragile text parsing.",
        ],
        code: {
          label: "Pydantic schema for a structured LLM response",
          body: 'from pydantic import BaseModel\n\nclass Invoice(BaseModel):\n    vendor: str\n    total: float\n    due_date: str\n    line_items: list[str]\n\n# Ask the model to return JSON matching Invoice,\n# then validate: Invoice.model_validate_json(response)',
        },
        bullets: [
          "Force JSON output that matches a defined schema.",
          "Pydantic / JSON Schema define and validate the shape.",
          "Structured output = reliable, parseable data, not prose.",
          "This is the bridge from chatbot to application feature.",
        ],
      },
      {
        id: "m4-l4",
        title: "Rapid Prototyping with Generative Web Builders",
        content: [
          "Visual generative builders like v0 by Vercel and Claude Artifacts turn a description into a working, styled interface in seconds. They're ideal for prototyping — validating an idea, demoing to stakeholders, or scaffolding a UI you'll refine by hand.",
          "You'll learn to prompt these tools effectively and, crucially, when to graduate from a generated prototype to maintainable production code.",
        ],
        bullets: [
          "v0 and Claude Artifacts generate working UIs from descriptions.",
          "Perfect for prototypes, demos, and UI scaffolding.",
          "Iterate visually, then export or rebuild for production.",
          "Know when a prototype needs to become real code.",
        ],
      },
    ],
    lab: {
      title: "Build a Web Tool with an AI Coding Assistant",
      description:
        "Code and launch a functional, web-based interactive tool (such as a custom personal finance calculator) using Cursor and a frontend layout engine — without writing the foundational code from scratch.",
      steps: [
        "Define the tool's purpose, inputs, and outputs in a short spec.",
        "Use an AI IDE to scaffold the interface and core logic.",
        "Add a structured-output step where an LLM returns validated JSON.",
        "Test edge cases and ask the assistant to write unit tests.",
        "Deploy or run the tool and demo it end-to-end.",
      ],
    },
    quiz: [
      {
        question:
          "What is the healthiest way to work with an AI coding assistant?",
        options: [
          "Accept every suggestion without review to move fast",
          "Describe intent clearly, review every suggestion, and stay the architect/reviewer",
          "Only use it to write comments",
          "Let it deploy to production automatically",
        ],
        answerIndex: 1,
        explanation:
          "AI IDEs multiply throughput, but the human must remain the architect and reviewer — clear intent in, careful review out.",
      },
      {
        question:
          "Why are structured (JSON schema) outputs important for building applications?",
        options: [
          "They make responses longer",
          "They produce predictable, validated data your program can use without fragile text parsing",
          "They reduce the model's accuracy",
          "They are required for chat interfaces",
        ],
        answerIndex: 1,
        explanation:
          "Structured outputs turn the model into a reliable component: clean, schema-validated data (via Pydantic/JSON Schema) instead of free-form prose you'd have to parse.",
      },
      {
        question:
          "Which type of coding request is most likely to get a reliable result from an LLM?",
        options: [
          "'Fix my entire app'",
          "'Make it better'",
          "'Extract this block into a reusable function that takes these two parameters'",
          "'Rewrite everything from scratch'",
        ],
        answerIndex: 2,
        explanation:
          "Small, specific, well-scoped requests with the right context succeed; vague, sweeping requests fail. Narrow the scope and provide context.",
      },
    ],
  },
  {
    id: "module-5",
    week: 5,
    title: "Customization Strategies: RAG vs. Fine-Tuning",
    objective:
      "Diagnose corporate data needs and determine when to context-stuff (RAG) vs. when to update weights (Fine-Tuning).",
    lessons: [
      {
        id: "m5-l1",
        title: "The Customization Spectrum",
        content: [
          "There are four levels of customizing model behavior, in increasing cost and complexity: prompting (change the instructions), RAG (inject relevant knowledge at query time), fine-tuning (adjust the model's weights on your examples), and pre-training (build a model from scratch — almost never the right answer for a business).",
          "The single most valuable judgment in applied GenAI is picking the right level. This lesson gives you a decision framework so you don't reach for expensive fine-tuning when a better prompt or a RAG pipeline would do.",
        ],
        bullets: [
          "Prompting: cheapest, fastest, try first.",
          "RAG: inject fresh/private knowledge at query time.",
          "Fine-tuning: change behavior, tone, and format via weights.",
          "Pre-training: build from scratch — rarely justified.",
        ],
      },
      {
        id: "m5-l2",
        title: "Anatomy of Retrieval-Augmented Generation (RAG)",
        content: [
          "RAG gives a model knowledge it wasn't trained on — your documents, your latest data — without changing the model. Text is converted to embeddings (numeric vectors capturing meaning), stored in a vector database, and searched semantically at query time. The most relevant chunks are inserted into the prompt so the model answers from your data.",
          "RAG is the workhorse of enterprise GenAI: it keeps answers current, grounded, and citable, and it sidesteps the cost and staleness of fine-tuning for knowledge.",
        ],
        bullets: [
          "Embeddings turn text into meaning-carrying vectors.",
          "A vector DB enables fast semantic search.",
          "Relevant chunks are injected into the prompt at query time.",
          "RAG keeps answers current, grounded, and sourced.",
        ],
      },
      {
        id: "m5-l3",
        title: "When to Fine-Tune",
        content: [
          "Fine-tuning shines for behavior, not fresh facts. Reach for it when you need tight formatting control, a consistent tone or brand voice, fluency in domain-specific terminology, or lower latency and cost by baking behavior into a smaller model. It's the wrong tool for keeping up with changing information — that's RAG's job.",
          "A useful rule of thumb: RAG teaches the model what to know; fine-tuning teaches it how to behave.",
        ],
        bullets: [
          "Fine-tune for format, tone, and domain style — not fresh facts.",
          "Can reduce latency/cost by specializing a smaller model.",
          "RAG = what to know; fine-tuning = how to behave.",
          "Combine both when you need current knowledge and consistent style.",
        ],
      },
      {
        id: "m5-l4",
        title: "Preparing Datasets for Fine-Tuning",
        content: [
          "Fine-tuning is only as good as its data. The standard format is a set of examples, each with a system prompt, a user query, and the ideal assistant response — teaching the model the mapping you want. Quality, consistency, and coverage of edge cases matter far more than raw quantity.",
          "You'll learn to curate and format a clean dataset, and the common failure modes: inconsistent labels, too few examples, and data that doesn't match real usage.",
        ],
        bullets: [
          "Examples = system prompt + user query + ideal response.",
          "Quality and consistency beat sheer volume.",
          "Cover edge cases the model must handle.",
          "Bad data produces confidently wrong fine-tunes.",
        ],
      },
      {
        id: "m5-l5",
        title: "Parameter-Efficient Fine-Tuning (PEFT) and LoRA",
        content: [
          "Full fine-tuning updates every weight — expensive and hardware-hungry. Parameter-Efficient Fine-Tuning (PEFT) updates only a small set of new parameters, and LoRA (Low-Rank Adaptation) is the most popular technique: it injects small trainable matrices while freezing the base model, achieving most of the benefit at a fraction of the cost.",
          "LoRA is why fine-tuning is now accessible to individuals and small teams, not just labs with GPU clusters.",
        ],
        bullets: [
          "Full fine-tuning updates all weights — costly.",
          "PEFT updates only a small set of new parameters.",
          "LoRA injects small trainable matrices, freezing the base model.",
          "Result: near full-fine-tune quality at a fraction of the cost.",
        ],
      },
    ],
    lab: {
      title: "Run a Lightweight Fine-Tuning Job",
      description:
        "Format a custom training dataset of customer service interaction histories, run a lightweight fine-tuning job on the OpenAI / Together AI API, and evaluate the fine-tuned model against a base model.",
      steps: [
        "Curate customer service transcripts into system/user/assistant examples.",
        "Clean and validate the dataset for consistency and coverage.",
        "Launch a fine-tuning job via the OpenAI or Together AI API.",
        "Run the same test prompts against the base and fine-tuned models.",
        "Compare tone, format adherence, and accuracy; document the verdict.",
      ],
    },
    quiz: [
      {
        question:
          "A company needs its assistant to answer from a constantly-updated internal knowledge base. Which approach fits best?",
        options: [
          "Pre-training a new model",
          "Retrieval-Augmented Generation (RAG)",
          "Raising the temperature",
          "Full fine-tuning every night",
        ],
        answerIndex: 1,
        explanation:
          "RAG injects current, private knowledge at query time without retraining — ideal for changing information. Fine-tuning changes behavior, not fresh facts.",
      },
      {
        question:
          "Which need is a good reason to fine-tune rather than use RAG?",
        options: [
          "Keeping answers up to date with today's news",
          "Enforcing a strict output format and consistent brand tone",
          "Adding a brand-new document to the knowledge base",
          "Reducing the model's context window",
        ],
        answerIndex: 1,
        explanation:
          "Fine-tuning excels at behavior — format control, tone, domain style. RAG handles fresh knowledge. Rule of thumb: RAG = what to know, fine-tuning = how to behave.",
      },
      {
        question: "What does LoRA (Low-Rank Adaptation) do?",
        options: [
          "Retrains the entire model from scratch",
          "Injects small trainable matrices while freezing the base model, cutting cost dramatically",
          "Increases the context window",
          "Replaces RAG entirely",
        ],
        answerIndex: 1,
        explanation:
          "LoRA is a PEFT technique that trains small added matrices on top of a frozen base model — near full-fine-tune quality at a fraction of the compute cost.",
      },
      {
        question: "What matters most when preparing a fine-tuning dataset?",
        options: [
          "Maximum possible quantity, regardless of quality",
          "Quality, consistency, and coverage of edge cases",
          "Using only one-word answers",
          "Avoiding system prompts entirely",
        ],
        answerIndex: 1,
        explanation:
          "Consistent, high-quality examples that cover real edge cases beat sheer volume. Inconsistent or unrepresentative data yields confidently wrong models.",
      },
    ],
  },
  {
    id: "module-6",
    week: 6,
    title: "Ethical AI, Safety, & Risk Mitigation",
    objective:
      "Identify security vulnerabilities, combat systemic bias, and build defensive guardrails against AI-specific threats.",
    lessons: [
      {
        id: "m6-l1",
        title: "Understanding and Containing Hallucinations",
        content: [
          "LLMs generate plausible text, not verified truth — so they sometimes state falsehoods with total confidence. This isn't a bug to be fully eliminated; it's a property of how the models work. The professional response is 'hallucination containment': design systems that ground answers in sources, verify claims, and express uncertainty.",
          "You'll learn containment patterns: retrieval grounding (RAG), asking the model to cite sources, verification passes, and refusing to answer when confidence is low.",
        ],
        bullets: [
          "Hallucinations are inherent, not a simple bug.",
          "Ground answers in real sources (RAG, citations).",
          "Add verification passes for high-stakes output.",
          "Design for graceful 'I'm not sure' responses.",
        ],
      },
      {
        id: "m6-l2",
        title: "Prompt Injection, Jailbreaking, and Prompt Leakage",
        content: [
          "These are the signature attacks against LLM applications. Prompt injection hides malicious instructions in content the model reads (a web page, a document) to hijack its behavior. Jailbreaking crafts inputs that bypass safety rules. Prompt leakage tricks the model into revealing its hidden system prompt.",
          "You'll learn how each works and the layered defenses: treat all external content as untrusted data (never instructions), validate inputs and outputs, and never put secrets in a prompt you don't want exposed.",
        ],
        bullets: [
          "Prompt injection: malicious instructions hidden in read content.",
          "Jailbreaking: inputs crafted to bypass safety rules.",
          "Prompt leakage: extracting the hidden system prompt.",
          "Defense: external content is data, never instructions.",
        ],
      },
      {
        id: "m6-l3",
        title: "Intellectual Property, Copyright, and Data Opt-Out",
        content: [
          "Generative AI raises unsettled legal questions. Who owns AI-generated output? Is training on copyrighted material fair use? Can creators opt their work out of training sets? These questions are being litigated and legislated worldwide, and the answers differ by jurisdiction.",
          "You'll learn the current landscape well enough to make defensible decisions: respecting licenses, tracking provenance, honoring opt-out mechanisms, and getting legal review for high-stakes commercial use.",
        ],
        bullets: [
          "Ownership of AI output is legally unsettled and jurisdiction-dependent.",
          "Training-data fair use is actively contested.",
          "Respect opt-out mechanisms and content licenses.",
          "Get legal review for high-stakes commercial use.",
        ],
      },
      {
        id: "m6-l4",
        title: "Social Impacts: Bias, Deepfakes, Misinformation, Jobs",
        content: [
          "AI systems inherit and can amplify the biases in their training data, producing unfair or skewed outputs. Generative tools also enable convincing deepfakes and mass misinformation, and they're reshaping which jobs exist and which skills matter.",
          "Being AI-literate means engaging with these impacts honestly: auditing systems for bias, disclosing synthetic media, and thinking clearly about responsible deployment rather than hype or doom.",
        ],
        bullets: [
          "Models can inherit and amplify training-data bias.",
          "Deepfakes and misinformation are real, scaling threats.",
          "Disclose synthetic media; audit systems for fairness.",
          "Job transitions demand reskilling, not denial.",
        ],
      },
      {
        id: "m6-l5",
        title: "OWASP Top 10 for LLM Applications",
        content: [
          "Security researchers have codified the most critical LLM application risks into the OWASP Top 10 for LLMs — a shared checklist covering prompt injection, insecure output handling, training-data poisoning, model denial of service, supply-chain risks, sensitive-information disclosure, and more.",
          "You'll use it the way web developers use the classic OWASP Top 10: as a systematic audit list to make sure you haven't left an obvious door open.",
        ],
        bullets: [
          "A standardized checklist of top LLM security risks.",
          "Covers injection, output handling, data poisoning, and more.",
          "Use it as a systematic audit, not an afterthought.",
          "Shared vocabulary for talking about LLM security.",
        ],
      },
    ],
    lab: {
      title: "Red-Teaming a Mock Corporate Chatbot",
      description:
        "Conduct a red-teaming exercise: act as an adversary to jailbreak a mock corporate chatbot, uncover its hidden system prompt, force it to bypass safety filters — then implement input/output guardrails to patch the exploit.",
      steps: [
        "Probe the chatbot to extract or infer its hidden system prompt.",
        "Craft jailbreak inputs that bypass its safety rules.",
        "Document each successful exploit and its mechanism.",
        "Implement input validation and output filtering guardrails.",
        "Re-test to confirm the exploits are now blocked.",
      ],
    },
    quiz: [
      {
        question: "Why do LLMs hallucinate?",
        options: [
          "They are deliberately programmed to lie",
          "They generate plausible text based on patterns, not verified truth — it's inherent to how they work",
          "Only poorly trained models do it",
          "It only happens at high temperature",
        ],
        answerIndex: 1,
        explanation:
          "Hallucination is a property of probabilistic text generation, not a simple bug. The professional response is containment: grounding, citations, verification, and graceful uncertainty.",
      },
      {
        question: "What is prompt injection?",
        options: [
          "Injecting code into the model's weights",
          "Hiding malicious instructions in content the model reads, to hijack its behavior",
          "Adding examples to a prompt",
          "Speeding up token generation",
        ],
        answerIndex: 1,
        explanation:
          "Prompt injection smuggles instructions into data the model consumes (web pages, documents). The core defense: treat all external content as untrusted data, never as instructions.",
      },
      {
        question: "What is the OWASP Top 10 for LLMs used for?",
        options: [
          "Ranking the best models",
          "A standardized checklist of the most critical LLM application security risks",
          "Measuring token cost",
          "Choosing a temperature setting",
        ],
        answerIndex: 1,
        explanation:
          "It's a shared, systematic audit list of top LLM security risks — used like the classic web OWASP Top 10 to catch obvious vulnerabilities.",
      },
      {
        question:
          "An LLM system produces skewed results that disadvantage a group. What is the most likely root cause?",
        options: [
          "The temperature is too low",
          "Bias inherited and amplified from the training data",
          "The context window is too large",
          "Too many examples in the prompt",
        ],
        answerIndex: 1,
        explanation:
          "Models learn from data that carries societal bias and can amplify it. Responsible deployment requires auditing for fairness and mitigating bias.",
      },
    ],
  },
  {
    id: "module-7",
    week: 7,
    title: "Enterprise Governance, Security, & AI Policy",
    objective:
      "Design institutional frameworks that allow organizations to deploy Generative AI responsibly, productively, and legally.",
    lessons: [
      {
        id: "m7-l1",
        title: "Data Privacy and Sovereignty",
        content: [
          "For enterprises, the first question about any AI tool is: where does our data go? Consumer chat tools may train on your inputs; enterprise plans typically offer zero-data-retention APIs that don't store or train on your data. For the most sensitive workloads, on-premises or private-cloud deployment keeps data entirely under your control.",
          "Data sovereignty — the requirement that data stay within certain legal jurisdictions — adds another layer, especially for regulated industries and government.",
        ],
        bullets: [
          "Know exactly where your data goes and whether it trains the model.",
          "Enterprise plans offer zero-data-retention options.",
          "On-prem / private cloud for the most sensitive workloads.",
          "Data sovereignty: keep data within required jurisdictions.",
        ],
      },
      {
        id: "m7-l2",
        title: "Developing an Institutional GenAI Policy",
        content: [
          "A good AI policy lets an organization move fast safely. It defines acceptable use (what employees may and may not do with AI), disclosure standards (when AI involvement must be declared), and accountability (who owns AI-assisted decisions and outputs).",
          "You'll learn to write policy that is specific enough to guide behavior and flexible enough to survive a fast-moving field — the document you'll draft in this module's lab.",
        ],
        bullets: [
          "Acceptable use: clear do's and don'ts for employees.",
          "Disclosure: when AI involvement must be declared.",
          "Accountability: who owns AI-assisted outputs and decisions.",
          "Specific enough to guide, flexible enough to last.",
        ],
      },
      {
        id: "m7-l3",
        title: "Compliance Frameworks: EU AI Act and Beyond",
        content: [
          "Regulation has arrived. The EU AI Act classifies AI systems by risk (unacceptable, high, limited, minimal) and imposes obligations accordingly — transparency mandates, documentation, and human oversight for higher-risk uses. US Executive Orders and a patchwork of local regulations add further requirements.",
          "You'll learn to categorize a system's risk level and identify the obligations that follow, so compliance is designed in from the start rather than bolted on after.",
        ],
        bullets: [
          "EU AI Act: risk categories drive obligations.",
          "Transparency and documentation mandates for higher-risk uses.",
          "US Executive Orders and local rules add requirements.",
          "Classify risk early; design compliance in, not on.",
        ],
      },
      {
        id: "m7-l4",
        title: "Procurement: Evaluating AI Vendors",
        content: [
          "Choosing an AI vendor is a due-diligence exercise. Beyond capability and price, you weigh security posture (encryption, certifications, data handling), IP indemnification (will the vendor cover you if their output infringes copyright?), and increasingly the carbon footprint of the models you use.",
          "You'll build a procurement review checklist so vendor selection is a defensible, documented decision rather than a gut call.",
        ],
        bullets: [
          "Evaluate security posture and data handling.",
          "Check IP indemnification for generated output.",
          "Consider carbon footprint and sustainability.",
          "Document the decision with a review checklist.",
        ],
      },
      {
        id: "m7-l5",
        title: "Measuring ROI and Workflow Time-Savings",
        content: [
          "AI initiatives must justify themselves. You'll learn to measure real impact: time saved per workflow, quality improvements, error reduction, and cost per outcome versus the previous process. Vanity metrics ('number of prompts sent') don't count.",
          "Framing ROI credibly is also how you win executive buy-in — the skill you'll apply when presenting your capstone to 'leadership'.",
        ],
        bullets: [
          "Measure time saved, quality, and cost per outcome.",
          "Avoid vanity metrics that don't map to value.",
          "Compare against the pre-AI baseline honestly.",
          "Credible ROI wins executive buy-in.",
        ],
      },
    ],
    lab: {
      title: "Draft an Enterprise AI Governance & Acceptable Use Policy",
      description:
        "Draft a comprehensive AI Governance and Acceptable Use Policy for a fictional mid-sized enterprise — complete with risk matrices, procurement review criteria, and guidelines for handling customer data.",
      steps: [
        "Define acceptable-use rules and disclosure standards for employees.",
        "Build a risk matrix mapping use cases to EU AI Act-style risk levels.",
        "Write procurement review criteria for evaluating AI vendors.",
        "Add customer-data handling and privacy guidelines.",
        "Assemble the policy into a clean, presentable document.",
      ],
    },
    quiz: [
      {
        question:
          "What is the safest data option for an enterprise using a cloud LLM with sensitive inputs?",
        options: [
          "A free consumer chat plan",
          "An enterprise plan with a zero-data-retention API (or on-prem deployment)",
          "Sharing the data publicly",
          "Turning off encryption to save cost",
        ],
        answerIndex: 1,
        explanation:
          "Enterprise plans typically offer zero-data-retention APIs that don't store or train on your data; on-prem/private cloud goes further for the most sensitive workloads.",
      },
      {
        question: "How does the EU AI Act primarily structure its obligations?",
        options: [
          "By the size of the company",
          "By classifying AI systems into risk categories, with obligations scaling to risk",
          "By the programming language used",
          "By the number of users",
        ],
        answerIndex: 1,
        explanation:
          "The EU AI Act sorts systems into risk tiers (unacceptable, high, limited, minimal) and imposes transparency, documentation, and oversight obligations accordingly.",
      },
      {
        question:
          "Which is a meaningful way to measure the ROI of an AI initiative?",
        options: [
          "Total number of prompts sent",
          "Time saved per workflow and cost per outcome vs. the previous process",
          "Number of models available",
          "Length of the system prompt",
        ],
        answerIndex: 1,
        explanation:
          "Credible ROI measures real impact — time saved, quality, error reduction, cost per outcome against the pre-AI baseline — not vanity metrics like prompt counts.",
      },
      {
        question:
          "Why does IP indemnification matter when procuring an AI vendor?",
        options: [
          "It makes the model faster",
          "It determines whether the vendor covers you if their output infringes copyright",
          "It sets the temperature default",
          "It increases the context window",
        ],
        answerIndex: 1,
        explanation:
          "IP indemnification is a due-diligence factor: it defines the vendor's liability if generated output infringes third-party rights — critical for commercial use.",
      },
    ],
  },
  {
    id: "module-8",
    week: 8,
    title: "Capstone Project & Future Frontiers",
    objective:
      "Consolidate your prompting, application, and safety knowledge into a fully realized enterprise-grade GenAI implementation.",
    lessons: [
      {
        id: "m8-l1",
        title: "Emerging Horizons",
        content: [
          "The field keeps moving. Agentic models act autonomously toward goals (the subject of our companion course). Infinite-context architectures aim to remove the context-window limit entirely. Neuromorphic computing explores brain-inspired hardware for radically more efficient AI.",
          "You don't need to master these today, but an AI-literate professional tracks where the frontier is heading so today's decisions age well.",
        ],
        bullets: [
          "Agentic models: autonomous, goal-directed systems.",
          "Infinite-context architectures: removing the window limit.",
          "Neuromorphic computing: brain-inspired efficient hardware.",
          "Track the frontier so today's choices age well.",
        ],
      },
      {
        id: "m8-l2",
        title: "Designing Human-AI Workflows",
        content: [
          "The biggest wins come from workflow design, not raw model power. Co-piloting keeps a human in the driver's seat with AI assisting (drafting, suggesting, checking). Automated routines hand well-bounded, low-risk tasks entirely to AI. Choosing which tasks get which treatment — and where the human checkpoints live — is the core design skill.",
          "You'll apply this thinking to your capstone: not just 'add AI', but redesign a workflow so humans and AI each do what they're best at.",
        ],
        bullets: [
          "Co-piloting: human-led, AI-assisted.",
          "Automated routines: AI-owned, low-risk, well-bounded tasks.",
          "Place human checkpoints where risk demands them.",
          "Great value comes from redesign, not bolt-on AI.",
        ],
      },
      {
        id: "m8-l3",
        title: "Presenting AI Proposals to Executive Leadership",
        content: [
          "A brilliant prototype dies without buy-in. Executives care about outcomes: measurable productivity gains, risk mitigation, cost, and competitive advantage — not model architecture. You'll learn to frame proposals in their language: the problem, the solution, the ROI, the risks and how you've addressed them, and a clear ask.",
          "This is the communication layer that turns technical capability into organizational impact — and it's assessed directly in your capstone pitch.",
        ],
        bullets: [
          "Lead with outcomes and ROI, not architecture.",
          "Address risk and governance proactively.",
          "Be concrete: problem → solution → value → ask.",
          "Buy-in turns capability into impact.",
        ],
      },
      {
        id: "m8-l4",
        title: "Capstone Briefing: Enterprise GenAI Strategy & Prototype",
        content: [
          "Your capstone consolidates the whole course into one enterprise-grade deliverable: a working prototype that solves a real industry bottleneck, a rigorous governance and architecture brief, and an executive pitch. It's the artifact you can show an employer to prove end-to-end GenAI capability.",
        ],
        bullets: [
          "A working web-based prototype (prompt pipeline, fine-tuned assistant, or app) solving an industry bottleneck.",
          "An 'AI Governance & Architecture Brief': data security, estimated API running costs, safety/hallucination mitigations, and regulatory compliance (e.g. EU AI Act categorization).",
          "A 3-minute video pitch demonstrating the prototype and explaining the productivity gains.",
        ],
      },
    ],
    lab: {
      title: "Capstone: Build Your Enterprise GenAI Strategy & Prototype",
      description:
        "Design and build an enterprise GenAI strategy and prototype — assessed on the functionality of the prototype, architectural soundness, security precautions, and clarity of the governance framework.",
      steps: [
        "Pick an industry bottleneck and scope a prototype that solves it.",
        "Build the working prototype (prompt pipeline, fine-tuned assistant, or app).",
        "Write the AI Governance & Architecture Brief (security, costs, mitigations, compliance).",
        "Record a 3-minute video pitch demonstrating the prototype and its ROI.",
        "Package everything and present it as if to executive leadership.",
      ],
    },
    quiz: [
      {
        question:
          "What distinguishes a 'co-piloting' workflow from an 'automated routine'?",
        options: [
          "Co-piloting uses a bigger model",
          "Co-piloting keeps a human in the lead with AI assisting; automated routines hand well-bounded low-risk tasks fully to AI",
          "They are the same thing",
          "Automated routines always require more human review",
        ],
        answerIndex: 1,
        explanation:
          "Co-piloting is human-led with AI assistance; automated routines delegate low-risk, well-bounded tasks entirely to AI. Choosing which pattern per task is the core design skill.",
      },
      {
        question:
          "When pitching an AI proposal to executives, what should you lead with?",
        options: [
          "The model's architecture and token limits",
          "Outcomes and ROI — productivity gains, risk mitigation, and cost",
          "The prompt you used",
          "A list of every tool you tried",
        ],
        answerIndex: 1,
        explanation:
          "Executives care about business outcomes, not architecture. Frame the problem, solution, ROI, risks addressed, and a clear ask.",
      },
      {
        question:
          "Which is a required component of the capstone deliverable?",
        options: [
          "Training a foundation model from scratch",
          "An AI Governance & Architecture Brief covering security, costs, mitigations, and compliance",
          "A 100-page academic thesis",
          "A hardware design for neuromorphic chips",
        ],
        answerIndex: 1,
        explanation:
          "The capstone requires a working prototype, a governance/architecture brief (data security, API costs, safety mitigations, regulatory compliance), and a 3-minute video pitch.",
      },
    ],
  },
];
