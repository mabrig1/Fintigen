import type { CourseMeta, CourseModule } from "@/lib/courses/types";

export const courseMeta: CourseMeta = {
  slug: "quantum-computing-basics",
  title: "Quantum Computing Basics",
  tagline:
    "Foundations, Mathematical Frameworks, and Programmatic Implementation with Qiskit (2026 Edition)",
  duration: "8 Modules",
  pace: "5–7 hours/week",
  level: "Beginner to Intermediate",
  prerequisites: [
    "High-school algebra",
    "Basic Python programming",
    "No prior quantum physics knowledge required — linear algebra foundations are built into the curriculum",
  ],
  overview: [
    "Quantum computing represents a paradigm shift away from classical silicon computing architectures. By utilizing the physical laws of quantum mechanics, quantum systems can process complex calculations exponentially faster than the world's largest classical supercomputers, preparing industries for massive breakthroughs in optimization, drug synthesis, financial simulation, and cryptography.",
    "This course introduces the foundational concepts of quantum mechanics — superposition, entanglement, and interference — and provides direct programmatic experience writing quantum algorithms. You'll build and execute quantum circuits using IBM's Qiskit framework and run them on actual quantum simulators and cloud-connected physical quantum processors.",
  ],
  objectives: [
    "Explain the fundamental differences between classical bits and quantum bits (qubits) using mathematical vector models.",
    "Apply linear algebra concepts (bra-ket notation, inner/outer products, tensor products) to calculate quantum states.",
    "Construct quantum circuits utilizing single-qubit gates (Hadamard, Pauli, Phase) and multi-qubit gates (CNOT, CZ).",
    "Program and debug quantum algorithms using Python and IBM's Qiskit framework.",
    "Implement classical-quantum algorithms including Deutsch-Jozsa, Grover's search, and the Variational Quantum Eigensolver (VQE).",
    "Evaluate the impact of physical noise (quantum decoherence) and analyze the transition toward post-quantum cryptography.",
  ],
  tools: [
    { category: "Programming Language", items: "Python 3.10+" },
    {
      category: "Primary Quantum Frameworks",
      items: "Qiskit v1.x (IBM Quantum), Qiskit Aer (local high-performance simulation)",
    },
    {
      category: "Hardware Access Platform",
      items: "IBM Quantum Platform (cloud-connected quantum processing units)",
    },
    { category: "Mathematical Utilities", items: "NumPy, SciPy, Matplotlib" },
  ],
  grading: [
    {
      component: "Weekly Coding Labs",
      weight: "40%",
      detail:
        "Evaluation of Qiskit circuit implementations, mathematical correctness of vector calculations, and local simulation runs.",
    },
    {
      component: "Midterm Assessment",
      weight: "20%",
      detail:
        "A theoretical written assignment focusing on quantum gates, multi-qubit states, and tensor products.",
    },
    {
      component: "Capstone Project",
      weight: "40%",
      detail:
        "Measured on correctness of the algorithm, execution on physical hardware, quality of transpilation mapping, and complexity of physical noise analysis.",
    },
  ],
};

export const courseModules: CourseModule[] = [
  {
    id: "module-1",
    week: 1,
    title: "The Quantum Bit & Mathematical Foundations",
    objective:
      "Demystify how quantum hardware represents state, and master the linear algebra notation of the Bloch Sphere.",
    lessons: [
      {
        id: "m1-l1",
        title: "Why Quantum? Beyond the Limits of Moore's Law",
        content: [
          "Classical computing's decades-long exponential growth in power came from shrinking transistors — Moore's Law. That shrinking is now hitting hard physical limits: transistors are approaching atomic scale, where the classical assumption that a bit is definitely 0 or definitely 1 starts to break down against quantum effects like tunneling.",
          "Quantum computing doesn't fight those quantum effects — it harnesses them. Certain problem classes (large-scale optimization, molecular simulation, integer factoring) that would take a classical supercomputer longer than the age of the universe become tractable on a quantum computer, because the underlying computation exploits superposition and interference rather than working around them.",
        ],
        bullets: [
          "Moore's Law growth is running into hard atomic-scale physical limits.",
          "Classical bits assume a definite 0 or 1; quantum effects break that assumption at small scales.",
          "Quantum computing harnesses quantum effects rather than avoiding them.",
          "Certain problem classes become tractable only with quantum speedups.",
        ],
      },
      {
        id: "m1-l2",
        title: "Quantum States as Complex Vectors: Bra-Ket Notation",
        content: [
          "A classical bit is either 0 or 1. A qubit's state is instead a vector in a 2-dimensional complex vector space, written in Dirac notation as |ψ⟩ = α|0⟩ + β|1⟩, where |0⟩ and |1⟩ are the basis states (analogous to classical 0 and 1) and α, β are complex probability amplitudes.",
          "The bra ⟨ψ| is the conjugate transpose of the ket |ψ⟩, and their inner product ⟨ψ|ψ⟩ must equal 1 — the normalization condition that keeps probabilities well-defined. This notation isn't just formalism: it's the compact language every gate, measurement, and algorithm in this course is expressed in.",
        ],
        code: {
          label: "The single-qubit state vector and normalization",
          body: "|ψ⟩ = α|0⟩ + β|1⟩ = [α, β]ᵀ\n\nα, β ∈ ℂ   (complex probability amplitudes)\n|α|² + |β|² = 1   (normalization / total probability = 1)",
        },
        bullets: [
          "|ψ⟩ (ket) represents a quantum state as a complex vector.",
          "⟨ψ| (bra) is the conjugate transpose, used to compute inner products.",
          "α and β are complex probability amplitudes, not probabilities themselves.",
          "Normalization (|α|² + |β|² = 1) keeps the state's total probability equal to one.",
        ],
      },
      {
        id: "m1-l3",
        title: "The Bloch Sphere: Visualizing a Single Qubit",
        content: [
          "Because a single qubit's normalized state has only two independent real parameters after removing an unobservable global phase, every possible single-qubit state can be visualized as a point on the surface of a unit sphere — the Bloch Sphere. The north and south poles represent |0⟩ and |1⟩; every other point represents a superposition.",
          "This geometric picture makes gates intuitive: applying a quantum gate is literally a rotation of the point around the sphere. Angles θ and φ parameterize any state as |ψ⟩ = cos(θ/2)|0⟩ + e^(iφ)sin(θ/2)|1⟩, connecting the abstract vector algebra directly to a picture you can reason about spatially.",
        ],
        bullets: [
          "Every single-qubit state maps to a point on the Bloch Sphere's surface.",
          "|0⟩ and |1⟩ sit at the north and south poles.",
          "Quantum gates correspond to rotations of the state point around the sphere.",
          "θ and φ parameterize any state, linking vector algebra to geometric intuition.",
        ],
      },
      {
        id: "m1-l4",
        title: "Measurement & Born's Rule",
        content: [
          "A qubit in superposition doesn't reveal α and β directly — measurement forces it to collapse to either |0⟩ or |1⟩, and Born's Rule says the probability of collapsing to |0⟩ is |α|² and to |1⟩ is |β|². This is fundamentally different from classical uncertainty: the qubit genuinely was in both states at once until measured, not merely unknown to us.",
          "This is also why running a quantum circuit once tells you very little — you need many repeated executions ('shots') of the same circuit to estimate the underlying probability distribution accurately, which is exactly the workflow Qiskit's simulators and hardware jobs are built around.",
        ],
        bullets: [
          "Measurement collapses a superposition to a single definite outcome.",
          "Born's Rule: P(|0⟩) = |α|², P(|1⟩) = |β|².",
          "Quantum superposition is not the same as classical unknown-but-fixed state.",
          "Many repeated 'shots' are needed to estimate the true probability distribution.",
        ],
      },
    ],
    lab: {
      title: "Initializing States & Plotting the Bloch Sphere",
      description:
        "Use a Python notebook to initialize single-qubit states, mathematically calculate probability projections, and plot custom state vectors onto a 3D Bloch Sphere using Qiskit visualization libraries.",
      steps: [
        "Set up a Qiskit environment and initialize a single qubit in several custom states.",
        "Manually calculate |α|² and |β|² for each state and verify normalization.",
        "Use Qiskit's Statevector and plotting utilities to render each state on the Bloch Sphere.",
        "Apply a small rotation to a state and observe the corresponding movement on the sphere.",
        "Run repeated simulated measurements and compare the empirical distribution to Born's Rule predictions.",
      ],
    },
    quiz: [
      {
        question:
          "What do the amplitudes α and β represent in the qubit state |ψ⟩ = α|0⟩ + β|1⟩?",
        options: [
          "They are the direct probabilities of measuring 0 or 1",
          "They are complex probability amplitudes; their squared magnitudes give the measurement probabilities",
          "They must always be real numbers",
          "They represent the qubit's physical temperature",
        ],
        answerIndex: 1,
        explanation:
          "α and β are complex numbers called probability amplitudes. Per Born's Rule, the actual measurement probabilities are their squared magnitudes, |α|² and |β|², which together must sum to 1.",
      },
      {
        question:
          "Why can every single-qubit pure state be represented as a point on the Bloch Sphere?",
        options: [
          "Because qubits are physically shaped like spheres",
          "Because after normalization and removing an unobservable global phase, a single-qubit state has exactly two independent real parameters, matching a point on a unit sphere's surface",
          "Because measurement always returns a spherical coordinate",
          "Because the Bloch Sphere only applies to multi-qubit systems",
        ],
        answerIndex: 1,
        explanation:
          "A normalized single-qubit state has two real degrees of freedom once global phase is discarded, which map exactly onto the two angles (θ, φ) needed to specify a point on a sphere's surface.",
      },
      {
        question:
          "Why must many repeated 'shots' of the same quantum circuit be run to interpret its result?",
        options: [
          "Because quantum computers are unreliable and need retries",
          "Because a single measurement only reveals one collapsed outcome; many repetitions are needed to estimate the underlying probability distribution described by Born's Rule",
          "Because Qiskit requires a minimum number of shots to compile",
          "Because qubits lose their charge after one measurement",
        ],
        answerIndex: 1,
        explanation:
          "Measurement collapses superposition to a single definite outcome, destroying information about the original amplitudes. Repeated shots let you statistically reconstruct the probability distribution that Born's Rule predicts.",
      },
    ],
  },
  {
    id: "module-2",
    week: 2,
    title: "Quantum Gates & Single-Qubit Manipulations",
    objective:
      "Map single-qubit gates to physical matrix operations and program operations to manipulate qubit orientations.",
    lessons: [
      {
        id: "m2-l1",
        title: "Quantum Gates as Unitary Operations",
        content: [
          "Every quantum gate is represented by a unitary matrix U, satisfying U†U = I (its conjugate transpose is also its inverse). This property is what guarantees a gate preserves the total probability of a state — a gate can rotate a state around the Bloch Sphere, but it can never make total probability exceed or fall short of 1.",
          "Unitarity also means every quantum gate is reversible: for any gate U, there exists U† that exactly undoes it. This is a fundamental structural difference from many classical logic gates (like AND or OR), which are not reversible — you can't reconstruct the inputs from an AND gate's output alone.",
        ],
        code: {
          label: "The defining property of a unitary gate",
          body: "U†U = I\n\nU†: conjugate transpose of U\nI: the identity matrix\n\nConsequence: every quantum gate is reversible.",
        },
        bullets: [
          "Quantum gates are unitary matrices: U†U = I.",
          "Unitarity preserves total probability — no state 'leaks' probability.",
          "Every quantum gate is reversible; U† exactly undoes U.",
          "This contrasts with irreversible classical gates like AND/OR.",
        ],
      },
      {
        id: "m2-l2",
        title: "The Pauli Operators",
        content: [
          "The Pauli gates — X, Y, and Z — are the fundamental single-qubit rotations, each corresponding to a 180° rotation about one axis of the Bloch Sphere. The X gate (the 'quantum NOT') flips |0⟩ to |1⟩ and vice versa, exactly mirroring the classical NOT gate but now acting on superpositions too.",
          "Z leaves |0⟩ and |1⟩ unchanged but flips the sign (phase) of |1⟩'s amplitude — a purely quantum effect with no classical analog, since a classical bit has no 'phase' to flip. Y combines both a bit-flip and a phase-flip in one operation, and together the three Pauli matrices (plus the identity) form a basis that can describe any single-qubit operation.",
        ],
        code: {
          label: "The Pauli matrices",
          body: "X = [[0, 1], [1, 0]]     (bit-flip: |0⟩↔|1⟩)\nZ = [[1, 0], [0, -1]]    (phase-flip: |1⟩ → -|1⟩)\nY = iXZ                 (bit-flip + phase-flip combined)",
        },
        bullets: [
          "X: the quantum NOT — flips |0⟩ and |1⟩.",
          "Z: flips the phase of |1⟩, with no classical bit-gate analog.",
          "Y: combines a bit-flip and a phase-flip.",
          "X, Y, Z, and I together span all single-qubit operations.",
        ],
      },
      {
        id: "m2-l3",
        title: "The Hadamard Gate: Generating Superposition",
        content: [
          "The Hadamard gate (H) is the workhorse of quantum algorithms: applied to |0⟩, it produces an equal superposition (|0⟩ + |1⟩)/√2 — a state with a 50/50 chance of measuring 0 or 1. This is the starting move of nearly every quantum algorithm in this course, since it's how you put qubits into the superposition that lets later gates explore multiple possibilities 'at once.'",
          "Geometrically, H rotates the Bloch Sphere point from the pole to the equator. Applying H twice returns the original state (H is its own inverse), which is a useful sanity check when debugging a circuit that isn't behaving as expected.",
        ],
        code: {
          label: "The Hadamard gate matrix and its effect on |0⟩",
          body: "H = (1/√2) [[1, 1], [1, -1]]\n\nH|0⟩ = (1/√2)(|0⟩ + |1⟩)   — equal superposition",
        },
        bullets: [
          "H creates an equal superposition of |0⟩ and |1⟩.",
          "Nearly every quantum algorithm starts by applying H to initialize superposition.",
          "Geometrically, H rotates the Bloch Sphere point from pole to equator.",
          "H is its own inverse: applying it twice returns the original state.",
        ],
      },
      {
        id: "m2-l4",
        title: "Phase Gates: S and T",
        content: [
          "The S gate applies a 90° phase rotation (multiplying |1⟩'s amplitude by i) and the T gate applies a 45° phase rotation (multiplying by e^(iπ/4)). Neither changes the measurement probabilities of a qubit in the computational basis alone — but phase is exactly what later gates and interference effects act on to produce useful computation.",
          "T is especially important in practice: it's one of the standard 'universal gate set' members (alongside H and CNOT) that physical quantum hardware natively supports, and combinations of H, S, and T can approximate any single-qubit rotation to arbitrary precision.",
        ],
        bullets: [
          "S applies a 90° phase rotation; T applies a 45° phase rotation.",
          "Phase gates don't change single-qubit measurement probabilities alone.",
          "Phase becomes observable through later interference effects.",
          "H, S, and T form part of a standard universal gate set for hardware.",
        ],
      },
    ],
    lab: {
      title: "First Qiskit Circuit: Gate Sequences & Measurement Histograms",
      description:
        "Write your first Qiskit script to construct a single-qubit circuit, apply sequences of Pauli and Hadamard gates, run the execution locally on a Qiskit Aer simulator, and plot a histogram of output measurements.",
      steps: [
        "Build a single-qubit QuantumCircuit and apply an X gate, verifying the flipped measurement outcome.",
        "Apply an H gate and run repeated shots on Qiskit Aer to observe the 50/50 distribution.",
        "Chain H followed by Z followed by H and predict the outcome before running it.",
        "Plot a histogram of measurement outcomes using Qiskit's visualization tools.",
        "Experiment with S and T gates before a final H, and observe how phase affects the resulting distribution.",
      ],
    },
    quiz: [
      {
        question:
          "What does it mean for a quantum gate to be 'unitary,' and why does that property matter?",
        options: [
          "It means the gate can only be applied once per circuit",
          "It means U†U = I, which guarantees the gate preserves total probability and is always reversible",
          "It means the gate only works on multi-qubit systems",
          "It means the gate has no matrix representation",
        ],
        answerIndex: 1,
        explanation:
          "Unitarity (U†U = I) ensures a gate preserves the normalization of a quantum state (total probability stays 1) and guarantees reversibility — every quantum gate can be exactly undone by its conjugate transpose.",
      },
      {
        question:
          "What makes the Z gate's effect fundamentally different from a classical logic operation?",
        options: [
          "Z flips the bit value from 0 to 1, just like a classical NOT gate",
          "Z flips the phase of the |1⟩ amplitude without changing measurement probabilities in the computational basis — a purely quantum effect with no classical bit analog",
          "Z can only be applied to multi-qubit systems",
          "Z is identical in effect to the Hadamard gate",
        ],
        answerIndex: 1,
        explanation:
          "The Z gate flips the sign (phase) of the |1⟩ component without altering the measurement probabilities in the computational basis — classical bits have no concept of 'phase,' making this a uniquely quantum operation.",
      },
      {
        question:
          "Why is the Hadamard gate the typical first gate applied in most quantum algorithms?",
        options: [
          "It permanently fixes a qubit to state |1⟩",
          "It creates an equal superposition of |0⟩ and |1⟩, letting subsequent gates and interference explore multiple computational paths simultaneously",
          "It performs measurement directly",
          "It is the only reversible gate available",
        ],
        answerIndex: 1,
        explanation:
          "Applying H to |0⟩ produces an equal superposition, which is the foundational step that lets algorithms exploit quantum parallelism — evaluating a function's behavior across many inputs' amplitudes at once.",
      },
    ],
  },
  {
    id: "module-3",
    week: 3,
    title: "Multi-Qubit Systems & Quantum Entanglement",
    objective:
      "Expand the mathematical model to multi-qubit systems, constructing correlated quantum states that cannot be factored independently.",
    lessons: [
      {
        id: "m3-l1",
        title: "Scaling State Space: The Tensor Product",
        content: [
          "A single qubit lives in a 2-dimensional state space. Two qubits together live in a 4-dimensional space, formed by the tensor product (⊗) of the two individual spaces — and in general, n qubits require 2ⁿ complex amplitudes to describe fully. This exponential scaling is precisely the resource that gives quantum computers their power, and precisely why classical simulation of large quantum systems becomes intractable.",
          "The tensor product combines basis states by concatenation: |0⟩⊗|1⟩ is written |01⟩, one of the four basis states {|00⟩, |01⟩, |10⟩, |11⟩} for a two-qubit system. A general two-qubit state is a weighted sum of all four, each with its own complex amplitude, subject to the same normalization rule as before.",
        ],
        code: {
          label: "Two-qubit state space via the tensor product",
          body: "|q1⟩ ⊗ |q2⟩ = |q1 q2⟩\n\nGeneral 2-qubit state:\n|ψ⟩ = c00|00⟩ + c01|01⟩ + c10|10⟩ + c11|11⟩\n|c00|² + |c01|² + |c10|² + |c11|² = 1",
        },
        bullets: [
          "n qubits require 2ⁿ complex amplitudes — exponential state space growth.",
          "The tensor product (⊗) combines individual qubit spaces into a joint space.",
          "A 2-qubit system has 4 basis states: |00⟩, |01⟩, |10⟩, |11⟩.",
          "Exponential scaling is both the source of quantum power and the reason classical simulation is hard.",
        ],
      },
      {
        id: "m3-l2",
        title: "The Controlled-NOT (CNOT) Gate",
        content: [
          "The CNOT gate is the fundamental two-qubit gate: it flips a 'target' qubit if and only if a 'control' qubit is |1⟩, leaving the control qubit unchanged. Unlike single-qubit gates, CNOT can create correlations between qubits — its output can't always be described as two independent single-qubit states multiplied together.",
          "CNOT combined with Hadamard is the standard recipe for generating entanglement: applying H to the control qubit first puts it into superposition, and the subsequent CNOT then entangles that superposition with the target — the exact circuit used to build Bell states.",
        ],
        code: {
          label: "The CNOT gate's truth-table-like action on basis states",
          body: "CNOT|00⟩ = |00⟩\nCNOT|01⟩ = |01⟩\nCNOT|10⟩ = |11⟩   (control=1 flips the target)\nCNOT|11⟩ = |10⟩",
        },
        bullets: [
          "CNOT flips the target qubit only when the control qubit is |1⟩.",
          "The control qubit's state is never changed by CNOT.",
          "CNOT can create correlations that can't be factored into independent qubit states.",
          "H followed by CNOT is the standard recipe for generating entanglement.",
        ],
      },
      {
        id: "m3-l3",
        title: "Entanglement & the Bell States",
        content: [
          "Entanglement is the phenomenon where two or more qubits' joint state cannot be written as a product of individual qubit states — measuring one qubit instantaneously determines what you'll get when you measure the other, no matter how far apart they are physically. This correlation is stronger than anything possible classically, and it's the resource behind quantum teleportation and many quantum algorithms.",
          "The four Bell states are the maximally entangled two-qubit states, the canonical example being |Φ⁺⟩ = (|00⟩ + |11⟩)/√2: measuring the first qubit as 0 guarantees the second measures 0 too, and measuring the first as 1 guarantees the second measures 1 — with no way to predict which outcome occurs in advance.",
        ],
        code: {
          label: "The Bell state |Φ⁺⟩",
          body: "|Φ⁺⟩ = (|00⟩ + |11⟩) / √2\n\nMeasuring qubit 1 as 0 ⟹ qubit 2 measures 0\nMeasuring qubit 1 as 1 ⟹ qubit 2 measures 1",
        },
        bullets: [
          "Entangled states cannot be factored into independent single-qubit states.",
          "Measuring one entangled qubit instantly determines the other's outcome.",
          "The four Bell states are the maximally entangled two-qubit states.",
          "Entanglement is a genuinely non-classical correlation resource.",
        ],
      },
      {
        id: "m3-l4",
        title: "Quantum Teleportation",
        content: [
          "Quantum teleportation moves an unknown qubit's exact state from one location to another using a pre-shared entangled pair plus two classical bits of communication — without ever directly transmitting the qubit itself or violating the no-cloning theorem (the original qubit's state is destroyed in the process, not copied).",
          "The protocol combines everything so far: Alice entangles her half of a Bell pair with the qubit she wants to send, measures both of her qubits (destroying her copy), and sends the two classical measurement results to Bob, who applies a corresponding correction gate to his half of the Bell pair — instantly reconstructing the original state.",
        ],
        bullets: [
          "Teleportation transmits a qubit's exact state using entanglement plus classical bits.",
          "The original qubit's state is destroyed, consistent with the no-cloning theorem.",
          "Two classical bits tell the receiver which correction gate to apply.",
          "No information travels faster than light — the classical bits are still required.",
        ],
      },
    ],
    lab: {
      title: "Constructing All Four Bell States",
      description:
        "Build a multi-qubit circuit that constructs all four Bell States in Qiskit. Execute the code on an IBM Quantum simulator and analyze the output distribution to prove mathematical correlation.",
      steps: [
        "Build a 2-qubit circuit applying H to the control qubit followed by CNOT.",
        "Verify the resulting state matches |Φ⁺⟩ using Qiskit's Statevector tools.",
        "Modify the circuit with additional X/Z gates to construct the remaining three Bell states.",
        "Run each circuit with many shots on the Aer simulator and plot the measurement histograms.",
        "Confirm the correlated outcomes (00/11 or 01/10 only) prove entanglement rather than independent randomness.",
      ],
    },
    quiz: [
      {
        question:
          "Why does the state space of n qubits require 2ⁿ complex amplitudes instead of growing linearly with n?",
        options: [
          "Because qubits are stored in binary, doubling for each additional bit",
          "Because the joint state space is formed by the tensor product of each qubit's individual space, and tensor products combine dimensions multiplicatively",
          "Because Qiskit imposes this as a software limitation",
          "It only applies when qubits are entangled",
        ],
        answerIndex: 1,
        explanation:
          "The tensor product combines individual 2-dimensional qubit spaces multiplicatively, so n qubits require 2ⁿ amplitudes to fully describe the joint state — the exponential scaling that both powers quantum algorithms and makes classical simulation hard.",
      },
      {
        question:
          "What defines an entangled two-qubit state like a Bell state?",
        options: [
          "It can always be written as a product of two independent single-qubit states",
          "It cannot be factored into independent single-qubit states, meaning measuring one qubit determines the outcome of measuring the other",
          "It requires more than two qubits to exist",
          "It only occurs after a measurement is performed",
        ],
        answerIndex: 1,
        explanation:
          "Entanglement means the joint state cannot be decomposed into a product of independent single-qubit states. This is why measuring one qubit of a Bell pair instantly determines the measurement outcome of the other.",
      },
      {
        question:
          "Why does quantum teleportation not violate the speed-of-light limit on information transfer?",
        options: [
          "Because it doesn't actually transmit any quantum information",
          "Because it still requires sending two classical measurement bits through a conventional channel, which cannot travel faster than light",
          "Because entanglement itself carries no correlation until observed",
          "Because teleportation only works over very short distances",
        ],
        answerIndex: 1,
        explanation:
          "Teleportation relies on entanglement plus the transmission of two classical bits describing which correction to apply. Those classical bits must still travel through an ordinary channel, bounded by the speed of light.",
      },
    ],
  },
  {
    id: "module-4",
    week: 4,
    title: "Foundational Algorithms — Quantum Speedups",
    objective:
      "Understand how constructive and destructive wave interference yields computational answers faster than classical search routines.",
    lessons: [
      {
        id: "m4-l1",
        title: "Quantum Parallelism & Phase Kickback",
        content: [
          "Quantum parallelism refers to a quantum computer's ability to evaluate a function against a superposition of many inputs in a single application of a gate sequence — the function's effect is encoded into the amplitudes of every branch of the superposition simultaneously, rather than being run once per input as a classical computer would.",
          "Phase kickback is the key trick that makes this useful: applying a controlled operation using an ancilla (helper) qubit in a particular state can 'kick back' a phase onto the control qubit that depends on the function's output — encoding the answer into a phase that later interference can extract, without ever needing to measure the ancilla directly.",
        ],
        bullets: [
          "Quantum parallelism evaluates a function across a superposition of inputs at once.",
          "The function's effect is encoded into amplitudes across all branches simultaneously.",
          "Phase kickback transfers information from an ancilla qubit back onto the control qubit as phase.",
          "Later interference converts that encoded phase into a measurable answer.",
        ],
      },
      {
        id: "m4-l2",
        title: "Quantum Oracles: Encoding a Function into a Circuit",
        content: [
          "A quantum oracle is a black-box unitary circuit that encodes a classical function f(x) so it can be queried in superposition. A phase oracle flips the sign (phase) of the amplitude for inputs where f(x) = 1, while a bit-flip oracle flips an output qubit's value based on f(x) — two different but related ways of embedding the same classical function into reversible quantum logic.",
          "Designing an oracle is a genuinely creative step in quantum algorithm design: the same abstract algorithm (Deutsch-Jozsa, Grover's) can solve wildly different problems just by swapping in a different oracle circuit that encodes a different function.",
        ],
        bullets: [
          "An oracle is a unitary circuit encoding a classical function for quantum queries.",
          "A phase oracle flips the amplitude sign for inputs where f(x)=1.",
          "A bit-flip oracle flips an output qubit's value based on f(x).",
          "Swapping the oracle lets the same algorithm solve different problems.",
        ],
      },
      {
        id: "m4-l3",
        title: "The Deutsch-Jozsa Algorithm",
        content: [
          "The Deutsch-Jozsa problem asks: given a function f that is guaranteed to be either constant (same output for every input) or balanced (outputs 0 for exactly half the inputs and 1 for the other half), determine which — with a guarantee, not a probability. Classically, this can require checking up to half the inputs plus one in the worst case.",
          "Deutsch-Jozsa solves this with a single query to the oracle: superposition lets the circuit evaluate the function against every input simultaneously, and interference causes all amplitudes to cancel into a specific measurable pattern only if the function is constant — turning an exponential classical worst case into one quantum step.",
        ],
        bullets: [
          "The problem: determine if f is constant or balanced, guaranteed to be one or the other.",
          "Classically requires up to (2ⁿ⁻¹ + 1) queries in the worst case.",
          "Deutsch-Jozsa solves it with exactly one oracle query.",
          "Interference collapses the result into a clean, deterministic measurement pattern.",
        ],
      },
      {
        id: "m4-l4",
        title: "From Toy Problem to Real Speedup",
        content: [
          "Deutsch-Jozsa is often called a 'toy' algorithm because the constant-vs-balanced problem has limited direct real-world use — but its importance is pedagogical and historical: it was the first algorithm to rigorously prove that quantum computers can solve a problem with a guaranteed exponential speedup over any classical deterministic algorithm.",
          "The pattern it establishes — superposition to explore many inputs, an oracle to encode a function, interference to extract a global property of that function — is the same blueprint reused, with far more sophistication, in Grover's search and Shor's algorithm in the modules ahead.",
        ],
        bullets: [
          "Deutsch-Jozsa proved a guaranteed exponential speedup is possible for a well-defined problem.",
          "It's foundational rather than practically applied on its own.",
          "The blueprint — superposition, oracle, interference — recurs in later algorithms.",
          "Understanding it deeply makes Grover's and Shor's algorithms far easier to grasp.",
        ],
      },
    ],
    lab: {
      title: "Implementing Deutsch-Jozsa with Custom Oracles",
      description:
        "Implement the Deutsch-Jozsa algorithm inside Qiskit, design custom oracle functions, and demonstrate the single-step classical-versus-quantum execution difference.",
      steps: [
        "Build a constant-function oracle and a balanced-function oracle as separate Qiskit circuits.",
        "Assemble the full Deutsch-Jozsa circuit: Hadamards, oracle, Hadamards, measurement.",
        "Run the circuit against both oracles and verify the measurement pattern distinguishes constant from balanced.",
        "Simulate the classical worst-case query approach for comparison and count the queries needed.",
        "Document the single-query quantum result versus the classical query count for a chosen input size.",
      ],
    },
    quiz: [
      {
        question:
          "What guarantee does the Deutsch-Jozsa algorithm provide about the function f?",
        options: [
          "It only works if f is balanced",
          "Given that f is guaranteed to be either constant or balanced, it determines which one with a single oracle query",
          "It determines the exact output of f for every input",
          "It requires the same number of queries as a classical algorithm",
        ],
        answerIndex: 1,
        explanation:
          "Deutsch-Jozsa exploits the promise that f is either constant or balanced, using superposition and interference to determine which case holds with just one oracle query — an exponential improvement over the classical worst case.",
      },
      {
        question:
          "What role does interference play in the Deutsch-Jozsa algorithm?",
        options: [
          "It has no functional role, only aesthetic value",
          "It causes amplitudes across the superposition to combine constructively or destructively, collapsing to a measurable pattern that reveals whether f is constant or balanced",
          "It slows down the circuit's execution time",
          "It replaces the need for an oracle entirely",
        ],
        answerIndex: 1,
        explanation:
          "After the oracle encodes the function into phase, a final layer of Hadamard gates causes interference between amplitudes — canceling out into a specific, deterministic measurement pattern only when the function is constant.",
      },
      {
        question:
          "Why is Deutsch-Jozsa considered foundational even though the constant-vs-balanced problem has limited direct real-world use?",
        options: [
          "Because it is the fastest algorithm ever discovered for any problem",
          "Because it was the first algorithm to rigorously prove a guaranteed exponential quantum speedup, establishing a blueprint (superposition, oracle, interference) reused in later algorithms",
          "Because it does not require any quantum gates",
          "Because it replaced the need for Grover's algorithm",
        ],
        answerIndex: 1,
        explanation:
          "Deutsch-Jozsa's significance is historical and pedagogical: it proved guaranteed exponential speedup is achievable, and its structural pattern of superposition-oracle-interference recurs, in more sophisticated forms, in Grover's and Shor's algorithms.",
      },
    ],
  },
  {
    id: "module-5",
    week: 5,
    title: "Grover's Search Algorithm",
    objective:
      "Build a quantum search pipeline that searches through unstructured databases with quadratic speedup.",
    lessons: [
      {
        id: "m5-l1",
        title: "The Unstructured Search Problem",
        content: [
          "Searching an unsorted list of N items for a specific target classically requires, on average, checking half the items — O(N) time in the worst case, since there's no structure (like sorted order) to exploit. This is a fundamental limit for classical algorithms on genuinely unstructured data.",
          "Grover's algorithm achieves a quadratic speedup, finding the target in O(√N) steps instead — meaningful but more modest than Deutsch-Jozsa's exponential speedup. Still, for very large N (a large database, or an exponentially large solution space in an optimization problem), a quadratic speedup is a dramatic practical improvement.",
        ],
        bullets: [
          "Classical unstructured search requires O(N) operations on average.",
          "Grover's algorithm achieves O(√N) — a quadratic, not exponential, speedup.",
          "Quadratic speedup still matters enormously for very large N.",
          "Grover's applies broadly to any problem framed as searching an unstructured space.",
        ],
      },
      {
        id: "m5-l2",
        title: "The Oracle: Marking the Target State",
        content: [
          "Grover's oracle flips the sign (phase) of the amplitude corresponding to the target state, leaving every other amplitude untouched — the target isn't yet more likely to be measured, it's just been 'marked' with a negative phase that the next step will exploit.",
          "Constructing this oracle requires encoding the specific search condition as a reversible quantum circuit, which is often the most problem-specific part of applying Grover's algorithm to a real use case — the amplification machinery around it stays the same regardless of what's being searched for.",
        ],
        bullets: [
          "The oracle flips the phase of the target state's amplitude only.",
          "Phase-marking alone doesn't change measurement probability yet.",
          "Oracle construction is the problem-specific part of applying Grover's.",
          "The amplification machinery is reusable across different search problems.",
        ],
      },
      {
        id: "m5-l3",
        title: "The Diffusion Operator: Amplitude Amplification",
        content: [
          "The diffusion operator reflects every amplitude around the average amplitude of the whole state. Because the oracle flipped the target's amplitude negative, this reflection pushes the target's amplitude further above average while pulling every other (unflagged) amplitude slightly below — increasing the target's measurement probability with each repetition.",
          "One Grover 'iteration' is one oracle application followed by one diffusion application. Each iteration increases the target's amplitude a bit more, following a predictable geometric rotation pattern that can be tracked precisely with trigonometry on a 2-dimensional subspace spanned by the target and non-target states.",
        ],
        code: {
          label: "One Grover iteration",
          body: "Grover iteration = Diffusion Operator ∘ Oracle\n\nEach iteration rotates the state vector closer to the target's basis state within a 2D subspace.",
        },
        bullets: [
          "The diffusion operator reflects amplitudes around their average.",
          "This amplifies the marked target's amplitude while suppressing others.",
          "One Grover iteration = oracle application + diffusion application.",
          "Each iteration rotates the state predictably closer to the target.",
        ],
      },
      {
        id: "m5-l4",
        title: "Optimal Iteration Count & Over-Rotation",
        content: [
          "Repeating Grover iterations doesn't help indefinitely: the state's rotation toward the target is periodic, and applying too many iterations rotates past the target, actually decreasing the probability of measuring it — a phenomenon known as over-rotation. There's a precise optimal number of iterations, approximately (π/4)√N, that maximizes target probability.",
          "Getting this number right matters practically: for a database of a known size N, calculating and using the optimal iteration count (rather than guessing or over-iterating) is the difference between a >90% success probability and a search that actually performs worse than a lucky classical guess.",
        ],
        code: {
          label: "Optimal Grover iteration count",
          body: "Optimal iterations ≈ (π/4) · √N\n\nToo few: insufficient amplification\nToo many: over-rotation reduces target probability",
        },
        bullets: [
          "Rotation toward the target is periodic, not monotonically increasing forever.",
          "Over-rotation past the optimal point decreases target probability.",
          "Optimal iteration count ≈ (π/4)√N.",
          "Using the correct iteration count is essential for high measurement confidence.",
        ],
      },
    ],
    lab: {
      title: "3-Qubit Grover's Search with a Custom Phase Oracle",
      description:
        "Program a 3-qubit unstructured search algorithm using Grover's execution blocks. Implement a phase oracle that highlights a specific state, visualize the amplitude amplification steps, and retrieve the correct index with over 90% confidence.",
      steps: [
        "Build a 3-qubit circuit initialized into equal superposition with Hadamard gates.",
        "Construct a phase oracle marking one specific target state out of the 8 possible states.",
        "Implement the diffusion operator and calculate the optimal number of iterations for N=8.",
        "Run the full Grover circuit and plot the amplitude/probability distribution after each iteration.",
        "Confirm the target state is retrieved with over 90% measurement confidence.",
      ],
    },
    quiz: [
      {
        question:
          "What speedup does Grover's algorithm provide over classical unstructured search, and how does that compare to Deutsch-Jozsa?",
        options: [
          "An exponential speedup, identical to Deutsch-Jozsa",
          "A quadratic speedup (O(√N) vs. O(N)) — more modest than Deutsch-Jozsa's exponential speedup, but still highly significant for large N",
          "No speedup at all compared to classical search",
          "A speedup only achievable on physical hardware, never in simulation",
        ],
        answerIndex: 1,
        explanation:
          "Grover's algorithm reduces the query complexity from O(N) to O(√N) — a quadratic speedup, more modest than Deutsch-Jozsa's exponential result, but still dramatically valuable for large search spaces.",
      },
      {
        question:
          "What is the function of the diffusion operator in a Grover iteration?",
        options: [
          "It marks the target state with a phase flip",
          "It reflects all amplitudes around their average, amplifying the marked target's amplitude while suppressing the others",
          "It measures the qubits directly",
          "It replaces the need for an oracle",
        ],
        answerIndex: 1,
        explanation:
          "After the oracle marks the target with a negative phase, the diffusion operator reflects all amplitudes around the mean — since the target is now below average, this reflection pushes it further above average, amplifying its measurement probability.",
      },
      {
        question:
          "Why is it important to calculate the optimal number of Grover iterations rather than simply applying as many as possible?",
        options: [
          "More iterations always increase accuracy with no downside",
          "The rotation toward the target is periodic, so applying too many iterations causes over-rotation and actually decreases the probability of measuring the correct target",
          "Extra iterations only slow down classical post-processing, not the result itself",
          "The oracle stops working after a fixed number of iterations",
        ],
        answerIndex: 1,
        explanation:
          "Grover's rotation is periodic within a 2D subspace. Exceeding the optimal iteration count (approximately (π/4)√N) rotates the state past the target, reducing rather than increasing the probability of a correct measurement.",
      },
    ],
  },
  {
    id: "module-6",
    week: 6,
    title: "Cryptography, Prime Factoring & Shor's Algorithm",
    objective:
      "Explore the mathematical mechanics behind quantum prime factorization and its fundamental threat to modern encryption standards.",
    lessons: [
      {
        id: "m6-l1",
        title: "RSA Encryption & the Hardness of Factoring",
        content: [
          "RSA encryption, which secures a huge share of modern financial and communications infrastructure, relies on a simple asymmetry: multiplying two large prime numbers together is fast, but factoring their product back into those two primes is believed to be computationally infeasible for classical computers at sufficiently large key sizes.",
          "This asymmetry is the entire security foundation of RSA — anyone can know the public product, but only someone who knows the two original prime factors can efficiently derive the private key. The security of trillions of dollars in encrypted transactions rests on factoring staying hard.",
        ],
        bullets: [
          "RSA security relies on multiplication being easy but factoring being hard.",
          "Classical factoring of large numbers is believed computationally infeasible at scale.",
          "This asymmetry lets a public key be shared while the private key stays secret.",
          "A large fraction of modern secure infrastructure depends on this assumption holding.",
        ],
      },
      {
        id: "m6-l2",
        title: "Quantum Phase Estimation",
        content: [
          "Quantum Phase Estimation (QPE) is a general-purpose subroutine that finds the eigenvalue (specifically, the phase) associated with an eigenvector of a unitary operator, encoded into a register of qubits via repeated controlled applications of that operator followed by an inverse Quantum Fourier Transform.",
          "QPE is the key building block reused across many quantum algorithms beyond factoring — including the Variational Quantum Eigensolver in Module 7 — because 'find the eigenvalue of a unitary' turns out to be a surprisingly general and useful primitive across physics and computation.",
        ],
        bullets: [
          "QPE estimates the eigenvalue (phase) of a unitary operator's eigenvector.",
          "It uses repeated controlled operations plus an inverse QFT.",
          "QPE is a reusable subroutine, not just specific to factoring.",
          "It underlies both Shor's algorithm and later variational algorithms.",
        ],
      },
      {
        id: "m6-l3",
        title: "Period Finding: Shor's Algorithm's Quantum Core",
        content: [
          "Shor's algorithm cleverly reduces integer factoring to a different problem: finding the period of a specific modular exponentiation function. Classically, finding this period is itself hard for large numbers — but it turns out to be exactly the kind of problem Quantum Phase Estimation is built to solve efficiently.",
          "Once the quantum computer finds the period using QPE, the rest of the algorithm — recovering the actual prime factors from that period — is straightforward classical arithmetic (using the greatest common divisor). This classical-quantum split is characteristic of many practical quantum algorithms: the quantum part solves the one genuinely hard subproblem, and classical computation handles the rest.",
        ],
        bullets: [
          "Shor's algorithm reduces factoring to finding the period of a modular exponentiation function.",
          "Classical period-finding is hard for large numbers; quantum period-finding is efficient via QPE.",
          "Recovering the prime factors from the period is simple classical arithmetic (GCD).",
          "This classical-quantum split is a common pattern in practical quantum algorithms.",
        ],
      },
      {
        id: "m6-l4",
        title: "The QFT & Post-Quantum Cryptography",
        content: [
          "The Quantum Fourier Transform (QFT) is the quantum analog of the classical discrete Fourier transform, converting amplitude information encoded in the computational basis into frequency (phase) information — the exact operation QPE relies on to extract the period found by the modular exponentiation step.",
          "Because a sufficiently large, fault-tolerant quantum computer running Shor's algorithm could break RSA and similar encryption schemes, the security community has developed Post-Quantum Cryptography (PQC): new algorithms, notably lattice-based schemes, believed to remain hard even for quantum computers, now being standardized for migration ahead of that threat materializing.",
        ],
        bullets: [
          "The QFT converts computational-basis amplitude information into frequency/phase information.",
          "QFT is the operation that extracts the period found during Shor's algorithm.",
          "A large enough quantum computer running Shor's algorithm threatens RSA-style encryption.",
          "Post-Quantum Cryptography (e.g. lattice-based schemes) is being standardized to resist this threat.",
        ],
      },
    ],
    lab: {
      title: "Building a 3-Qubit Quantum Fourier Transform Circuit",
      description:
        "Build a functional Quantum Fourier Transform (QFT) circuit template in Qiskit for three qubits, trace the phase changes programmatically, and observe how states change in frequency.",
      steps: [
        "Construct a 3-qubit QFT circuit in Qiskit using Hadamard and controlled-phase gates.",
        "Initialize a basis state and apply the QFT, tracing the resulting amplitudes and phases.",
        "Verify the inverse QFT correctly reverses the transformation.",
        "Compare the QFT circuit's structure to the classical discrete Fourier transform conceptually.",
        "Discuss how this QFT template would plug into a full period-finding routine for Shor's algorithm.",
      ],
    },
    quiz: [
      {
        question:
          "What computational asymmetry underlies the security of RSA encryption?",
        options: [
          "Addition is hard while subtraction is easy",
          "Multiplying two large primes together is fast, but factoring their product back into those primes is believed infeasible for classical computers at scale",
          "Encryption and decryption always take the same amount of time",
          "RSA relies on quantum properties directly",
        ],
        answerIndex: 1,
        explanation:
          "RSA's security rests on the fact that multiplying two large primes is computationally cheap, while factoring the resulting product back into its prime components is believed to be classically infeasible for sufficiently large numbers.",
      },
      {
        question:
          "How does Shor's algorithm use Quantum Phase Estimation to factor large numbers?",
        options: [
          "QPE directly outputs the prime factors with no further computation needed",
          "Shor's algorithm reduces factoring to finding the period of a modular exponentiation function, which QPE finds efficiently; the actual prime factors are then recovered via simple classical arithmetic",
          "QPE is unrelated to Shor's algorithm",
          "QPE only works on already-factored numbers",
        ],
        answerIndex: 1,
        explanation:
          "Shor's algorithm transforms factoring into a period-finding problem. QPE efficiently finds that period on a quantum computer, after which classical arithmetic (using the GCD) recovers the actual prime factors.",
      },
      {
        question:
          "Why is Post-Quantum Cryptography (PQC) being developed and standardized now, even though large-scale fault-tolerant quantum computers don't yet exist?",
        options: [
          "Because classical computers are becoming too slow for current encryption",
          "Because a sufficiently large quantum computer running Shor's algorithm could break RSA-style encryption, so new quantum-resistant schemes must be standardized and migrated to well ahead of that threat materializing",
          "Because PQC makes classical encryption completely obsolete today",
          "Because PQC is only relevant for post-processing quantum measurement errors",
        ],
        answerIndex: 1,
        explanation:
          "Because encrypted data and infrastructure need long lead times to migrate, and because a future large-scale quantum computer running Shor's algorithm threatens current RSA-style encryption, PQC standards (like lattice-based schemes) are being developed and adopted proactively now.",
      },
    ],
  },
  {
    id: "module-7",
    week: 7,
    title: "NISQ-Era Applications & Quantum Chemistry",
    objective:
      "Program Hybrid Classical-Quantum algorithms designed to execute on noisy, near-term physical processors.",
    lessons: [
      {
        id: "m7-l1",
        title: "The NISQ Era: Noisy Intermediate-Scale Quantum Hardware",
        content: [
          "Today's physical quantum computers are Noisy Intermediate-Scale Quantum (NISQ) devices: they have a meaningful but still limited number of qubits, and — critically — they are noisy, meaning gate operations and qubit states are imperfect and errors accumulate as circuits grow deeper. Algorithms like Shor's, which need long, precise, fault-tolerant circuits, aren't yet practical on real hardware at useful problem sizes.",
          "NISQ-era algorithm design works around this reality rather than ignoring it: favoring shallow circuits, hybrid classical-quantum loops that offload as much work as possible to reliable classical computers, and problems that remain useful even with some noise-induced error.",
        ],
        bullets: [
          "NISQ devices have a limited qubit count and imperfect, noisy operations.",
          "Errors accumulate as circuit depth increases.",
          "Long, precise algorithms like Shor's aren't yet practical on current hardware.",
          "NISQ algorithm design favors shallow circuits and hybrid classical-quantum loops.",
        ],
      },
      {
        id: "m7-l2",
        title: "Quantum Decoherence: T1, T2 & Gate Error Rates",
        content: [
          "A qubit's quantum state doesn't last forever — decoherence describes the process by which environmental interaction destroys quantum information over time. T1 (relaxation time) measures how long a qubit maintains its excited state before decaying; T2 (dephasing time) measures how long it maintains phase coherence, which is typically shorter and even more fragile.",
          "Every gate applied to real hardware also has an associated error rate — a small probability the operation didn't execute perfectly. These two effects compound: the longer and deeper a circuit runs, the more decoherence and gate errors accumulate, which is precisely why NISQ-era algorithms are designed to be as shallow as the problem allows.",
        ],
        bullets: [
          "Decoherence is the loss of quantum information through environmental interaction.",
          "T1: how long a qubit holds its excited state before relaxing.",
          "T2: how long a qubit maintains phase coherence (typically shorter than T1).",
          "Gate error rates and decoherence both worsen as circuit depth increases.",
        ],
      },
      {
        id: "m7-l3",
        title: "Variational Quantum Algorithms & the VQE",
        content: [
          "Variational Quantum Algorithms (VQAs) use a parameterized quantum circuit (an 'ansatz') whose parameters are tuned by a classical optimizer in a feedback loop: the quantum computer evaluates the circuit and measures a cost function, the classical optimizer adjusts the parameters to improve that cost, and the loop repeats — splitting the workload so the quantum processor only does what it must.",
          "The Variational Quantum Eigensolver (VQE) is the flagship VQA: it finds the ground-state (lowest) energy of a quantum system — most notably molecules — by using this hybrid loop to minimize the expected energy of a parameterized trial state, a problem central to quantum chemistry and materials science.",
        ],
        bullets: [
          "VQAs use a parameterized quantum circuit tuned by a classical optimizer.",
          "The quantum and classical parts share the workload in a repeated feedback loop.",
          "VQE finds a system's ground-state energy by minimizing an expected energy measurement.",
          "VQE is central to quantum chemistry applications like molecular simulation.",
        ],
      },
      {
        id: "m7-l4",
        title: "Finding Ground-State Energies with Classical Optimization",
        content: [
          "Finding a molecule's ground-state energy classically requires exponentially growing computational resources as the molecule gets larger, because the underlying quantum mechanical problem itself scales exponentially — exactly the kind of problem quantum computers are suited to represent natively.",
          "SPSA (Simultaneous Perturbation Stochastic Approximation) is a popular classical optimizer for the VQE loop specifically because it's robust to the noisy, imprecise energy measurements NISQ hardware produces — unlike gradient-based methods that assume clean, precise measurements at every step.",
        ],
        bullets: [
          "Molecular ground-state energy calculation scales exponentially for classical computers.",
          "Quantum computers can represent the molecular Hamiltonian's structure more natively.",
          "SPSA is a noise-robust classical optimizer well-suited to the VQE feedback loop.",
          "The hybrid loop iteratively narrows in on the true ground-state energy despite hardware noise.",
        ],
      },
    ],
    lab: {
      title: "A Hybrid VQE Loop for a Mock Molecular Hamiltonian",
      description:
        "Build a parameterized quantum circuit using Qiskit. Use a hybrid classical optimizer (such as SPSA) to iteratively update quantum parameters, finding the minimum eigenvalue of a mock molecular Hamiltonian.",
      steps: [
        "Define a mock molecular Hamiltonian as a small matrix with a known minimum eigenvalue.",
        "Build a parameterized ansatz circuit in Qiskit with adjustable rotation angles.",
        "Wire an SPSA classical optimizer to iteratively adjust the ansatz parameters based on measured energy.",
        "Run the hybrid loop and track convergence of the measured energy toward the true minimum eigenvalue.",
        "Compare the VQE result against the exact classically-computed eigenvalue and discuss the error margin.",
      ],
    },
    quiz: [
      {
        question:
          "Why do NISQ-era algorithms favor shallow circuits and hybrid classical-quantum loops?",
        options: [
          "Because deep circuits run faster on classical computers",
          "Because current physical hardware is noisy and error-prone, so shallow circuits limit the accumulation of decoherence and gate errors while offloading heavy computation to reliable classical processors",
          "Because shallow circuits use fewer qubits, which is required by law",
          "Because Qiskit does not support deep circuits",
        ],
        answerIndex: 1,
        explanation:
          "NISQ hardware has limited qubits and imperfect gates, so errors compound as circuits grow deeper. Hybrid algorithms deliberately keep the quantum portion shallow and offload as much work as possible to reliable classical computation.",
      },
      {
        question:
          "What is the difference between a qubit's T1 and T2 decoherence times?",
        options: [
          "They measure the exact same physical property",
          "T1 measures how long a qubit holds its excited state before relaxing; T2 measures how long it maintains phase coherence, and is typically shorter and more fragile",
          "T1 only applies to multi-qubit systems",
          "T2 is always longer than T1",
        ],
        answerIndex: 1,
        explanation:
          "T1 (relaxation time) describes energy decay from the excited state, while T2 (dephasing time) describes loss of phase coherence — T2 is generally shorter and more sensitive to environmental noise than T1.",
      },
      {
        question:
          "Why is SPSA a commonly used classical optimizer for the VQE feedback loop?",
        options: [
          "It requires perfectly precise, noise-free measurements to function",
          "It is robust to the noisy, imprecise energy measurements produced by NISQ hardware, unlike gradient-based methods that assume clean measurements",
          "It eliminates the need for a parameterized quantum circuit",
          "It only works for problems with more than 100 qubits",
        ],
        answerIndex: 1,
        explanation:
          "SPSA is specifically well-suited to VQE because it can tolerate the noisy, imprecise energy measurements typical of NISQ hardware, whereas many gradient-based optimizers assume more precise, low-noise measurements.",
      },
    ],
  },
  {
    id: "module-8",
    week: 8,
    title: "Capstone — Real-Hardware Deployment",
    objective:
      "Structure, execute, and analyze a custom quantum program deployed onto cloud-connected physical quantum computers.",
    lessons: [
      {
        id: "m8-l1",
        title: "Accessing Physical Systems via the IBM Quantum Cloud API",
        content: [
          "Running a circuit on real quantum hardware starts with the IBM Quantum Platform's cloud API: authenticating, selecting a target backend (a specific physical quantum processor), and submitting a circuit as a job rather than executing it locally the way Aer simulation does.",
          "Choosing a backend matters — different physical processors have different qubit counts, connectivity, and current error rates, and the platform exposes this information so you can choose a machine well-suited to your circuit's size and required fidelity before submitting.",
        ],
        bullets: [
          "The IBM Quantum Platform exposes physical QPUs through a cloud API.",
          "Circuits are submitted as jobs rather than executed synchronously like local simulation.",
          "Different physical backends vary in qubit count, connectivity, and error rates.",
          "Choosing the right backend for your circuit's needs matters before submission.",
        ],
      },
      {
        id: "m8-l2",
        title: "Transpilation: Fitting Abstract Circuits to Physical Hardware",
        content: [
          "An abstract circuit written with arbitrary gates and qubit connections often can't run directly on a physical chip: real hardware has a fixed coupling map (which physical qubits can directly interact) and a native basis gate set (the specific gates the hardware actually implements). Transpilation rewrites your circuit to satisfy both constraints.",
          "This process can add SWAP gates to route information between qubits that aren't directly connected, and decompose unsupported gates into sequences of native ones — meaningfully increasing circuit depth in the process, which is exactly why transpilation quality directly affects how much noise your results will accumulate.",
        ],
        bullets: [
          "Transpilation adapts an abstract circuit to a specific chip's physical constraints.",
          "The coupling map defines which physical qubits can directly interact.",
          "The basis gate set defines which gates the hardware natively implements.",
          "Transpilation can add SWAP gates and increase circuit depth, affecting noise accumulation.",
        ],
      },
      {
        id: "m8-l3",
        title: "Job Queues, Read-Out Errors & Result Analysis",
        content: [
          "Physical quantum processors are shared, scarce resources: submitted jobs enter a queue and execute when the hardware becomes available, which is a very different operational model than instantly running a local simulation. Planning experiments around queue times is a real part of working with cloud-connected QPUs.",
          "Read-out (measurement) errors — where a qubit's true state is misreported during measurement — are a distinct noise source from gate errors, and can be partially corrected after the fact using post-processing techniques like measurement error mitigation, which characterizes the hardware's specific error pattern and statistically corrects raw counts accordingly.",
        ],
        bullets: [
          "Physical QPU jobs enter a shared queue rather than executing instantly.",
          "Read-out errors are a distinct noise source from gate errors.",
          "Measurement error mitigation statistically corrects raw counts post-hoc.",
          "Real hardware results must always be compared against ideal simulation for context.",
        ],
      },
    ],
    lab: {
      title: "Capstone: End-to-End Quantum Circuit Pipeline on Real Hardware",
      description:
        "Design and execute an End-to-End Quantum Circuit Pipeline: select a target problem, verify it via Qiskit Aer simulation, run it on a physical IBM QPU via cloud access, and perform error analysis comparing hardware results to the ideal simulation.",
      steps: [
        "Select a target quantum problem: Grover's Search, a Quantum Teleportation chain, or a parameterized VQE module.",
        "Implement and verify the circuit design using Qiskit Aer local simulation.",
        "Transpile the circuit for a chosen physical IBM QPU backend and review the resulting coupling and gate changes.",
        "Submit the job to the physical QPU via the IBM Quantum Cloud API and retrieve results once the queue clears.",
        "Compare experimental outputs against ideal simulator outputs, apply measurement error mitigation, and package the code, math derivations, and noise analysis into a Jupyter Notebook.",
      ],
    },
    quiz: [
      {
        question:
          "Why is transpilation a necessary step before running a circuit on physical quantum hardware?",
        options: [
          "It is only needed for circuits with more than 50 qubits",
          "Real hardware has a fixed coupling map and native basis gate set, so the abstract circuit must be rewritten to satisfy those physical constraints, sometimes adding SWAP gates and increasing depth",
          "It replaces the need for local simulation entirely",
          "It only affects circuits that use Grover's algorithm",
        ],
        answerIndex: 1,
        explanation:
          "Physical chips can only directly connect certain qubits and only natively implement a specific gate set. Transpilation rewrites the abstract circuit to respect both, which can add SWAP gates and increase circuit depth — directly affecting noise accumulation.",
      },
      {
        question:
          "What distinguishes a read-out (measurement) error from a gate error on physical quantum hardware?",
        options: [
          "They are identical and can be corrected the same way",
          "Read-out errors occur specifically during the measurement step, misreporting a qubit's true state, and can be partially corrected via post-processing techniques distinct from gate error mitigation",
          "Read-out errors only occur in local simulation, never on real hardware",
          "Gate errors cannot be characterized or corrected at all",
        ],
        answerIndex: 1,
        explanation:
          "Read-out errors specifically affect the measurement step, misreporting the true qubit state, and can be statistically corrected after the fact using measurement error mitigation — a distinct noise source and correction approach from gate errors during circuit execution.",
      },
      {
        question:
          "Why does the capstone require comparing experimental hardware results against ideal simulator outputs?",
        options: [
          "Because simulators are always more accurate and hardware results should be discarded",
          "Because it isolates the impact of physical noise (decoherence, gate errors, read-out errors) by contrasting the noisy real-world result against the theoretically correct answer",
          "Because the IBM Quantum Platform requires this comparison to accept a job",
          "Because ideal simulator outputs are randomly generated and need verification",
        ],
        answerIndex: 1,
        explanation:
          "Comparing physical hardware output to the ideal (noise-free) simulator result isolates exactly how much error was introduced by real-world physical noise sources, which is the core of the capstone's required error analysis.",
      },
    ],
  },
];
