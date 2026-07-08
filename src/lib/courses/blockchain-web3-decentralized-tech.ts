import type { CourseMeta, CourseModule } from "@/lib/courses/types";

export const courseMeta: CourseMeta = {
  slug: "blockchain-web3-decentralized-tech",
  title: "Blockchain, Web3 & Decentralized Tech",
  tagline:
    "Smart Contracts, Decentralized Systems, and Cryptographic Innovation (2026 Edition)",
  duration: "9 Modules",
  pace: "6–8 hours/week",
  level: "Intermediate to Advanced",
  prerequisites: [
    "Strong programming foundations (JavaScript, Python, or Go)",
    "Basic Web2 development experience (APIs, simple frontends)",
    "Comfort with cryptographic concepts (public/private keys, hashing)",
  ],
  overview: [
    "In 2026, blockchain technology has evolved past speculative assets into an institutional-grade trust layer for decentralized applications (dApps), supply chains, secure identity structures, and privacy-preserving computations. Understanding how to build on these decentralized state machines is crucial for modern back-end, security, and systems engineers.",
    "This course is a comprehensive, engineering-focused exploration of decentralized systems. You'll learn to write secure smart contracts in Solidity, use world-class developer suites like Foundry or Hardhat, implement robust cryptographic access controls, and design decentralized storage solutions. The course also explores the cutting-edge frontier of Zero-Knowledge Proofs (ZKPs) and decentralized scaling architectures.",
  ],
  objectives: [
    "Explain the mechanics of consensus algorithms (Proof of Stake, Proof of Authority) and state machines.",
    "Develop, test, and deploy secure, optimized smart contracts in Solidity.",
    "Prevent common smart contract vulnerabilities (Reentrancy, Integer Overflow, Frontrunning) using static analyzers and modern design patterns.",
    "Build robust decentralized frontends that interact with the blockchain state via web libraries.",
    "Architect decentralized storage pipelines integrating IPFS and Filecoin.",
    "Implement basic Zero-Knowledge Proofs (ZKPs) to verify computations without exposing private data.",
  ],
  tools: [
    { category: "Smart Contract Languages", items: "Solidity (v0.8.x)" },
    { category: "Development Environments", items: "Foundry (Forge, Cast, Anvil), Hardhat" },
    {
      category: "Libraries & Frameworks",
      items: "OpenZeppelin (ERC-20, ERC-721, Access Control), Ethers.js / Viem, Wagmi",
    },
    { category: "Decentralized Storage", items: "IPFS, Pinata" },
    { category: "ZKP Tooling", items: "Circom, SnarkJS" },
  ],
  grading: [
    {
      component: "Weekly Coding Labs",
      weight: "40%",
      detail:
        "Practical verification of Solidity contracts, unit tests, and dApp interfaces.",
    },
    {
      component: "Midterm Assessment",
      weight: "20%",
      detail:
        "Structured audit of an existing codebase to locate and patch 5 structural vulnerabilities.",
    },
    {
      component: "Capstone Project",
      weight: "40%",
      detail:
        "Assessed on system architecture, security robustness, unit testing coverage (>90%), user experience, and technical documentation.",
    },
  ],
};

export const courseModules: CourseModule[] = [
  {
    id: "module-1",
    week: 1,
    title: "Blockchain Internals & Cryptographic Baselines",
    objective:
      "Understand how distributed ledgers maintain consistent state and execute transactions securely without central intermediaries.",
    lessons: [
      {
        id: "m1-l1",
        title: "Peer-to-Peer Networks & State Machine Models",
        content: [
          "A blockchain is fundamentally a replicated state machine: every participating node maintains an identical copy of the current state (account balances, contract storage) and applies the same sequence of transactions to transition from one state to the next. No single node's copy is authoritative — consensus among peers is what makes a version of the state 'true.'",
          "This peer-to-peer topology, with no central server, is what gives blockchains their core property: censorship resistance. No single node can unilaterally alter history or block a valid transaction, because every honest peer will reject a state transition that doesn't follow the agreed-upon rules.",
        ],
        bullets: [
          "A blockchain is a replicated state machine: every node holds an identical state copy.",
          "Consensus among peers — not a central authority — determines the 'true' state.",
          "No central server exists; nodes communicate directly, peer-to-peer.",
          "This gives blockchains censorship resistance: no single node can unilaterally alter history.",
        ],
      },
      {
        id: "m1-l2",
        title: "Cryptographic Fundamentals: Hashing & ECDSA",
        content: [
          "Cryptographic hash functions like SHA-256 and Keccak-256 (used natively throughout Ethereum) take arbitrary input data and produce a fixed-size, deterministic output — and critically, even a tiny change to the input produces a completely different hash. This property is what lets a blockchain 'link' blocks together: each block includes the hash of the previous block, so altering any historical block would change its hash and break every subsequent link.",
          "Elliptic Curve Cryptography (via the ECDSA algorithm) is how accounts prove ownership without ever revealing their private key: a private key mathematically derives a public key and, from that, an account address, and any message signed with the private key can be verified against the public key by anyone — without the verifier ever needing the private key itself.",
        ],
        bullets: [
          "Hash functions (SHA-256, Keccak-256) produce a fixed-size, deterministic output.",
          "A tiny input change produces a completely different hash output.",
          "Blocks link together via each block containing the previous block's hash.",
          "ECDSA lets an account prove ownership via signatures, without revealing its private key.",
        ],
      },
      {
        id: "m1-l3",
        title: "Anatomy of a Transaction",
        content: [
          "Every Ethereum transaction bundles several essential fields: a nonce (a strictly increasing per-account counter that prevents the same signed transaction from being replayed twice), a gas limit and gas price (the fee mechanism that compensates the network for computation and prevents infinite loops from running forever), and a cryptographic signature proving the sender authorized it.",
          "When a transaction executes, it produces a state change — an updated account balance, a modified contract storage slot — that every node independently recomputes and verifies matches, which is exactly what keeps every node's copy of the state in agreement without needing to trust the transaction's original submitter.",
        ],
        bullets: [
          "Nonce: a per-account counter preventing transaction replay.",
          "Gas limit/price: fee mechanism that pays for computation and bounds infinite loops.",
          "Signature: cryptographic proof the sender authorized the transaction.",
          "Every node independently recomputes the resulting state change to stay in agreement.",
        ],
      },
      {
        id: "m1-l4",
        title: "Consensus: PoW, PoS & Layer-2 Rollups",
        content: [
          "Proof of Work (PoW) selects the node that gets to propose the next block by requiring expensive computational effort (mining), making it costly to attack the network but also costly in raw energy consumption. Proof of Stake (PoS) instead selects proposers based on economically staked capital at risk — misbehavior gets a validator's stake slashed, achieving similar security guarantees with dramatically less energy use, which is why Ethereum transitioned to PoS.",
          "Layer-2 Rollups take a different approach to scaling entirely: rather than changing consensus, they execute transactions off the main chain (Layer-1) in batches, then post a compressed summary and cryptographic proof of validity back to Layer-1 — inheriting Layer-1's security guarantees while dramatically increasing throughput and reducing per-transaction cost.",
        ],
        bullets: [
          "PoW: expensive computation selects block proposers — secure but energy-intensive.",
          "PoS: staked capital at risk selects proposers — similar security, far less energy use.",
          "Layer-2 Rollups execute transactions off-chain, then post proofs back to Layer-1.",
          "Rollups inherit Layer-1 security while boosting throughput and lowering costs.",
        ],
      },
    ],
    lab: {
      title: "Building a Zero-Dependency Blockchain from Scratch",
      description:
        "Use Python/JavaScript to construct a localized, zero-dependency cryptographic blockchain from scratch, manually hashing blocks, linking parent chains, and implementing a basic Proof of Work mining loop.",
      steps: [
        "Define a Block structure containing an index, timestamp, transactions, previous hash, and nonce.",
        "Implement a hashing function (SHA-256) that hashes a block's full contents.",
        "Link each new block to its parent by including the parent's hash.",
        "Implement a basic Proof of Work mining loop that searches for a nonce producing a hash below a target difficulty.",
        "Validate the full chain by re-verifying every block's hash and parent link from genesis to tip.",
      ],
    },
    quiz: [
      {
        question:
          "Why is a blockchain described as a 'replicated state machine' rather than a single central database?",
        options: [
          "Because only one designated server holds the real data",
          "Because every participating node independently maintains an identical copy of the state and applies the same transactions, with consensus among peers determining the true state rather than any central authority",
          "Because blockchains do not actually track any state",
          "Because nodes only communicate through a central coordinating server"
        ],
        answerIndex: 1,
        explanation:
          "Every node holds its own copy of the full state and independently applies the same agreed-upon transactions. No single node is authoritative — the network's consensus mechanism is what determines which version of the state is considered valid.",
      },
      {
        question:
          "What is the primary security trade-off between Proof of Work and Proof of Stake consensus?",
        options: [
          "PoW and PoS provide identical security with identical energy costs",
          "PoW secures the network through expensive computational effort (energy-intensive), while PoS secures it through staked capital at risk (slashed on misbehavior), achieving similar security with far less energy consumption",
          "PoS requires more computational power than PoW",
          "Neither mechanism actually prevents malicious behavior"
        ],
        answerIndex: 1,
        explanation:
          "PoW achieves security by making block proposal computationally expensive, while PoS achieves comparable security by putting a validator's staked capital at risk of slashing — delivering similar guarantees with dramatically lower energy use, which motivated Ethereum's transition to PoS.",
      },
      {
        question:
          "What is the purpose of the 'nonce' field in an Ethereum transaction?",
        options: [
          "It sets the price of gas for the transaction",
          "It is a strictly increasing per-account counter that prevents the same signed transaction from being replayed twice",
          "It stores the recipient's public key",
          "It determines which miner processes the transaction"
        ],
        answerIndex: 1,
        explanation:
          "The nonce is a per-account, strictly increasing counter. It ensures each signed transaction can only be processed once, preventing an attacker from resubmitting (replaying) a previously valid signed transaction.",
      },
    ],
  },
  {
    id: "module-2",
    week: 2,
    title: "Smart Contract Engineering with Solidity",
    objective:
      "Master the syntax, variables, storage layout, and execution model of Ethereum's main language, Solidity.",
    lessons: [
      {
        id: "m2-l1",
        title: "Solidity Syntax & Data Structures",
        content: [
          "Solidity is a statically-typed, contract-oriented language: variables have fixed types (uint256, address, bool, bytes32), structs group related fields together, mappings provide key-value storage (conceptually similar to a hash map, though with important gas and iteration differences from arrays), and arrays hold ordered, sometimes dynamically-sized collections.",
          "Every value in Solidity lives in one of a few explicit data locations, and understanding this from day one prevents a huge share of beginner bugs: the same variable declared as `storage`, `memory`, or `calldata` behaves completely differently in terms of persistence and cost — a lesson explored in depth in the next lesson.",
        ],
        bullets: [
          "Solidity is statically-typed: uint256, address, bool, bytes32, and more.",
          "Structs group related fields into a single custom type.",
          "Mappings provide key-value storage, distinct from arrays in gas cost and iteration.",
          "Every variable lives in an explicit data location: storage, memory, or calldata.",
        ],
      },
      {
        id: "m2-l2",
        title: "The EVM: Storage vs. Memory vs. Calldata",
        content: [
          "Storage is the contract's permanent, on-chain state — persisted between transactions, and by far the most expensive place to read and (especially) write data, since every node must permanently store it. Memory is a temporary, function-scoped byte array, wiped after the function call ends — much cheaper than storage, used for working data during execution.",
          "Calldata is the read-only area holding the exact input data of an external call (function arguments passed in from outside the contract) — the cheapest location of all, since it doesn't even require the EVM to copy the data into memory first. Choosing the wrong location — for example, unnecessarily copying a function parameter from calldata into memory — is one of the most common, and easily fixed, sources of wasted gas in real contracts.",
        ],
        code: {
          label: "Data location cost hierarchy (cheapest to most expensive)",
          body: "calldata  (read-only, external call inputs — cheapest)\nmemory    (temporary, function-scoped — moderate cost)\nstorage   (permanent, on-chain state — most expensive)",
        },
        bullets: [
          "Storage: permanent on-chain state, persisted between transactions, most expensive.",
          "Memory: temporary, function-scoped, wiped after execution, moderate cost.",
          "Calldata: read-only external call input data, the cheapest location.",
          "Choosing the wrong location is a common, easily fixable source of wasted gas.",
        ],
      },
      {
        id: "m2-l3",
        title: "Contract Structure: Functions, Modifiers & Events",
        content: [
          "A contract's constructor runs exactly once at deployment, typically initializing state. Functions can be marked `view` (reads state, makes no changes) or `pure` (touches no state at all, not even reading it) — both cost no gas when called externally as a simple read, since no state transition needs to be recorded on-chain.",
          "Modifiers wrap reusable precondition logic (like an `onlyOwner` check) around multiple functions without repeating the same `require` statement everywhere. Events are the mechanism for a contract to emit structured logs that external applications (like a frontend) can subscribe to — cheaper than storage for data that only needs to be read off-chain, not referenced by other contract logic.",
        ],
        bullets: [
          "Constructors run once, at deployment, typically to initialize state.",
          "view functions read state; pure functions touch no state at all — both free to call externally.",
          "Modifiers wrap reusable precondition checks (like onlyOwner) around multiple functions.",
          "Events emit structured logs for off-chain consumption, cheaper than storage.",
        ],
      },
      {
        id: "m2-l4",
        title: "Sending & Receiving Native Ether",
        content: [
          "Solidity offers several ways to send Ether, each with different trade-offs: `transfer` sends Ether and reverts automatically on failure but forwards a fixed, small gas stipend (now considered risky against certain patterns); `send` is similar but returns a boolean instead of reverting, requiring manual error checking; `call` forwards all remaining gas by default and is the current recommended approach, but requires careful handling of its return value.",
          "A contract receives Ether through its `receive()` function (triggered by a plain Ether transfer with no data) or its `fallback()` function (triggered when no other function matches the call, optionally with data) — both must be marked `payable` to accept incoming funds, and understanding exactly which one fires under which circumstance is essential for building contracts that handle Ether correctly.",
        ],
        code: {
          label: "The modern recommended pattern for sending Ether",
          body: "(bool success, ) = recipient.call{value: amount}(\"\");\nrequire(success, \"Transfer failed\");",
        },
        bullets: [
          "transfer: reverts on failure, fixed gas stipend — now considered risky in some patterns.",
          "send: returns a boolean instead of reverting, requires manual checking.",
          "call: forwards all remaining gas, the current recommended approach.",
          "receive() and fallback() functions must be marked payable to accept incoming Ether.",
        ],
      },
    ],
    lab: {
      title: "A Decentralized Escrow Smart Contract",
      description:
        "Write and compile a Decentralized Escrow smart contract in Solidity that locks funds until a designated arbiter approves release, emitting relevant events to track settlement.",
      steps: [
        "Define contract state: buyer, seller, arbiter addresses, and the escrowed amount.",
        "Write a payable constructor or deposit function that locks the buyer's funds in the contract.",
        "Implement an arbiter-only function to release funds to the seller upon approval.",
        "Implement a refund path allowing the arbiter to return funds to the buyer if needed.",
        "Emit events for deposit, release, and refund, and verify correct behavior by compiling and running the contract locally.",
      ],
    },
    quiz: [
      {
        question:
          "Why is 'storage' the most expensive data location in Solidity, compared to 'memory' or 'calldata'?",
        options: [
          "Storage is a made-up term with no actual cost difference",
          "Storage represents the contract's permanent, on-chain state that every node must persist indefinitely, while memory and calldata are temporary and scoped only to the current execution",
          "Storage is only used for constants and never changes",
          "Memory is always more expensive than storage in Solidity"
        ],
        answerIndex: 1,
        explanation:
          "Storage persists permanently on-chain and must be maintained by every node in the network, making it the most gas-expensive data location. Memory and calldata are temporary and scoped to a single execution, making them far cheaper.",
      },
      {
        question:
          "What is the key difference between a 'view' function and a 'pure' function in Solidity?",
        options: [
          "There is no difference; they are interchangeable keywords",
          "A view function can read contract state but not modify it, while a pure function cannot even read state — both cost no gas when called externally as a simple read",
          "A pure function can modify state, while a view function cannot",
          "View functions always cost gas, while pure functions never do, even when called internally by another function that writes state"
        ],
        answerIndex: 1,
        explanation:
          "view functions may read state without modifying it, while pure functions cannot touch state at all, not even reading it. Both are free when called externally as standalone reads, since no state transition is recorded.",
      },
      {
        question:
          "Why is Solidity's `call` method now generally recommended over `transfer` or `send` for sending Ether?",
        options: [
          "call always uses less gas than transfer or send",
          "call forwards all remaining gas by default rather than a fixed stipend, which avoids failures against contracts requiring more gas than the fixed stipends allow, though it requires careful handling of the return value",
          "transfer and send have been removed from the Solidity language entirely",
          "call automatically reverts on any failure, unlike the other two methods"
        ],
        answerIndex: 1,
        explanation:
          "transfer and send forward only a small, fixed gas stipend, which can fail against recipient contracts needing more gas. call forwards all remaining gas by default, avoiding that failure mode, but developers must explicitly check its returned success boolean.",
      },
    ],
  },
  {
    id: "module-3",
    week: 3,
    title: "Advanced Smart Contracts & Token Standards",
    objective:
      "Write modular, standard-compliant contracts using industry-vetted libraries for custom asset generation.",
    lessons: [
      {
        id: "m3-l1",
        title: "OpenZeppelin: Battle-Tested Building Blocks",
        content: [
          "Writing token or access-control logic entirely from scratch is a common source of security bugs — subtle mistakes in something as 'simple' as a transfer function have caused real financial losses. OpenZeppelin provides audited, widely-used, standards-compliant contract implementations that developers inherit from and extend, rather than reinventing.",
          "Using OpenZeppelin isn't just a shortcut — it's a security practice: these contracts have been reviewed by thousands of engineers and battle-tested across billions of dollars in deployed value, giving a new contract a vastly stronger security baseline than a from-scratch implementation could achieve on day one.",
        ],
        bullets: [
          "Writing token/access-control logic from scratch is a common source of security bugs.",
          "OpenZeppelin provides audited, standards-compliant contracts to inherit from.",
          "Using vetted libraries is itself a core security practice, not just a convenience.",
          "These contracts are battle-tested across billions of dollars in deployed real-world value.",
        ],
      },
      {
        id: "m3-l2",
        title: "ERC-20: The Fungible Token Standard",
        content: [
          "ERC-20 defines the standard interface every fungible token (where each unit is interchangeable, like a currency) must implement: `transfer`, `approve`, `transferFrom`, `balanceOf`, and `totalSupply` among others — a common interface that lets any wallet, exchange, or dApp interact with any ERC-20 token without custom integration code per token.",
          "Customizing minting and burning behavior (who can create or destroy tokens, under what conditions, with what caps) is where most real-world token logic lives — building this custom logic on top of OpenZeppelin's audited ERC-20 base rather than modifying the core transfer logic itself keeps the security-critical parts unchanged while still enabling genuine customization.",
        ],
        bullets: [
          "ERC-20 defines a standard interface: transfer, approve, transferFrom, balanceOf, totalSupply.",
          "This common interface lets any wallet/exchange/dApp interact with any ERC-20 token uniformly.",
          "Custom minting/burning logic is where most real-world token customization lives.",
          "Build custom logic on top of the audited base rather than modifying core transfer logic.",
        ],
      },
      {
        id: "m3-l3",
        title: "NFTs: ERC-721 & ERC-1155",
        content: [
          "ERC-721 defines non-fungible tokens: each token ID is unique and individually ownable, backed by an interface (`ownerOf`, `tokenURI`, `safeTransferFrom`) that lets marketplaces and wallets universally display and trade any ERC-721 collection, from digital art to certificates of authenticity.",
          "ERC-1155 generalizes further into a multi-token standard: a single contract can manage many token types — fungible, non-fungible, or semi-fungible — under one contract, with batch transfer operations that move multiple token types in a single transaction, dramatically reducing gas costs for applications (like games) managing many item types at once.",
        ],
        bullets: [
          "ERC-721: unique, individually-owned non-fungible tokens with a standard interface.",
          "tokenURI links each token ID to its metadata (image, attributes, description).",
          "ERC-1155: a single contract manages many token types (fungible, NFT, semi-fungible).",
          "ERC-1155 batch transfers reduce gas costs for multi-item applications like games.",
        ],
      },
      {
        id: "m3-l4",
        title: "Access Control & Emergency Stop Patterns",
        content: [
          "Simple contract ownership (a single `owner` address with special privileges) works for small projects but doesn't scale to real organizations with multiple roles. OpenZeppelin's role-based access control (RBAC) lets a contract define distinct roles (MINTER_ROLE, PAUSER_ROLE, ADMIN_ROLE) and grant or revoke them independently, matching how real teams actually divide responsibility.",
          "A pause/emergency-stop mechanism (`Pausable`) adds a circuit breaker: a designated role can halt sensitive contract functions immediately if a vulnerability or exploit is discovered mid-attack, buying time to investigate and patch without needing to redeploy an entirely new contract under active attack pressure.",
        ],
        bullets: [
          "Single-owner patterns don't scale to organizations needing multiple distinct permission levels.",
          "RBAC defines distinct roles (MINTER_ROLE, PAUSER_ROLE) grantable/revokable independently.",
          "Pausable adds a circuit breaker to halt sensitive functions during an active exploit.",
          "Pausing buys time to investigate and patch without an emergency redeployment.",
        ],
      },
    ],
    lab: {
      title: "A Taxed ERC-20 Token with a Matching ERC-721 Certificate",
      description:
        "Develop and deploy an ERC-20 token with custom transaction taxation mechanics alongside a matching ERC-721 NFT digital certificate system, leveraging Foundry or Hardhat local chains.",
      steps: [
        "Extend OpenZeppelin's ERC-20 base contract with a custom transfer tax deducted on each transaction.",
        "Route the collected tax to a designated treasury address and add role-based access control for tax rate changes.",
        "Build a companion ERC-721 contract minting a digital certificate whenever a qualifying token transfer occurs.",
        "Add a Pausable emergency stop to both contracts, restricted to a dedicated PAUSER_ROLE.",
        "Deploy both contracts to a local Foundry or Hardhat chain and verify the full mint/transfer/tax flow.",
      ],
    },
    quiz: [
      {
        question:
          "Why is using OpenZeppelin's audited contracts considered a security best practice rather than just a convenience?",
        options: [
          "Because OpenZeppelin contracts are always cheaper to deploy",
          "Because these contracts have been extensively reviewed and battle-tested across billions of dollars in deployed value, giving a new contract a far stronger security baseline than writing equivalent logic from scratch",
          "Because Solidity requires importing OpenZeppelin to compile",
          "Because OpenZeppelin contracts cannot contain any bugs whatsoever"
        ],
        answerIndex: 1,
        explanation:
          "OpenZeppelin's contracts are widely reviewed and have secured enormous real-world value across many deployments, giving a project inheriting from them a much stronger starting security posture than an unreviewed custom implementation.",
      },
      {
        question:
          "What is the key structural difference between ERC-721 and ERC-1155?",
        options: [
          "ERC-1155 can only represent fungible tokens, never NFTs",
          "ERC-721 represents unique, individually-owned tokens under typically one token type per contract, while ERC-1155 lets a single contract manage many token types (fungible, non-fungible, or semi-fungible) with efficient batch transfers",
          "ERC-721 requires no tokenURI, while ERC-1155 requires one",
          "There is no meaningful difference between the two standards"
        ],
        answerIndex: 1,
        explanation:
          "ERC-721 is designed around unique, individually tracked tokens. ERC-1155 generalizes this into a multi-token contract capable of managing many token types together, with batch operations that are far more gas-efficient for applications needing many item types.",
      },
      {
        question:
          "What problem does a role-based access control (RBAC) system solve that a simple single-owner pattern does not?",
        options: [
          "RBAC removes the need for any access restrictions at all",
          "RBAC lets a contract define and independently grant/revoke multiple distinct permission levels (e.g. MINTER_ROLE, PAUSER_ROLE), matching how real organizations divide responsibility across different people or systems",
          "Single-owner patterns are always more secure than RBAC",
          "RBAC only works for ERC-20 tokens, not other contract types"
        ],
        answerIndex: 1,
        explanation:
          "A single owner address can't cleanly represent an organization with multiple distinct responsibilities. RBAC lets a contract define separate roles that can each be granted or revoked independently, matching real-world team structures.",
      },
    ],
  },
  {
    id: "module-4",
    week: 4,
    title: "Professional Development Lifecycles — Foundry & Hardhat",
    objective:
      "Establish corporate-grade developer pipelines utilizing unit testing, contract debugging, and deployment script management.",
    lessons: [
      {
        id: "m4-l1",
        title: "Setting Up Foundry: Forge, Cast & Anvil",
        content: [
          "Foundry is a Rust-based smart contract development toolkit built around three tools working together: Forge compiles, tests, and deploys contracts; Cast is a command-line Swiss-army-knife for interacting with contracts and chains directly (reading state, sending transactions, decoding calldata); and Anvil spins up a fast local Ethereum node for testing, forkable from any live network's current state.",
          "Foundry's configuration (`foundry.toml`) manages dependencies, compiler versions, and remappings declaratively, and its ability to fork a live mainnet or testnet locally via Anvil is a major workflow advantage: you can test how your contract behaves against real, already-deployed protocols (a real DEX, a real lending pool) without ever touching a live network.",
        ],
        bullets: [
          "Forge: compiles, tests, and deploys smart contracts.",
          "Cast: a CLI tool for direct contract/chain interaction and calldata decoding.",
          "Anvil: a fast local Ethereum node, forkable from any live network's current state.",
          "Forking a live network locally lets you test against real, deployed protocols safely.",
        ],
      },
      {
        id: "m4-l2",
        title: "Writing Unit Tests with Forge Assertions",
        content: [
          "Forge tests are written directly in Solidity, which means test code and contract code share the same language, type system, and tooling — no context-switching to a separate testing framework language. Tests use assertion cheatcodes (`assertEq`, `assertTrue`, `vm.expectRevert`) to verify both successful paths and that invalid operations correctly revert with the expected error.",
          "Writing tests in Solidity also means you can use Forge's cheatcodes to manipulate the test environment directly — impersonating any address (`vm.prank`), fast-forwarding block timestamps (`vm.warp`), or setting an account's ETH balance (`vm.deal`) — enabling precise, deterministic tests of time-dependent or multi-actor contract logic.",
        ],
        code: {
          label: "A basic Forge unit test",
          body: "function test_TransferUpdatesBalances() public {\n    token.transfer(alice, 100);\n    assertEq(token.balanceOf(alice), 100);\n}\n\nfunction test_RevertOnInsufficientBalance() public {\n    vm.expectRevert(\"Insufficient balance\");\n    token.transfer(alice, 1_000_000 ether);\n}",
        },
        bullets: [
          "Forge tests are written in Solidity itself, sharing the same language as the contracts.",
          "Assertion cheatcodes (assertEq, assertTrue, vm.expectRevert) verify expected behavior.",
          "vm.prank impersonates any address; vm.warp fast-forwards time; vm.deal sets ETH balance.",
          "These cheatcodes enable precise tests of time-dependent and multi-actor logic.",
        ],
      },
      {
        id: "m4-l3",
        title: "Fuzz Testing: Finding Broken Invariants",
        content: [
          "Rather than testing a handful of hand-picked inputs, fuzz testing generates hundreds or thousands of randomized inputs automatically and checks that a defined property (an 'invariant') always holds — for example, 'the sum of all account balances must always equal total supply,' regardless of what sequence of transfers occurred.",
          "Fuzz testing is uniquely valuable for smart contracts precisely because attackers actively search for exactly the edge cases a human tester would never think to write by hand — a well-designed fuzz test with thousands of runs dramatically increases the odds of surfacing a broken invariant before an attacker does, rather than after.",
        ],
        bullets: [
          "Fuzz testing generates many randomized inputs to check a property always holds.",
          "Invariants are properties that must remain true regardless of input sequence (e.g. total supply conservation).",
          "Attackers actively search for edge cases humans wouldn't think to test manually.",
          "High-volume fuzz runs (thousands of permutations) surface broken invariants before attackers do.",
        ],
      },
      {
        id: "m4-l4",
        title: "Deployment Scripts & Etherscan Verification",
        content: [
          "Deployment scripts codify exactly how a contract goes live: constructor arguments, the deployment order for interdependent contracts, and any post-deployment configuration calls — turning what could be an error-prone manual process into a repeatable, version-controlled script that can be run identically against a testnet or mainnet.",
          "Etherscan source-code verification publishes a contract's actual Solidity source alongside its deployed bytecode, letting anyone independently confirm the deployed bytecode matches the claimed source — an essential trust signal for users and auditors, since without it a 'verified' claim about a contract's behavior is unverifiable from the outside.",
        ],
        bullets: [
          "Deployment scripts codify constructor args, deployment order, and post-deploy configuration.",
          "Scripting deployment makes it repeatable and identical across testnet and mainnet.",
          "Etherscan verification publishes source code matching the deployed bytecode.",
          "Verification is an essential trust signal, letting anyone independently confirm contract behavior.",
        ],
      },
    ],
    lab: {
      title: "A Fuzz-Tested Investment Pool Contract",
      description:
        "Build a complete automated test suite for an investment pool contract. Implement unit tests, mock external actors, and perform a Fuzz Test with over 5,000 distinct permutations to verify mathematical liquidity limits.",
      steps: [
        "Build a simple investment pool contract accepting deposits and tracking proportional shares.",
        "Write unit tests covering deposit, withdrawal, and share calculation logic.",
        "Mock external actor addresses using Forge cheatcodes to simulate multiple depositors.",
        "Write a fuzz test asserting the pool's total tracked shares never exceed its actual liquidity, run across 5,000+ permutations.",
        "Fix any invariant violations the fuzz test surfaces and re-run to confirm the fix holds.",
      ],
    },
    quiz: [
      {
        question:
          "What is the practical advantage of writing smart contract tests directly in Solidity with Forge, rather than in a separate testing language?",
        options: [
          "Solidity tests always run faster regardless of framework",
          "Test code and contract code share the same language, type system, and tooling, avoiding context-switching, and Forge's cheatcodes allow precise manipulation of the test environment (time, identity, balances)",
          "Forge cannot test contracts written in any other language",
          "Solidity tests do not require compiling the contract under test"
        ],
        answerIndex: 1,
        explanation:
          "Writing tests in the same language as the contracts avoids context-switching and lets Forge's cheatcodes (vm.prank, vm.warp, vm.deal) precisely manipulate the test environment for deterministic testing of complex, time- or actor-dependent logic.",
      },
      {
        question:
          "Why is fuzz testing especially valuable for smart contracts specifically?",
        options: [
          "Because smart contracts never contain edge cases worth testing",
          "Because attackers actively search for exactly the edge cases a human tester wouldn't think to write by hand, and high-volume randomized fuzzing dramatically increases the odds of surfacing broken invariants before an attacker exploits them",
          "Because fuzz testing replaces the need for any unit tests",
          "Because fuzz testing only works on already-deployed mainnet contracts"
        ],
        answerIndex: 1,
        explanation:
          "Smart contracts are high-value, adversarial targets — attackers deliberately hunt for unusual input sequences that break invariants. Fuzz testing's randomized, high-volume approach is well-suited to surfacing exactly these edge cases before deployment.",
      },
      {
        question:
          "Why does Etherscan source-code verification matter for a deployed contract?",
        options: [
          "It is purely cosmetic and has no functional or trust significance",
          "It publishes the actual Solidity source alongside the deployed bytecode, letting anyone independently confirm that what's deployed on-chain actually matches the claimed source code — an essential trust signal for users and auditors",
          "It automatically fixes any bugs found in the contract",
          "It is required before a contract can accept any transactions"
        ],
        answerIndex: 1,
        explanation:
          "Without source verification, there's no way for an outside user or auditor to confirm that the deployed bytecode actually corresponds to any particular, reviewable source code — making verification an essential trust and transparency signal.",
      },
    ],
  },
  {
    id: "module-5",
    week: 5,
    title: "Smart Contract Security, Auditing & DeFi Attack Vectors",
    objective:
      "Learn to identify, exploit, and patch severe vulnerabilities in decentralized software.",
    lessons: [
      {
        id: "m5-l1",
        title: "Reentrancy Attacks",
        content: [
          "A reentrancy attack exploits a contract that sends Ether (or calls an external contract) before updating its own internal state — the classic mistake being 'send funds, then mark the balance as withdrawn' instead of the reverse. A malicious recipient contract's `receive()` function can call back into the vulnerable function again, before the first call ever finishes updating state, repeatedly draining funds in a single transaction.",
          "This was the exact vulnerability behind the infamous 2016 DAO hack, and it remains one of the most consequential smart contract bugs precisely because it's subtle: the code often looks perfectly reasonable at a glance, and the vulnerability only becomes obvious once you trace the exact order of external calls versus state updates.",
        ],
        bullets: [
          "Reentrancy exploits sending funds before updating internal state.",
          "A malicious contract's receive() function calls back in before state updates complete.",
          "This was the root cause of the historic 2016 DAO hack.",
          "The bug is subtle — code often looks reasonable until you trace call-vs-state-update order.",
        ],
      },
      {
        id: "m5-l2",
        title: "Integer Overflow/Underflow & Gas-Limit DoS",
        content: [
          "Prior to Solidity 0.8.x, arithmetic operations could silently overflow or underflow (a uint8 subtracting past zero wrapping around to 255, for instance) without reverting — a serious bug class now caught automatically by Solidity's built-in checked math (reverting on overflow/underflow by default), though `unchecked` blocks can still reintroduce this risk if used carelessly for gas optimization.",
          "Denial of Service via gas limits occurs when a contract's logic includes an unbounded loop over a data structure that can grow arbitrarily large (like iterating over every past depositor) — eventually that loop's gas cost exceeds the block gas limit entirely, permanently bricking a critical function for everyone, not just the attacker who grew the data structure.",
        ],
        bullets: [
          "Pre-0.8.x Solidity allowed silent overflow/underflow without reverting.",
          "Solidity 0.8.x+ reverts by default on overflow/underflow (checked math).",
          "unchecked blocks reintroduce overflow risk if used carelessly for gas savings.",
          "Unbounded loops over growable data structures can permanently DoS a function via gas limits.",
        ],
      },
      {
        id: "m5-l3",
        title: "Economic Exploits: Flash Loans, Oracles & MEV",
        content: [
          "Flash loans let anyone borrow enormous sums with no collateral, provided the loan is repaid within the same transaction — powerful for legitimate arbitrage, but also a favorite attacker tool for temporarily manipulating a protocol's on-chain price or liquidity assumptions within that single transaction before repaying the loan and walking away with the difference.",
          "Oracle manipulation exploits a DeFi protocol that trusts a single, manipulable price source (like a low-liquidity on-chain pool) rather than a robust, aggregated feed. Frontrunning and MEV (Maximal Extractable Value) exploit the fact that pending transactions are often publicly visible before confirmation, letting a sophisticated actor insert their own transaction ahead of a victim's to profit from the resulting price impact.",
        ],
        bullets: [
          "Flash loans allow large uncollateralized borrowing repaid within the same transaction.",
          "Attackers use flash loans to temporarily manipulate price/liquidity assumptions.",
          "Oracle manipulation exploits reliance on a single, manipulable price source.",
          "MEV/frontrunning exploits visible pending transactions to profit from ordering.",
        ],
      },
      {
        id: "m5-l4",
        title: "Static Analysis & the Checks-Effects-Interactions Pattern",
        content: [
          "Slither is a static analysis tool that scans Solidity source for known vulnerability patterns (reentrancy risk, unchecked external calls, uninitialized storage pointers) automatically, catching many common issues before a contract ever reaches a human auditor's attention — a fast, cheap first line of defense, though not a substitute for a thorough manual or formal audit.",
          "The Checks-Effects-Interactions pattern is the canonical fix for reentrancy: perform all input validation checks first, then update all internal state (effects), and only then make any external calls (interactions) — ensuring that even if a malicious external call re-enters the function, the internal state has already been updated to reflect the completed operation.",
        ],
        code: {
          label: "Checks-Effects-Interactions pattern",
          body: "function withdraw(uint amount) external {\n    // Checks\n    require(balances[msg.sender] >= amount, \"Insufficient balance\");\n\n    // Effects (update state BEFORE the external call)\n    balances[msg.sender] -= amount;\n\n    // Interactions (external call LAST)\n    (bool success, ) = msg.sender.call{value: amount}(\"\");\n    require(success, \"Transfer failed\");\n}",
        },
        bullets: [
          "Slither statically scans for known vulnerability patterns automatically.",
          "Static analysis is a fast first line of defense, not a substitute for full audits.",
          "Checks-Effects-Interactions: validate, then update state, then make external calls.",
          "This ordering neutralizes reentrancy even if a malicious call re-enters mid-execution.",
        ],
      },
    ],
    lab: {
      title: "Exploiting & Patching a Vulnerable Vault Contract",
      description:
        "Review an intentionally vulnerable Solidity vault contract. Write an 'Exploit Contract' that drains the entire vault balance using a Reentrancy attack on a local test chain, then refactor and patch the vault using the Checks-Effects-Interactions pattern.",
      steps: [
        "Review the intentionally vulnerable vault contract and identify the reentrancy flaw.",
        "Write a malicious exploit contract whose receive() function calls back into the vault's withdrawal function.",
        "Deploy both contracts to a local test chain and execute the exploit, draining the vault's balance.",
        "Refactor the vault to follow the Checks-Effects-Interactions pattern.",
        "Re-run the exploit against the patched vault and confirm it now correctly fails.",
      ],
    },
    quiz: [
      {
        question:
          "What is the core mechanism that makes a reentrancy attack possible?",
        options: [
          "The contract runs out of gas before completing execution",
          "A contract sends funds or makes an external call before updating its own internal state, allowing a malicious recipient to call back into the function again before that state update occurs",
          "The contract's Solidity version is too new",
          "Reentrancy only affects contracts written before Solidity existed"
        ],
        answerIndex: 1,
        explanation:
          "Reentrancy exploits the ordering mistake of performing an external call (like sending funds) before updating internal state. A malicious contract can re-enter the vulnerable function during that external call, repeating the drain before the state ever reflects the first withdrawal.",
      },
      {
        question:
          "How does the Checks-Effects-Interactions pattern prevent reentrancy attacks?",
        options: [
          "It eliminates the need for any external calls in a contract",
          "It orders code so all state updates (effects) happen before any external calls (interactions), ensuring that even if a malicious call re-enters the function, the internal state already reflects the completed operation",
          "It only works if the contract never sends Ether",
          "It requires disabling all functions marked payable"
        ],
        answerIndex: 1,
        explanation:
          "By validating inputs, then updating all internal state, and only then making external calls, the pattern ensures that even a malicious re-entrant call sees state that already reflects the completed operation — neutralizing the reentrancy exploit.",
      },
      {
        question:
          "Why are flash loans a favored tool for attackers targeting DeFi protocols with weak oracle designs?",
        options: [
          "Flash loans require substantial collateral, making attacks expensive",
          "Flash loans allow borrowing large uncollateralized sums (repaid within the same transaction), which attackers can use to temporarily manipulate a protocol's on-chain price or liquidity assumptions before repaying the loan and profiting from the manipulation",
          "Flash loans can only be used for legitimate arbitrage and never for exploits",
          "Flash loans are unrelated to oracle price manipulation"
        ],
        answerIndex: 1,
        explanation:
          "Flash loans let an attacker temporarily command enormous capital within a single transaction, enough to distort a manipulable price or liquidity source that a poorly designed oracle relies on — then repay the loan and keep the resulting profit before the transaction ends.",
      },
    ],
  },
  {
    id: "module-6",
    week: 6,
    title: "Building the Frontend — Decentralized App (dApp) Integration",
    objective:
      "Connect traditional web interfaces (React/HTML) with decentralized state machines using RPC providers.",
    lessons: [
      {
        id: "m6-l1",
        title: "Connecting to Web3: Wallet Providers",
        content: [
          "A dApp frontend doesn't hold private keys itself — it connects to a wallet (MetaMask, or via the WalletConnect protocol for mobile wallets) that securely holds the user's keys and prompts them to approve any transaction or signature request. The wallet injects a provider object into the browser that the frontend uses to request the connection and read the user's current address and network.",
          "This separation is a deliberate security boundary: the frontend application code never sees or handles a user's private key at any point, meaning even a compromised or malicious frontend can only request actions — it cannot silently sign anything without the wallet surfacing an explicit approval prompt to the user.",
        ],
        bullets: [
          "Wallets (MetaMask, WalletConnect) securely hold user private keys, not the frontend.",
          "The wallet injects a provider object the frontend uses to request connection.",
          "Frontend code never sees or handles the user's private key directly.",
          "This boundary means even a compromised frontend can't silently sign transactions.",
        ],
      },
      {
        id: "m6-l2",
        title: "Interacting with Contracts: The ABI",
        content: [
          "The Application Binary Interface (ABI) is a JSON description of a contract's functions, their parameter types, and their return types — the frontend's map for encoding a function call into the raw bytes the EVM expects, and decoding the raw bytes returned back into usable JavaScript values.",
          "Without an accurate ABI matching the deployed contract exactly, a frontend can't reliably call functions or interpret return data — mismatches between an ABI and the actual deployed bytecode are a common source of confusing, hard-to-debug integration failures.",
        ],
        bullets: [
          "The ABI is a JSON description of a contract's functions, parameters, and return types.",
          "It's the map frontends use to encode calls and decode returned data correctly.",
          "An accurate ABI matching the deployed contract exactly is essential.",
          "ABI/bytecode mismatches are a common source of confusing integration bugs.",
        ],
      },
      {
        id: "m6-l3",
        title: "Building Responsive Blockchain State Flows",
        content: [
          "Blockchain interactions are fundamentally asynchronous and multi-stage in a way typical Web2 API calls aren't: a transaction moves through submitted → pending (waiting for block confirmation) → confirmed (or reverted) states, often taking seconds to minutes, and the frontend needs to represent each stage clearly rather than treating it like an instant request-response cycle.",
          "Good dApp UX surfaces this honestly: showing a pending state immediately after submission, polling or subscribing for confirmation, and handling the very real possibility of a reverted transaction or a user simply rejecting the wallet's approval prompt — each requiring distinct, clear feedback rather than a generic error message.",
        ],
        bullets: [
          "Transactions move through submitted → pending → confirmed/reverted, unlike instant API calls.",
          "Good UX clearly represents each stage rather than treating it as instant request-response.",
          "Users may reject a wallet prompt entirely — a distinct case from a reverted transaction.",
          "Clear, stage-specific feedback beats a single generic error message.",
        ],
      },
      {
        id: "m6-l4",
        title: "Integration Frameworks: Viem, Wagmi & RainbowKit",
        content: [
          "Viem is a modern, type-safe TypeScript library for low-level Ethereum interactions (reading contract state, sending transactions, encoding/decoding calldata) that replaced much of Ethers.js's role in newer projects, with stronger TypeScript inference directly from a contract's ABI.",
          "Wagmi builds React hooks on top of Viem (`useAccount`, `useContractRead`, `useContractWrite`) that handle wallet connection state, caching, and re-fetching automatically — and RainbowKit layers a polished, pre-built wallet-connection UI on top of Wagmi, so teams don't need to build wallet-selection and connection flows from scratch for every project.",
        ],
        bullets: [
          "Viem: a modern, type-safe TypeScript library for low-level Ethereum interactions.",
          "Wagmi: React hooks built on Viem, handling connection state, caching, and re-fetching.",
          "RainbowKit: a pre-built, polished wallet-connection UI layered on top of Wagmi.",
          "Together they eliminate most boilerplate around wallet connection and contract reads/writes.",
        ],
      },
    ],
    lab: {
      title: "A React Token Dashboard with Wallet Connect & Minting",
      description:
        "Build a clean React application that allows users to connect their wallets, read their custom token balances, trigger minting transactions, and display toast notifications upon receipt of blockchain confirmation.",
      steps: [
        "Set up a React app with Wagmi and RainbowKit for wallet connection.",
        "Read and display the connected user's custom ERC-20 token balance using useContractRead.",
        "Build a minting form that triggers a transaction via useContractWrite.",
        "Track and display the transaction's submitted/pending/confirmed states in the UI.",
        "Show a toast notification upon confirmed transaction receipt, refreshing the displayed balance.",
      ],
    },
    quiz: [
      {
        question:
          "Why does a dApp frontend never handle a user's private key directly?",
        options: [
          "Because private keys are not required to interact with the blockchain",
          "Because the wallet (e.g. MetaMask) securely holds the user's keys and injects a provider object, meaning even a compromised frontend can only request actions and cannot silently sign anything without an explicit wallet approval prompt",
          "Because the ABI already contains the user's private key",
          "Because private keys are stored directly in the smart contract"
        ],
        answerIndex: 1,
        explanation:
          "The wallet acts as a security boundary, holding private keys and requiring explicit user approval for any signature or transaction. This means a frontend, even if compromised, cannot silently authorize actions on the user's behalf.",
      },
      {
        question:
          "Why is representing a transaction's submitted/pending/confirmed states important for good dApp UX?",
        options: [
          "Because blockchain transactions always complete instantly, just like typical Web2 API calls",
          "Because blockchain transactions are asynchronous and multi-stage, often taking seconds to minutes, so clearly surfacing each distinct stage (rather than treating it as instant request-response) gives users honest, actionable feedback",
          "Because pending states never actually occur on any blockchain network",
          "Because confirmed and reverted transactions look identical to users"
        ],
        answerIndex: 1,
        explanation:
          "Unlike typical instant API calls, blockchain transactions move through distinct stages that can take real time and might ultimately fail or be rejected. Representing each stage clearly gives users accurate, actionable feedback instead of a generic loading state.",
      },
      {
        question:
          "What role does the ABI play when a frontend interacts with a smart contract?",
        options: [
          "It stores the user's wallet private key",
          "It is a JSON description of the contract's functions, parameters, and return types that lets the frontend correctly encode function calls and decode returned data",
          "It replaces the need for a wallet provider",
          "It only matters for ERC-721 contracts, not ERC-20"
        ],
        answerIndex: 1,
        explanation:
          "The ABI describes exactly how to encode a call to a contract's functions and how to decode what comes back. Without an ABI that accurately matches the deployed contract, the frontend can't reliably interact with it.",
      },
    ],
  },
  {
    id: "module-7",
    week: 7,
    title: "Decentralized Storage & Oracle Integrations",
    objective:
      "Integrate off-chain decentralized assets and ingest secure real-world data feeds without introducing centralized vulnerabilities.",
    lessons: [
      {
        id: "m7-l1",
        title: "Why Blockchains Can't Store Large Files",
        content: [
          "Every byte stored directly on-chain must be replicated and permanently retained by every single full node in the network forever — which makes on-chain storage extraordinarily expensive per byte, completely impractical for an image, a video, or any sizable document. Storing a single high-resolution image on-chain directly could cost more in gas than the item it represents is worth.",
          "The practical solution is storing only a small cryptographic reference on-chain — a hash pointing to the actual content — while the content itself lives in a decentralized file system designed for bulk storage, keeping the blockchain's expensive, permanent storage reserved for the small amount of data that genuinely needs it.",
        ],
        bullets: [
          "Every on-chain byte must be replicated and stored forever by every full node.",
          "This makes on-chain storage extraordinarily expensive per byte for large files.",
          "The practical pattern: store only a small hash reference on-chain.",
          "The actual bulk content lives in a decentralized file system built for that purpose.",
        ],
      },
      {
        id: "m7-l2",
        title: "IPFS & Filecoin: Uploading, Hashing & Pinning",
        content: [
          "IPFS (InterPlanetary File System) addresses content by its cryptographic hash rather than by location — meaning the same file always produces the same address (a Content Identifier, or CID) no matter which node serves it, and any change to the file produces an entirely different CID, making tampering immediately detectable.",
          "IPFS alone doesn't guarantee a file stays available forever — nodes are free to stop hosting content they're not interested in. 'Pinning' (via a service like Pinata) explicitly commits to keeping a file available, and Filecoin adds an economic incentive layer on top, paying storage providers to reliably retain data over a contracted duration — turning best-effort availability into a paid, accountable guarantee.",
        ],
        bullets: [
          "IPFS addresses content by cryptographic hash (CID), not by location.",
          "Identical files always produce the same CID; any change produces a different one.",
          "IPFS alone doesn't guarantee permanent availability — nodes can stop hosting content.",
          "Pinning (Pinata) and Filecoin add committed, economically-incentivized storage guarantees.",
        ],
      },
      {
        id: "m7-l3",
        title: "Dynamic Metadata for dApps",
        content: [
          "An NFT's `tokenURI` typically points to a JSON metadata file (describing name, image, and attributes) rather than embedding that data directly on-chain — keeping the expensive on-chain storage limited to just the pointer, while the richer descriptive data lives off-chain on IPFS.",
          "Some applications need metadata that changes over time (a game character that levels up, for instance) — this requires either re-pinning updated metadata at a new CID and updating the on-chain pointer, or using a mutable off-chain endpoint, each with different trade-offs between IPFS's tamper-evidence guarantee and the flexibility genuinely dynamic applications need.",
        ],
        bullets: [
          "tokenURI typically points to off-chain JSON metadata (name, image, attributes) via IPFS.",
          "This keeps on-chain storage limited to just the pointer, not the full metadata.",
          "Dynamic metadata (e.g. a leveling game character) requires re-pinning or mutable endpoints.",
          "This trades off IPFS's tamper-evidence guarantee against needed application flexibility.",
        ],
      },
      {
        id: "m7-l4",
        title: "Decentralized Oracles: Chainlink",
        content: [
          "Smart contracts cannot natively access any data outside the blockchain — no API calls, no external randomness, nothing. Chainlink solves this with a decentralized oracle network: multiple independent nodes fetch the same external data point and their results are aggregated, so no single node's report can unilaterally corrupt the data a contract relies on.",
          "Chainlink Price Feeds provide continuously updated, aggregated asset prices for DeFi protocols; Chainlink VRF (Verifiable Random Function) provides cryptographically provable randomness — essential for fair gaming and NFT trait generation, since a naive on-chain 'random' number is often predictable or manipulable by miners/validators; and Chainlink Functions lets a contract trigger arbitrary off-chain computation and bring the result back on-chain securely.",
        ],
        bullets: [
          "Smart contracts cannot natively access any data outside the blockchain.",
          "Chainlink's decentralized oracle network aggregates data from multiple independent nodes.",
          "Price Feeds provide continuously updated, aggregated asset prices for DeFi.",
          "VRF provides cryptographically provable, tamper-resistant randomness for gaming/NFTs.",
        ],
      },
    ],
    lab: {
      title: "An IPFS-Backed NFT with Chainlink VRF Randomized Traits",
      description:
        "Build a dynamic decentralized gaming application. Mint an NFT where the physical artwork is stored securely on IPFS, and utilize a Chainlink VRF oracle to provably generate randomized gaming attributes.",
      steps: [
        "Upload NFT artwork and JSON metadata to IPFS and pin it via Pinata.",
        "Build an ERC-721 minting contract whose tokenURI points to the pinned IPFS metadata.",
        "Integrate Chainlink VRF to request cryptographically provable randomness at mint time.",
        "Use the VRF-provided random value to assign randomized gaming attributes to each minted NFT.",
        "Verify on a local/test chain that trait assignment is genuinely unpredictable before the VRF callback resolves.",
      ],
    },
    quiz: [
      {
        question:
          "Why is it impractical to store a large file (like an image) directly on-chain?",
        options: [
          "Because blockchains cannot represent binary data at all",
          "Because every byte stored on-chain must be replicated and permanently retained by every full node in the network forever, making the cost per byte extraordinarily high for large files",
          "Because on-chain storage is free but extremely slow",
          "Because smart contracts cannot reference any external data"
        ],
        answerIndex: 1,
        explanation:
          "On-chain storage requires every full node to permanently retain the data, making large files prohibitively expensive to store directly on-chain. The standard pattern instead stores a small hash reference on-chain, with the bulk content on a system like IPFS.",
      },
      {
        question:
          "Why is 'pinning' (or using Filecoin) necessary in addition to simply uploading a file to IPFS?",
        options: [
          "IPFS automatically guarantees permanent storage without any additional action",
          "IPFS nodes are free to stop hosting content they're not interested in, so pinning (or Filecoin's paid storage contracts) is needed to explicitly commit to keeping a file available over time",
          "Pinning is only required for NFT metadata, never for other file types",
          "Filecoin replaces the need for content-addressed hashing entirely"
        ],
        answerIndex: 1,
        explanation:
          "IPFS by itself only guarantees content-addressing (via CIDs), not permanent availability — any node can stop hosting a file. Pinning services and Filecoin's economic incentives are what turn best-effort hosting into a committed, accountable storage guarantee.",
      },
      {
        question:
          "Why do smart contracts need a decentralized oracle like Chainlink rather than calling an external API directly?",
        options: [
          "Smart contracts can call external APIs natively without any additional infrastructure",
          "Smart contracts cannot natively access any data outside the blockchain, so a decentralized oracle network aggregates data from multiple independent nodes, preventing any single node from unilaterally corrupting the data the contract relies on",
          "Oracles are only needed for generating random numbers, never for price data",
          "Chainlink replaces the need for smart contracts entirely"
        ],
        answerIndex: 1,
        explanation:
          "Smart contracts are isolated from any off-chain data by design. Chainlink's decentralized oracle network fetches external data via multiple independent nodes and aggregates their results, preventing a single compromised or malicious source from corrupting the data a contract depends on.",
      },
    ],
  },
  {
    id: "module-8",
    week: 8,
    title: "Zero-Knowledge Proofs & Scaling Horizons",
    objective:
      "Introduce advanced cryptographic privacy-preserving algorithms and Layer-2 execution models.",
    lessons: [
      {
        id: "m8-l1",
        title: "Zero-Knowledge Proofs: Prover, Verifier & the Core Idea",
        content: [
          "A Zero-Knowledge Proof lets a Prover convince a Verifier that a statement is true — 'I know a secret value satisfying this condition' — without revealing the secret value itself, or any other information beyond the bare fact that the statement holds. This sounds paradoxical at first: how can you prove you know something without showing it?",
          "The resolution is mathematical, not a trick: the proof is constructed so that producing a valid proof is computationally possible only if the prover genuinely knows the secret, while the proof itself contains no information that would let the verifier reconstruct or narrow down what that secret actually is.",
        ],
        bullets: [
          "A ZKP proves a statement is true without revealing the underlying secret data.",
          "The Prover convinces the Verifier; only the truth of the statement is revealed.",
          "Producing a valid proof is only computationally possible if the secret is genuinely known.",
          "The proof itself carries no information that narrows down the actual secret value.",
        ],
      },
      {
        id: "m8-l2",
        title: "zk-SNARKs vs. zk-STARKs",
        content: [
          "zk-SNARKs (Succinct Non-interactive ARguments of Knowledge) produce very small proofs that verify extremely quickly, making them ideal for on-chain verification where gas cost matters enormously — but many SNARK constructions require a 'trusted setup' ceremony, where the security depends on at least one participant in generating certain cryptographic parameters having honestly destroyed their secret contribution.",
          "zk-STARKs (Scalable Transparent ARguments of Knowledge) eliminate the trusted setup requirement entirely (hence 'transparent') and are also believed to be resistant to attacks from future quantum computers, at the cost of noticeably larger proof sizes than SNARKs — a real trade-off between trust assumptions and on-chain verification cost that shapes which is chosen for a given application.",
        ],
        bullets: [
          "zk-SNARKs: very small, fast-to-verify proofs — ideal for on-chain gas costs.",
          "Many SNARK constructions require a trusted setup ceremony as a security assumption.",
          "zk-STARKs: no trusted setup required, and believed quantum-resistant.",
          "STARKs trade a larger proof size for eliminating the trusted setup assumption.",
        ],
      },
      {
        id: "m8-l3",
        title: "Writing Circuits in Circom",
        content: [
          "Circom lets you describe a computation as an arithmetic circuit — a network of addition and multiplication constraints over a finite field — that a ZKP system can then generate a proof against. Rather than writing ordinary imperative code, circuit design means expressing 'what must be true' as a set of algebraic constraints the prover's private inputs must satisfy.",
          "This is a genuinely different mental model from typical software engineering: instead of specifying step-by-step instructions, you specify a set of equations that hold true if and only if the computation was performed correctly — the constraint system is the actual program, in a sense, not a description of one.",
        ],
        code: {
          label: "A Circom circuit proving x × y = z without revealing x or y",
          body: "template Multiplier() {\n    signal input x;  // private\n    signal input y;  // private\n    signal output z; // public\n\n    z <== x * y;\n}\n\ncomponent main = Multiplier();",
        },
        bullets: [
          "Circom describes computation as an arithmetic circuit of constraints, not imperative steps.",
          "Circuits express 'what must be true' algebraically, not a sequence of instructions.",
          "Private (secret) and public inputs/outputs are explicitly distinguished in the circuit.",
          "The constraint system itself is what the proof is generated and verified against.",
        ],
      },
      {
        id: "m8-l4",
        title: "Scaling: Optimistic Rollups vs. ZK-Rollups",
        content: [
          "Optimistic Rollups assume transactions are valid by default and post them to Layer-1 without an immediate proof, instead relying on a challenge period during which anyone can submit fraud proof disputing an invalid state transition — offering good throughput and lower computational overhead, but requiring a withdrawal delay to let that challenge window pass safely.",
          "ZK-Rollups instead post a validity proof (often a zk-SNARK) alongside every batch, cryptographically proving correctness immediately rather than relying on a challenge period — enabling much faster withdrawals to Layer-1, at the cost of the additional computational overhead needed to generate a validity proof for every batch.",
        ],
        bullets: [
          "Optimistic Rollups assume validity by default, relying on a fraud-proof challenge period.",
          "This requires a withdrawal delay to safely let the challenge window pass.",
          "ZK-Rollups post a validity proof with every batch, proving correctness immediately.",
          "ZK-Rollups enable faster withdrawals at the cost of proof-generation overhead.",
        ],
      },
    ],
    lab: {
      title: "A Circom Circuit Proving a Private Product with an On-Chain Verifier",
      description:
        "Write a basic Circom arithmetic circuit that proves you know two private numbers x and y such that their product is public z (x × y = z). Compile the circuit, generate a cryptographic proof, and auto-generate a Solidity verifier contract that executes on your local testnet.",
      steps: [
        "Write a Circom circuit with private inputs x and y and a public output z = x × y.",
        "Compile the circuit and generate the necessary proving and verification keys.",
        "Generate a cryptographic proof for a chosen private x and y using SnarkJS.",
        "Auto-generate a Solidity verifier contract from the compiled circuit.",
        "Deploy the verifier to a local testnet and confirm it accepts a valid proof and rejects a tampered one.",
      ],
    },
    quiz: [
      {
        question:
          "What does a Zero-Knowledge Proof actually allow a Prover to demonstrate to a Verifier?",
        options: [
          "That the Prover's secret value is a specific number the Verifier can then read",
          "That a statement is true (e.g. 'I know a secret satisfying this condition') without revealing the secret itself or any information beyond the fact that the statement holds",
          "That the Verifier already knows the Prover's secret",
          "That the blockchain network has reached consensus on a new block"
        ],
        answerIndex: 1,
        explanation:
          "A ZKP lets a Prover convince a Verifier that a statement is true without revealing the underlying secret data or any other information beyond the truth of the statement itself — the defining property that makes it 'zero-knowledge.'",
      },
      {
        question:
          "What is the key trade-off between zk-SNARKs and zk-STARKs?",
        options: [
          "SNARKs and STARKs are functionally identical with no meaningful differences",
          "SNARKs produce smaller, cheaper-to-verify proofs but many constructions require a trusted setup, while STARKs eliminate the trusted setup requirement and are believed quantum-resistant, at the cost of larger proof sizes",
          "STARKs always produce smaller proofs than SNARKs",
          "SNARKs cannot be verified on-chain at all"
        ],
        answerIndex: 1,
        explanation:
          "SNARKs offer small, fast-to-verify proofs ideal for on-chain gas costs, but often require a trusted setup ceremony. STARKs remove that trust assumption and add quantum resistance, but produce noticeably larger proofs — a genuine engineering trade-off.",
      },
      {
        question:
          "What is the fundamental difference in how Optimistic Rollups and ZK-Rollups achieve security for their batched transactions?",
        options: [
          "Both rely on exactly the same fraud-proof challenge period mechanism",
          "Optimistic Rollups assume validity by default and rely on a challenge period during which fraud proofs can dispute invalid transitions, while ZK-Rollups post a cryptographic validity proof with every batch, proving correctness immediately without a challenge period",
          "ZK-Rollups require a withdrawal delay, while Optimistic Rollups do not",
          "Neither rollup type actually inherits security from Layer-1"
        ],
        answerIndex: 1,
        explanation:
          "Optimistic Rollups assume batches are valid unless successfully disputed during a challenge window, requiring a withdrawal delay. ZK-Rollups instead prove correctness cryptographically with every batch, enabling much faster withdrawals at the cost of proof-generation overhead.",
      },
    ],
  },
  {
    id: "module-9",
    week: 9,
    title: "Capstone — End-to-End Decentralized Enterprise App",
    objective:
      "Bring together all previous units to engineer a secure, audited, and functional dApp.",
    lessons: [
      {
        id: "m9-l1",
        title: "Choosing Your Capstone Project",
        content: [
          "The capstone brings every module together into one production-shaped system. You'll choose one of three options, each stressing a different combination of skills: a DAO with governance voting (token-weighted proposals and on-chain execution), a DeFi lending pool (collateralized borrowing with dynamic interest rates), or a supply chain provenance tracker (IPFS-documented logistics checkpoints verified with multi-sig control).",
          "Choose based on which skills you most want to demonstrate — a DAO stresses access control and governance logic, a lending pool stresses economic modeling and DeFi-specific attack surface awareness (Module 5), and a provenance tracker stresses decentralized storage integration (Module 7) and multi-party trust design.",
        ],
        bullets: [
          "DAO with Governance Voting: token-weighted proposals, on-chain execution.",
          "DeFi Lending Pool: collateralized borrowing with dynamic interest rate calculations.",
          "Supply Chain Provenance Tracker: IPFS-documented checkpoints, multi-sig verified.",
          "Choose based on the specific skills you most want your portfolio to demonstrate.",
        ],
      },
      {
        id: "m9-l2",
        title: "Architecting for Security & Testability",
        content: [
          "Every capstone option must be built the way a real audited protocol would be: contracts developed and tested in a Foundry setup (Module 4), defended against the specific vulnerability classes relevant to the chosen option (reentrancy and oracle risk for a lending pool, access-control bugs for DAO proposal execution) using the patterns from Module 5, and integrated with a real frontend (Module 6) that a non-technical user could actually operate.",
          "Test coverage above 90% isn't an arbitrary number — it reflects the reality that smart contracts are unusually unforgiving of bugs (no simple rollback once funds are drained) and that thorough unit and fuzz testing (Module 4) is the primary defense available before a contract goes live with real value at stake.",
        ],
        bullets: [
          "Apply Foundry-based development and testing discipline from Module 4 throughout.",
          "Defend against the specific vulnerability classes relevant to your chosen capstone option.",
          "Integrate a real, usable frontend via Wagmi/Viem from Module 6.",
          "Target >90% test coverage, reflecting how unforgiving smart contract bugs are in production.",
        ],
      },
      {
        id: "m9-l3",
        title: "Deliverables & Assessment",
        content: [
          "The capstone is assessed as a complete, professional-grade deliverable: fully tested, audited, and documented Solidity smart contracts managed in a Foundry setup; a deployed, interactive web interface integrating real client wallet connections; and a detailed vulnerability report documenting what you specifically checked for and how, alongside your fuzz testing logs.",
          "This mirrors how a real audited protocol ships: the code alone isn't the deliverable — the accompanying security documentation and test evidence are what let a user, investor, or auditor actually trust the system before real value flows through it.",
        ],
        bullets: [
          "Deliver fully tested, audited, documented Solidity contracts in a Foundry setup.",
          "Deploy an interactive web interface with real wallet integration.",
          "Provide a detailed vulnerability report and localized fuzzing logs.",
          "Documentation and test evidence are as much the deliverable as the code itself.",
        ],
      },
    ],
    lab: {
      title: "Capstone: Ship an Audited End-to-End Decentralized App",
      description:
        "Select and build one of the three capstone options — a DAO, a DeFi lending pool, or a supply chain provenance tracker — as a fully tested, audited, and documented dApp with a deployed interactive frontend.",
      steps: [
        "Select a capstone option and write a brief architecture and threat model for it.",
        "Develop the smart contracts in Foundry, applying OpenZeppelin patterns and RBAC where appropriate.",
        "Write a full unit and fuzz test suite targeting >90% coverage, addressing the option's specific attack surface.",
        "Build and deploy an interactive frontend (React + Wagmi/Viem) integrating real wallet connections.",
        "Write a vulnerability report documenting your security review process and fuzz testing results.",
      ],
    },
    quiz: [
      {
        question:
          "Why does the capstone target test coverage above 90% rather than a lower, more typical software engineering threshold?",
        options: [
          "Because 90% coverage is an arbitrary requirement with no real justification",
          "Because smart contracts are unusually unforgiving of bugs — there's no simple rollback once funds are drained — so thorough unit and fuzz testing is the primary defense available before a contract goes live with real value at stake",
          "Because Foundry requires exactly 90% coverage to compile a contract",
          "Because lower coverage is actually preferred for smart contracts"
        ],
        answerIndex: 1,
        explanation:
          "Unlike typical software where a bug can often be patched and rolled back, a deployed smart contract vulnerability can result in an irreversible loss of funds. High test coverage, combined with fuzz testing, is the primary safeguard available before real value is at risk.",
      },
      {
        question:
          "Why does choosing between the DAO, DeFi lending pool, and supply chain tracker capstone options matter for which skills get demonstrated?",
        options: [
          "All three options exercise exactly the same skills with no meaningful difference",
          "Each option stresses a different combination of skills — the DAO emphasizes access control and governance, the lending pool emphasizes economic modeling and DeFi attack surface awareness, and the tracker emphasizes decentralized storage and multi-party trust design",
          "Only the DeFi lending pool option requires any smart contract security review",
          "The choice only affects which frontend framework can be used"
        ],
        answerIndex: 1,
        explanation:
          "Each capstone option is deliberately weighted toward different modules' skills: governance and access control for the DAO, DeFi-specific economic and security modeling for the lending pool, and decentralized storage/multi-sig trust design for the provenance tracker.",
      },
      {
        question:
          "Why is the accompanying vulnerability report and fuzz testing log considered as much a deliverable as the contract code itself?",
        options: [
          "Because the report replaces the need for any actual smart contract code",
          "Because in a real audited protocol, the security documentation and test evidence are what let a user, investor, or auditor actually trust the system before real value flows through it — the code alone isn't sufficient to establish that trust",
          "Because vulnerability reports are only required for capstones, never for real deployed protocols",
          "Because fuzz testing logs are purely optional and don't affect the assessment"
        ],
        answerIndex: 1,
        explanation:
          "Mirroring how real audited protocols operate, the code alone doesn't establish trust — the accompanying vulnerability report and test evidence are what demonstrate to stakeholders that the security claims about the system have actually been verified.",
      },
    ],
  },
];
