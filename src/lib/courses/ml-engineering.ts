import type { CourseMeta, CourseModule } from "@/lib/courses/types";

export const courseMeta: CourseMeta = {
  slug: "ml-engineering",
  title: "AI & Machine Learning Engineering",
  tagline: "Production-Scale Architectures & MLOps",
  duration: "9 Modules",
  pace: "6–8 hours/week",
  level: "Intermediate to Advanced",
  prerequisites: [
    "Proficiency in Python",
    "Basic calculus and linear algebra",
    "Introductory statistics",
  ],
  overview: [
    "Training a model in a notebook is the easy part. Real value comes from systems that reliably serve predictions at scale, stay accurate as the world changes, and can be retrained, versioned, and rolled back with confidence. This course closes the gap between a promising model and a production ML system.",
    "You'll move end-to-end: classical ML and feature engineering, deep learning in PyTorch and TensorFlow, computer vision and NLP architectures, model optimization and compilation, and the full MLOps lifecycle — versioning, pipelines, deployment, and monitoring — culminating in a capstone where you architect a complete production-grade system.",
  ],
  objectives: [
    "Build robust classical ML baselines with disciplined feature engineering and evaluation.",
    "Implement and debug deep neural networks natively in PyTorch and TensorFlow.",
    "Design and fine-tune computer vision and NLP/transformer architectures for real tasks.",
    "Optimize models for inference with quantization, pruning, distillation, and compilation (ONNX, TensorRT).",
    "Establish reproducible MLOps: data/version control, experiment tracking, and pipeline orchestration.",
    "Deploy, serve, and autoscale models with FastAPI, Docker, Triton, and Kubernetes.",
    "Monitor production models for drift and build automated retraining feedback loops.",
  ],
  tools: [
    { category: "Core Languages & Libraries", items: "Python, Scikit-Learn, NumPy, Pandas" },
    { category: "Deep Learning", items: "PyTorch, TensorFlow / Keras, Hugging Face" },
    {
      category: "Optimization & Serving",
      items: "ONNX, NVIDIA TensorRT, Apache TVM, Triton Inference Server, FastAPI",
    },
    {
      category: "MLOps & Orchestration",
      items: "DVC, MLflow, Feast, Airflow / Prefect / ZenML, Docker, Kubernetes",
    },
    {
      category: "Monitoring",
      items: "Evidently AI, Great Expectations",
    },
  ],
  grading: [
    {
      component: "Hands-on Labs",
      weight: "45%",
      detail:
        "Practical exercises across the ML lifecycle — from tabular pipelines to model serving and drift detection.",
    },
    {
      component: "Module Quizzes",
      weight: "15%",
      detail:
        "Concept checks reinforcing the mathematical and architectural foundations of each module.",
    },
    {
      component: "Capstone Project",
      weight: "40%",
      detail:
        "A single, cohesive, production-grade ML system: version-controlled repo, MLOps architecture diagram, and a deployed, monitored API endpoint.",
    },
  ],
};

export const courseModules: CourseModule[] = [
  {
    id: "module-1",
    week: 1,
    title: "Foundational ML, Feature Engineering & Classical Models",
    objective:
      "Master classical ML foundations and the feature engineering lifecycles required to build robust baseline models for predictive analytics.",
    lessons: [
      {
        id: "m1-l1",
        title: "Mathematical Underpinnings of Learning",
        content: [
          "Before frameworks, understand what 'learning' actually optimizes. A model learns by minimizing a loss function using gradient descent — iteratively nudging parameters in the direction that reduces error. Different tasks call for different losses: Mean Squared Error for regression, Cross-Entropy for classification, and Huber loss when you need robustness to outliers.",
          "Two ideas govern whether a model generalizes: the bias-variance trade-off (underfitting vs. overfitting) and regularization, which penalizes complexity. L1 regularization drives weights to exactly zero (feature selection); L2 shrinks them smoothly. These fundamentals recur in every model you'll build, classical or deep.",
        ],
        code: {
          label: "Gradient descent update rule",
          body: "θ ← θ − η · ∇θ L(θ)\n\nθ = parameters, η = learning rate,\n∇θ L = gradient of the loss w.r.t. parameters\n\nL1 penalty: L + λ·Σ|θ|      (sparse, selects features)\nL2 penalty: L + λ·Σθ²       (smooth shrinkage)",
        },
        bullets: [
          "Loss functions: MSE (regression), Cross-Entropy (classification), Huber (robust).",
          "Gradient descent variants: batch, stochastic, mini-batch.",
          "Bias-variance trade-off governs under- vs. over-fitting.",
          "L1 = sparse feature selection; L2 = smooth weight shrinkage.",
        ],
      },
      {
        id: "m1-l2",
        title: "EDA & Feature Engineering",
        content: [
          "Models are only as good as their features. Exploratory Data Analysis surfaces missing values, structural errors, and outliers before they poison training. You then engineer features: imputing gaps, encoding categories (including target encoding), applying power transforms to fix skew, and scaling so no feature dominates by magnitude alone.",
          "When feature spaces get large, dimensionality reduction helps: PCA finds linear axes of maximum variance, while t-SNE and UMAP reveal nonlinear structure for visualization and compression.",
        ],
        bullets: [
          "Handle missing data, structural errors, and outliers first.",
          "Imputation, target encoding, power transforms, and scaling.",
          "PCA for linear dimensionality reduction.",
          "t-SNE and UMAP for nonlinear structure and visualization.",
        ],
      },
      {
        id: "m1-l3",
        title: "Classical Classifiers & Regressors",
        content: [
          "A strong classical baseline is often the fastest path to value — and the yardstick every deep model must beat. Linear and Logistic Regression give interpretable starting points; Support Vector Machines find maximum-margin boundaries; Naive Bayes is a fast probabilistic workhorse.",
          "For tabular data, tree ensembles dominate. Decision Trees split on features; Random Forests average many trees to reduce variance; and gradient-boosted methods — XGBoost, LightGBM, CatBoost — sequentially correct errors and routinely win on structured data.",
        ],
        bullets: [
          "Linear/Logistic Regression, SVM, and Naive Bayes.",
          "Decision Trees and Random Forests.",
          "Gradient boosting: XGBoost, LightGBM, CatBoost.",
          "Tree ensembles are the default champions for tabular data.",
        ],
      },
      {
        id: "m1-l4",
        title: "Evaluation for Imbalanced Data",
        content: [
          "Accuracy lies when classes are imbalanced — a model that always predicts 'no default' can be 99% accurate and useless. You need metrics that expose the trade-offs: Precision (of predicted positives, how many were right), Recall (of actual positives, how many were caught), and F1 as their harmonic mean.",
          "ROC-AUC summarizes ranking quality across thresholds, but the PR-curve is more honest under heavy imbalance. Reading the confusion matrix directly keeps you grounded in real error counts, not just summary scores.",
        ],
        bullets: [
          "Precision, Recall, and F1 for imbalanced problems.",
          "ROC-AUC across thresholds; PR-curve when positives are rare.",
          "Confusion matrix: read the actual error counts.",
          "Accuracy alone is misleading under imbalance.",
        ],
      },
    ],
    lab: {
      title: "Tabular Predictive Pipeline for Credit Default Risk",
      description:
        "Build an end-to-end tabular predictive pipeline using Scikit-Learn and LightGBM for credit default risk estimation.",
      steps: [
        "Run EDA: profile missingness, outliers, and class imbalance.",
        "Engineer features: impute, encode categoricals, scale, and transform skew.",
        "Train a LightGBM classifier inside a Scikit-Learn Pipeline.",
        "Evaluate with Precision/Recall/F1, ROC-AUC, and the PR-curve.",
        "Tune the decision threshold for the business cost of a missed default.",
      ],
    },
    quiz: [
      {
        question:
          "What is the practical difference between L1 and L2 regularization?",
        options: [
          "L1 speeds up training; L2 slows it down",
          "L1 can drive weights to exactly zero (feature selection); L2 shrinks weights smoothly",
          "They are identical in effect",
          "L2 removes features while L1 keeps them all",
        ],
        answerIndex: 1,
        explanation:
          "L1 (Lasso) produces sparse solutions with some weights exactly zero, effectively selecting features; L2 (Ridge) shrinks all weights smoothly toward zero without eliminating them.",
      },
      {
        question:
          "On a highly imbalanced credit-default dataset, why is accuracy a poor metric?",
        options: [
          "It is too slow to compute",
          "A model predicting the majority class always can score very high accuracy while catching no defaults",
          "Accuracy only works for regression",
          "It requires a confusion matrix",
        ],
        answerIndex: 1,
        explanation:
          "With rare positives, always predicting the majority class yields high accuracy but zero recall on defaults. Precision, Recall, F1, and the PR-curve reveal the real performance.",
      },
      {
        question: "Which family of models most often wins on tabular data?",
        options: [
          "Deep convolutional networks",
          "Gradient-boosted tree ensembles (XGBoost, LightGBM, CatBoost)",
          "Recurrent neural networks",
          "Naive Bayes",
        ],
        answerIndex: 1,
        explanation:
          "Gradient-boosted decision trees consistently top structured/tabular benchmarks and make strong, fast baselines that deep models must beat.",
      },
    ],
  },
  {
    id: "module-2",
    week: 2,
    title: "Deep Learning Foundations (PyTorch & TensorFlow)",
    objective:
      "Transition from classical algorithms to deep neural networks, focusing on framework-level implementations and native debugging.",
    lessons: [
      {
        id: "m2-l1",
        title: "Computation Graphs: Dynamic vs. Static",
        content: [
          "Every deep learning framework builds a computation graph — a record of operations used to compute gradients. PyTorch builds this graph dynamically (define-by-run): the graph is created as code executes, which makes debugging feel like ordinary Python. TensorFlow/Keras traditionally compiled a static graph ahead of time, trading interactivity for optimization and deployment portability.",
          "Understanding this distinction explains the developer experience of each framework and why modern versions of both now offer eager execution and compilation modes.",
        ],
        bullets: [
          "PyTorch: dynamic, define-by-run graphs — Pythonic debugging.",
          "TensorFlow/Keras: static/compiled graphs — optimization & portability.",
          "Both now blend eager and compiled execution.",
          "The graph is what enables automatic differentiation.",
        ],
      },
      {
        id: "m2-l2",
        title: "Neural Network Mechanics: Autograd & Activations",
        content: [
          "A network computes predictions in a forward pass, then learns via backpropagation — the chain rule applied across layers to compute how each weight affected the loss. Autograd engines automate this, tracking operations and computing gradients so you never derive them by hand.",
          "Activation functions inject the nonlinearity that lets networks model complex patterns. ReLU is the fast default; GELU and Swish are smoother variants common in modern architectures; Softmax converts final logits into a probability distribution for classification.",
        ],
        bullets: [
          "Forward pass computes predictions; backprop computes gradients.",
          "Autograd engines automate differentiation.",
          "ReLU (default), GELU, Swish add nonlinearity.",
          "Softmax turns logits into class probabilities.",
        ],
      },
      {
        id: "m2-l3",
        title: "Optimizers & Learning Rate Scheduling",
        content: [
          "The optimizer decides how gradients become weight updates. SGD with Momentum accumulates velocity to escape shallow minima; RMSprop adapts step sizes per parameter; Adam and AdamW combine both ideas and are the everyday defaults, with AdamW fixing weight-decay behavior.",
          "Learning rate scheduling matters as much as the optimizer. Schedules like OneCycleLR and Cosine Annealing raise and lower the rate over training to converge faster and generalize better than a fixed rate.",
        ],
        bullets: [
          "SGD+Momentum, RMSprop, Adam, AdamW — know when to use each.",
          "AdamW is the common modern default.",
          "Schedules: OneCycleLR, Cosine Annealing.",
          "A good schedule often beats a fancier optimizer.",
        ],
      },
      {
        id: "m2-l4",
        title: "Taming Gradients: Normalization & Clipping",
        content: [
          "Deep networks suffer from vanishing and exploding gradients — signals that shrink to nothing or blow up as they propagate through many layers, stalling or destabilizing training. Normalization layers are the primary fix: Batch Normalization standardizes activations across a batch, while Layer Normalization does so per sample (essential for transformers and variable batch sizes).",
          "For recurrent and transformer training, gradient clipping caps the gradient magnitude to prevent the occasional explosive update from wrecking the model.",
        ],
        bullets: [
          "Vanishing/exploding gradients destabilize deep training.",
          "Batch Norm: normalize across the batch.",
          "Layer Norm: normalize per sample (transformers, RNNs).",
          "Gradient clipping caps runaway updates.",
        ],
      },
    ],
    lab: {
      title: "Build an MLP from Scratch in PyTorch and TensorFlow",
      description:
        "Build a customizable multi-layer perceptron (MLP) from scratch in both PyTorch and TensorFlow, comparing training speed, memory consumption, and developer workflows.",
      steps: [
        "Implement the same MLP architecture in PyTorch and in TensorFlow/Keras.",
        "Wire up autograd-based training loops in each framework.",
        "Add normalization, an LR schedule, and gradient clipping.",
        "Benchmark training speed and peak memory on identical data.",
        "Write up the developer-experience differences you observed.",
      ],
    },
    quiz: [
      {
        question:
          "What characterizes PyTorch's dynamic (define-by-run) computation graph?",
        options: [
          "The graph is fully compiled before any code runs",
          "The graph is built as the code executes, making debugging feel like normal Python",
          "It cannot compute gradients",
          "It only works on CPUs",
        ],
        answerIndex: 1,
        explanation:
          "PyTorch constructs the graph on the fly during execution, so you can inspect tensors and step through code like ordinary Python — a major debugging advantage.",
      },
      {
        question:
          "Which normalization technique is standard in transformer architectures and works per-sample?",
        options: [
          "Batch Normalization",
          "Layer Normalization",
          "Gradient clipping",
          "Dropout",
        ],
        answerIndex: 1,
        explanation:
          "Layer Normalization normalizes across features within each sample, making it robust to variable batch sizes and the default choice inside transformers.",
      },
      {
        question: "What problem does gradient clipping address?",
        options: [
          "Slow data loading",
          "Occasional exploding gradients producing destabilizing weight updates",
          "Overfitting to the training set",
          "Class imbalance",
        ],
        answerIndex: 1,
        explanation:
          "Gradient clipping caps gradient magnitude so a single explosive update can't derail training — especially important for RNNs and transformers.",
      },
    ],
  },
  {
    id: "module-3",
    week: 3,
    title: "Computer Vision & Spatial Representation",
    objective:
      "Develop and optimize spatial model architectures for vision tasks ranging from image classification to pixel-level segmentation.",
    lessons: [
      {
        id: "m3-l1",
        title: "Convolutional Neural Networks",
        content: [
          "CNNs exploit the spatial structure of images. A convolution slides a small learnable filter across the image, detecting local patterns (edges, textures) that combine into higher-level features deeper in the network. Pooling downsamples to build translation tolerance, while stride and padding control output size.",
          "The receptive field — how much of the input a given neuron 'sees' — grows with depth, letting late layers reason about whole objects. Classic architectures encode hard-won design lessons: ResNet's skip connections, EfficientNet's balanced scaling, and ConvNeXt's modernized design.",
        ],
        bullets: [
          "Convolutions detect local patterns with shared filters.",
          "Pooling, stride, and padding control resolution.",
          "Receptive field grows with depth.",
          "ResNet (skip connections), EfficientNet, ConvNeXt.",
        ],
      },
      {
        id: "m3-l2",
        title: "Object Detection & Segmentation",
        content: [
          "Beyond 'what is in this image?', detection asks 'what, and where?'. Two-stage detectors like Faster R-CNN propose regions then classify them — accurate but slower. Single-stage detectors like the YOLO family predict boxes and classes in one pass — fast enough for real-time.",
          "Segmentation goes to the pixel level. Semantic segmentation labels every pixel by class (U-Net is the classic architecture); instance segmentation additionally separates individual objects (Mask R-CNN).",
        ],
        bullets: [
          "Two-stage (Faster R-CNN): accurate, slower.",
          "Single-stage (YOLO): fast, real-time capable.",
          "Semantic segmentation: label every pixel (U-Net).",
          "Instance segmentation: separate each object (Mask R-CNN).",
        ],
      },
      {
        id: "m3-l3",
        title: "Transfer Learning & Fine-Tuning",
        content: [
          "You rarely train vision models from scratch. Transfer learning starts from a network pre-trained on millions of images and adapts it to your task with far less data. You freeze early layers (which learn general features like edges) and fine-tune later layers to your domain.",
          "Discriminative learning rates apply larger updates to later layers than earlier ones, and visual domain adaptation techniques bridge the gap when your images look different from the pre-training set.",
        ],
        bullets: [
          "Start from a pre-trained backbone, adapt to your task.",
          "Freeze general early layers; fine-tune later ones.",
          "Discriminative learning rates per layer group.",
          "Domain adaptation bridges visual distribution gaps.",
        ],
      },
      {
        id: "m3-l4",
        title: "Data Augmentation for Robustness",
        content: [
          "Augmentation multiplies your data by applying label-preserving transformations, teaching the model invariances and reducing overfitting. Beyond flips and crops, modern strategies like MixUp (blend two images and labels) and CutMix (paste a patch of one image into another) produce markedly more robust classifiers.",
          "Libraries like Albumentations make rich augmentation pipelines fast and composable — an easy, high-leverage win for generalization.",
        ],
        bullets: [
          "Augmentation teaches invariances and fights overfitting.",
          "MixUp blends images and labels.",
          "CutMix pastes patches across images.",
          "Albumentations: fast, composable augmentation pipelines.",
        ],
      },
    ],
    lab: {
      title: "Fine-Tune YOLO on an Industrial Defect Dataset",
      description:
        "Fine-tune a YOLOv8 / YOLOv10 object detection model on a custom industrial defect dataset using PyTorch.",
      steps: [
        "Label and format a custom industrial defect dataset for YOLO.",
        "Configure augmentation (including MixUp/CutMix) with Albumentations.",
        "Fine-tune a pre-trained YOLOv8/YOLOv10 model in PyTorch.",
        "Evaluate with mAP and inspect false positives/negatives.",
        "Iterate on augmentation and learning rates to improve robustness.",
      ],
    },
    quiz: [
      {
        question:
          "What is the main trade-off between two-stage (Faster R-CNN) and single-stage (YOLO) detectors?",
        options: [
          "Two-stage detectors only work on video",
          "Two-stage tends to be more accurate but slower; single-stage is faster and real-time capable",
          "Single-stage detectors cannot classify objects",
          "There is no difference",
        ],
        answerIndex: 1,
        explanation:
          "Two-stage detectors propose then classify regions (accurate, slower); single-stage detectors predict boxes and classes in one pass (fast, real-time).",
      },
      {
        question:
          "In transfer learning for vision, why do we typically freeze the early layers?",
        options: [
          "They are broken and cannot train",
          "They learn general features (edges, textures) that transfer well, so we adapt only later, task-specific layers",
          "Freezing makes the model larger",
          "Early layers are always the output layers",
        ],
        answerIndex: 1,
        explanation:
          "Early convolutional layers capture general visual primitives that transfer across tasks; fine-tuning focuses on the later, domain-specific layers with limited data.",
      },
      {
        question: "What does the CutMix augmentation strategy do?",
        options: [
          "Removes all color from images",
          "Pastes a patch from one image into another and mixes their labels accordingly",
          "Crops images to a fixed square only",
          "Deletes mislabeled samples",
        ],
        answerIndex: 1,
        explanation:
          "CutMix cuts a region from one image into another and blends the labels proportionally, producing more robust classifiers than simple crops or flips.",
      },
    ],
  },
  {
    id: "module-4",
    week: 4,
    title: "Natural Language Processing & Sequence Modeling",
    objective:
      "Implement sequence models and state-of-the-art transformer architectures for text processing, generation, and classification.",
    lessons: [
      {
        id: "m4-l1",
        title: "Text Representation & Embeddings",
        content: [
          "Text must become numbers. Tokenization splits text into units — Byte-Pair Encoding and WordPiece learn sub-word vocabularies that balance vocabulary size against sequence length. Each token then maps to an embedding: a dense vector capturing meaning.",
          "Static embeddings like Word2Vec give each word one fixed vector, missing context ('bank' the riverside vs. the financial institution). Contextual embeddings, produced by transformers, give a different vector per usage — the leap that powered modern NLP.",
        ],
        bullets: [
          "Tokenization: Byte-Pair Encoding and WordPiece (sub-word units).",
          "Static embeddings (Word2Vec): one vector per word.",
          "Contextual embeddings: vector depends on surrounding context.",
          "Context-awareness is the key modern advance.",
        ],
      },
      {
        id: "m4-l2",
        title: "Sequence Models: RNNs, LSTMs, GRUs",
        content: [
          "Before transformers, recurrent networks processed sequences one step at a time, carrying a hidden state forward. Vanilla RNNs struggle to remember long-range dependencies due to vanishing gradients. LSTMs add gated memory cells that learn what to keep, forget, and output; GRUs are a lighter-weight variant with fewer gates.",
          "Though largely superseded by transformers for large-scale NLP, these models remain relevant for lightweight, streaming, and resource-constrained sequence tasks — and understanding them clarifies why attention was such a breakthrough.",
        ],
        bullets: [
          "RNNs carry a hidden state but forget long-range context.",
          "LSTMs use gated cells to retain long dependencies.",
          "GRUs are a lighter LSTM alternative.",
          "Still useful for lightweight/streaming sequence tasks.",
        ],
      },
      {
        id: "m4-l3",
        title: "The Transformer Architecture",
        content: [
          "Transformers replaced recurrence with attention, processing all tokens in parallel while learning which tokens matter to which. Scaled Dot-Product Attention computes relevance between tokens; Multi-Head Self-Attention runs several attention operations in parallel to capture different relationships; and Positional Encodings reinject word order, since attention alone is order-agnostic.",
          "Three paradigms emerged: encoder-only models (BERT) for understanding and classification, decoder-only models (GPT-style) for generation, and encoder-decoder models for sequence-to-sequence tasks like translation.",
        ],
        code: {
          label: "Scaled dot-product attention",
          body: "Attention(Q, K, V) = softmax( (Q · Kᵀ) / √dₖ ) · V\n\nMulti-head: run h attention heads in parallel,\nconcatenate, and project. Positional encodings\nadd word-order information back in.",
        },
        bullets: [
          "Self-attention: which tokens attend to which, in parallel.",
          "Multi-head attention captures multiple relationship types.",
          "Positional encodings restore word order.",
          "Encoder-only (BERT), decoder-only (GPT), encoder-decoder.",
        ],
      },
      {
        id: "m4-l4",
        title: "Applied NLP with Hugging Face & Efficient Fine-Tuning",
        content: [
          "Hugging Face makes state-of-the-art models practical: load a pre-trained transformer and fine-tune it for classification or Named Entity Recognition with a few lines of code. But full fine-tuning of large models is expensive.",
          "Parameter-efficient techniques solve this. LoRA injects small trainable matrices while freezing the base model; QLoRA adds quantization to fine-tune large models on a single GPU; Prefix Tuning learns a small set of virtual tokens. These make customizing big models accessible to individuals and small teams.",
        ],
        bullets: [
          "Hugging Face: fine-tune pre-trained models for classification & NER.",
          "LoRA: train small adapter matrices, freeze the base.",
          "QLoRA: quantized fine-tuning of large models on one GPU.",
          "Prefix Tuning: learn a small set of virtual tokens.",
        ],
      },
    ],
    lab: {
      title: "Transformer Sequence Classification for Financial Sentiment",
      description:
        "Train a transformer-based sequence classification model for financial sentiment analysis and multi-label document classification.",
      steps: [
        "Tokenize a financial text dataset with a pre-trained tokenizer.",
        "Fine-tune a BERT-style model for sentiment classification.",
        "Extend to multi-label document classification with the right loss.",
        "Apply LoRA to reduce the fine-tuning footprint.",
        "Evaluate with per-class F1 and analyze the confusion matrix.",
      ],
    },
    quiz: [
      {
        question:
          "What is the key advantage of contextual embeddings over static embeddings like Word2Vec?",
        options: [
          "They are smaller in size",
          "They give a word a different vector depending on its surrounding context",
          "They require no training",
          "They only work for one language",
        ],
        answerIndex: 1,
        explanation:
          "Static embeddings assign one fixed vector per word; contextual embeddings (from transformers) vary the vector by context, disambiguating meanings like 'bank'.",
      },
      {
        question: "Why do transformers need positional encodings?",
        options: [
          "To reduce memory usage",
          "Because self-attention is order-agnostic, so word order must be added back explicitly",
          "To perform tokenization",
          "To replace the loss function",
        ],
        answerIndex: 1,
        explanation:
          "Attention treats inputs as a set with no inherent order, so positional encodings inject information about token positions back into the model.",
      },
      {
        question: "What does QLoRA add on top of LoRA?",
        options: [
          "It removes the base model entirely",
          "It combines quantization with low-rank adapters to fine-tune large models on a single GPU",
          "It only works for computer vision",
          "It disables gradient computation",
        ],
        answerIndex: 1,
        explanation:
          "QLoRA quantizes the frozen base model and trains LoRA adapters on top, dramatically cutting memory so very large models can be fine-tuned on one GPU.",
      },
    ],
  },
  {
    id: "module-5",
    week: 5,
    title: "Model Optimization, Compression & Compilation",
    objective:
      "Bridge the gap between training environments and edge/cloud inference constraints by squeezing maximum throughput out of models.",
    lessons: [
      {
        id: "m5-l1",
        title: "Understanding Inference Bottlenecks",
        content: [
          "A model that trains fine can be too slow or too big to serve. Inference is often bound not by raw compute but by memory bandwidth — moving weights and activations around. Floating-point precision affects both speed and memory, and end-to-end latency includes data movement, not just the forward pass.",
          "Optimization starts with measurement: profile where time and memory actually go before changing anything. You'll learn to read latency and throughput numbers and identify the true bottleneck.",
        ],
        bullets: [
          "Inference is often memory-bandwidth bound, not compute bound.",
          "Precision affects speed, memory, and accuracy.",
          "Latency includes data movement, not just math.",
          "Always profile before optimizing.",
        ],
      },
      {
        id: "m5-l2",
        title: "Model Quantization",
        content: [
          "Quantization shrinks models by using lower-precision numbers. Post-Training Quantization (PTQ) converts an already-trained FP32 model to FP16 or INT8 quickly, with some accuracy loss. Quantization-Aware Training (QAT) simulates quantization during training so the model adapts, recovering most of that accuracy.",
          "Modern hardware supports mixed precision down to INT8 and even FP4/INT4, delivering large speed and memory wins — critical for edge deployment and cost-efficient serving.",
        ],
        bullets: [
          "PTQ: quick post-hoc conversion, some accuracy loss.",
          "QAT: simulate quantization in training to preserve accuracy.",
          "FP32 → FP16 → INT8 → FP4/INT4 as hardware allows.",
          "Big memory and latency savings for edge and cloud.",
        ],
      },
      {
        id: "m5-l3",
        title: "Pruning & Knowledge Distillation",
        content: [
          "Pruning removes redundant weights. Unstructured pruning zeros individual weights (high compression, needs sparse-aware hardware to speed up); structured pruning removes whole channels or layers (directly faster on standard hardware).",
          "Knowledge Distillation trains a small 'student' model to mimic a large 'teacher', transferring capability into a compact model. Together, pruning and distillation can shrink models dramatically while retaining most of their accuracy.",
        ],
        bullets: [
          "Unstructured pruning: zero individual weights (needs sparse hardware).",
          "Structured pruning: drop channels/layers (fast on any hardware).",
          "Distillation: a small student mimics a large teacher.",
          "Combine to compress with minimal accuracy loss.",
        ],
      },
      {
        id: "m5-l4",
        title: "Execution Frameworks & Compilers",
        content: [
          "To run fast in production, models are exported and compiled for the target hardware. ONNX (Open Neural Network Exchange) is a portable format that decouples the model from its training framework, so a PyTorch model can run in many runtimes.",
          "Hardware-specific compilers then optimize further: NVIDIA TensorRT fuses operations and tunes kernels for NVIDIA GPUs, while Apache TVM targets a broad range of accelerators. These steps routinely deliver multiplicative latency and throughput gains.",
        ],
        bullets: [
          "ONNX: portable, framework-independent model format.",
          "TensorRT: aggressive optimization for NVIDIA GPUs.",
          "Apache TVM: compilation across many hardware targets.",
          "Compilation often yields multiplicative speedups.",
        ],
      },
    ],
    lab: {
      title: "Profile, Export to ONNX, and Optimize with TensorRT",
      description:
        "Profile a PyTorch model, convert it to ONNX, apply TensorRT optimization, and measure latency/throughput gains on GPU.",
      steps: [
        "Profile the baseline PyTorch model's latency and memory on GPU.",
        "Export the model to ONNX and validate numerical parity.",
        "Apply TensorRT optimization (including precision reduction).",
        "Benchmark latency and throughput before vs. after.",
        "Report the speedup and any accuracy trade-off.",
      ],
    },
    quiz: [
      {
        question:
          "What is the difference between Post-Training Quantization (PTQ) and Quantization-Aware Training (QAT)?",
        options: [
          "PTQ trains longer than QAT",
          "PTQ converts an already-trained model quickly with some accuracy loss; QAT simulates quantization during training to preserve accuracy",
          "QAT only works on CPUs",
          "They produce identical results",
        ],
        answerIndex: 1,
        explanation:
          "PTQ is a fast post-hoc conversion that can lose accuracy; QAT bakes quantization effects into training so the model adapts and retains more accuracy.",
      },
      {
        question:
          "Why is structured pruning often more practical than unstructured pruning?",
        options: [
          "It compresses more aggressively",
          "It removes whole channels/layers, yielding real speedups on standard hardware without needing sparse-aware kernels",
          "It never affects accuracy",
          "It only applies to transformers",
        ],
        answerIndex: 1,
        explanation:
          "Unstructured pruning zeros scattered weights and needs sparse-aware hardware to run faster; structured pruning removes entire structures, giving direct speedups on ordinary hardware.",
      },
      {
        question: "What role does ONNX play in the deployment pipeline?",
        options: [
          "It trains models from scratch",
          "It is a portable, framework-independent model format that lets a model run across many runtimes and compilers",
          "It only stores datasets",
          "It replaces Kubernetes",
        ],
        answerIndex: 1,
        explanation:
          "ONNX decouples the model from its training framework, providing a common format that runtimes and hardware compilers (like TensorRT and TVM) can optimize.",
      },
    ],
  },
  {
    id: "module-6",
    week: 6,
    title: "MLOps Foundation — Versioning, Pipelines & Tracking",
    objective:
      "Establish reproducible environments and trace ML experiments systematically.",
    lessons: [
      {
        id: "m6-l1",
        title: "Data Version Control (DVC)",
        content: [
          "Git handles code, but chokes on gigabyte datasets and model weights. DVC (Data Version Control) versions large files alongside Git by storing lightweight pointers in the repo and the actual data in remote storage. This makes any experiment reproducible: check out a commit and get exactly the data, model, and code that produced a result.",
          "DVC also captures pipeline steps as a dependency graph, so you can rerun only what changed — the foundation of reproducible ML.",
        ],
        bullets: [
          "Git tracks code; DVC tracks large data and model files.",
          "Data lives in remote storage; pointers live in Git.",
          "Reproduce any experiment exactly by commit.",
          "Pipeline stages rerun only what changed.",
        ],
      },
      {
        id: "m6-l2",
        title: "Feature Stores & Training-Serving Skew",
        content: [
          "A subtle production killer is training-serving skew: features computed one way in training and another way in serving, silently degrading accuracy. Feature stores (like Feast) centralize feature definitions so the exact same logic feeds both training and inference.",
          "They also serve features with low latency at inference time and provide point-in-time-correct historical features for training — eliminating a whole class of hard-to-debug production failures.",
        ],
        bullets: [
          "Training-serving skew silently degrades production accuracy.",
          "Feature stores centralize one definition for train and serve.",
          "Low-latency online serving of features at inference.",
          "Point-in-time-correct features for training.",
        ],
      },
      {
        id: "m6-l3",
        title: "Experiment Tracking with MLflow",
        content: [
          "Without tracking, ML devolves into 'which run produced this model?' chaos. MLflow logs every run's metrics, parameters, hyperparameters, and artifacts, so experiments are comparable and reproducible. You can see exactly what changed between a good run and a bad one.",
          "Its Model Registry then manages the model lifecycle — promoting versions through Staging and Production, and Archiving old ones — giving you a controlled, auditable path from experiment to deployment.",
        ],
        bullets: [
          "Log metrics, params, hyperparameters, and artifacts per run.",
          "Compare runs to see what actually changed.",
          "Model Registry manages Staging → Production → Archived.",
          "An auditable path from experiment to deployment.",
        ],
      },
      {
        id: "m6-l4",
        title: "Reproducible Pipeline Orchestration",
        content: [
          "Production ML is a pipeline: ingest, validate, featurize, train, evaluate, register. Orchestrators like Airflow, Prefect, and ZenML define these workflows as code, schedule them, handle failures and retries, and make runs reproducible and observable.",
          "Choosing an orchestrator is about fit: Airflow is battle-tested for scheduled batch workflows, Prefect emphasizes a modern Pythonic developer experience, and ZenML is purpose-built for ML pipelines and portability.",
        ],
        bullets: [
          "Pipelines: ingest → validate → featurize → train → register.",
          "Orchestrators define workflows as code with retries.",
          "Airflow, Prefect, ZenML — pick by fit.",
          "Scheduling, failure handling, and observability built in.",
        ],
      },
    ],
    lab: {
      title: "Automated Training Run with DVC + MLflow Registry",
      description:
        "Set up an automated training run that registers data versions with DVC, logs training telemetry to MLflow, and automatically registers the top-performing run to the MLflow Model Registry.",
      steps: [
        "Version the dataset and pipeline stages with DVC.",
        "Instrument training to log metrics/params/artifacts to MLflow.",
        "Run a small hyperparameter sweep and compare runs.",
        "Auto-register the best run's model to the MLflow Model Registry.",
        "Promote the model to Staging and document the lineage.",
      ],
    },
    quiz: [
      {
        question: "Why can't standard Git alone version ML datasets and model weights well?",
        options: [
          "Git cannot store text",
          "Git is inefficient with large binary files; DVC stores pointers in Git and data in remote storage",
          "Git deletes large files automatically",
          "DVC replaces Git entirely",
        ],
        answerIndex: 1,
        explanation:
          "Git struggles with large binaries. DVC keeps lightweight pointers in Git and the actual data/models in remote storage, enabling reproducible, versioned datasets.",
      },
      {
        question: "What problem do feature stores primarily solve?",
        options: [
          "They speed up GPU training",
          "Training-serving skew — ensuring identical feature logic in training and inference",
          "They replace the model registry",
          "They label data automatically",
        ],
        answerIndex: 1,
        explanation:
          "Feature stores centralize feature definitions so the exact same computation feeds both training and serving, preventing skew that silently degrades accuracy.",
      },
      {
        question: "What does the MLflow Model Registry provide?",
        options: [
          "A place to store raw datasets only",
          "Lifecycle management of model versions through stages like Staging, Production, and Archived",
          "Automatic GPU provisioning",
          "A replacement for Docker",
        ],
        answerIndex: 1,
        explanation:
          "The Model Registry manages model versions and their lifecycle stages, giving a controlled, auditable path from experiment to production.",
      },
    ],
  },
  {
    id: "module-7",
    week: 7,
    title: "Production-Grade Deployment & Model Serving",
    objective:
      "Wrap, containerize, and serve ML models with ultra-low latency and scalable architecture.",
    lessons: [
      {
        id: "m7-l1",
        title: "API Development for ML with FastAPI",
        content: [
          "Serving a model means exposing it behind an API. FastAPI is the go-to for ML endpoints: it's fast, typed, and async-native. You'll write robust inference endpoints with input validation, handle asynchronous requests so slow model calls don't block the server, and implement request batching to process multiple requests together for higher throughput.",
          "Good serving code also handles errors gracefully, validates inputs against a schema, and returns structured, versioned responses.",
        ],
        bullets: [
          "FastAPI: fast, typed, async-native inference endpoints.",
          "Async handling keeps the server responsive under load.",
          "Request batching boosts throughput.",
          "Validate inputs and return structured responses.",
        ],
      },
      {
        id: "m7-l2",
        title: "Containerization for ML",
        content: [
          "Containers make deployments reproducible: the model, code, and every dependency ship together. For ML this is trickier — CUDA runtimes and heavy Python dependencies bloat images. You'll learn to build lean Docker containers with multi-stage builds, correct CUDA base images, and careful dependency pinning.",
          "A well-built image starts faster, costs less to store and transfer, and reduces the attack surface — details that matter at scale.",
        ],
        bullets: [
          "Containers bundle model, code, and dependencies reproducibly.",
          "Match the CUDA base image to your GPU runtime.",
          "Multi-stage builds and pinning keep images lean.",
          "Smaller images start faster and cost less.",
        ],
      },
      {
        id: "m7-l3",
        title: "Dedicated Inference Servers",
        content: [
          "For high-performance serving, dedicated inference servers beat a hand-rolled API. NVIDIA Triton Inference Server runs multi-model pipelines, supports many frameworks, and provides dynamic batching that automatically groups incoming requests to maximize GPU utilization.",
          "Framework-specific servers — TorchServe for PyTorch, TF Serving for TensorFlow — offer streamlined paths when you're committed to one ecosystem. Choosing the right server is a throughput and operational decision.",
        ],
        bullets: [
          "Triton: multi-model, multi-framework, dynamic batching.",
          "Dynamic batching maximizes GPU utilization automatically.",
          "TorchServe / TF Serving for single-framework simplicity.",
          "The right server is a throughput and ops decision.",
        ],
      },
      {
        id: "m7-l4",
        title: "Kubernetes Orchestration & Autoscaling",
        content: [
          "Production serving must scale with demand. Kubernetes deploys your containerized model APIs across a cluster, restarts failed pods, and rolls out updates safely. Horizontal autoscaling adds or removes replicas based on CPU/GPU utilization and request volume, so you meet demand without over-provisioning.",
          "You'll learn the core objects (Deployments, Services, HPA) and how GPU scheduling and autoscaling policies keep latency low and costs sane.",
        ],
        bullets: [
          "Kubernetes deploys, heals, and updates model APIs.",
          "Horizontal Pod Autoscaler scales on utilization/traffic.",
          "GPU scheduling for accelerated workloads.",
          "Scale to meet demand without over-provisioning.",
        ],
      },
    ],
    lab: {
      title: "Deploy a Model on Triton with Dynamic Batching",
      description:
        "Package a deep learning model into a Docker container, deploy it onto a Triton Inference Server, and implement dynamic batching to handle high-concurrency requests.",
      steps: [
        "Export the model and configure it for Triton's model repository.",
        "Build a lean CUDA-enabled Docker image for the server.",
        "Enable dynamic batching and tune the batch window.",
        "Load-test with high concurrency and measure latency/throughput.",
        "Compare performance with and without dynamic batching.",
      ],
    },
    quiz: [
      {
        question: "Why is async request handling important in an ML serving API?",
        options: [
          "It makes the model more accurate",
          "It keeps the server responsive under load so slow model calls don't block other requests",
          "It is required by Docker",
          "It reduces model size",
        ],
        answerIndex: 1,
        explanation:
          "Async handling lets the server process other requests while awaiting slow inference, keeping throughput and responsiveness high under concurrency.",
      },
      {
        question: "What does dynamic batching on an inference server do?",
        options: [
          "Splits one request into many models",
          "Automatically groups incoming requests together to maximize GPU utilization and throughput",
          "Encrypts the requests",
          "Trains the model on incoming data",
        ],
        answerIndex: 1,
        explanation:
          "Dynamic batching (e.g. in Triton) waits a short window to combine concurrent requests into a batch, improving GPU efficiency and throughput.",
      },
      {
        question:
          "How does a Kubernetes Horizontal Pod Autoscaler help a model service?",
        options: [
          "It rewrites the model code",
          "It adds/removes replicas based on utilization and request volume to match demand",
          "It quantizes the model",
          "It versions the dataset",
        ],
        answerIndex: 1,
        explanation:
          "The HPA scales the number of pods up or down based on metrics like CPU/GPU utilization and traffic, meeting demand without over-provisioning.",
      },
    ],
  },
  {
    id: "module-8",
    week: 8,
    title: "Monitoring, Drift Detection & Observability",
    objective:
      "Build guardrails to maintain model accuracy and system reliability post-deployment.",
    lessons: [
      {
        id: "m8-l1",
        title: "Inference Telemetry",
        content: [
          "A deployed model is not 'done' — it must be observed. System telemetry tracks GPU utilization, memory footprint, and latency to catch performance regressions and capacity limits. Business metrics track whether the model is actually delivering value.",
          "Good observability means dashboards and alerts that surface problems before users do, tying system health to business outcomes.",
        ],
        bullets: [
          "Monitor GPU utilization, memory, and latency.",
          "Track business metrics, not just system ones.",
          "Dashboards and alerts surface issues early.",
          "Deployment is the start of monitoring, not the end.",
        ],
      },
      {
        id: "m8-l2",
        title: "Data & Model Drift",
        content: [
          "Models decay because the world changes. Covariate shift means the input distribution moves; prior probability shift means class balance changes; concept drift means the relationship between inputs and outputs itself changes. Any of these silently erodes accuracy.",
          "You detect drift statistically: the Kolmogorov-Smirnov test compares distributions, the Population Stability Index quantifies feature shift, and Kullback-Leibler divergence measures how far a new distribution has moved from the reference.",
        ],
        bullets: [
          "Covariate shift: inputs change.",
          "Prior probability shift: class balance changes.",
          "Concept drift: the input→output relationship changes.",
          "Detect with KS test, PSI, and KL divergence.",
        ],
      },
      {
        id: "m8-l3",
        title: "Feedback Loops & Safe Rollouts",
        content: [
          "Detecting drift is only useful if you act on it. Retraining triggers automatically kick off a new training run when drift crosses a threshold. Before promoting a new model, you de-risk the rollout: shadow deployments run the new model alongside the old without affecting users, and A/B canary testing routes a small slice of traffic to the new model first.",
          "Active learning closes the loop further by prioritizing the most informative new samples for labeling, improving the model where it's weakest.",
        ],
        bullets: [
          "Retraining triggers fire when drift crosses a threshold.",
          "Shadow deployments test new models risk-free.",
          "A/B canary rollouts limit blast radius.",
          "Active learning labels the most informative samples.",
        ],
      },
    ],
    lab: {
      title: "Drift Detection & Automated Retraining",
      description:
        "Integrate Evidently AI or Great Expectations into an ingestion stream to calculate drift metrics, trigger alerts, and initiate an automated re-training pipeline.",
      steps: [
        "Define a reference dataset and expectations for incoming data.",
        "Compute drift metrics (PSI/KS) with Evidently AI on the stream.",
        "Set thresholds and wire up alerts on drift breaches.",
        "Trigger an automated retraining pipeline when drift is detected.",
        "Validate the retrained model via a shadow or canary rollout.",
      ],
    },
    quiz: [
      {
        question:
          "A model's accuracy degrades because the relationship between inputs and the target has genuinely changed. What is this called?",
        options: [
          "Covariate shift",
          "Prior probability shift",
          "Concept drift",
          "Overfitting",
        ],
        answerIndex: 2,
        explanation:
          "Concept drift is when the input→output relationship itself changes over time, distinct from input-distribution shifts (covariate) or class-balance shifts (prior).",
      },
      {
        question:
          "Which statistical tool quantifies how much a feature's distribution has shifted in production?",
        options: [
          "Mean Squared Error",
          "Population Stability Index (PSI)",
          "Softmax",
          "Learning rate schedule",
        ],
        answerIndex: 1,
        explanation:
          "PSI (alongside the KS test and KL divergence) measures how far a production distribution has moved from a reference — a standard drift signal.",
      },
      {
        question:
          "What is the purpose of a shadow deployment when rolling out a new model?",
        options: [
          "To train the model faster",
          "To run the new model alongside the old on real traffic without affecting users, validating it before promotion",
          "To delete the old model immediately",
          "To quantize the model",
        ],
        answerIndex: 1,
        explanation:
          "A shadow deployment mirrors production traffic to the new model without serving its outputs to users, letting you validate it safely before a canary or full rollout.",
      },
    ],
  },
  {
    id: "module-9",
    week: 9,
    title: "Capstone — End-to-End ML System Architecture",
    objective:
      "Consolidate all course modules into a single, cohesive, production-grade ML system.",
    lessons: [
      {
        id: "m9-l1",
        title: "Choosing Your Capstone Project",
        content: [
          "The capstone is where every module comes together. You'll pick one of three production-shaped projects, each stressing a different part of the stack you've learned — vision and edge latency, NLP pipelines, or time-series forecasting with drift.",
          "Choose based on the skills you most want to demonstrate to an employer; all three require the full lifecycle from data versioning to a monitored, deployed endpoint.",
        ],
        bullets: [
          "Real-time Visual Inspection: detect anomalies from streaming image feeds with low-latency edge deployment.",
          "Intelligent Customer Support Engine: multi-label NLP, PII redaction, sentiment routing, and summarization.",
          "High-Frequency Demand Forecaster: tabular/time-series forecasting with continuous drift detection and scheduled retraining.",
          "All three exercise the complete production lifecycle.",
        ],
      },
      {
        id: "m9-l2",
        title: "Architecting the System",
        content: [
          "Before code, design. A production ML system is more than a model: it's data ingestion and versioning, a training pipeline with experiment tracking, an optimized and containerized serving layer, orchestration, and a monitoring/retraining loop. You'll produce an architecture diagram that shows how these pieces connect and where the human checkpoints live.",
          "Good architecture makes explicit how data flows, how models get promoted, how the system scales, and how it recovers when something drifts or fails.",
        ],
        bullets: [
          "Design the full pipeline before implementing it.",
          "Cover ingestion, versioning, training, serving, and monitoring.",
          "Produce a clear MLOps architecture diagram.",
          "Make data flow, promotion, scaling, and recovery explicit.",
        ],
      },
      {
        id: "m9-l3",
        title: "Deliverables & Assessment",
        content: [
          "Your capstone is assessed as a complete, production-grade system — the portfolio piece that proves you can take a model from idea to reliable, monitored service. It must be fully reproducible and observable, not a one-off notebook.",
          "Deliver a version-controlled repository (code, data, and models), a documented MLOps architecture diagram, and a deployed, containerized API endpoint with monitoring dashboards and automated drift alerts.",
        ],
        bullets: [
          "Fully version-controlled repository: code, data, and models.",
          "A documented MLOps architecture diagram.",
          "A deployed, containerized API endpoint.",
          "Complete monitoring, dashboards, and automated drift alerts.",
        ],
      },
    ],
    lab: {
      title: "Capstone: Ship an End-to-End Production ML System",
      description:
        "Build one of the three capstone projects as a single, cohesive, production-grade ML system — assessed on architecture, reproducibility, deployment, and monitoring.",
      steps: [
        "Select a project and write an architecture brief with a diagram.",
        "Version data and models (DVC) and track experiments (MLflow).",
        "Optimize and containerize the model; deploy a serving endpoint.",
        "Add monitoring dashboards and automated drift alerts with retraining.",
        "Document the repository and demo the full system end-to-end.",
      ],
    },
    quiz: [
      {
        question:
          "Which capstone option most directly exercises low-latency edge deployment?",
        options: [
          "Intelligent Customer Support Engine",
          "High-Frequency Demand Forecaster",
          "Real-time Visual Inspection System",
          "None of them",
        ],
        answerIndex: 2,
        explanation:
          "The Real-time Visual Inspection System detects anomalies from continuous streaming image feeds with low-latency edge deployment — the most edge-latency-focused option.",
      },
      {
        question:
          "What makes a capstone deliverable 'production-grade' rather than a notebook demo?",
        options: [
          "It uses the largest possible model",
          "It is reproducible and observable — version-controlled code/data/models, a deployed monitored endpoint, and automated alerts",
          "It avoids using Docker",
          "It skips monitoring to save time",
        ],
        answerIndex: 1,
        explanation:
          "Production-grade means the whole lifecycle is reproducible and observable: versioned artifacts, a deployed containerized endpoint, monitoring dashboards, and automated drift alerts.",
      },
      {
        question:
          "Why produce an MLOps architecture diagram before building the capstone?",
        options: [
          "It is only for decoration",
          "It makes data flow, model promotion, scaling, and failure recovery explicit before implementation",
          "It replaces the need for code",
          "It trains the model",
        ],
        answerIndex: 1,
        explanation:
          "An architecture diagram clarifies how ingestion, training, serving, and monitoring connect — and where checkpoints and recovery live — guiding a coherent implementation.",
      },
    ],
  },
];
