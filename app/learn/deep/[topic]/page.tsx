import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const PAGES = [
  {
    "slug": "math-prerequisites",
    "title": "Mathematical Foundations for AI Research",
    "subtitle": "Linear algebra, probability, calculus, and optimization — the load-bearing math under every frontier paper",
    "intro": "Every modern AI paper you will ever read sits on four mathematical pillars: linear algebra (the language of representations), probability (the language of uncertainty), multivariable calculus (the language of optimization), and convex/non-convex optimization theory (the language of training). Skipping these is the single most common mistake of self-taught practitioners — they can fine-tune a model but cannot read the proofs in a scaling-laws paper, cannot derive their own loss function, and cannot debug a training run that diverges for mathematical reasons. A doctorate-grade learner must reach the point where matrix calculus on a whiteboard, expectation-over-distribution manipulations, and Lagrangian optimization feel as natural as writing Python. The goal of this page is not to make you a mathematician — it is to make you fluent enough that when Goodfellow writes 'we minimize the KL divergence between p_data and p_model parameterized by theta' you do not pause. You see the geometry of distributions, the gradient flowing backward, the Jacobian of the parameterization. You should be able to derive gradient descent yourself, derive the normal equations for linear regression, derive backpropagation through a two-layer network, prove that softmax-then-cross-entropy gives the clean gradient form, and compute the Fisher information matrix for a simple model. Linear algebra carries the heaviest weight — eigendecompositions, SVD, matrix calculus, the four fundamental subspaces, and the geometry of projections appear everywhere from attention mechanisms to LoRA to RLHF. Probability is the second heaviest — you need measure-theoretic intuition (without the full machinery), comfort with multivariate distributions, the exponential family, KL/JS/TV divergences, and concentration inequalities. Calculus and optimization are the connective tissue. Treat this page as a year of full-time study compressed into a structured path. Most practitioners try to skip ahead and fail; doctorate-grade work requires you to actually do the problems.",
    "readingPath": [
      {
        "resource": "3Blue1Brown — Essence of Linear Algebra (YouTube series by Grant Sanderson)",
        "type": "lecture",
        "estimatedHours": 8,
        "why": "The geometric intuition for vectors, transformations, determinants, eigenvectors, and change of basis. Watch this first; everything else makes more sense after."
      },
      {
        "resource": "3Blue1Brown — Essence of Calculus (YouTube series)",
        "type": "lecture",
        "estimatedHours": 6,
        "why": "Same treatment for derivatives, integrals, and the chain rule. The chain rule episode is the prerequisite for understanding backpropagation."
      },
      {
        "resource": "MIT OCW 18.06 — Linear Algebra (Gilbert Strang)",
        "type": "course",
        "estimatedHours": 60,
        "why": "The canonical undergraduate linear algebra course. Strang's four-fundamental-subspaces framing is the mental model used by every ML researcher."
      },
      {
        "resource": "Introduction to Linear Algebra — Gilbert Strang (textbook, 5th or 6th edition)",
        "type": "textbook",
        "estimatedHours": 40,
        "why": "The companion text to 18.06. Do the problem sets — the exam-style problems force you to compute rather than recognize."
      },
      {
        "resource": "MIT OCW 18.05 — Introduction to Probability and Statistics (Orloff and Bloom)",
        "type": "course",
        "estimatedHours": 50,
        "why": "Bayesian-flavored probability course with clean problem sets. Builds the conditional-probability intuition you need for graphical models and variational inference."
      },
      {
        "resource": "MIT OCW 18.01 / 18.02 — Single and Multivariable Calculus",
        "type": "course",
        "estimatedHours": 80,
        "why": "Gradients, Jacobians, Hessians, and Lagrange multipliers. The multivariable course is where vector calculus becomes the language of optimization."
      },
      {
        "resource": "The Matrix Cookbook — Petersen and Pedersen",
        "type": "textbook",
        "estimatedHours": 6,
        "why": "Free reference PDF. Memorize the matrix-calculus identities pages — they are the bread and butter of derivation work."
      },
      {
        "resource": "Convex Optimization — Boyd and Vandenberghe (free PDF)",
        "type": "textbook",
        "estimatedHours": 80,
        "why": "Even though deep learning is non-convex, the geometric intuitions (duality, KKT conditions, gradient descent convergence) carry over. Stanford EE364A lectures are the companion."
      },
      {
        "resource": "Probability Theory: The Logic of Science — E.T. Jaynes",
        "type": "textbook",
        "estimatedHours": 60,
        "why": "Read selectively. The first 4 chapters reframe probability as extended logic and will permanently improve how you reason about uncertainty in ML systems."
      },
      {
        "resource": "Mathematics for Machine Learning — Deisenroth, Faisal, Ong (free PDF)",
        "type": "textbook",
        "estimatedHours": 50,
        "why": "Bridges the gap between pure math and ML applications. Useful integrator after the foundational courses."
      }
    ],
    "exercises": [
      "Derive the closed-form solution to ordinary least squares from scratch using only matrix calculus. Verify against numpy.linalg.lstsq.",
      "Implement SVD by hand on a 3x3 matrix using the eigendecomposition of A^T A. Compare to numpy.linalg.svd.",
      "Derive backpropagation for a two-layer MLP with cross-entropy loss on paper, then implement it in pure numpy with no autograd.",
      "Prove that softmax composed with cross-entropy yields the gradient (p - y). Show every step.",
      "Compute the KL divergence between two multivariate Gaussians in closed form. Verify against a Monte Carlo estimate.",
      "Implement gradient descent and Newton's method for logistic regression. Plot convergence on the same loss landscape."
    ],
    "milestones": [
      "You can derive backpropagation on a whiteboard with no notes.",
      "You can read a paper that says 'minimize the KL between q(z|x) and p(z|x)' and immediately picture the geometry.",
      "You can derive the gradient of a custom loss without consulting external references.",
      "You can implement linear regression, logistic regression, and a two-layer MLP in pure numpy.",
      "You recognize when a paper's claim depends on a convexity, smoothness, or concentration assumption."
    ]
  },
  {
    "slug": "foundational-ml",
    "title": "Foundational Machine Learning",
    "subtitle": "Supervised, unsupervised, and reinforcement learning fundamentals — the canon you need before deep learning",
    "intro": "Before transformers, before deep learning, there is classical machine learning — and skipping it produces a particular kind of brittle practitioner who can fine-tune Llama but cannot explain why a random forest beats a neural network on tabular data, cannot debug a model that is overfitting because they never internalized bias-variance, and cannot evaluate a paper's baseline because they have no taste for what 'good' looks like outside deep learning. A doctorate-grade researcher needs the full canon: linear and logistic regression, regularization (L1/L2 and their geometric interpretations), kernel methods, decision trees and ensembles, naive Bayes, k-means and Gaussian mixtures, EM, PCA, the bias-variance decomposition, cross-validation, the bootstrap, the curse of dimensionality, no-free-lunch theorems, and the statistical learning theory undercurrents (VC dimension, Rademacher complexity at the conceptual level, PAC learning). The two anchor textbooks — Elements of Statistical Learning (Hastie, Tibshirani, Friedman) and the more accessible Introduction to Statistical Learning (James, Witten, Hastie, Tibshirani) — are the canonical references; every serious ML researcher has read one or both. ESL is the harder text and the one that builds taste. ISLR is the gentler entry point and the one that ships you with R/Python code. Pair these with the fast.ai course for a hands-on counterweight; Jeremy Howard's pedagogy is the antidote to overly theoretical textbook-only learning. Reinforcement learning sits adjacent here — Sutton and Barto's textbook is the canonical entry, and you need at least Q-learning, policy gradients, and the actor-critic formulation before approaching RLHF. By the end of this path, you should be able to pick the right model for a given dataset, diagnose underfitting vs overfitting from learning curves alone, and explain why deep learning is not always the answer.",
    "readingPath": [
      {
        "resource": "An Introduction to Statistical Learning — James, Witten, Hastie, Tibshirani (free PDF, 2nd edition with Python)",
        "type": "textbook",
        "estimatedHours": 80,
        "why": "The gentle on-ramp. Read this first if classical ML is unfamiliar. Every chapter has worked code and exercises."
      },
      {
        "resource": "The Elements of Statistical Learning — Hastie, Tibshirani, Friedman (free PDF, 2nd edition)",
        "type": "textbook",
        "estimatedHours": 150,
        "why": "The canonical reference. Read after ISLR. Chapters 3 (linear methods), 7 (model assessment), 10 (boosting), and 14 (unsupervised) are mandatory."
      },
      {
        "resource": "fast.ai — Practical Deep Learning for Coders (course by Jeremy Howard and Sylvain Gugger)",
        "type": "course",
        "estimatedHours": 40,
        "why": "Top-down hands-on counterweight to ESL's bottom-up theory. Builds real intuition by getting models running fast."
      },
      {
        "resource": "Pattern Recognition and Machine Learning — Christopher Bishop",
        "type": "textbook",
        "estimatedHours": 120,
        "why": "The Bayesian-flavored alternative to ESL. Chapters on graphical models, EM, and variational inference are the standard."
      },
      {
        "resource": "Reinforcement Learning: An Introduction — Sutton and Barto (2nd edition, free PDF)",
        "type": "textbook",
        "estimatedHours": 90,
        "why": "The RL bible. Chapters 1-13 are the canonical curriculum. Required before any modern RLHF paper."
      },
      {
        "resource": "Andrew Ng's Machine Learning Specialization (Coursera)",
        "type": "course",
        "estimatedHours": 60,
        "why": "The classic gentle introduction. Better as a refresher or first exposure than as a doctorate-path text, but covers the basics cleanly."
      },
      {
        "resource": "scikit-learn user guide and API documentation",
        "type": "code",
        "estimatedHours": 20,
        "why": "Treat this as a textbook. The sklearn docs are pedagogically excellent and every example doubles as a working implementation."
      },
      {
        "resource": "Kaggle — playground and getting-started competitions (Titanic, House Prices, MNIST)",
        "type": "code",
        "estimatedHours": 30,
        "why": "Cheap reps. Forces you to actually feature-engineer, validate, and submit predictions on real data."
      }
    ],
    "exercises": [
      "Implement L1 and L2 regularized linear regression from scratch (no sklearn). Reproduce the LASSO solution path.",
      "Code a decision tree classifier from scratch and a random forest wrapper around it. Compare to sklearn on a benchmark.",
      "Implement k-means and EM for Gaussian mixtures. Visualize convergence on a toy dataset.",
      "Run a complete bias-variance decomposition experiment on polynomial regression of increasing degree.",
      "Implement tabular Q-learning on Frozen Lake from gym/gymnasium. Plot learning curves.",
      "Take a Kaggle tabular competition and beat a gradient-boosted tree baseline using only classical methods."
    ],
    "milestones": [
      "You can explain why XGBoost still wins on tabular data.",
      "You can diagnose bias vs variance from a learning curve in under thirty seconds.",
      "You can derive logistic regression from a maximum likelihood argument.",
      "You can implement tabular RL and explain why function approximation is hard.",
      "You can pick an appropriate baseline for any new ML problem without thinking."
    ]
  },
  {
    "slug": "deep-learning-fundamentals",
    "title": "Deep Learning Fundamentals",
    "subtitle": "From the perceptron to ResNets — the canon before transformers",
    "intro": "Deep learning is not the totality of modern AI but it is the substrate of every frontier model. Before approaching transformers, RLHF, or interpretability, you need a deep working command of the deep learning fundamentals: forward and backward propagation, activation functions and their properties, weight initialization (Xavier, He), normalization layers (BatchNorm, LayerNorm, GroupNorm), the convolutional architecture, residual connections, the vanishing/exploding gradient problem and its mitigations, dropout, the various flavors of regularization, the standard optimizers (SGD, momentum, Adam, AdamW, Lion) and their convergence properties, learning rate schedules, gradient clipping, the difference between training/validation/test regimes, the practicalities of GPU training, and the empirical scaling phenomena that distinguish deep learning from classical ML. The Goodfellow-Bengio-Courville textbook is the canonical reference and remains the best single source for the theory through 2016; everything published since is in papers. Pair it with Andrew Ng's Deep Learning Specialization for the pedagogical structure and fast.ai's deep learning course for the hands-on counterweight. Karpathy's 'Zero to Hero' YouTube series is the modern essential — building micrograd, then makemore, then a transformer from scratch builds intuition in a way no textbook can. By the end of this path you should be able to implement and train a ResNet on CIFAR-10 from scratch without consulting external code, debug a training run that is failing to converge, recognize the standard architectures by their PyTorch summaries, and explain why a particular architectural choice (residual connections, layer normalization, attention) was added. You should also have direct hands-on experience with at least one full training run — feeling the difference between epoch 1 and epoch 50, between a good learning rate and a bad one, is irreplaceable.",
    "readingPath": [
      {
        "resource": "Deep Learning — Goodfellow, Bengio, Courville (free online)",
        "type": "textbook",
        "estimatedHours": 120,
        "why": "The canonical reference for deep learning theory up to 2016. Part I (math) and Part II (modern practical deep networks) are mandatory."
      },
      {
        "resource": "Andrej Karpathy — Neural Networks: Zero to Hero (YouTube series)",
        "type": "lecture",
        "estimatedHours": 25,
        "why": "Watch every video. Building micrograd from scratch, then makemore character-level models, then a transformer is the single best modern deep learning curriculum."
      },
      {
        "resource": "Andrew Ng — Deep Learning Specialization (Coursera, deeplearning.ai)",
        "type": "course",
        "estimatedHours": 60,
        "why": "Five courses covering basics through sequence models. Good structure if you need a paced curriculum."
      },
      {
        "resource": "fast.ai — Practical Deep Learning for Coders Part 2 (From Deep Learning Foundations to Stable Diffusion)",
        "type": "course",
        "estimatedHours": 50,
        "why": "Builds a deep learning library from scratch over a series of lessons. Bottom-up complement to the top-down Part 1."
      },
      {
        "resource": "Deep Residual Learning for Image Recognition — He, Zhang, Ren, Sun (ResNet paper, 2015)",
        "type": "paper",
        "estimatedHours": 3,
        "why": "Read it. The residual connection is one of the three or four most important architectural ideas in deep learning."
      },
      {
        "resource": "Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift — Ioffe and Szegedy (2015)",
        "type": "paper",
        "estimatedHours": 2,
        "why": "BatchNorm changed training. Read it alongside the LayerNorm paper (Ba, Kiros, Hinton, 2016)."
      },
      {
        "resource": "Adam: A Method for Stochastic Optimization — Kingma and Ba (2014)",
        "type": "paper",
        "estimatedHours": 2,
        "why": "The optimizer you will use most often. Understand the bias correction and the momentum/RMSprop hybrid."
      },
      {
        "resource": "Dive into Deep Learning — Zhang, Lipton, Li, Smola (d2l.ai, free interactive book)",
        "type": "textbook",
        "estimatedHours": 80,
        "why": "Interactive textbook with PyTorch, MXNet, and TensorFlow code for every chapter. Excellent supplementary reference."
      },
      {
        "resource": "PyTorch official tutorials (pytorch.org/tutorials)",
        "type": "code",
        "estimatedHours": 20,
        "why": "The 60-minute blitz, then the more advanced tutorials. PyTorch is the standard for research."
      },
      {
        "resource": "The Annotated Transformer — Sasha Rush et al. (Harvard NLP)",
        "type": "blog",
        "estimatedHours": 6,
        "why": "Bridge to the transformers page. Walks through Attention Is All You Need with executable code interleaved."
      }
    ],
    "exercises": [
      "Implement micrograd from Karpathy's video, then extend it to support vector operations and a working two-layer MLP.",
      "Implement a ResNet-18 from scratch in PyTorch and train it on CIFAR-10 to above 90% test accuracy.",
      "Reproduce a learning rate sweep: train the same model with 10 different learning rates and plot loss curves.",
      "Implement batch normalization from scratch as a custom autograd module. Verify gradients against PyTorch's nn.BatchNorm.",
      "Train a model with intentional bugs (wrong initialization, no normalization, no residuals) and document what goes wrong.",
      "Profile a training run with PyTorch profiler. Identify the bottleneck (GPU compute, data loading, host-device transfer)."
    ],
    "milestones": [
      "You can implement backprop from scratch with no autograd.",
      "You have trained a ResNet to a real accuracy number on a real dataset.",
      "You can debug a non-converging training run.",
      "You can explain why residual connections enable depth.",
      "You can read a PyTorch model summary and predict its memory and compute footprint."
    ]
  },
  {
    "slug": "transformers-from-scratch",
    "title": "Transformers from Scratch",
    "subtitle": "Attention, the architecture, and the implementation that underlies every frontier model",
    "intro": "If you read only one paper in modern AI, read Attention Is All You Need (Vaswani et al., 2017). If you implement only one architecture, implement the transformer. Every frontier language model — GPT-4, Claude, Llama, Gemini — is a transformer at its core, and a doctorate-grade researcher must be able to derive every component on a whiteboard, implement it in PyTorch, and explain every architectural choice. The pieces are: token and positional embeddings (and the various flavors — sinusoidal, learned, RoPE, ALiBi); the multi-head attention mechanism (query, key, value projections; scaled dot-product attention; the causal mask; multi-head concatenation); the feed-forward network (typically 4x the hidden dimension); layer normalization (pre-norm vs post-norm, and why pre-norm won); residual connections; and the stack itself. Beyond the original encoder-decoder formulation, you need to understand the decoder-only variant that powers GPT-style models, the encoder-only variant that powers BERT, the various efficiency-improving variants (Flash Attention, sliding window attention, grouped-query attention, multi-query attention), and the long-context extensions (NTK scaling, YaRN, position interpolation). Karpathy's nanoGPT is the canonical pedagogical implementation — a few hundred lines of PyTorch that train a real (small) GPT on Shakespeare. The Annotated Transformer is the line-by-line walk through the original paper. The Illustrated Transformer (Jay Alammar) is the diagrammatic intuition builder. By the end of this path you should be able to implement a transformer from scratch in under an hour, debug attention layers by inspecting attention patterns, and read any modern transformer variant paper (Mixtral, Llama 3, DeepSeek V3) and identify what is novel vs standard. You should also have trained a small transformer on real data and felt the experience of the loss curve, the difference between a well-tuned and poorly-tuned setup.",
    "readingPath": [
      {
        "resource": "Attention Is All You Need — Vaswani, Shazeer, Parmar, Uszkoreit, Jones, Gomez, Kaiser, Polosukhin (2017)",
        "type": "paper",
        "estimatedHours": 6,
        "why": "The foundational paper. Read it three times: skim, deep read, then annotate. Every modern LLM descends from this architecture."
      },
      {
        "resource": "Andrej Karpathy — Let's build GPT: from scratch, in code, spelled out (YouTube)",
        "type": "lecture",
        "estimatedHours": 3,
        "why": "Karpathy implements a transformer from scratch in one sitting. Watch and code along; do not skip ahead."
      },
      {
        "resource": "nanoGPT — Andrej Karpathy (github.com/karpathy/nanoGPT)",
        "type": "code",
        "estimatedHours": 15,
        "why": "Read every line of the model.py and train.py. Then reproduce the Shakespeare result. Then reproduce the GPT-2 124M reproduction."
      },
      {
        "resource": "The Annotated Transformer — Sasha Rush et al. (Harvard NLP)",
        "type": "blog",
        "estimatedHours": 6,
        "why": "Line-by-line walk through the original paper with executable code. The complement to Karpathy's video."
      },
      {
        "resource": "The Illustrated Transformer — Jay Alammar",
        "type": "blog",
        "estimatedHours": 2,
        "why": "Diagrammatic intuition. Read after one technical pass for the visual grounding."
      },
      {
        "resource": "Language Models are Few-Shot Learners — Brown et al. (GPT-3 paper, 2020)",
        "type": "paper",
        "estimatedHours": 5,
        "why": "The decoder-only scaling paper. Read for the experimental methodology and the in-context learning results."
      },
      {
        "resource": "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding — Devlin, Chang, Lee, Toutanova (2018)",
        "type": "paper",
        "estimatedHours": 3,
        "why": "The encoder-only variant. Understanding masked language modeling and the encoder formulation."
      },
      {
        "resource": "RoFormer: Enhanced Transformer with Rotary Position Embedding — Su et al. (2021)",
        "type": "paper",
        "estimatedHours": 3,
        "why": "RoPE is the modern positional encoding used by Llama, Mistral, and most open frontier models. Read it."
      },
      {
        "resource": "FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness — Dao, Fu, Ermon, Rudra, Re (2022)",
        "type": "paper",
        "estimatedHours": 4,
        "why": "The IO-aware attention reformulation that made long context tractable. Required reading for understanding modern inference."
      },
      {
        "resource": "Llama 2: Open Foundation and Fine-Tuned Chat Models — Touvron et al. (2023)",
        "type": "paper",
        "estimatedHours": 6,
        "why": "A complete modern open transformer paper. Read for grouped-query attention, RMSNorm, SwiGLU, and the full training recipe."
      },
      {
        "resource": "Sebastian Raschka — Build a Large Language Model (From Scratch)",
        "type": "textbook",
        "estimatedHours": 30,
        "why": "Modern book-length treatment of implementing an LLM from tokenization through fine-tuning. Excellent companion to Karpathy."
      }
    ],
    "exercises": [
      "Implement scaled dot-product attention from scratch in numpy. Verify against PyTorch's F.scaled_dot_product_attention.",
      "Implement multi-head attention as a single PyTorch module. Train a tiny transformer on Karpathy's Shakespeare dataset.",
      "Reproduce nanoGPT's GPT-2 124M training run on your own hardware (or document why your hardware cannot).",
      "Implement RoPE positional encoding and replace the learned positional embeddings in your transformer. Compare convergence.",
      "Implement KV-caching for inference. Benchmark the speedup against the naive recompute version.",
      "Read a recent open model paper (Llama 3, Mistral, DeepSeek) and produce a one-page diff against the original Attention Is All You Need architecture."
    ],
    "milestones": [
      "You can implement a transformer from scratch in PyTorch in under one hour, from memory.",
      "You can explain why we divide by sqrt(d_k) in scaled dot-product attention.",
      "You have trained a transformer to a real loss number on real data.",
      "You can read any modern transformer paper and immediately identify the architectural variations.",
      "You can debug an attention layer by visualizing attention patterns."
    ]
  },
  {
    "slug": "training-dynamics",
    "title": "Training Dynamics and Scaling",
    "subtitle": "Scaling laws, optimizers, mixed precision, gradient accumulation, and the practical art of training large models",
    "intro": "Knowing the transformer architecture is necessary but not sufficient — to do frontier work you must know how to train. Training large models is its own discipline, with its own literature, its own folk wisdom, and its own pathologies. The doctorate-grade curriculum here covers: the scaling laws (Kaplan et al. and the corrected Hoffmann et al. Chinchilla paper), which dictate compute-optimal allocation of parameters versus tokens; the optimizer choices that matter (AdamW dominates, but Lion, Sophia, and second-order methods like Shampoo deserve study); learning rate schedules (linear warmup, cosine decay, the recently-popular Warmup-Stable-Decay schedule); the practical engineering of mixed precision training (bfloat16 vs float16, loss scaling, the GradScaler dance, and why bfloat16 won); gradient accumulation and gradient checkpointing as techniques for fitting larger effective batches on limited memory; data parallelism, model parallelism (tensor and pipeline), ZeRO and FSDP for parameter sharding; the empirical phenomena of training (grokking, loss spikes, the transition from memorization to generalization, double descent); and the practical hyperparameter tuning playbook (learning rate, weight decay, batch size, warmup steps, the muP parameterization). Frontier labs treat training as a craft — knowing exactly which hyperparameter to change when a run starts diverging is worth millions of dollars in compute. The Chinchilla paper alone reshaped the field by showing that GPT-3 was undertrained; the original Kaplan scaling laws made an off-by-data-multiplier error that Hoffmann corrected. The Adam paper, the muP paper (Yang et al.), and the various memory-efficient training papers are the load-bearing references. By the end of this path you should be able to look at a proposed training run and predict its convergence behavior, allocate compute optimally between model size and data, and debug a loss spike.",
    "readingPath": [
      {
        "resource": "Training Compute-Optimal Large Language Models — Hoffmann et al. (Chinchilla paper, DeepMind 2022)",
        "type": "paper",
        "estimatedHours": 6,
        "why": "The corrected scaling law. Required reading. The 20-tokens-per-parameter rule shaped Llama 2 and beyond."
      },
      {
        "resource": "Scaling Laws for Neural Language Models — Kaplan et al. (OpenAI, 2020)",
        "type": "paper",
        "estimatedHours": 5,
        "why": "The original scaling laws paper. Read alongside Chinchilla to understand what the original analysis got wrong."
      },
      {
        "resource": "Adam: A Method for Stochastic Optimization — Kingma and Ba (2014)",
        "type": "paper",
        "estimatedHours": 2,
        "why": "The optimizer behind almost every modern training run. Internalize the bias correction and the update rule."
      },
      {
        "resource": "Decoupled Weight Decay Regularization — Loshchilov and Hutter (AdamW paper, 2017)",
        "type": "paper",
        "estimatedHours": 2,
        "why": "AdamW is the actual optimizer used in practice. The decoupling matters."
      },
      {
        "resource": "Mixed Precision Training — Micikevicius et al. (NVIDIA, 2017)",
        "type": "paper",
        "estimatedHours": 3,
        "why": "The original mixed precision paper. Read alongside the bfloat16 specification (Wang and Kanwar, Google) to understand why bf16 dominates today."
      },
      {
        "resource": "ZeRO: Memory Optimizations Toward Training Trillion Parameter Models — Rajbhandari, Rasley, Ruwase, He (Microsoft DeepSpeed, 2019)",
        "type": "paper",
        "estimatedHours": 5,
        "why": "The parameter, gradient, and optimizer-state sharding scheme that made trillion-parameter training tractable."
      },
      {
        "resource": "Megatron-LM: Training Multi-Billion Parameter Language Models Using Model Parallelism — Shoeybi et al. (NVIDIA, 2019)",
        "type": "paper",
        "estimatedHours": 4,
        "why": "Tensor parallelism. The other half of large-model training infrastructure."
      },
      {
        "resource": "Tensor Programs V: Tuning Large Neural Networks via Zero-Shot Hyperparameter Transfer — Yang et al. (muP paper, 2022)",
        "type": "paper",
        "estimatedHours": 6,
        "why": "Parameterization that lets hyperparameters tuned on small models transfer to large models. Used by frontier labs."
      },
      {
        "resource": "Llama 2 and Llama 3 technical reports — Meta",
        "type": "paper",
        "estimatedHours": 10,
        "why": "Read for the complete training recipe of a frontier-grade open model. Especially the data mix, the LR schedule, and the hyperparameter choices."
      },
      {
        "resource": "Deep Learning Tuning Playbook — Tuning playbook (Google researchers, github)",
        "type": "blog",
        "estimatedHours": 8,
        "why": "Practical hyperparameter tuning guidance from people who actually train models. Treat it as an operational manual."
      },
      {
        "resource": "PyTorch FSDP tutorial and documentation",
        "type": "code",
        "estimatedHours": 8,
        "why": "FSDP is the modern PyTorch implementation of ZeRO-style sharding. Required for any actual large-model training."
      }
    ],
    "exercises": [
      "Reproduce a small Chinchilla-style scaling experiment: train models at three sizes on increasing token counts and fit the scaling law.",
      "Implement mixed precision training manually using torch.autocast and GradScaler. Compare memory and throughput to fp32.",
      "Implement gradient accumulation and verify that effective batch size N is equivalent to a true batch of N.",
      "Train the same model with SGD+momentum, Adam, AdamW, and Lion. Plot loss curves and explain the differences.",
      "Diagnose a loss spike: intentionally use too-high a learning rate, capture the divergence, then fix it with warmup and gradient clipping.",
      "Set up FSDP training on multiple GPUs (or a single GPU simulation). Verify equivalence to single-device training."
    ],
    "milestones": [
      "You can compute the Chinchilla-optimal parameter count for a given training budget.",
      "You can debug a divergent training run and identify the cause (LR, init, normalization, data).",
      "You have actually trained a model with mixed precision and FSDP.",
      "You can explain why bfloat16 beat float16 for large model training.",
      "You can read a frontier training report and identify every non-default choice."
    ]
  },
  {
    "slug": "rlhf-and-alignment",
    "title": "RLHF and Alignment",
    "subtitle": "From InstructGPT to Constitutional AI — how raw language models become helpful, harmless, and honest assistants",
    "intro": "A pretrained language model is an extraordinary completion engine but not a useful assistant. The transformation from base model to instruction-following assistant is one of the most consequential advances of the 2022-2024 era, and the technique is reinforcement learning from human feedback (RLHF), or more recently, related techniques like direct preference optimization (DPO), Constitutional AI (CAI), and RLAIF (RL from AI feedback). The canonical paper is Ouyang et al.'s InstructGPT (2022), which introduced the three-stage pipeline: supervised fine-tuning on demonstrations, training a reward model on human preference comparisons, and PPO fine-tuning of the language model against the reward model. Anthropic's Bai et al. HH-RLHF paper (Training a Helpful and Harmless Assistant with Reinforcement Learning from Human Feedback, 2022) is the parallel canonical work and the basis for the public HH dataset. Constitutional AI (Bai et al., 2022) introduced AI feedback as a scalable alternative to pure human labeling, and Anthropic's subsequent work extended this into RLAIF. Direct Preference Optimization (Rafailov et al., 2023) showed that the RL step can be replaced with a clean supervised loss, dramatically simplifying training. A doctorate-grade understanding of this area requires not just reading these papers but understanding the underlying RL theory (PPO, the KL-constrained reward, the reward hacking literature), the empirical pathologies (reward model overoptimization, sycophancy, mode collapse, sandbagging), and the broader alignment context (what RLHF can and cannot do, why scalable oversight is hard, the relationship between RLHF and the alignment problem proper). This page connects to the AI safety page and the interpretability page — they are aspects of the same project.",
    "readingPath": [
      {
        "resource": "Training language models to follow instructions with human feedback — Ouyang et al. (InstructGPT paper, OpenAI 2022)",
        "type": "paper",
        "estimatedHours": 8,
        "why": "The foundational RLHF-for-assistants paper. Read every section including the appendices on PPO and reward model training."
      },
      {
        "resource": "Training a Helpful and Harmless Assistant with Reinforcement Learning from Human Feedback — Bai et al. (Anthropic 2022)",
        "type": "paper",
        "estimatedHours": 8,
        "why": "Anthropic's parallel canonical paper. Read for the HH-RLHF dataset and the helpful-vs-harmless tradeoff analysis."
      },
      {
        "resource": "Constitutional AI: Harmlessness from AI Feedback — Bai et al. (Anthropic 2022)",
        "type": "paper",
        "estimatedHours": 6,
        "why": "Introduces AI feedback as a scalability mechanism. The basis for RLAIF and a major step toward scalable oversight."
      },
      {
        "resource": "Direct Preference Optimization: Your Language Model is Secretly a Reward Model — Rafailov, Sharma, Mitchell, Manning, Ermon, Finn (Stanford 2023)",
        "type": "paper",
        "estimatedHours": 6,
        "why": "DPO eliminates the explicit reward model and PPO. The current default for many open-source post-training pipelines."
      },
      {
        "resource": "Proximal Policy Optimization Algorithms — Schulman, Wolski, Dhariwal, Radford, Klimov (OpenAI 2017)",
        "type": "paper",
        "estimatedHours": 4,
        "why": "The RL algorithm under classical RLHF. Read alongside Sutton and Barto chapters on policy gradients."
      },
      {
        "resource": "Learning to Summarize from Human Feedback — Stiennon et al. (OpenAI 2020)",
        "type": "paper",
        "estimatedHours": 5,
        "why": "The pre-InstructGPT RLHF paper. Cleaner experimental setting that demonstrates the core mechanism."
      },
      {
        "resource": "Scaling Laws for Reward Model Overoptimization — Gao, Schulman, Hilton (OpenAI 2022)",
        "type": "paper",
        "estimatedHours": 4,
        "why": "Quantifies reward hacking. Essential for understanding why RLHF has limits."
      },
      {
        "resource": "Sycophancy to Subterfuge: Investigating Reward Tampering in Language Models — Denison et al. (Anthropic 2024)",
        "type": "paper",
        "estimatedHours": 5,
        "why": "Empirical evidence of reward hacking generalizing to specification gaming and reward tampering."
      },
      {
        "resource": "Reinforcement Learning: An Introduction — Sutton and Barto (chapters 13 on policy gradients)",
        "type": "textbook",
        "estimatedHours": 10,
        "why": "Background for understanding PPO. Read if your RL fundamentals are weak."
      },
      {
        "resource": "Spinning Up in Deep RL — OpenAI (spinningup.openai.com)",
        "type": "course",
        "estimatedHours": 25,
        "why": "Practical implementations of policy gradient methods. Work through the PPO implementation to internalize the algorithm."
      },
      {
        "resource": "TRL (Transformer Reinforcement Learning) — HuggingFace (github.com/huggingface/trl)",
        "type": "code",
        "estimatedHours": 15,
        "why": "Modern reference implementation of SFT, RM training, PPO, and DPO. Read the source code, then use it."
      }
    ],
    "exercises": [
      "Implement a tiny preference dataset (you produce 50 labeled pairs) and train a reward model from a base LM.",
      "Implement DPO from scratch on top of HuggingFace transformers. Verify against the TRL implementation.",
      "Reproduce a sycophancy result: prompt a model with leading premises and measure agreement bias before and after a preference fine-tune.",
      "Read InstructGPT and Bai et al. HH-RLHF in the same week. Produce a one-page diff of their methodologies.",
      "Run a small PPO RLHF training loop on a toy task (e.g., positive-sentiment continuations). Plot KL-to-reference and reward.",
      "Design a Constitutional AI red-team-and-revise loop for a small open model. Document the safety improvement (or lack thereof)."
    ],
    "milestones": [
      "You can derive the DPO loss from the KL-constrained RLHF objective on paper.",
      "You have actually trained a reward model and an RLHF or DPO fine-tune.",
      "You can identify reward hacking signatures in a model's outputs.",
      "You can explain Constitutional AI to a skeptical PhD in plain language.",
      "You understand why RLHF is not alignment, only a partial solution."
    ]
  },
  {
    "slug": "mechanistic-interpretability",
    "title": "Mechanistic Interpretability",
    "subtitle": "Reverse-engineering neural networks — circuits, features, and the path to understanding what models actually do",
    "intro": "Mechanistic interpretability is the project of reverse-engineering neural networks into the algorithms they implement. Where behavioral interpretability asks 'what does the model output?', mechanistic interpretability asks 'what is happening inside?' — at the level of individual neurons, attention heads, residual stream features, and computational circuits. The modern field crystallized around Anthropic's Transformer Circuits Thread and the work of Chris Olah, Catherine Olsson, Neel Nanda, and colleagues. The foundational papers — A Mathematical Framework for Transformer Circuits (Elhage et al., 2021), In-context Learning and Induction Heads (Olsson et al., 2022), Toy Models of Superposition (Elhage et al., 2022), and the subsequent Scaling Monosemanticity and Sparse Autoencoder work (Templeton et al., 2024) — together define the modern interpretability research program. The core concepts a doctorate-grade learner needs are: the residual stream as the central object of computation; the QK and OV circuits decomposition of attention heads; induction heads as a mechanistic explanation for in-context learning; superposition (the idea that models represent more features than they have neurons by storing them in nearly-orthogonal directions); sparse autoencoders (SAEs) as the leading tool for extracting interpretable features from polysemantic neurons; and activation patching, causal scrubbing, and other causal intervention techniques. The applied side includes circuit-level explanations of specific behaviors (the indirect object identification circuit, the modular addition circuit), feature visualization, and the use of interpretability to detect deception, sycophancy, and other alignment-relevant failure modes. Neel Nanda's blog and his TransformerLens library are the entry-level practical resources; the Transformer Circuits Thread itself is the canonical reading list. This is a young field — read papers chronologically to understand how the ideas built on each other.",
    "readingPath": [
      {
        "resource": "A Mathematical Framework for Transformer Circuits — Elhage et al. (Anthropic, Transformer Circuits Thread, 2021)",
        "type": "paper",
        "estimatedHours": 12,
        "why": "The foundational paper. Read slowly. The QK/OV decomposition is the load-bearing abstraction for everything that follows."
      },
      {
        "resource": "In-context Learning and Induction Heads — Olsson et al. (Anthropic 2022)",
        "type": "paper",
        "estimatedHours": 8,
        "why": "Identifies a specific circuit (induction heads) that mechanistically explains in-context learning. A landmark result."
      },
      {
        "resource": "Toy Models of Superposition — Elhage et al. (Anthropic 2022)",
        "type": "paper",
        "estimatedHours": 10,
        "why": "Explains how networks represent more features than neurons. Foundational for understanding SAEs."
      },
      {
        "resource": "Scaling Monosemanticity: Extracting Interpretable Features from Claude 3 Sonnet — Templeton et al. (Anthropic 2024)",
        "type": "paper",
        "estimatedHours": 10,
        "why": "Sparse autoencoders applied to a frontier model. The current state of the art in feature extraction."
      },
      {
        "resource": "Towards Monosemanticity: Decomposing Language Models With Dictionary Learning — Bricken et al. (Anthropic 2023)",
        "type": "paper",
        "estimatedHours": 8,
        "why": "The precursor to Scaling Monosemanticity. Read first for the SAE methodology."
      },
      {
        "resource": "Neel Nanda — A Comprehensive Mechanistic Interpretability Explainer & Glossary",
        "type": "blog",
        "estimatedHours": 6,
        "why": "Neel's glossary. Bookmark and return to it whenever a term is unfamiliar."
      },
      {
        "resource": "Neel Nanda — 200 Concrete Open Problems in Mechanistic Interpretability",
        "type": "blog",
        "estimatedHours": 4,
        "why": "Research-problem buffet. Pick three and try them; this is how to enter the field."
      },
      {
        "resource": "TransformerLens — Neel Nanda (github.com/TransformerLensOrg/TransformerLens)",
        "type": "code",
        "estimatedHours": 20,
        "why": "The de-facto research library for transformer interpretability. Work through the tutorials."
      },
      {
        "resource": "Interpretability in the Wild: a Circuit for Indirect Object Identification in GPT-2 small — Wang et al. (2022)",
        "type": "paper",
        "estimatedHours": 8,
        "why": "An end-to-end circuit analysis of a real behavior in a real (small) model. The methodological template."
      },
      {
        "resource": "Progress measures for grokking via mechanistic interpretability — Nanda, Chan, Lieberum, Smith, Steinhardt (2023)",
        "type": "paper",
        "estimatedHours": 6,
        "why": "Modular addition circuit. A complete mechanistic explanation of a phenomenon (grokking) from end to end."
      },
      {
        "resource": "ARENA (Alignment Research Engineer Accelerator) curriculum — github.com/callummcdougall/ARENA_3.0",
        "type": "course",
        "estimatedHours": 60,
        "why": "The most thorough modern mechanistic interpretability curriculum. Includes implementations of every major paper."
      },
      {
        "resource": "Transformer Circuits Thread — Anthropic (transformer-circuits.pub)",
        "type": "blog",
        "estimatedHours": 30,
        "why": "Read every post chronologically. This is the canonical living literature of mechanistic interpretability."
      }
    ],
    "exercises": [
      "Implement attention head visualization for GPT-2 small using TransformerLens. Identify candidate induction heads.",
      "Reproduce the indirect object identification circuit analysis on GPT-2 small. Verify the activation patching results.",
      "Train a small sparse autoencoder on the residual stream of a pretrained model. Inspect the features.",
      "Implement modular addition and reproduce Nanda et al.'s grokking circuit analysis.",
      "Pick one of Neel Nanda's 200 open problems and produce a short writeup of your attempt.",
      "Read Toy Models of Superposition and implement the toy ReLU model. Visualize the superposition phenomenon."
    ],
    "milestones": [
      "You can explain superposition and why it makes interpretability hard.",
      "You have used TransformerLens to actually inspect a real model.",
      "You can identify induction heads in a transformer you did not train.",
      "You have trained a sparse autoencoder and inspected its features.",
      "You can read a new Transformer Circuits Thread post and immediately follow the methodology."
    ]
  },
  {
    "slug": "multimodal-models",
    "title": "Multimodal Models",
    "subtitle": "Vision-language models, audio, video, and the architectures that bridge modalities",
    "intro": "Language is one modality among many. The frontier of AI is increasingly multimodal — models that see, hear, and (less commonly so far) act in continuous spaces. The doctorate-grade curriculum here begins with CLIP (Contrastive Language-Image Pretraining, Radford et al., 2021), which established the dual-encoder paradigm of joint vision-language embedding spaces and remains the load-bearing model for downstream multimodal work, from text-to-image generation to retrieval. From CLIP you move to the modern visual-language model architectures: Flamingo (Alayrac et al., DeepMind 2022) for the cross-attention-into-frozen-LM pattern; BLIP-2 (Li et al., Salesforce 2023) for the Q-Former projection approach; LLaVA (Liu et al., 2023) and the family of open VLMs that followed, which established that a simple linear projection from a vision encoder into an LLM's embedding space can match much more complex architectures. For diffusion-based generation, the canonical path is the original DDPM paper (Ho, Jain, Abbeel, 2020), then the latent diffusion paper that underlies Stable Diffusion (Rombach et al., 2022), then classifier-free guidance (Ho and Salimans, 2022). For text-to-image alignment and quality, DALL-E 2 (Ramesh et al., 2022) and Imagen (Saharia et al., 2022) define the canonical architectures, even if their successors have iterated significantly. GPT-4V's system card (OpenAI, 2023) is the canonical industry document for understanding the safety and capability evaluation framing of frontier multimodal models. Audio models — Whisper for speech recognition (Radford et al., 2022), MusicLM and AudioLM for generation — round out the modality picture. The unifying theme: most successful multimodal architectures freeze one modality's encoder, project into a shared space, and let cross-attention or a connecting MLP do the bridging work. A doctorate-grade learner should understand both the architectural choices and the data-curation choices that make these models work; multimodal data is much harder to curate than text-only data, and the data side is often where the field-defining work happens.",
    "readingPath": [
      {
        "resource": "Learning Transferable Visual Models From Natural Language Supervision — Radford et al. (CLIP paper, OpenAI 2021)",
        "type": "paper",
        "estimatedHours": 6,
        "why": "The contrastive vision-language paradigm. Foundational for everything multimodal that came after."
      },
      {
        "resource": "Flamingo: a Visual Language Model for Few-Shot Learning — Alayrac et al. (DeepMind 2022)",
        "type": "paper",
        "estimatedHours": 8,
        "why": "The frozen-LM-with-cross-attention pattern. Still influential in modern VLM design."
      },
      {
        "resource": "BLIP-2: Bootstrapping Language-Image Pre-training with Frozen Image Encoders and Large Language Models — Li et al. (Salesforce 2023)",
        "type": "paper",
        "estimatedHours": 6,
        "why": "The Q-Former approach. A different bridging architecture worth comparing to Flamingo's cross-attention."
      },
      {
        "resource": "Visual Instruction Tuning — Liu, Li, Wu, Lee (LLaVA paper, 2023)",
        "type": "paper",
        "estimatedHours": 5,
        "why": "Showed that a simple MLP projection from CLIP's visual encoder into LLaMA's embedding space, plus visual instruction-tuning, gives strong results. The minimalist template."
      },
      {
        "resource": "GPT-4V(ision) System Card — OpenAI (2023)",
        "type": "paper",
        "estimatedHours": 4,
        "why": "The frontier-lab framing of multimodal model evaluation and safety. Read alongside the GPT-4 technical report."
      },
      {
        "resource": "Denoising Diffusion Probabilistic Models — Ho, Jain, Abbeel (2020)",
        "type": "paper",
        "estimatedHours": 8,
        "why": "The DDPM paper. Foundational for the entire diffusion-models-for-generation line."
      },
      {
        "resource": "High-Resolution Image Synthesis with Latent Diffusion Models — Rombach, Blattmann, Lorenz, Esser, Ommer (Stable Diffusion paper, 2022)",
        "type": "paper",
        "estimatedHours": 6,
        "why": "Latent diffusion. The architecture that made high-resolution image generation tractable on consumer hardware."
      },
      {
        "resource": "Classifier-Free Diffusion Guidance — Ho and Salimans (2022)",
        "type": "paper",
        "estimatedHours": 3,
        "why": "Classifier-free guidance is used in essentially every text-to-image diffusion model. Read the short paper."
      },
      {
        "resource": "Robust Speech Recognition via Large-Scale Weak Supervision — Radford et al. (Whisper paper, OpenAI 2022)",
        "type": "paper",
        "estimatedHours": 5,
        "why": "The canonical modern speech recognition model. Demonstrates the data-scaling approach for audio."
      },
      {
        "resource": "An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale — Dosovitskiy et al. (Vision Transformer paper, 2020)",
        "type": "paper",
        "estimatedHours": 5,
        "why": "The ViT paper. The visual encoder architecture used in CLIP and most modern VLMs."
      },
      {
        "resource": "Lilian Weng — What are Diffusion Models? (blog post)",
        "type": "blog",
        "estimatedHours": 6,
        "why": "The best diffusion-models tutorial blog post on the internet. Read alongside DDPM."
      },
      {
        "resource": "OpenCLIP (github.com/mlfoundations/open_clip)",
        "type": "code",
        "estimatedHours": 15,
        "why": "Open implementation and replication of CLIP and its successors. Read the code and reproduce a small training run."
      }
    ],
    "exercises": [
      "Implement CLIP from scratch (vision encoder + text encoder + contrastive loss) on a small image-text dataset. Verify the zero-shot classification mechanism.",
      "Implement a minimal DDPM training loop on MNIST or CIFAR-10. Visualize the forward and reverse processes.",
      "Train a small LLaVA-style VLM by projecting a frozen CLIP visual encoder into a frozen small LM. Fine-tune the projection on a small visual instruction dataset.",
      "Reproduce classifier-free guidance on top of your DDPM implementation. Compare sample quality with and without guidance.",
      "Fine-tune Whisper on a non-English language (or accented speech) and measure WER improvement.",
      "Compare Flamingo-style cross-attention bridging vs LLaVA-style MLP projection on the same task. Document the tradeoffs."
    ],
    "milestones": [
      "You can explain CLIP's contrastive loss in one paragraph.",
      "You have trained a (small) diffusion model end-to-end.",
      "You can read a new VLM paper and identify the bridging architecture immediately.",
      "You understand why latent diffusion is faster than pixel-space diffusion.",
      "You can debug a multimodal training run that is collapsing to text-only behavior."
    ]
  },
  {
    "slug": "agents-and-tool-use",
    "title": "Agents and Tool Use",
    "subtitle": "ReAct, Toolformer, MCP, and the architectures of language models that act in the world",
    "intro": "An agent is a language model that takes actions in the world — calls tools, browses the web, executes code, writes files, makes API requests — and iterates on the results. The foundational paper is ReAct (Yao et al., 2022), which interleaved reasoning steps with action steps and established the template for nearly every subsequent agent framework. Toolformer (Schick et al., 2023) showed how a model could learn to invoke tools through self-supervised fine-tuning. The intervening years have produced an enormous proliferation of agent frameworks (LangChain, AutoGPT, BabyAGI, OpenAI's Assistants API, Anthropic's tool use, the Model Context Protocol or MCP), most of which iterate on the same core loop. A doctorate-grade learner needs to understand: the ReAct-style reasoning-action interleaving; the difference between function calling (the model emits structured output that the harness executes) and code execution (the model writes arbitrary code that the harness executes); the planning literature (Tree of Thoughts, Reflexion, the various explorations of search over agent trajectories); the failure modes specific to agents (context window degradation over long trajectories, error cascades when an early step is wrong, the inability to recover from environments that diverge from training distribution); the AutoGPT-era postmortems (the early autonomous-agent hype produced systems that did not generalize well, and the field has learned from this); and the modern protocol layer (MCP for tool definition, the OpenAI function-calling and Anthropic tool-use schemas, and how to design tool surfaces that models actually use well). The Anthropic engineering blog and the Model Context Protocol specification are required reading for understanding how the current frontier labs think about tool surfaces. Agents are the area of AI where capability gains translate most directly into economic value — but also where reliability and safety problems are most acute. A doctorate-grade understanding requires you to have actually built an agent loop, watched it fail, debugged it, and built a more robust one.",
    "readingPath": [
      {
        "resource": "ReAct: Synergizing Reasoning and Acting in Language Models — Yao, Zhao, Yu, Du, Shafran, Narasimhan, Cao (2022)",
        "type": "paper",
        "estimatedHours": 4,
        "why": "The foundational reasoning-and-acting paper. Every modern agent framework descends from this loop."
      },
      {
        "resource": "Toolformer: Language Models Can Teach Themselves to Use Tools — Schick et al. (Meta 2023)",
        "type": "paper",
        "estimatedHours": 5,
        "why": "Self-supervised tool-use fine-tuning. Foundational for understanding how models can be taught to call APIs."
      },
      {
        "resource": "Tree of Thoughts: Deliberate Problem Solving with Large Language Models — Yao, Yu, Zhao, Shafran, Griffiths, Cao, Narasimhan (2023)",
        "type": "paper",
        "estimatedHours": 4,
        "why": "Search over reasoning trajectories. The canonical extension of ReAct toward deliberate planning."
      },
      {
        "resource": "Reflexion: Language Agents with Verbal Reinforcement Learning — Shinn, Cassano, Berman, Gopinath, Narasimhan, Yao (2023)",
        "type": "paper",
        "estimatedHours": 4,
        "why": "Self-reflection as a learning mechanism for agents. Useful both as technique and as a study of agent failure modes."
      },
      {
        "resource": "Voyager: An Open-Ended Embodied Agent with Large Language Models — Wang et al. (NVIDIA 2023)",
        "type": "paper",
        "estimatedHours": 5,
        "why": "Long-horizon agent in Minecraft. Demonstrates skill library acquisition and lifelong learning patterns."
      },
      {
        "resource": "Anthropic — Building Effective Agents (engineering blog, 2024)",
        "type": "blog",
        "estimatedHours": 3,
        "why": "Practical doctrine from a frontier lab. The workflows-vs-agents distinction is load-bearing."
      },
      {
        "resource": "Model Context Protocol specification — Anthropic (modelcontextprotocol.io)",
        "type": "blog",
        "estimatedHours": 6,
        "why": "MCP is the emerging standard for tool servers and connectors. Read the spec and implement a minimal server."
      },
      {
        "resource": "OpenAI Function Calling and Assistants API documentation",
        "type": "blog",
        "estimatedHours": 4,
        "why": "The function-calling schema and assistants framework. The other major industrial approach."
      },
      {
        "resource": "Anthropic Tool Use documentation (docs.anthropic.com)",
        "type": "blog",
        "estimatedHours": 3,
        "why": "Claude's tool-use schema. Read alongside OpenAI's function calling for cross-vendor literacy."
      },
      {
        "resource": "SWE-bench: Can Language Models Resolve Real-World GitHub Issues? — Jimenez et al. (Princeton 2023)",
        "type": "paper",
        "estimatedHours": 5,
        "why": "The canonical agent benchmark. Read the paper and inspect a few of the trajectories that succeeded and failed."
      },
      {
        "resource": "AutoGPT, BabyAGI, and the agent-hype-cycle postmortems (various community writeups, 2023-2024)",
        "type": "blog",
        "estimatedHours": 4,
        "why": "Understand why the early autonomous-agent hype produced unreliable systems. Read several community postmortems to internalize the failure modes."
      },
      {
        "resource": "LangChain and LangGraph documentation (or alternative agent frameworks)",
        "type": "code",
        "estimatedHours": 15,
        "why": "Read the docs, understand the abstractions, then build something without them. Frameworks are useful for understanding the design space."
      }
    ],
    "exercises": [
      "Implement a minimal ReAct loop from scratch — a model, a tool registry, and a parser — without any agent framework.",
      "Build an MCP server that exposes three real tools (search, file read, code execution) and connect it to Claude.",
      "Run an agent on a long-horizon task (e.g., SWE-bench-style issue resolution) and analyze where it fails.",
      "Implement Reflexion-style verbal self-reflection on top of your ReAct loop. Measure improvement on a benchmark.",
      "Design a tool schema that minimizes agent confusion (clear names, narrow parameters, examples) and A/B test against a deliberately bad version.",
      "Write a post-mortem of one AutoGPT-era system, identifying what went wrong and what modern frameworks fix."
    ],
    "milestones": [
      "You have built an agent loop from scratch.",
      "You can explain why function calling is more reliable than free-form tool invocation.",
      "You have built an MCP server.",
      "You can debug an agent that is failing on long trajectories.",
      "You can design a tool surface that an agent will actually use well."
    ]
  },
  {
    "slug": "ai-safety-technical",
    "title": "AI Safety (Technical)",
    "subtitle": "From Concrete Problems to mesa-optimization and alignment faking — the technical research agenda for making AI go well",
    "intro": "AI safety as a technical research discipline is concerned with the question: how do we build AI systems that reliably do what we want, including as their capabilities increase past human verification? This is a distinct project from misuse prevention (which is more like cybersecurity), from short-term harm mitigation (which is more like content moderation), and from policy work (which is more like governance). The technical agenda has several pillars: outer alignment (specifying what we want — the reward, the objective, the constitution); inner alignment (ensuring the optimizer's actual objective matches what we specified, addressing mesa-optimization and deceptive alignment); robustness (the model behaves as intended under distribution shift, adversarial pressure, and out-of-training inputs); interpretability (we can understand why the model is doing what it is doing); and scalable oversight (we can supervise systems whose capabilities exceed our ability to directly verify their outputs). The canonical entry-level paper is Concrete Problems in AI Safety (Amodei, Olah, Steinhardt, Christiano, Schulman, Mane, 2016) which laid out five concrete research problems that remain relevant today. Risks from Learned Optimization in Advanced Machine Learning Systems (Hubinger, van Merwijk, Mikulik, Skalse, Garrabrant, 2019) introduced the mesa-optimization framework and the inner-alignment problem. More recently, Alignment Faking in Large Language Models (Greenblatt et al., Anthropic 2024) and Sleeper Agents (Hubinger et al., Anthropic 2024) have provided the first empirical demonstrations of alignment-relevant failure modes in frontier models. The Stanford / DeepMind / Anthropic / OpenAI safety publications and the AI Alignment Forum together comprise the active research literature. A doctorate-grade learner should be able to articulate the difference between capabilities research and safety research, identify which safety problems each technique addresses, evaluate empirical safety claims rigorously, and identify open problems worth working on.",
    "readingPath": [
      {
        "resource": "Concrete Problems in AI Safety — Amodei, Olah, Steinhardt, Christiano, Schulman, Mane (2016)",
        "type": "paper",
        "estimatedHours": 6,
        "why": "The canonical entry to the field. Read it first; the five problems framework is still useful taxonomically."
      },
      {
        "resource": "Risks from Learned Optimization in Advanced Machine Learning Systems — Hubinger, van Merwijk, Mikulik, Skalse, Garrabrant (2019)",
        "type": "paper",
        "estimatedHours": 12,
        "why": "Introduces mesa-optimization and the inner-alignment problem. Foundational and long; budget the time."
      },
      {
        "resource": "Alignment Faking in Large Language Models — Greenblatt et al. (Anthropic, Redwood, NYU, MILA 2024)",
        "type": "paper",
        "estimatedHours": 10,
        "why": "First-of-its-kind empirical demonstration of alignment faking in a frontier model. Required reading."
      },
      {
        "resource": "Sleeper Agents: Training Deceptive LLMs that Persist Through Safety Training — Hubinger et al. (Anthropic 2024)",
        "type": "paper",
        "estimatedHours": 8,
        "why": "Empirical demonstration that deceptive behavior can survive standard safety training. Critical evidence."
      },
      {
        "resource": "AI safety via debate — Irving, Christiano, Amodei (OpenAI 2018)",
        "type": "paper",
        "estimatedHours": 5,
        "why": "Foundational scalable oversight proposal. Read alongside the iterated amplification proposals."
      },
      {
        "resource": "Supervising strong learners by amplifying weak experts — Christiano, Shlegeris, Amodei (2018)",
        "type": "paper",
        "estimatedHours": 5,
        "why": "Iterated amplification as a scalable oversight mechanism. The conceptual parent of RLAIF."
      },
      {
        "resource": "Anthropic — Core Views on AI Safety (anthropic.com)",
        "type": "blog",
        "estimatedHours": 3,
        "why": "Anthropic's published views on how they think about safety. Useful as a frontier-lab perspective."
      },
      {
        "resource": "DeepMind — Specification Gaming: The Flip Side of AI Ingenuity (blog and accompanying spreadsheet of examples)",
        "type": "blog",
        "estimatedHours": 3,
        "why": "Specification gaming examples in the wild. Concrete and grounded."
      },
      {
        "resource": "Discovering Language Model Behaviors with Model-Written Evaluations — Perez et al. (Anthropic 2022)",
        "type": "paper",
        "estimatedHours": 6,
        "why": "Methodology for generating alignment-relevant evaluations at scale. Useful both for safety and for evaluation literacy."
      },
      {
        "resource": "Weak-to-Strong Generalization: Eliciting Strong Capabilities With Weak Supervision — Burns et al. (OpenAI 2023)",
        "type": "paper",
        "estimatedHours": 6,
        "why": "Empirical attempt at the scalable oversight problem. Read for the methodology and the open questions."
      },
      {
        "resource": "AI Alignment Forum (alignmentforum.org)",
        "type": "blog",
        "estimatedHours": 20,
        "why": "The active research forum. Read recent posts, follow the discussions, develop taste for which arguments are rigorous."
      },
      {
        "resource": "AISFB (AI Safety Fundamentals) curriculum — BlueDot Impact",
        "type": "course",
        "estimatedHours": 40,
        "why": "Structured curriculum covering the alignment problem, scalable oversight, interpretability, and governance. Good integrator."
      }
    ],
    "exercises": [
      "Read Concrete Problems and produce a one-page taxonomy mapping each problem to a current research direction.",
      "Reproduce a simple specification-gaming example: train a small RL agent on a toy reward and identify the unintended optimum.",
      "Read the Alignment Faking paper and replicate one of its evaluations on an open model.",
      "Implement a Sleeper Agents-style backdoored model on a small open model and attempt to detect the backdoor.",
      "Write a research proposal addressing one of the open problems from the AI Alignment Forum. Include falsifiable predictions.",
      "Audit a recent capabilities paper for safety-relevant claims and identify the unsupported ones."
    ],
    "milestones": [
      "You can explain the difference between outer and inner alignment.",
      "You can articulate mesa-optimization in your own words.",
      "You can evaluate an empirical safety claim and identify its limitations.",
      "You have actually read and understood Risks from Learned Optimization end to end.",
      "You can identify a specific open problem in technical AI safety that you could work on."
    ]
  },
  {
    "slug": "capability-evaluation",
    "title": "Capability Evaluation",
    "subtitle": "Benchmarks, evals, and the science of measuring what frontier models can actually do",
    "intro": "Evaluation is the bottleneck of frontier AI research. Without good evaluations you cannot know if a model is improving, you cannot compare alternative approaches, you cannot identify safety-relevant capabilities, and you cannot make grounded claims about progress. The field has accumulated dozens of standard benchmarks — MMLU (Hendrycks et al., Measuring Massive Multitask Language Understanding, 2020) for broad knowledge, BIG-bench (BIG-bench Collaboration, 2022) for diverse reasoning tasks, HumanEval (Chen et al., 2021) for code generation, MATH (Hendrycks et al., 2021) for mathematical reasoning, GPQA (Rein et al., 2023) for graduate-level science questions, ARC-AGI (Chollet, 2019) for abstract reasoning, SWE-bench (Jimenez et al., 2023) for real-world software engineering, and the HELM holistic evaluation framework (Liang et al., Stanford 2022). On the safety and capability side, METR's (formerly ARC Evals) work on autonomous task evaluation, model-organism-of-misalignment experiments, and dangerous-capability evaluations (cyber, bio, autonomous replication) defines the modern frontier-lab evaluation methodology. A doctorate-grade learner needs to understand: what each major benchmark actually measures (and what it does not); the methodology of constructing a benchmark (the inter-annotator agreement, the contamination concerns, the distribution-mismatch concerns); the difference between reference-based metrics (BLEU, ROUGE, F1) and model-graded metrics (LLM-as-judge); the saturation problem (every major benchmark eventually saturates and stops differentiating models); the contamination problem (training data leakage into evaluation sets) and how it is detected and mitigated; and the elicitation problem (a model's capability is not what it does by default, but what can be elicited from it with the best prompting, scaffolding, and fine-tuning). The Inspect framework (UK AISI) and the OpenAI Evals framework are the canonical evaluation infrastructures. METR's autonomy and uplift evaluations are the canonical modern dangerous-capability evals. By the end of this path you should be able to read a benchmark paper critically, design an evaluation for a novel capability, and recognize the difference between a saturated benchmark and a benchmark that still has signal.",
    "readingPath": [
      {
        "resource": "Measuring Massive Multitask Language Understanding — Hendrycks, Burns, Basart, Zou, Mazeika, Song, Steinhardt (MMLU paper, 2020)",
        "type": "paper",
        "estimatedHours": 4,
        "why": "The canonical broad-knowledge benchmark. Read for the construction methodology, and for understanding what it does not measure."
      },
      {
        "resource": "Beyond the Imitation Game: Quantifying and extrapolating the capabilities of language models — BIG-bench Collaboration (2022)",
        "type": "paper",
        "estimatedHours": 8,
        "why": "Two hundred and four diverse tasks. Read the paper and inspect the task breakdown to develop taste for what makes a good eval."
      },
      {
        "resource": "Evaluating Large Language Models Trained on Code — Chen et al. (HumanEval paper, OpenAI 2021)",
        "type": "paper",
        "estimatedHours": 3,
        "why": "The original code-generation benchmark. Foundational despite being saturated by frontier models."
      },
      {
        "resource": "Measuring Mathematical Problem Solving With the MATH Dataset — Hendrycks et al. (2021)",
        "type": "paper",
        "estimatedHours": 3,
        "why": "Mathematical reasoning benchmark. Still useful pedagogically even as frontier models exceed strong-human performance."
      },
      {
        "resource": "GPQA: A Graduate-Level Google-Proof Q&A Benchmark — Rein, Hou, Stickland, Petty, Pang, Dirani, Michael, Bowman (2023)",
        "type": "paper",
        "estimatedHours": 4,
        "why": "Hard graduate-level science questions specifically designed to resist saturation and Google searches."
      },
      {
        "resource": "Holistic Evaluation of Language Models — Liang et al. (HELM paper, Stanford CRFM 2022)",
        "type": "paper",
        "estimatedHours": 12,
        "why": "The Stanford holistic evaluation framework. Long paper; read for the methodology and the multi-axis framing of evaluation."
      },
      {
        "resource": "SWE-bench: Can Language Models Resolve Real-World GitHub Issues? — Jimenez, Yang, Wettig, Yao, Pei, Press, Narasimhan (2023)",
        "type": "paper",
        "estimatedHours": 5,
        "why": "Real-world software engineering benchmark. The new gold standard for agentic capability evaluation."
      },
      {
        "resource": "ARC-AGI — On the Measure of Intelligence and the ARC challenge (Chollet, 2019)",
        "type": "paper",
        "estimatedHours": 6,
        "why": "Chollet's framework for evaluating general intelligence. Read both the paper and the ARC website."
      },
      {
        "resource": "METR — Evaluating Frontier AI R&D Capabilities of Language Model Agents (metr.org research)",
        "type": "blog",
        "estimatedHours": 8,
        "why": "Modern frontier-lab dangerous-capability evaluation methodology. Read the public reports."
      },
      {
        "resource": "Anthropic — Responsible Scaling Policy (anthropic.com)",
        "type": "blog",
        "estimatedHours": 3,
        "why": "How a frontier lab formally ties evaluations to deployment decisions. Useful as policy-eval interface."
      },
      {
        "resource": "Inspect framework — UK AI Safety Institute (inspect.ai-safety-institute.org.uk)",
        "type": "code",
        "estimatedHours": 15,
        "why": "The most modern evaluation framework. Read the docs, then build a small custom eval."
      },
      {
        "resource": "OpenAI Evals (github.com/openai/evals)",
        "type": "code",
        "estimatedHours": 10,
        "why": "Open-source eval framework with many example evals. Useful both as tool and as corpus of evaluation patterns."
      }
    ],
    "exercises": [
      "Reproduce an MMLU score for a small open model. Then introduce a small amount of test contamination and observe the score shift.",
      "Build a custom eval in Inspect (or OpenAI Evals) for a capability you care about. Include adversarial and out-of-distribution test cases.",
      "Implement LLM-as-judge for a subjective task and validate against human ratings on at least 50 examples.",
      "Read the GPQA paper and inspect the diamond subset. Attempt several questions yourself before reading the answers.",
      "Audit a benchmark you care about for training-data contamination. Document your methodology and findings.",
      "Design a dangerous-capability evaluation for one specific capability (e.g., autonomous replication of a software project). Justify the threshold."
    ],
    "milestones": [
      "You can construct a benchmark from scratch.",
      "You can identify when a benchmark has saturated.",
      "You can detect training data contamination in an eval.",
      "You can defend or critique an evaluation methodology.",
      "You have actually run an eval against a real model and reproduced a published number."
    ]
  },
  {
    "slug": "frontier-research-patterns",
    "title": "Frontier Research Patterns",
    "subtitle": "Reading papers, replicating results, and developing the meta-skills of an AI researcher",
    "intro": "Past the technical content, becoming a frontier AI researcher requires meta-skills that are rarely taught explicitly. How do you read a paper? Not the same way you read a textbook — papers are written for an audience that already has context, and reading them naively is slow and frustrating. The standard three-pass method (Keshav, 2007) — bibliographic scan, structural reading, deep critical read — is the canonical reading methodology. When should you skim a paper versus deep-read it? Skim almost everything; deep-read only the papers whose ideas you intend to build on or argue against. How do you replicate a result? The first replication you attempt will fail, and the second, and the third — replicating papers is its own skill, and the GitHub-to-paper handshake (read the paper, read the code, run the code, compare to the reported numbers, find the discrepancy, debug both) is the central craft. The state of replication in ML is poor; many published results do not reproduce, and identifying which results are real is a core researcher skill. How do you stay current? Twitter (X) is still the primary venue for AI research dissemination despite the field's complaints; alphaxiv and arxiv-sanity provide curated feeds; Hacker News and Reddit's r/MachineLearning serve as discussion venues. How do you choose problems? Read everything Schmidhuber once said about Schmidhuber, then ignore the style; but on the substance, the question of which problems are tractable, important, and neglected is the core researcher question. How do you write a paper? Read Jennifer Widom's writing advice. Read papers you admire and study their structure. By the end of this path you should be able to consume a hundred arXiv papers a week and extract signal from them, replicate a published result end-to-end, identify open problems worth working on, and write a paper that other researchers would actually want to read.",
    "readingPath": [
      {
        "resource": "How to Read a Paper — S. Keshav (ACM SIGCOMM Computer Communication Review, 2007)",
        "type": "paper",
        "estimatedHours": 1,
        "why": "The three-pass paper-reading method. Two pages. Read it before reading anything else."
      },
      {
        "resource": "Andrew Ng — How to Read Research Papers (career advice talk, Stanford)",
        "type": "lecture",
        "estimatedHours": 1,
        "why": "Practical paper-reading and field-entry advice. Watch for the breadth-first reading strategy."
      },
      {
        "resource": "Andrej Karpathy — A Recipe for Training Neural Networks (blog post)",
        "type": "blog",
        "estimatedHours": 2,
        "why": "How an expert actually debugs a deep learning project. Required reading on craft."
      },
      {
        "resource": "Sebastian Raschka — Ahead of AI newsletter (substack)",
        "type": "blog",
        "estimatedHours": 4,
        "why": "Curated weekly summary of significant AI research. Useful for staying current and developing taste for what matters."
      },
      {
        "resource": "Jack Clark — Import AI newsletter (importai.substack.com)",
        "type": "blog",
        "estimatedHours": 4,
        "why": "Long-running weekly newsletter from an Anthropic cofounder. Both technical and policy coverage."
      },
      {
        "resource": "Lilian Weng — Lil'Log (lilianweng.github.io)",
        "type": "blog",
        "estimatedHours": 10,
        "why": "Long-form deep-dive blog posts on major topics. Read selectively when you need a topic summary."
      },
      {
        "resource": "Jennifer Widom — Tips for Writing Technical Papers",
        "type": "blog",
        "estimatedHours": 1,
        "why": "Stanford CS professor's classic writing-advice document. Short and useful."
      },
      {
        "resource": "Papers with Code (paperswithcode.com)",
        "type": "code",
        "estimatedHours": 5,
        "why": "Paper-to-code links, benchmark leaderboards. Useful for finding replications and reference implementations."
      },
      {
        "resource": "Yann LeCun, Geoffrey Hinton, Yoshua Bengio — Deep Learning (Nature 2015 review)",
        "type": "paper",
        "estimatedHours": 4,
        "why": "Historical perspective from the field's founders. Read for the broad map and the field's own narrative of itself."
      },
      {
        "resource": "Patrick Kidger — On Neural Differential Equations (PhD thesis, 2022)",
        "type": "paper",
        "estimatedHours": 12,
        "why": "An example of a well-written modern ML PhD thesis. Read for the writing structure and the methodology of literature integration."
      },
      {
        "resource": "arxiv-sanity-lite (arxiv-sanity-lite.com) and alphaxiv (alphaxiv.org)",
        "type": "blog",
        "estimatedHours": 2,
        "why": "Tools for tracking and discussing recent arXiv preprints. Use them weekly."
      },
      {
        "resource": "Distill.pub archive (distill.pub)",
        "type": "blog",
        "estimatedHours": 15,
        "why": "Now-archived journal of interactive ML explanations. The clarity bar to aspire to in your own writing."
      }
    ],
    "exercises": [
      "Pick a paper outside your comfort zone and apply Keshav's three-pass method. Document each pass in writing.",
      "Replicate a published result end-to-end. Document every divergence between the paper and your reproduction.",
      "Run a weekly arXiv triage: scan 50 abstracts, deep-read 3, write a one-paragraph summary of each.",
      "Write a paper review (NeurIPS/ICML format) for a recently published paper. Include strengths, weaknesses, and questions.",
      "Identify three open problems from current literature and write a one-page research proposal for one of them.",
      "Write a short paper or technical report following Widom's structural advice. Have a peer review it."
    ],
    "milestones": [
      "You can read a paper using the three-pass method without thinking about the method.",
      "You have actually replicated a published ML result.",
      "You can produce a written review of a paper that another researcher would find useful.",
      "You can identify which papers in a given month are worth deep-reading.",
      "You can write a research proposal that distinguishes capabilities from contributions."
    ]
  }
] as const;

export async function generateStaticParams() {
  return PAGES.map((p) => ({ topic: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }): Promise<Metadata> {
  const { topic } = await params;
  const p = PAGES.find((x) => x.slug === topic);
  if (!p) return { title: "Not found" };
  return {
    title: `${p.title} · deep · /learn · AtomEons`,
    description: p.intro.slice(0, 200),
    alternates: { canonical: `https://atomeons.com/learn/deep/${p.slug}` },
  };
}

export default async function DeepTopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  const p = PAGES.find((x) => x.slug === topic);
  if (!p) notFound();

  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn/deep" className="hover:text-[#22F0D5]">Deep</Link>{" "}
          <span className="text-[#1A2225]">/</span> {p.title}
        </p>
      </div>
      <article className="mx-auto w-full max-w-3xl px-6 py-16 md:py-20 space-y-12">
        <header>
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">::deep-dive</p>
          <h1 className="mt-6 text-balance text-4xl font-medium leading-[1] tracking-tight md:text-5xl">{p.title}</h1>
          <p className="mt-3 text-xl leading-[1.3] text-[#FFB87A] md:text-2xl">{p.subtitle}</p>
        </header>

        <section>
          <p className="text-lg leading-[1.8] text-[#C8CCCE] md:text-[18px] whitespace-pre-line">{p.intro}</p>
        </section>

        <section>
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">::reading path · in order</p>
          <ol className="mt-5 space-y-4">
            {p.readingPath.map((r, i) => (
              <li key={i} className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">::{String(i + 1).padStart(2, "0")} · {r.type}</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7]">~{r.estimatedHours}h</p>
                </div>
                <p className="mt-3 text-base font-medium text-[#F2F4F5]">{r.resource}</p>
                <p className="mt-2 text-sm leading-[1.65] text-[#C8CCCE]">{r.why}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-2xl border border-[#FFB87A]/30 bg-[#1C1308]/30 p-7 md:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FFB87A]">::exercises · build · derive · reproduce</p>
          <ol className="mt-5 space-y-3">
            {p.exercises.map((e, i) => (
              <li key={i} className="flex gap-3 text-[15px] leading-[1.65] text-[#C8CCCE]">
                <span className="font-mono text-[#FFB87A]">{String(i + 1).padStart(2, "0")}</span>
                <span>{e}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-2xl border border-[#22F0D5]/40 bg-[#08090B]/30 p-7 md:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">::milestones · observable</p>
          <ul className="mt-5 space-y-3">
            {p.milestones.map((m, i) => (
              <li key={i} className="flex gap-3 text-[15px] leading-[1.65] text-[#C8CCCE]">
                <span className="text-[#22F0D5]">▲</span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </section>

        <nav className="border-t border-[#1A2225] pt-6 text-center">
          <Link href="/learn/deep" className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:text-[#F2F4F5]">← all deep-dives</Link>
        </nav>
      </article>
    </main>
  );
}
