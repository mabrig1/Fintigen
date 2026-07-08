import type { CourseMeta, CourseModule } from "@/lib/courses/types";

export const courseMeta: CourseMeta = {
  slug: "green-tech-edge-computing",
  title: "Sustainable/Green Technology & Edge Computing",
  tagline:
    "Energy-Efficient Architecture, Edge AI, and Carbon-Aware Systems (2026 Edition)",
  duration: "8 Modules",
  pace: "5–7 hours/week",
  level: "Intermediate",
  prerequisites: [
    "Basic knowledge of system architectures",
    "Foundational Python programming",
    "Introductory concepts of cloud computing/IoT",
  ],
  overview: [
    "As the environmental footprint of global data centers continues to climb, engineering sustainable computing paradigms has transitioned from a corporate social responsibility (CSR) goal to a core technical necessity. This course bridges the gap between hardware efficiency, edge virtualization, and ecological accountability.",
    "You'll master the principles of Sustainable Software Engineering (SSE) alongside Edge AI paradigms. By shifting resource-heavy processing from centralized, carbon-intensive cloud facilities to localized edge nodes and designing systems that intelligently adapt their resource consumption to grid carbon intensity, you'll learn to build next-generation green technical infrastructures.",
  ],
  objectives: [
    "Evaluate the carbon and energy footprint of software applications, physical hardware systems, and machine learning models.",
    "Design carbon-aware software architectures that modulate workloads based on real-time grid carbon intensity.",
    "Deploy optimized Edge AI and TinyML models onto low-resource, power-constrained microcontroller units (MCUs) and edge devices.",
    "Implement energy-efficient IoT topologies and low-power wide-area network (LPWAN) protocols.",
    "Utilize observability tools to profile, monitor, and report the power metrics of cloud and edge nodes.",
    "Integrate decentralized computing grids with renewable energy generation patterns.",
  ],
  tools: [
    {
      category: "Carbon Tracking & Green SDKs",
      items:
        "Green Software Foundation's Carbon-Aware SDK, Carbon Intensity APIs (Electricity Maps, WattTime)",
    },
    {
      category: "Power Profiling & Observability",
      items: "Scaphandre, Kepler (Kubernetes Efficient Power Level Exporter), Prometheus, Grafana",
    },
    {
      category: "Edge & TinyML Tools",
      items: "Edge Impulse, TensorFlow Lite for Microcontrollers (TFLite Micro), ONNX Runtime Mobile",
    },
    {
      category: "Hardware & Simulators",
      items: "Raspberry Pi / ESP32 platforms (simulated/physical), CoAP/MQTT protocols",
    },
  ],
  grading: [
    {
      component: "Weekly Coding Labs",
      weight: "40%",
      detail:
        "Evaluation of software optimization, carbon-shifting scripts, and TinyML implementations.",
    },
    {
      component: "Midterm Design Document",
      weight: "20%",
      detail:
        "Architectural blueprint of an enterprise carbon-aware workload distribution system.",
    },
    {
      component: "Capstone Project",
      weight: "40%",
      detail:
        "Assessed on energy efficiency of the edge application, robust carbon-aware logic, error-free execution, and data-backed carbon savings analysis.",
    },
  ],
};

export const courseModules: CourseModule[] = [
  {
    id: "module-1",
    week: 1,
    title: "Introduction to Green Software Engineering & Carbon Metrics",
    objective:
      "Establish the environmental footprint of digital technology and master foundational sustainable software principles.",
    lessons: [
      {
        id: "m1-l1",
        title: "The Scale of Computing's Carbon Footprint",
        content: [
          "Global data centers, networks, and end-user devices together consume a share of world electricity comparable to entire industrialized nations, and that share is climbing as AI workloads, streaming, and always-on IoT devices proliferate. Understanding sustainable computing starts with understanding this isn't a marginal concern — it's an infrastructure-scale problem.",
          "Emissions accounting frames this with Scope 1, 2, and 3 categories: Scope 1 is direct emissions an organization controls (on-site generators), Scope 2 is emissions from purchased electricity powering data centers and offices, and Scope 3 covers everything else in the value chain — including the manufacturing of hardware and the usage of software by customers. Software engineers mostly influence Scope 2 (via energy efficiency) and a meaningful slice of Scope 3 (via embodied hardware carbon and customer-side energy use).",
        ],
        bullets: [
          "Global computing consumes electricity at a scale comparable to entire nations.",
          "Scope 1: direct emissions an organization controls.",
          "Scope 2: emissions from purchased electricity (data centers, offices).",
          "Scope 3: value-chain emissions, including hardware manufacturing and customer usage.",
        ],
      },
      {
        id: "m1-l2",
        title: "The 8 Principles of Green Software Engineering",
        content: [
          "The Green Software Foundation's principles reframe familiar engineering trade-offs around a new priority: carbon. Carbon Efficiency means extracting the maximum value from every unit of carbon emitted; Energy Efficiency means using the least electricity possible to deliver the same outcome — and the two aren't identical, since electricity can be low-carbon or high-carbon depending on its source.",
          "Embodied Carbon accounts for the emissions locked into manufacturing hardware before it's ever powered on — meaning extending a device's useful life is itself a carbon strategy, not just an energy one. Carbon Intensity captures that the same amount of electricity carries very different emissions depending on when and where it's generated, which is the principle underlying nearly every technique in this course.",
        ],
        bullets: [
          "Carbon Efficiency: maximize value delivered per unit of carbon emitted.",
          "Energy Efficiency: minimize electricity used for the same outcome.",
          "Embodied Carbon: emissions locked into hardware manufacturing before use.",
          "Carbon Intensity: the same electricity has different emissions by time and location.",
        ],
      },
      {
        id: "m1-l3",
        title: "The Software Carbon Intensity (SCI) Model",
        content: [
          "The Software Carbon Intensity specification gives sustainable software a concrete, comparable metric: SCI = (E × I + M) / R. E is the energy consumed by the software, I is the carbon intensity of the electricity powering that energy, M is the embodied carbon of the hardware attributable to running the software, and R is a functional unit — the specific unit of value you're measuring per (a single API call, one user, one video minute streamed).",
          "The functional unit R is what makes SCI actually useful for comparison: 'total carbon emitted' tells you almost nothing about whether your software got more efficient, but 'carbon per user request' lets you compare two versions of the same system, or two different systems doing the same job, on equal footing.",
        ],
        code: {
          label: "The Software Carbon Intensity (SCI) formula",
          body: "SCI = (E × I + M) / R\n\nE = energy consumed by the software\nI = grid carbon intensity of that energy\nM = embodied carbon of hardware attributable to the software\nR = functional unit (e.g., per API call, per user, per video-minute)",
        },
        bullets: [
          "SCI = (E × I + M) / R — a standardized, comparable carbon metric for software.",
          "E: energy consumed; I: carbon intensity of that energy's source.",
          "M: embodied carbon of the hardware running the software.",
          "R: the functional unit that makes cross-system comparison meaningful.",
        ],
      },
      {
        id: "m1-l4",
        title: "Marginal vs. Average Carbon Intensity",
        content: [
          "Average carbon intensity describes the overall emissions-per-kilowatt-hour of a grid over some period — useful for reporting, but misleading for real-time decisions. Marginal carbon intensity describes the emissions of the next unit of electricity that would be generated if demand increased right now — which is what actually changes if your application decides to run (or not run) a workload at this exact moment.",
          "This distinction matters enormously for carbon-aware system design: shifting a workload to a time when average intensity looks low doesn't help if the marginal power plant serving extra demand at that moment is still a fossil-fuel peaker plant. Correctly designed carbon-aware systems should optimize against marginal intensity where that data is available, since it reflects the actual causal impact of the decision.",
        ],
        bullets: [
          "Average carbon intensity: overall grid emissions per kWh over a period.",
          "Marginal carbon intensity: emissions of the next kWh generated if demand rises now.",
          "Marginal intensity better reflects the real causal impact of a workload decision.",
          "Carbon-aware systems should optimize against marginal intensity when available.",
        ],
      },
    ],
    lab: {
      title: "Mapping Global Grid Carbon Intensity with the Carbon-Aware SDK",
      description:
        "Use the Green Software Foundation's Carbon-Aware SDK to fetch real-time grid carbon intensity data across different geographic regions, mapping and visualizing the optimal times and locations to run batch computational workloads.",
      steps: [
        "Set up the Carbon-Aware SDK and authenticate against a carbon intensity data source.",
        "Fetch real-time carbon intensity readings for at least three geographically distinct regions.",
        "Calculate the SCI for a hypothetical batch workload under each region's current intensity.",
        "Visualize a 24-hour forecast of carbon intensity per region to identify low-carbon windows.",
        "Write a short recommendation on the optimal region and time window for running a non-urgent batch job.",
      ],
    },
    quiz: [
      {
        question:
          "In the Software Carbon Intensity (SCI) formula SCI = (E × I + M) / R, what does the functional unit R represent, and why does it matter?",
        options: [
          "R is a fixed constant with the same value for every application",
          "R is the specific unit of value being measured (e.g. per API call or per user), which makes SCI comparable across systems and over time rather than just a raw total",
          "R only applies to hardware embodied carbon, not energy",
          "R measures the grid's carbon intensity directly",
        ],
        answerIndex: 1,
        explanation:
          "The functional unit R normalizes carbon emissions against a specific unit of delivered value, which is what makes SCI useful for comparing efficiency between systems or tracking improvement over time — a raw total emissions number alone can't do that.",
      },
      {
        question:
          "Why is marginal carbon intensity generally a better signal for real-time carbon-aware decisions than average carbon intensity?",
        options: [
          "Marginal intensity is always lower than average intensity",
          "Marginal intensity reflects the emissions of the next unit of electricity generated if demand increases right now, which is the actual causal impact of running a workload at that moment",
          "Average intensity is only used for embodied carbon calculations",
          "There is no practical difference between the two metrics",
        ],
        answerIndex: 1,
        explanation:
          "Marginal carbon intensity captures what actually happens on the grid if you add demand right now — the plant that responds to that marginal demand — making it the more causally accurate signal for deciding when to run a workload, versus average intensity's broader reporting view.",
      },
      {
        question:
          "What does 'Embodied Carbon' account for in the Green Software Engineering principles?",
        options: [
          "Only the electricity consumed while software is running",
          "The emissions locked into manufacturing hardware before it is ever powered on, meaning extending device lifespan is itself a carbon reduction strategy",
          "Carbon emissions from employee commuting",
          "The carbon cost of writing and testing source code",
        ],
        answerIndex: 1,
        explanation:
          "Embodied carbon captures the manufacturing-related emissions baked into a device before use. Since this cost is fixed regardless of how long the hardware is used, extending a device's useful life directly reduces its amortized carbon impact.",
      },
    ],
  },
  {
    id: "module-2",
    week: 2,
    title: "Carbon-Aware Software Design & Workload Shifting",
    objective:
      "Architect applications that programmatically adapt their performance and behavior to the state of the clean energy grid.",
    lessons: [
      {
        id: "m2-l1",
        title: "Temporal Shifting",
        content: [
          "Temporal shifting delays computation that isn't time-critical — batch analytics jobs, backups, model training runs — until the grid carbon intensity in a given region drops, typically during periods of high solar or wind generation. The core engineering insight is separating urgent from non-urgent work: a real-time user request can't wait for clean power, but a nightly ETL job usually can.",
          "Implementing this well requires more than a naive 'check intensity, then run' script: robust temporal shifting needs deadline awareness (the job must still finish before some hard cutoff), forecasting (predicting tomorrow's cleanest window rather than reacting only to the current instant), and graceful fallback (running anyway once a deadline is at risk, even if intensity hasn't improved).",
        ],
        bullets: [
          "Temporal shifting delays non-urgent work to periods of high renewable generation.",
          "The key design decision is separating urgent work from deferrable work.",
          "Deadline awareness ensures shifted jobs still complete within acceptable limits.",
          "Forecasting future carbon intensity beats reacting only to the current instant.",
        ],
      },
      {
        id: "m2-l2",
        title: "Spatial Shifting",
        content: [
          "Spatial shifting routes a workload to whichever available data center region currently has the cleanest grid, rather than a fixed 'home' region — exploiting the fact that carbon intensity varies enormously by geography due to differences in each region's generation mix (hydro and wind-heavy grids vs. coal-heavy ones).",
          "This requires an architecture that's genuinely region-agnostic: stateless services, replicated or globally-distributed data, and a routing layer that can evaluate real-time carbon intensity across candidate regions alongside the usual factors (latency, cost, data residency/compliance requirements) before choosing where to execute.",
        ],
        bullets: [
          "Spatial shifting routes workloads to the currently cleanest available region.",
          "Carbon intensity varies enormously by geography and generation mix.",
          "Requires region-agnostic architecture: stateless services and distributed data.",
          "Routing decisions must balance carbon against latency, cost, and compliance.",
        ],
      },
      {
        id: "m2-l3",
        title: "Demand Shaping",
        content: [
          "Demand shaping adapts what an application delivers, not just when or where it computes — gracefully degrading quality when carbon intensity spikes: serving a lower video resolution, disabling a computationally expensive recommendation model in favor of a cheaper one, or simplifying a UI's rendering complexity.",
          "This works best when tied to genuine user-experience trade-offs that most users won't notice or mind, framed transparently rather than hidden — some products even surface a visible 'eco mode' indicator, turning demand shaping into a feature users opt into rather than a silent quality reduction.",
        ],
        bullets: [
          "Demand shaping degrades feature quality gracefully under high carbon intensity.",
          "Examples: lower video resolution, simpler recommendation models, reduced UI complexity.",
          "Works best for trade-offs users won't notice or actively support.",
          "Transparent 'eco mode' framing turns this into a feature, not a hidden compromise.",
        ],
      },
      {
        id: "m2-l4",
        title: "Combining Shifting Strategies in Real Architectures",
        content: [
          "Real carbon-aware systems rarely use just one strategy in isolation. A production pipeline might apply temporal shifting to nightly batch jobs, spatial shifting to real-time inference requests routed across multiple regions, and demand shaping to a video service's default streaming quality — each strategy applied where it fits the workload's actual constraints.",
          "The unifying architectural pattern is a carbon-awareness layer that any of these decisions can query — a service or SDK call returning current (and ideally forecasted) intensity data — decoupled from the business logic that decides how to act on it, so the carbon logic can evolve independently of the application code that consumes it.",
        ],
        bullets: [
          "Production systems typically combine multiple shifting strategies for different workloads.",
          "Each strategy fits different constraints: batch (temporal), real-time (spatial), UX (demand).",
          "A shared carbon-awareness layer decouples intensity data from business decision logic.",
          "This decoupling lets carbon strategy evolve independently of application code.",
        ],
      },
    ],
    lab: {
      title: "Carbon-Aware Batch Processing Microservice",
      description:
        "Build a Python-based microservice that simulates a heavy batch-processing application. Integrate it with an external carbon intensity API to implement automatic pause, resume, and rate-limiting triggers based on real-time grid carbon thresholds.",
      steps: [
        "Build a simulated heavy batch-processing microservice with a configurable workload size.",
        "Integrate a carbon intensity API to poll the current grid intensity for a target region.",
        "Implement pause/resume logic that halts processing above a defined intensity threshold.",
        "Add rate-limiting that scales throughput proportionally to how far intensity is below the threshold.",
        "Add a deadline-aware fallback that forces the job to run if a hard completion deadline is at risk.",
      ],
    },
    quiz: [
      {
        question:
          "What is the fundamental engineering distinction that makes temporal shifting possible?",
        options: [
          "All computation must be treated as equally urgent",
          "Separating time-critical work (which can't wait) from deferrable, non-urgent work (like batch jobs or backups) that can be delayed to cleaner grid periods",
          "Temporal shifting only applies to real-time user requests",
          "It requires eliminating all batch processing entirely",
        ],
        answerIndex: 1,
        explanation:
          "Temporal shifting depends on correctly identifying which workloads are truly non-urgent and can be delayed without violating a deadline, versus time-critical work that must run immediately regardless of grid carbon intensity.",
      },
      {
        question:
          "What architectural requirement does spatial shifting impose on an application?",
        options: [
          "The application must run in exactly one fixed data center region",
          "The application must be largely region-agnostic — stateless services and distributed data — so a routing layer can execute workloads in whichever region currently has the cleanest grid",
          "Spatial shifting requires no changes to application architecture",
          "It only works for applications with no latency requirements",
        ],
        answerIndex: 1,
        explanation:
          "Spatial shifting requires an architecture that can genuinely run in multiple regions — stateless services and replicated/distributed data — so a routing layer can select the currently cleanest region while still weighing latency, cost, and compliance.",
      },
      {
        question:
          "Why is transparent framing (like a visible 'eco mode' toggle) recommended when implementing demand shaping?",
        options: [
          "It is required by law in all jurisdictions",
          "It turns a quality trade-off into a feature users understand and can opt into, rather than a silently imposed degradation they might perceive as a bug or a broken feature",
          "It eliminates the need for carbon intensity data",
          "It only applies to video streaming applications",
        ],
        answerIndex: 1,
        explanation:
          "Demand shaping changes what users experience. Framing it transparently (e.g. a visible eco mode) turns an otherwise silent quality reduction into a feature users understand and can choose to support, improving trust and adoption.",
      },
    ],
  },
  {
    id: "module-3",
    week: 3,
    title: "Power Profiling, Observability & Green Ops",
    objective:
      "Implement infrastructure instrumentation to measure, visualize, and optimize real-time CPU, GPU, and system power consumption.",
    lessons: [
      {
        id: "m3-l1",
        title: "Power Profiling at the OS & Process Level",
        content: [
          "Understanding where power actually goes requires instrumentation below the application layer: modern CPUs expose internal energy counters that let software estimate power draw attributable to specific processes, not just the machine as a whole. Without this granularity, all you can measure is total system draw — useless for finding which specific service or endpoint is the actual energy hog.",
          "Process-level power profiling is what turns 'our server uses 200 watts' into 'this specific API endpoint's database query accounts for 40 watts of that' — the level of specificity needed to actually act on an energy problem rather than just observe it exists.",
        ],
        bullets: [
          "Modern CPUs expose internal energy counters for fine-grained measurement.",
          "Process-level profiling attributes power draw to specific services, not just the whole machine.",
          "System-level totals alone don't reveal which component to actually optimize.",
          "Granular attribution is what makes power data actionable.",
        ],
      },
      {
        id: "m3-l2",
        title: "Intel RAPL & Scaphandre",
        content: [
          "Intel's Running Average Power Limit (RAPL) interface exposes hardware energy counters directly from the CPU package, cores, and DRAM — giving software a standardized way to read real power consumption without external metering hardware. This is the foundational data source many higher-level power observability tools build on.",
          "Scaphandre reads RAPL (and other hardware counters) and exposes them as metrics that attribute energy consumption down to individual processes and, in virtualized/containerized environments, down to specific virtual machines or containers — bridging the gap between raw hardware counters and the process-level visibility engineers actually need.",
        ],
        bullets: [
          "RAPL exposes hardware energy counters from CPU package, cores, and DRAM.",
          "RAPL provides real power data without needing external metering hardware.",
          "Scaphandre reads these counters and attributes energy to processes, VMs, and containers.",
          "Scaphandre bridges raw hardware counters to actionable, process-level metrics.",
        ],
      },
      {
        id: "m3-l3",
        title: "Kepler: eBPF-Based Power Monitoring in Kubernetes",
        content: [
          "Kepler (Kubernetes Efficient Power Level Exporter) extends power observability into container orchestration: using eBPF to observe kernel-level events tied to specific pods and containers, Kepler estimates each workload's energy footprint even as pods are scheduled and rescheduled dynamically across a cluster's nodes.",
          "This matters because in Kubernetes, the same physical node might run dozens of pods from different teams — without per-pod attribution, there's no way to know whether a spike in cluster-wide power draw is caused by a legitimate scaling event or an inefficient, poorly-optimized deployment quietly wasting energy.",
        ],
        bullets: [
          "Kepler uses eBPF to attribute energy consumption to specific pods/containers.",
          "Works even as Kubernetes dynamically schedules and reschedules pods across nodes.",
          "Enables per-team, per-workload energy accountability in shared clusters.",
          "Without this, cluster-wide power spikes are hard to diagnose or attribute.",
        ],
      },
      {
        id: "m3-l4",
        title: "Building Green Ops Dashboards",
        content: [
          "Raw power metrics are only useful once they're visible and actionable. A Green Ops dashboard in Grafana pulls power data from Prometheus (fed by Scaphandre or Kepler) alongside conventional metrics (request rate, latency, error rate), so engineers can see energy cost and performance side-by-side rather than as separate, disconnected concerns.",
          "The most valuable Green Ops dashboards surface energy-per-request or energy-per-endpoint views — directly answering 'which part of our system is the least energy-efficient for the value it delivers?' — rather than just a raw wattage graph that tells you power is high without telling you why or where to act.",
        ],
        bullets: [
          "Green Ops dashboards combine power metrics with conventional performance metrics.",
          "Prometheus stores metrics; Grafana visualizes them alongside request rate and latency.",
          "Energy-per-request/endpoint views are more actionable than raw wattage alone.",
          "Good dashboards answer 'where should we optimize?' not just 'how much power is used?'",
        ],
      },
    ],
    lab: {
      title: "Isolating Endpoint-Level Energy Cost with Scaphandre & Grafana",
      description:
        "Set up a containerized Prometheus and Grafana stack on your system. Instrument a sample web application using Scaphandre or Kepler, generate heavy artificial traffic, and isolate the exact energy cost (in watt-hours) of individual API endpoints.",
      steps: [
        "Stand up a containerized Prometheus and Grafana observability stack.",
        "Instrument a sample web application with Scaphandre (or Kepler, if using Kubernetes).",
        "Generate heavy, varied artificial traffic across several distinct API endpoints.",
        "Build a Grafana dashboard breaking down watt-hour consumption per endpoint.",
        "Identify and document the single most energy-inefficient endpoint and propose an optimization.",
      ],
    },
    quiz: [
      {
        question:
          "Why is process-level (not just system-level) power profiling important for optimizing energy use?",
        options: [
          "System-level totals are always more accurate than process-level data",
          "System-level totals only reveal that overall power draw is high, while process-level attribution identifies which specific service or endpoint is actually responsible, making the data actionable",
          "Process-level profiling is only relevant for embedded devices",
          "System-level power draw cannot be measured at all without RAPL"
        ],
        answerIndex: 1,
        explanation:
          "Knowing total system power draw tells you a problem exists but not where. Process-level attribution pinpoints exactly which service or endpoint is consuming disproportionate energy, which is what lets engineers actually act on the data.",
      },
      {
        question:
          "What is the role of Intel RAPL in the power observability stack described in this module?",
        options: [
          "RAPL is a Kubernetes scheduler extension",
          "RAPL exposes hardware energy counters directly from the CPU package, cores, and DRAM, forming the raw data source that tools like Scaphandre build higher-level process attribution on top of",
          "RAPL is a Grafana dashboard template",
          "RAPL replaces the need for Prometheus"
        ],
        answerIndex: 1,
        explanation:
          "RAPL is a hardware interface exposing real energy counters from the CPU and memory subsystems. Tools like Scaphandre read these counters and translate them into process-, VM-, and container-level energy attribution.",
      },
      {
        question:
          "How does Kepler extend power observability specifically for Kubernetes environments?",
        options: [
          "It only measures power at the physical node level, ignoring individual pods",
          "It uses eBPF to observe kernel-level events tied to specific pods and containers, attributing energy consumption per workload even as pods are dynamically scheduled across the cluster",
          "It requires manually labeling every pod with its expected power draw",
          "It replaces Prometheus and Grafana entirely"
        ],
        answerIndex: 1,
        explanation:
          "Kepler uses eBPF to observe kernel events and attribute energy consumption to specific pods and containers, maintaining that attribution even as Kubernetes dynamically reschedules workloads across cluster nodes — crucial for per-team energy accountability in shared clusters.",
      },
    ],
  },
  {
    id: "module-4",
    week: 4,
    title: "Edge Computing Architectures & Green IoT",
    objective:
      "Design distributed edge computing networks that minimize data transmission energy and maximize localized compute efficiency.",
    lessons: [
      {
        id: "m4-l1",
        title: "The Cloud-to-Edge Hierarchy",
        content: [
          "Modern distributed systems typically span three tiers: end devices (sensors, cameras, wearables) generating raw data; fog nodes and gateways — more capable local compute sitting close to those devices — that can pre-process, filter, and aggregate data; and the centralized cloud, reserved for tasks genuinely requiring massive compute or long-term storage.",
          "This hierarchy exists precisely because sending every raw byte from every device straight to the cloud is often the least efficient design — both in latency and, critically for this course, in energy: every hop of network transmission has a real, non-trivial power cost that scales with data volume and distance.",
        ],
        bullets: [
          "Three-tier hierarchy: end devices, fog nodes/gateways, and centralized cloud.",
          "Fog nodes pre-process, filter, and aggregate data close to its source.",
          "Cloud is reserved for tasks genuinely needing massive compute or long-term storage.",
          "Every network hop has a real energy cost that scales with data volume and distance.",
        ],
      },
      {
        id: "m4-l2",
        title: "Why Local Processing Reduces Network Energy Footprint",
        content: [
          "Transmitting data — especially over cellular or long-haul networks — is frequently far more energy-expensive than processing that same data locally would be. A camera streaming raw high-resolution video to the cloud for object detection burns dramatically more energy (and bandwidth) than running that detection model on-device and transmitting only the resulting metadata (a bounding box and a label).",
          "This reframes 'edge AI' as fundamentally a data-reduction strategy as much as a latency strategy: by compressing raw sensor data into meaningful, compact insights before it ever leaves the device, edge processing collapses the energy-expensive transmission step down to a fraction of its original size.",
        ],
        bullets: [
          "Data transmission is frequently more energy-costly than local processing of the same data.",
          "On-device inference lets only compact results (not raw data) be transmitted.",
          "Edge AI is a data-reduction strategy, not just a latency-reduction one.",
          "Reducing transmitted data volume directly reduces network energy footprint.",
        ],
      },
      {
        id: "m4-l3",
        title: "Comparing Green IoT Communication Protocols",
        content: [
          "Not all network protocols cost the same energy per byte transmitted. HTTP carries substantial header overhead and typically assumes an always-connected, higher-power radio state — fine for a always-on gateway, wasteful for a battery-powered sensor. MQTT is a lightweight publish-subscribe protocol designed explicitly for constrained devices and unreliable networks, with much smaller message overhead.",
          "CoAP (Constrained Application Protocol) mirrors HTTP's semantics but over UDP with a far smaller footprint, suited to very constrained devices. LoRaWAN goes furthest for pure battery life: a Low-Power Wide-Area Network protocol trading bandwidth and latency for exceptional range and multi-year battery life on small transmissions — the right choice for sensors that report small amounts of data infrequently over long distances.",
        ],
        bullets: [
          "HTTP: high overhead, assumes always-connected higher-power radio — poor fit for battery devices.",
          "MQTT: lightweight publish-subscribe, designed for constrained devices and unreliable networks.",
          "CoAP: HTTP-like semantics over UDP with a much smaller footprint.",
          "LoRaWAN: trades bandwidth/latency for exceptional range and multi-year battery life.",
        ],
      },
      {
        id: "m4-l4",
        title: "Sleep Modes & Duty Cycle Management",
        content: [
          "Most of a battery-powered sensor's energy use isn't spent computing — it's spent simply staying powered on and listening. Deep sleep modes power down nearly all of a microcontroller's subsystems between tasks, waking only briefly to sense, process, and transmit before returning to sleep, which is where the overwhelming majority of battery life is actually won or lost.",
          "Duty cycle management is the discipline of deciding exactly how often to wake: a fixed, aggressive polling interval wastes energy sensing when nothing has changed, while event-driven wake-up (triggered by an interrupt from a sensor detecting an actual change) lets a device sleep almost indefinitely until something worth reporting actually happens.",
        ],
        bullets: [
          "Deep sleep modes power down most subsystems between brief active periods.",
          "Most battery drain on IoT devices comes from staying powered on, not computing.",
          "Duty cycle management decides how frequently a device wakes to sense and transmit.",
          "Event-driven wake-up (interrupt-triggered) is far more energy-efficient than fixed polling.",
        ],
      },
    ],
    lab: {
      title: "Battery-Optimized MQTT Sensor Node with Deep Sleep",
      description:
        "Program a virtual/physical ESP32 or Raspberry Pi sensor node. Implement deep sleep behaviors and construct an event-driven MQTT telemetry client that optimizes battery life by dynamically scaling payload sizes and reporting frequencies.",
      steps: [
        "Set up an ESP32 (physical or simulated) sensor node development environment.",
        "Implement deep sleep between sensing cycles, waking only on a timer or sensor-triggered interrupt.",
        "Build an MQTT client publishing telemetry only when readings exceed a meaningful change threshold.",
        "Dynamically scale payload size and reporting frequency based on a simulated battery-level input.",
        "Measure and compare estimated battery life under a fixed-polling baseline vs. the event-driven design.",
      ],
    },
    quiz: [
      {
        question:
          "Why does the cloud-to-edge hierarchy (end devices, fog nodes, cloud) exist, rather than sending all raw data directly to the cloud?",
        options: [
          "Because cloud providers charge extra for direct connections",
          "Because sending every raw byte to the cloud is often the least energy- and latency-efficient design; fog nodes pre-process and filter data close to its source, reserving the cloud for tasks genuinely needing massive scale",
          "Because end devices cannot connect to the internet directly",
          "Because fog nodes replace the need for any cloud infrastructure"
        ],
        answerIndex: 1,
        explanation:
          "The tiered hierarchy exists because transmitting all raw data to a centralized cloud is frequently the least efficient choice in both latency and energy terms. Fog nodes filter and aggregate locally, sending only what genuinely needs cloud-scale processing or storage.",
      },
      {
        question:
          "Why is on-device (edge) inference often considered a data-reduction strategy as much as a latency strategy?",
        options: [
          "Because it eliminates the need for any network transmission whatsoever",
          "Because running inference locally lets a device transmit only compact results (like a label or bounding box) instead of the full raw sensor data, dramatically cutting the energy-expensive transmission volume",
          "Because on-device inference is always less accurate, so less data needs to be sent",
          "Because it only applies to audio data, not video or images"
        ],
        answerIndex: 1,
        explanation:
          "By processing raw data locally and transmitting only the resulting compact insight, edge inference collapses the volume of data that must travel over the energy-expensive network path — making it fundamentally a data-reduction technique.",
      },
      {
        question:
          "Why would LoRaWAN be chosen over MQTT or HTTP for a remote environmental sensor reporting small readings infrequently?",
        options: [
          "LoRaWAN offers the highest bandwidth of the three protocols",
          "LoRaWAN trades bandwidth and latency for exceptional range and multi-year battery life on small, infrequent transmissions, which fits this sensor's use case better than higher-overhead protocols",
          "LoRaWAN requires an always-on cellular connection",
          "MQTT cannot be used with battery-powered devices under any circumstances"
        ],
        answerIndex: 1,
        explanation:
          "LoRaWAN is purpose-built for exactly this scenario: infrequent, small data transmissions over long range with minimal power draw, trading off the bandwidth and low latency that protocols like MQTT or HTTP prioritize.",
      },
    ],
  },
  {
    id: "module-5",
    week: 5,
    title: "TinyML — Machine Learning at the Extreme Edge",
    objective:
      "Compress and deploy machine learning models onto microcontrollers with ultra-low power envelopes (milliwatts).",
    lessons: [
      {
        id: "m5-l1",
        title: "TinyML Constraints: Kilobytes, Not Gigabytes",
        content: [
          "TinyML targets microcontrollers with kilobytes — not gigabytes — of RAM and flash storage, and power budgets measured in milliwatts rather than the watts or kilowatts of server-class hardware. A model architecture that's perfectly reasonable for a cloud GPU is often literally impossible to fit, let alone run efficiently, on this class of device.",
          "This forces a fundamentally different design mindset: rather than starting with an accurate model and trying to shrink it after the fact, effective TinyML development considers memory and power budget as first-class constraints from the very beginning of model architecture selection, not an afterthought applied at deployment time.",
        ],
        bullets: [
          "TinyML devices offer kilobytes of RAM/flash, not gigabytes.",
          "Power budgets are measured in milliwatts, orders of magnitude below server hardware.",
          "Many cloud-scale model architectures simply cannot fit on this class of device.",
          "Memory and power constraints must shape model design from the start, not after the fact.",
        ],
      },
      {
        id: "m5-l2",
        title: "Model Optimization: Pruning, Clustering & Quantization",
        content: [
          "Pruning removes weights (or entire neurons/channels) that contribute little to a model's output, shrinking its size with minimal accuracy loss. Weight clustering groups similar weight values together and stores just one shared value per cluster plus an index — reducing the distinct values that need to be stored, which compresses well even before considering numeric precision.",
          "Post-training integer quantization converts a model's weights and activations from 32-bit floating point (FP32) down to 8-bit integers (INT8), cutting memory footprint roughly 4x and often accelerating inference on hardware with efficient integer arithmetic — the single highest-leverage optimization step for fitting a model onto a microcontroller.",
        ],
        code: {
          label: "The optimization pipeline in typical order",
          body: "Trained FP32 model\n  → Pruning (remove low-impact weights/neurons)\n  → Weight clustering (share values across similar weights)\n  → Post-training quantization: FP32 → INT8\n  → Deployable TinyML model",
        },
        bullets: [
          "Pruning removes low-impact weights/neurons, shrinking model size.",
          "Weight clustering shares values across similar weights to reduce storage.",
          "Quantization (FP32 → INT8) roughly quarters memory footprint.",
          "These techniques are typically combined in a pipeline, not used alone.",
        ],
      },
      {
        id: "m5-l3",
        title: "Edge Impulse: End-to-End TinyML Development",
        content: [
          "Edge Impulse provides a guided, end-to-end workflow for TinyML: collecting and labeling sensor data (audio, motion, images) directly from target hardware, designing a signal processing pipeline appropriate to that data type, training a model, and automatically applying optimization steps like quantization — all without hand-writing the full ML pipeline from scratch.",
          "Its real value for beginners and teams alike is closing the loop quickly: Edge Impulse can estimate a model's memory footprint and inference latency on the actual target hardware before you ever flash it, catching an infeasible design early rather than after a lengthy manual deployment cycle.",
        ],
        bullets: [
          "Edge Impulse provides a guided pipeline: data collection, processing, training, optimization.",
          "Works directly with real sensor data captured from target hardware.",
          "Automatically applies optimization steps like quantization.",
          "Estimates memory/latency on target hardware before deployment, catching infeasible designs early.",
        ],
      },
      {
        id: "m5-l4",
        title: "Deploying with TensorFlow Lite Micro",
        content: [
          "TensorFlow Lite for Microcontrollers (TFLite Micro) is a C++ runtime specifically designed to execute quantized TensorFlow models within just tens of kilobytes of memory, with no dynamic memory allocation, operating system, or standard library dependencies — the extreme minimalism required to run on bare-metal microcontroller hardware.",
          "Deployment means converting a trained and quantized model into a C byte array embedded directly into firmware, then wiring an interpreter to run inference against live sensor input — a fundamentally different workflow from deploying a cloud model behind an API endpoint, since the 'model' now ships as part of the compiled firmware binary itself.",
        ],
        bullets: [
          "TFLite Micro is a minimal C++ runtime with no OS or dynamic memory allocation dependencies.",
          "Designed to run quantized models in tens of kilobytes of memory.",
          "The model is converted into a C byte array embedded directly in firmware.",
          "This differs fundamentally from API-based cloud model deployment.",
        ],
      },
    ],
    lab: {
      title: "Quantized Keyword Spotting Model on TFLite Micro",
      description:
        "Train a simple audio keyword spotting or anomaly detection model in Python. Run it through a quantization pipeline, export it to C++ using TensorFlow Lite Micro, and run the execution in a hardware simulator (or physical board) to benchmark memory use and classification latency.",
      steps: [
        "Train a small audio keyword spotting (or vibration anomaly detection) model in Python/TensorFlow.",
        "Apply post-training INT8 quantization and measure the resulting model size reduction.",
        "Export the quantized model as a C byte array for TensorFlow Lite Micro.",
        "Integrate the model into a firmware project running on a simulator (or physical ESP32/board).",
        "Benchmark peak memory usage and per-inference classification latency on the target hardware.",
      ],
    },
    quiz: [
      {
        question:
          "Why must memory and power constraints shape TinyML model design from the beginning rather than being addressed only at deployment time?",
        options: [
          "Because TinyML devices actually have more memory than cloud servers",
          "Because microcontrollers offer only kilobytes of RAM/flash and milliwatt power budgets, so many architectures that work on cloud hardware simply cannot fit or run efficiently regardless of later optimization",
          "Because quantization always restores full model accuracy afterward",
          "Because Edge Impulse automatically resolves all memory constraints"
        ],
        answerIndex: 1,
        explanation:
          "TinyML hardware constraints are so severe (kilobytes, not gigabytes; milliwatts, not watts) that architecture choices incompatible with these limits can't simply be optimized after the fact — the constraints need to inform design decisions from the start.",
      },
      {
        question:
          "What is the primary benefit of post-training integer quantization (FP32 → INT8) in the TinyML optimization pipeline?",
        options: [
          "It always improves model accuracy beyond the original FP32 version",
          "It roughly quarters the model's memory footprint and often speeds up inference on hardware with efficient integer arithmetic, making it the highest-leverage step for microcontroller deployment",
          "It eliminates the need for pruning or weight clustering entirely",
          "It only works for audio models, not vision or motion models"
        ],
        answerIndex: 1,
        explanation:
          "Converting from 32-bit floating point to 8-bit integers roughly quarters memory footprint and frequently speeds up inference on integer-optimized hardware, making quantization the single highest-leverage optimization for fitting models onto constrained devices.",
      },
      {
        question:
          "What distinguishes TensorFlow Lite Micro's deployment model from a typical cloud-hosted ML model behind an API?",
        options: [
          "TFLite Micro models are always accessed over the internet just like cloud APIs",
          "The quantized model is converted into a C byte array embedded directly into the firmware binary itself, running via a minimal runtime with no OS or dynamic memory allocation, rather than being called remotely",
          "TFLite Micro requires a full operating system to run",
          "There is no meaningful difference between the two deployment approaches"
        ],
        answerIndex: 1,
        explanation:
          "Rather than being hosted remotely and called via API, a TFLite Micro model is compiled directly into the firmware as a C byte array and executed by a minimal, dependency-free runtime — a fundamentally different deployment model suited to bare-metal microcontrollers.",
      },
    ],
  },
  {
    id: "module-6",
    week: 6,
    title: "Edge AI Orchestration & Distributed Intelligence",
    objective:
      "Coordinate machine learning workloads across collaborative edge node networks while managing energy availability constraints.",
    lessons: [
      {
        id: "m6-l1",
        title: "Split Inference: Sharing the Work Between Edge & Cloud",
        content: [
          "Split inference partitions a neural network across two locations: early layers run on the edge device (extracting compact intermediate features from raw sensor data), while later, heavier layers run in the cloud on that compact representation — balancing the device's limited compute against the network's transmission energy cost.",
          "Choosing the split point is a genuine energy optimization problem, not just an engineering convenience: split too early and you're still transmitting large, information-dense intermediate data; split too late and the edge device bears more compute cost than its power budget can sustain. The optimal split point often shifts based on current network conditions and device battery state.",
        ],
        bullets: [
          "Split inference runs early layers on-device, later layers in the cloud.",
          "Balances device compute limits against network transmission energy cost.",
          "The split point is itself an optimization variable, not a fixed engineering choice.",
          "Optimal split can shift dynamically with network conditions and battery state.",
        ],
      },
      {
        id: "m6-l2",
        title: "Decentralized Orchestration with K3s",
        content: [
          "K3s is a lightweight, certified Kubernetes distribution purpose-built for resource-constrained environments — edge servers, IoT gateways, ARM-based single-board computers — stripping out legacy and cloud-provider-specific components to fit in a fraction of full Kubernetes' footprint while preserving its core orchestration API.",
          "Running K3s at the edge lets teams apply familiar cloud-native patterns (declarative deployments, rolling updates, health checks) to a fleet of geographically distributed edge nodes, rather than treating each edge device as a bespoke, manually managed system — a meaningful operational win as edge deployments scale past a handful of devices.",
        ],
        bullets: [
          "K3s is a lightweight, certified Kubernetes distribution for constrained environments.",
          "Strips legacy/cloud-specific components while preserving the core Kubernetes API.",
          "Enables cloud-native deployment patterns (declarative configs, rolling updates) at the edge.",
          "Scales edge fleet management beyond manually-managed individual devices.",
        ],
      },
      {
        id: "m6-l3",
        title: "Real-Time Model Swapping",
        content: [
          "Edge-native model deployment often benefits from having multiple model variants available for the same task — a high-accuracy, higher-power model and a lightweight, lower-power fallback — and swapping between them dynamically based on current conditions like remaining battery, thermal state, or how critical the current detection task is.",
          "This requires the orchestration layer to treat 'which model is currently active' as a live, adjustable piece of state rather than a fixed deployment-time decision, and to swap models without dropping the inference pipeline's availability during the transition — analogous to a zero-downtime deployment, but driven by energy conditions rather than a code release.",
        ],
        bullets: [
          "Multiple model variants (high-accuracy vs. low-power) can serve the same task.",
          "Swapping depends on live conditions: battery, thermal state, task criticality.",
          "Active model choice should be adjustable state, not a fixed deployment-time decision.",
          "Swaps should avoid dropping pipeline availability during the transition.",
        ],
      },
      {
        id: "m6-l4",
        title: "Managing Energy Availability Constraints in Orchestration",
        content: [
          "In a fleet of battery- or solar-powered edge nodes, orchestration has to account for energy availability the way a traditional cluster accounts for CPU or memory — a node with a nearly depleted battery shouldn't be scheduled new heavy workloads, and a solar-powered node's available compute capacity naturally rises and falls with the sun.",
          "This requires exposing energy state (battery percentage, charging status, solar generation forecast) as a schedulable resource dimension alongside CPU and memory, so the orchestration layer can make placement decisions that respect a node's actual power reality rather than just its theoretical hardware specs.",
        ],
        bullets: [
          "Energy availability should be treated as a first-class schedulable resource.",
          "Depleted-battery nodes shouldn't receive new heavy workload assignments.",
          "Solar-powered nodes' capacity naturally fluctuates with generation conditions.",
          "Orchestration decisions must reflect real power state, not just hardware specs.",
        ],
      },
    ],
    lab: {
      title: "Battery-Aware Object Detection with Dynamic Frame-Rate Scaling",
      description:
        "Build an object detection application using OpenCV and an optimized MobileNet SSD model. Deploy it onto an edge simulator and configure the pipeline to dynamically adjust the frame rate and network output bandwidth based on simulated battery level constraints.",
      steps: [
        "Set up an object detection pipeline using OpenCV and a quantized MobileNet SSD model.",
        "Deploy the pipeline onto an edge device simulator.",
        "Simulate a fluctuating battery level input to the pipeline's control logic.",
        "Implement dynamic frame-rate scaling and output bandwidth throttling tied to battery level.",
        "Measure and report detection quality vs. estimated energy savings across battery scenarios.",
      ],
    },
    quiz: [
      {
        question:
          "What determines the optimal split point in a split inference architecture between an edge device and the cloud?",
        options: [
          "The split point should always be as early as possible, regardless of conditions",
          "It's an optimization trade-off between the edge device's limited compute/power budget and the network transmission cost of the intermediate data, which can shift with network conditions and battery state",
          "The split point is fixed permanently at model design time and never changes",
          "Split inference never involves any trade-offs"
        ],
        answerIndex: 1,
        explanation:
          "The split point balances how much compute the edge device can sustain against how much energy it costs to transmit the intermediate representation — a genuine optimization problem that can shift dynamically with network and battery conditions.",
      },
      {
        question:
          "Why is K3s well-suited to orchestrating edge computing fleets compared to standard Kubernetes?",
        options: [
          "K3s requires significantly more resources than standard Kubernetes",
          "K3s strips out legacy and cloud-provider-specific components to fit a much smaller resource footprint, while preserving the core Kubernetes API needed for cloud-native deployment patterns at the edge",
          "K3s can only run in centralized cloud data centers",
          "K3s eliminates the need for any orchestration at all"
        ],
        answerIndex: 1,
        explanation:
          "K3s is a lightweight, certified Kubernetes distribution designed for resource-constrained environments, stripping unnecessary components while retaining core orchestration capabilities — letting teams manage geographically distributed edge fleets with familiar cloud-native patterns.",
      },
      {
        question:
          "Why should energy availability be treated as a schedulable resource dimension in edge orchestration, alongside CPU and memory?",
        options: [
          "Because energy availability never changes once a node is deployed",
          "Because a node with a nearly depleted battery or reduced solar generation has genuinely reduced usable capacity, and scheduling decisions need to reflect that real power state rather than only theoretical hardware specs",
          "Because CPU and memory are irrelevant in edge environments",
          "Because energy state cannot be measured or exposed to an orchestrator"
        ],
        answerIndex: 1,
        explanation:
          "Just as a node's CPU or memory limits what work it can take on, its current energy state (battery level, solar generation) limits its real usable capacity. Exposing this as a schedulable dimension lets orchestration make placement decisions grounded in actual power reality.",
      },
    ],
  },
  {
    id: "module-7",
    week: 7,
    title: "Green Datacenters, Renewables & Circular Economy",
    objective:
      "Understand physical infrastructure greening strategies, from hardware life-cycles to cooling-efficiency and renewable integration.",
    lessons: [
      {
        id: "m7-l1",
        title: "Datacenter Efficiency Metrics: PUE & WUE",
        content: [
          "Power Usage Effectiveness (PUE) measures how much of a data center's total energy actually reaches computing equipment versus being consumed by overhead like cooling and power conversion losses — a PUE of 1.0 would mean zero overhead, while real-world facilities range from roughly 1.1 in highly optimized modern facilities to 2.0+ in older, inefficient ones.",
          "Water Usage Effectiveness (WUE) applies the same idea to water consumed for cooling, which matters enormously in water-stressed regions — many evaporative cooling systems that improve PUE by using less electricity for cooling do so by consuming significant water, so the two metrics need to be considered together rather than optimizing one in isolation.",
        ],
        code: {
          label: "PUE and WUE formulas",
          body: "PUE = Total Facility Energy / IT Equipment Energy\n  (lower is better; 1.0 is the theoretical ideal)\n\nWUE = Annual Water Usage / IT Equipment Energy\n  (liters per kWh; lower is better)",
        },
        bullets: [
          "PUE: total facility energy divided by IT equipment energy; lower is better.",
          "PUE of 1.0 is the theoretical ideal with zero overhead; real facilities run higher.",
          "WUE measures water consumed for cooling per unit of IT energy.",
          "Optimizing PUE via evaporative cooling can worsen WUE — the two must be balanced together.",
        ],
      },
      {
        id: "m7-l2",
        title: "Cooling Efficiency: Liquid Cooling & Free Cooling",
        content: [
          "Traditional air cooling is energy-intensive, especially as chip power density rises with modern AI accelerators. Direct-to-chip liquid cooling circulates coolant through cold plates in direct contact with the hottest components, removing heat far more efficiently than air and enabling much higher rack densities without a proportional cooling energy penalty.",
          "Free cooling exploits ambient climate conditions — using outside air or water (when cool enough) instead of energy-intensive mechanical refrigeration — which is why many hyperscale data centers are deliberately sited in cooler climates, directly trading location choice for enormous cooling energy savings.",
        ],
        bullets: [
          "Direct-to-chip liquid cooling removes heat far more efficiently than air, especially for dense AI hardware.",
          "Liquid cooling enables higher rack density without a proportional cooling energy penalty.",
          "Free cooling uses ambient outside air/water instead of mechanical refrigeration.",
          "Data center siting in cooler climates is a deliberate strategy to maximize free cooling.",
        ],
      },
      {
        id: "m7-l3",
        title: "Circular IT Hardware & Embodied Carbon",
        content: [
          "Since embodied carbon (Module 1) is fixed at manufacturing time, the circular economy principle for IT hardware focuses on extending useful life and enabling reuse: refurbishing servers for secondary use, harvesting and reusing components, and designing new hardware for easier disassembly and repair from the outset.",
          "This directly counters the industry's default replacement cycle, where hardware is often retired well before it's functionally obsolete — every additional year a server operates before replacement effectively amortizes its embodied carbon over more useful compute-hours, directly lowering its per-unit-of-work carbon cost.",
        ],
        bullets: [
          "Embodied carbon is fixed at manufacturing; circularity focuses on extending useful life.",
          "Refurbishment and component reuse extend hardware's productive lifespan.",
          "Designing for disassembly/repair makes future reuse easier.",
          "Longer hardware life amortizes embodied carbon over more compute-hours, lowering per-unit cost.",
        ],
      },
      {
        id: "m7-l4",
        title: "Microgrids & Renewable Co-Location",
        content: [
          "Some computing facilities co-locate directly with renewable generation — a solar or wind farm — paired with battery energy storage systems (BESS) to smooth out the inherent intermittency of renewable generation, forming a semi-independent microgrid that can run substantial compute directly on-site clean power.",
          "This pairs naturally with the workload-shifting concepts from Module 2: a facility co-located with solar generation can schedule its most energy-intensive, latency-tolerant work (like batch training) during solar peak hours, while relying on battery storage or grid backup for baseline operations during low-generation periods — closing the loop between physical energy infrastructure and software-level carbon awareness.",
        ],
        bullets: [
          "Microgrids co-locate compute facilities directly with renewable generation.",
          "Battery Energy Storage Systems (BESS) smooth out renewable generation intermittency.",
          "Enables running substantial compute on-site clean power directly.",
          "Pairs naturally with software workload shifting to align compute with generation peaks.",
        ],
      },
    ],
    lab: {
      title: "Solar + Battery Compute Facility Scheduling Simulation",
      description:
        "Create a Python-based simulation model of a computing facility integrated with a solar array and local battery storage. Implement a scheduling algorithm that maximizes compute throughput during solar peak hours while preserving battery health during off-peak cycles.",
      steps: [
        "Build a simulation model of a solar array's generation curve across a 24-hour period.",
        "Model a battery storage system with realistic charge/discharge and health constraints.",
        "Simulate a queue of compute jobs with varying urgency and energy requirements.",
        "Implement a scheduling algorithm that maximizes throughput during solar peaks while preserving battery health off-peak.",
        "Report total compute completed, grid energy relied upon, and estimated carbon savings versus a naive always-on baseline.",
      ],
    },
    quiz: [
      {
        question:
          "Why must PUE and WUE be considered together rather than optimizing PUE alone?",
        options: [
          "Because WUE and PUE always improve or worsen in exact lockstep",
          "Because some cooling strategies (like evaporative cooling) that improve PUE by reducing electricity use for cooling do so by consuming significant water, so optimizing one metric in isolation can worsen the other",
          "Because WUE has no relationship to a facility's cooling strategy",
          "Because PUE only applies to facilities located near renewable energy sources"
        ],
        answerIndex: 1,
        explanation:
          "Evaporative cooling techniques often improve PUE (less electricity for cooling) at the cost of significant water consumption, worsening WUE. The two metrics need to be balanced together, especially in water-stressed regions.",
      },
      {
        question:
          "How does extending a server's useful life through refurbishment reduce its overall carbon impact?",
        options: [
          "It reduces the electricity the server consumes while running",
          "Since embodied carbon from manufacturing is a fixed, one-time cost, operating the hardware longer amortizes that fixed carbon cost over more compute-hours, lowering the carbon cost per unit of work performed",
          "Refurbishment eliminates all future electricity consumption",
          "It only affects Scope 1 emissions, not Scope 3"
        ],
        answerIndex: 1,
        explanation:
          "Embodied carbon is locked in at manufacturing time regardless of how long the hardware is used. The longer a device stays in productive use, the more compute-hours that fixed carbon cost is spread across, reducing its effective carbon cost per unit of work.",
      },
      {
        question:
          "Why do microgrids co-located with renewable generation pair naturally with software-level workload shifting techniques from Module 2?",
        options: [
          "Because workload shifting is only relevant for cloud data centers, not microgrids",
          "Because a facility with direct access to its own solar/wind generation and battery storage can schedule energy-intensive, latency-tolerant work during generation peaks, closing the loop between physical renewable infrastructure and software-level carbon-aware scheduling",
          "Because microgrids eliminate the need for any workload scheduling",
          "Because battery storage systems cannot be scheduled around at all"
        ],
        answerIndex: 1,
        explanation:
          "A microgrid's on-site renewable generation and battery storage give a facility direct, immediate signals about clean energy availability, which pairs naturally with temporal workload-shifting logic to schedule flexible compute during generation peaks.",
      },
    ],
  },
  {
    id: "module-8",
    week: 8,
    title: "Capstone — End-to-End Green Edge System",
    objective:
      "Design, build, and evaluate a fully functional, carbon-aware, edge-deployed intelligence system.",
    lessons: [
      {
        id: "m8-l1",
        title: "Scoping the Autonomous Carbon-Aware Edge Sensing Pipeline",
        content: [
          "The capstone consolidates every module into one working pipeline: edge sensing, on-device TinyML inference, carbon-aware backend logic, and power/emissions reporting. Before building, choose a concrete sensing domain (climate, vibration, or audio) specific enough that the anomaly detection task and the carbon-aware logic both have a clear, meaningful purpose to serve.",
          "Scoping well means defining upfront what counts as 'critical' versus 'non-critical' data replication for your chosen domain — a genuine anomaly detection (Module 5) probably needs prompt handling regardless of grid conditions, while routine baseline telemetry is exactly the kind of non-urgent data that can be temporally shifted (Module 2) to clean grid windows.",
        ],
        bullets: [
          "Choose a specific sensing domain: climate, vibration, or audio anomaly detection.",
          "Combine edge sensing, TinyML inference, carbon-aware logic, and power reporting.",
          "Define upfront what counts as critical (must run now) vs. non-critical (can be shifted) data.",
          "Good scoping keeps both the anomaly detection and the carbon-aware logic meaningfully connected.",
        ],
      },
      {
        id: "m8-l2",
        title: "Wiring the Carbon-Aware Logic & Power Monitoring",
        content: [
          "The carbon-aware component (Module 2) should temporally shift only the non-critical data replication path — batch synchronization of historical sensor logs to a backend, for instance — while the on-device TinyML anomaly classifier (Module 5) keeps running continuously regardless of grid conditions, since real-time anomaly detection is exactly the kind of urgent work that shouldn't wait for clean power.",
          "Power monitoring (Module 3) should be instrumented across the full pipeline, not just the edge device: measuring the edge node's actual power draw and combining it with the SCI framework (Module 1) to estimate the CO2 avoided by shifting the replication workload, versus a naive always-replicate baseline.",
        ],
        bullets: [
          "Temporal shifting applies to non-critical data replication, not real-time anomaly detection.",
          "The TinyML classifier should run continuously regardless of grid carbon conditions.",
          "Power monitoring should span the full pipeline, both edge device and shifted backend work.",
          "Use the SCI framework to translate measured power data into an avoided-emissions estimate.",
        ],
      },
      {
        id: "m8-l3",
        title: "Deliverables & Assessment",
        content: [
          "The capstone is graded on the whole system actually functioning end-to-end and on the honesty and rigor of its impact analysis: the edge sensing and TinyML inference must run correctly, the carbon-aware logic must demonstrably shift its non-critical workload based on real or simulated grid data, and the power/emissions estimate must be data-backed rather than asserted.",
          "The final sustainability impact report should quantify — not just describe — the system's estimated avoided CO2 emissions compared to a naive, non-carbon-aware baseline, packaged alongside the architecture and source code into a clean, reviewable repository that a stakeholder could audit and trust.",
        ],
        bullets: [
          "Grading covers correct end-to-end execution: sensing, inference, carbon logic, and monitoring.",
          "Carbon-aware shifting behavior must be demonstrable against real or simulated grid data.",
          "The impact report must quantify avoided CO2 emissions with data, not just describe intent.",
          "Package architecture, code, and the sustainability report into a clean, auditable repository.",
        ],
      },
    ],
    lab: {
      title: "Capstone: Ship the Autonomous Carbon-Aware Edge Sensing Pipeline",
      description:
        "Design and build an Autonomous Carbon-Aware Edge Sensing Pipeline: capture sensory data at the edge, run local TinyML anomaly inference, apply carbon-aware logic to non-critical data replication, monitor power footprint, and estimate avoided CO2 emissions.",
      steps: [
        "Select a sensing domain (climate, vibration, or audio) and define critical vs. non-critical data paths.",
        "Deploy a quantized TinyML model at the edge to classify anomalies in the captured data continuously.",
        "Implement carbon-aware temporal shifting logic for non-critical data replication, driven by real or simulated grid intensity.",
        "Instrument the pipeline's power footprint end-to-end and calculate an SCI-based avoided-emissions estimate.",
        "Package the architecture, source code, and a data-backed sustainability impact report into a clean repository.",
      ],
    },
    quiz: [
      {
        question:
          "In the capstone pipeline, why should real-time TinyML anomaly detection continue running regardless of current grid carbon intensity, while data replication can be shifted?",
        options: [
          "Because TinyML inference always consumes zero energy",
          "Because anomaly detection is time-critical work that can't be delayed without losing its value, while routine data replication is non-urgent and can be temporally shifted to cleaner grid windows without harming the system's core purpose",
          "Because carbon-aware logic cannot be applied to any part of an edge system",
          "Because data replication is more time-critical than anomaly detection"
        ],
        answerIndex: 1,
        explanation:
          "The capstone applies carbon-aware temporal shifting only to genuinely deferrable work. Real-time anomaly detection loses its value if delayed, so it must run continuously, while routine data replication can safely wait for cleaner grid conditions.",
      },
      {
        question:
          "What must the capstone's sustainability impact report demonstrate to meet the grading criteria?",
        options: [
          "A general description of sustainability best practices without specific numbers",
          "A data-backed, quantified estimate of avoided CO2 emissions compared to a naive, non-carbon-aware baseline, derived from actual measured power data using the SCI framework",
          "Only a diagram of the system architecture with no measurements",
          "A theoretical calculation with no connection to the actual running system"
        ],
        answerIndex: 1,
        explanation:
          "The capstone requires quantified, data-backed impact analysis — using measured power data and the SCI framework to estimate avoided CO2 emissions relative to a naive baseline — not just a qualitative description of the system's intent.",
      },
      {
        question:
          "Why is it important to define upfront which data paths are 'critical' versus 'non-critical' before building the carbon-aware pipeline?",
        options: [
          "It isn't important; all data paths should be treated identically",
          "Because carbon-aware shifting should only apply to genuinely deferrable work, and misclassifying a critical path as shiftable could delay time-sensitive anomaly reporting, undermining the system's core purpose",
          "Because only critical data paths can be measured for power consumption",
          "Because non-critical data never needs to be transmitted at all"
        ],
        answerIndex: 1,
        explanation:
          "Carbon-aware shifting only makes sense for work that can tolerate delay. If a critical data path were mistakenly shifted, it could delay important anomaly reporting — so this classification must be deliberate and correct before implementing the shifting logic.",
      },
    ],
  },
];
