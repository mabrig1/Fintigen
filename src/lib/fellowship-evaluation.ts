export type AssessmentStage = "baseline" | "final";

export type Competency =
  | "risk-reasoning"
  | "agent-security"
  | "evaluation-design"
  | "human-oversight"
  | "evidence-discipline";

export interface FellowshipAssessmentQuestion {
  id: string;
  competency: Competency;
  prompt: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface FellowshipAssessmentResult {
  schemaVersion: 1;
  stage: AssessmentStage;
  completedAt: string;
  totalCorrect: number;
  totalQuestions: number;
  scorePercent: number;
  competencyScores: Record<Competency, { correct: number; total: number; percent: number }>;
  answers: Record<string, number>;
  consentForAnonymizedProgramMetrics: boolean;
}

export const competencyLabels: Record<Competency, string> = {
  "risk-reasoning": "Risk reasoning",
  "agent-security": "Agent security",
  "evaluation-design": "Evaluation design",
  "human-oversight": "Human oversight",
  "evidence-discipline": "Evidence discipline",
};

export const fellowshipAssessmentQuestions: FellowshipAssessmentQuestion[] = [
  {
    id: "risk-1",
    competency: "risk-reasoning",
    prompt: "Which statement best separates evidence from a forecast?",
    options: [
      "A model completed a bounded task in a controlled test; therefore it will autonomously cause the same outcome in every deployment.",
      "A model completed a bounded task in a controlled test; this is observed evidence, while claims about broader future behavior require additional assumptions.",
      "A forecast becomes evidence when enough people repeat it.",
      "Future capability claims do not need assumptions if the model is large.",
    ],
    answerIndex: 1,
    explanation:
      "Observed behavior in a bounded test is evidence about that test. Generalization to future systems requires explicit assumptions and additional evidence.",
  },
  {
    id: "risk-2",
    competency: "risk-reasoning",
    prompt: "What makes a technical AI-risk question especially useful?",
    options: [
      "It is dramatic and difficult to falsify.",
      "It has a clear system boundary, observable behavior, and evidence that could change the conclusion.",
      "It assumes the strongest possible threat is already certain.",
      "It avoids stating limitations.",
    ],
    answerIndex: 1,
    explanation:
      "Boundaries, observable behavior, and falsifiability make a technical question easier to test and critique.",
  },
  {
    id: "security-1",
    competency: "agent-security",
    prompt: "Which control most directly reduces the blast radius of an AI agent mistake?",
    options: [
      "Longer prompts",
      "Least-privilege tool and credential access",
      "More persuasive model explanations",
      "A larger context window",
    ],
    answerIndex: 1,
    explanation:
      "Least privilege limits the authority available to an agent and therefore constrains the impact of mistakes or misuse.",
  },
  {
    id: "security-2",
    competency: "agent-security",
    prompt: "Which repository change deserves the strongest default scrutiny?",
    options: [
      "A typo in documentation",
      "A local formatting change",
      "A privileged CI workflow change that gains access to deployment credentials",
      "A renamed test description",
    ],
    answerIndex: 2,
    explanation:
      "Privileged CI and credential changes can create high-impact external effects and should receive stronger review.",
  },
  {
    id: "eval-1",
    competency: "evaluation-design",
    prompt: "When should evaluation success and failure criteria ideally be defined?",
    options: [
      "After seeing the result",
      "Before running the experiment",
      "Only after a model judge scores the output",
      "They are unnecessary when using a benchmark",
    ],
    answerIndex: 1,
    explanation:
      "Defining metrics and failure criteria before the run reduces result-driven reinterpretation.",
  },
  {
    id: "eval-2",
    competency: "evaluation-design",
    prompt: "Why are repeated trials useful in agent evaluations?",
    options: [
      "They guarantee the result is correct.",
      "They expose variability and reduce reliance on a single demonstration.",
      "They eliminate the need for baselines.",
      "They allow researchers to discard negative runs.",
    ],
    answerIndex: 1,
    explanation:
      "Repeated trials expose stochastic variation and make conclusions less dependent on a one-off run.",
  },
  {
    id: "oversight-1",
    competency: "human-oversight",
    prompt: "When is an approval step most likely to become oversight theatre?",
    options: [
      "When a reviewer has clear evidence, time, authority, and an interruptible system",
      "When a reviewer must approve quickly without meaningful evidence or realistic ability to stop the action",
      "Whenever humans review an AI action",
      "Only when the AI refuses to proceed",
    ],
    answerIndex: 1,
    explanation:
      "Approval is meaningful only when a human can understand, reject, and affect the consequential action.",
  },
  {
    id: "oversight-2",
    competency: "human-oversight",
    prompt: "Which action most plausibly justifies mandatory human approval?",
    options: [
      "A reversible read-only lookup",
      "A local spelling correction",
      "A high-privilege credential rotation with external side effects",
      "Opening a documentation page",
    ],
    answerIndex: 2,
    explanation:
      "High privilege, credentials, external effects, and limited reversibility are strong reasons to retain a control boundary.",
  },
  {
    id: "evidence-1",
    competency: "evidence-discipline",
    prompt: "What does a clean automated security scan establish?",
    options: [
      "The software is secure.",
      "No exploitable vulnerability exists.",
      "The configured checks did not report a finding in that run.",
      "Human review is unnecessary.",
    ],
    answerIndex: 2,
    explanation:
      "Automated tools have bounded coverage. Absence of findings is not proof of safety or security.",
  },
  {
    id: "evidence-2",
    competency: "evidence-discipline",
    prompt: "Which capstone statement is most credible?",
    options: [
      "Our tool makes agentic systems safe.",
      "Across 40 controlled runs, the approval condition reduced the predefined unsafe-action rate from X to Y under these test conditions; external validity remains untested.",
      "The model said the intervention was effective.",
      "No failures were published because they would weaken the project.",
    ],
    answerIndex: 1,
    explanation:
      "A credible claim reports the measured result, conditions, denominator, and limitations without overgeneralizing.",
  },
];

export function scoreFellowshipAssessment(
  stage: AssessmentStage,
  answers: Record<string, number>,
  consentForAnonymizedProgramMetrics = false,
  completedAt = new Date().toISOString()
): FellowshipAssessmentResult {
  const byCompetency = {} as FellowshipAssessmentResult["competencyScores"];

  for (const competency of Object.keys(competencyLabels) as Competency[]) {
    const questions = fellowshipAssessmentQuestions.filter(
      (question) => question.competency === competency
    );
    const correct = questions.filter(
      (question) => answers[question.id] === question.answerIndex
    ).length;
    byCompetency[competency] = {
      correct,
      total: questions.length,
      percent: questions.length ? Math.round((correct / questions.length) * 100) : 0,
    };
  }

  const totalCorrect = fellowshipAssessmentQuestions.filter(
    (question) => answers[question.id] === question.answerIndex
  ).length;

  return {
    schemaVersion: 1,
    stage,
    completedAt,
    totalCorrect,
    totalQuestions: fellowshipAssessmentQuestions.length,
    scorePercent: Math.round(
      (totalCorrect / fellowshipAssessmentQuestions.length) * 100
    ),
    competencyScores: byCompetency,
    answers,
    consentForAnonymizedProgramMetrics,
  };
}

export interface CapstoneRubricDimension {
  id: string;
  label: string;
  weight: number;
  excellent: string;
  developing: string;
  insufficient: string;
}

export const capstoneRubric: CapstoneRubricDimension[] = [
  {
    id: "question",
    label: "Research question & threat model",
    weight: 20,
    excellent:
      "Question is bounded and falsifiable; assets, actors, trust boundaries, assumptions, and failure modes are explicit.",
    developing:
      "Question is understandable but some boundaries, assumptions, or threat-model elements remain implicit.",
    insufficient:
      "Question is too broad or conclusions are assumed before the work begins.",
  },
  {
    id: "method",
    label: "Evaluation method & reproducibility",
    weight: 25,
    excellent:
      "Metrics, baselines, environment, permissions, stopping rules, and reproducibility steps are documented before interpretation.",
    developing:
      "Method is mostly reproducible but one or more important conditions or baselines are missing.",
    insufficient:
      "Result depends on an informal demonstration with no stable method or baseline.",
  },
  {
    id: "evidence",
    label: "Evidence quality & uncertainty",
    weight: 20,
    excellent:
      "Observed evidence is separated from inference; uncertainty, missing evidence, and negative results are reported.",
    developing:
      "Evidence is present but some claims exceed what the observations directly establish.",
    insufficient:
      "Model statements or automated findings are presented as verified facts without independent support.",
  },
  {
    id: "safety",
    label: "Security & responsible research practice",
    weight: 15,
    excellent:
      "Work uses authorized/synthetic environments, least privilege, safe data handling, and responsible-disclosure reasoning.",
    developing:
      "The project is broadly safe but safeguards or disclosure procedures are underspecified.",
    insufficient:
      "The work depends on unauthorized testing, unsafe credential handling, or unnecessary release of harmful operational detail.",
  },
  {
    id: "interpretation",
    label: "Interpretation & limitations",
    weight: 20,
    excellent:
      "Conclusions match the data, limitations are prominent, and next experiments are motivated by unresolved uncertainty.",
    developing:
      "Main conclusion is reasonable but limitations or alternative explanations need more attention.",
    insufficient:
      "The project overgeneralizes from weak evidence or hides important limitations.",
  },
];
