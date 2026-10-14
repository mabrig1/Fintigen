import type { CourseMeta, CourseModule } from "@/lib/courses/types";

export const courseMeta: CourseMeta = {
  "slug": "data-analysis",
  "title": "Complete Data Analysis: Excel, SQL, Python, Statistics & Power BI",
  "tagline": "From raw datasets to defensible business decisions — a practical 12-week career pathway",
  "duration": "12 weeks",
  "pace": "6–10 hours/week",
  "level": "Beginner to Intermediate",
  "prerequisites": [
    "Basic computer literacy",
    "No previous programming experience required"
  ],
  "overview": [
    "Learn the complete analyst workflow through guided practice, responsible data handling and realistic business cases.",
    "Develop an employable portfolio spanning spreadsheets, SQL, Python, statistical reasoning, visualization and Power BI."
  ],
  "objectives": [
    "Clean, validate and document messy datasets.",
    "Write analytical SQL queries and reproducible Python notebooks.",
    "Apply appropriate statistical tests and interpret uncertainty.",
    "Design accessible dashboards and communicate actionable findings.",
    "Publish a privacy-safe, reproducible capstone portfolio."
  ],
  "tools": [
    {
      "category": "Spreadsheets",
      "items": "Excel, Google Sheets"
    },
    {
      "category": "Query and coding",
      "items": "SQL, Python, Pandas, NumPy, Jupyter"
    },
    {
      "category": "Business intelligence",
      "items": "Power BI, DAX"
    },
    {
      "category": "Research and delivery",
      "items": "GitHub, CSV, data dictionaries"
    }
  ],
  "grading": [
    {
      "component": "Weekly practical labs",
      "weight": "40%",
      "detail": "12 reproducible exercises with documented assumptions."
    },
    {
      "component": "Quizzes",
      "weight": "20%",
      "detail": "Conceptual checks after each module."
    },
    {
      "component": "Capstone",
      "weight": "40%",
      "detail": "Validated end-to-end analysis and executive decision memo."
    }
  ]
};

export const courseModules: CourseModule[] = [
  {
    "id": "module-1",
    "week": 1,
    "title": "Data Literacy and Analytical Thinking",
    "objective": "Define KPIs, distinguish measures from dimensions, ask testable business questions, identify bias and protect sensitive data.",
    "lessons": [
      {
        "id": "lesson-1",
        "title": "Data Literacy and Analytical Thinking",
        "content": [
          "Define KPIs, distinguish measures from dimensions, ask testable business questions, identify bias and protect sensitive data. Start by stating the decision to be supported, the data source, the unit of analysis, and the limitations of available evidence.",
          "Practice on a small, non-sensitive sample first. Record each transformation, verify totals before and after cleaning, and explain what the result can and cannot establish."
        ],
        "bullets": [
          "Learning goal: Define KPIs, distinguish measures from dimensions, ask testable business questions, identify bias and protect sensitive data.",
          "Practical exercise: Write an analysis brief for a Nigerian retail business.",
          "Deliverable: explain assumptions, reproduce the calculations, and document limitations."
        ]
      }
    ],
    "lab": {
      "title": "Week 1 practical project",
      "description": "Write an analysis brief for a Nigerian retail business.",
      "steps": [
        "Identify a suitable public or synthetic dataset and document its source.",
        "Define metrics, assumptions and a validation checklist.",
        "Complete the practical exercise and save reproducible evidence.",
        "Write a short interpretation with limitations and recommended next steps."
      ]
    },
    "quiz": [
      {
        "question": "What is the most reliable first step when starting data literacy and analytical thinking?",
        "options": [
          "Publish conclusions immediately",
          "Define the question, source, unit of analysis and quality checks",
          "Remove all missing rows without review",
          "Assume correlation proves causation"
        ],
        "answerIndex": 1,
        "explanation": "A defensible analysis starts with clear questions, data provenance and validation before conclusions."
      }
    ]
  },
  {
    "id": "module-2",
    "week": 2,
    "title": "Excel and Google Sheets",
    "objective": "Use formulas, XLOOKUP, SUMIFS, validation, pivot tables, Power Query concepts and chart selection.",
    "lessons": [
      {
        "id": "lesson-2",
        "title": "Excel and Google Sheets",
        "content": [
          "Use formulas, XLOOKUP, SUMIFS, validation, pivot tables, Power Query concepts and chart selection. Start by stating the decision to be supported, the data source, the unit of analysis, and the limitations of available evidence.",
          "Practice on a small, non-sensitive sample first. Record each transformation, verify totals before and after cleaning, and explain what the result can and cannot establish."
        ],
        "bullets": [
          "Learning goal: Use formulas, XLOOKUP, SUMIFS, validation, pivot tables, Power Query concepts and chart selection.",
          "Practical exercise: Clean a sales workbook and build a monthly KPI report.",
          "Deliverable: explain assumptions, reproduce the calculations, and document limitations."
        ]
      }
    ],
    "lab": {
      "title": "Week 2 practical project",
      "description": "Clean a sales workbook and build a monthly KPI report.",
      "steps": [
        "Identify a suitable public or synthetic dataset and document its source.",
        "Define metrics, assumptions and a validation checklist.",
        "Complete the practical exercise and save reproducible evidence.",
        "Write a short interpretation with limitations and recommended next steps."
      ]
    },
    "quiz": [
      {
        "question": "What is the most reliable first step when starting excel and google sheets?",
        "options": [
          "Publish conclusions immediately",
          "Define the question, source, unit of analysis and quality checks",
          "Remove all missing rows without review",
          "Assume correlation proves causation"
        ],
        "answerIndex": 1,
        "explanation": "A defensible analysis starts with clear questions, data provenance and validation before conclusions."
      }
    ]
  },
  {
    "id": "module-3",
    "week": 3,
    "title": "Statistics for Decision Making",
    "objective": "Calculate descriptive statistics, distributions, sampling uncertainty, confidence intervals, hypothesis tests, effect sizes and correlation versus causation.",
    "lessons": [
      {
        "id": "lesson-3",
        "title": "Statistics for Decision Making",
        "content": [
          "Calculate descriptive statistics, distributions, sampling uncertainty, confidence intervals, hypothesis tests, effect sizes and correlation versus causation. Start by stating the decision to be supported, the data source, the unit of analysis, and the limitations of available evidence.",
          "Practice on a small, non-sensitive sample first. Record each transformation, verify totals before and after cleaning, and explain what the result can and cannot establish."
        ],
        "bullets": [
          "Learning goal: Calculate descriptive statistics, distributions, sampling uncertainty, confidence intervals, hypothesis tests, effect sizes and correlation versus causation.",
          "Practical exercise: Compare two sales campaigns and report uncertainty.",
          "Deliverable: explain assumptions, reproduce the calculations, and document limitations."
        ]
      }
    ],
    "lab": {
      "title": "Week 3 practical project",
      "description": "Compare two sales campaigns and report uncertainty.",
      "steps": [
        "Identify a suitable public or synthetic dataset and document its source.",
        "Define metrics, assumptions and a validation checklist.",
        "Complete the practical exercise and save reproducible evidence.",
        "Write a short interpretation with limitations and recommended next steps."
      ]
    },
    "quiz": [
      {
        "question": "What is the most reliable first step when starting statistics for decision making?",
        "options": [
          "Publish conclusions immediately",
          "Define the question, source, unit of analysis and quality checks",
          "Remove all missing rows without review",
          "Assume correlation proves causation"
        ],
        "answerIndex": 1,
        "explanation": "A defensible analysis starts with clear questions, data provenance and validation before conclusions."
      }
    ]
  },
  {
    "id": "module-4",
    "week": 4,
    "title": "SQL for Data Analysts",
    "objective": "Filter, join, aggregate, use CTEs, window functions, NULL handling and query validation.",
    "lessons": [
      {
        "id": "lesson-4",
        "title": "SQL for Data Analysts",
        "content": [
          "Filter, join, aggregate, use CTEs, window functions, NULL handling and query validation. Start by stating the decision to be supported, the data source, the unit of analysis, and the limitations of available evidence.",
          "Practice on a small, non-sensitive sample first. Record each transformation, verify totals before and after cleaning, and explain what the result can and cannot establish."
        ],
        "bullets": [
          "Learning goal: Filter, join, aggregate, use CTEs, window functions, NULL handling and query validation.",
          "Practical exercise: Calculate revenue, retention and repeat-purchase rates.",
          "Deliverable: explain assumptions, reproduce the calculations, and document limitations."
        ]
      }
    ],
    "lab": {
      "title": "Week 4 practical project",
      "description": "Calculate revenue, retention and repeat-purchase rates.",
      "steps": [
        "Identify a suitable public or synthetic dataset and document its source.",
        "Define metrics, assumptions and a validation checklist.",
        "Complete the practical exercise and save reproducible evidence.",
        "Write a short interpretation with limitations and recommended next steps."
      ]
    },
    "quiz": [
      {
        "question": "What is the most reliable first step when starting sql for data analysts?",
        "options": [
          "Publish conclusions immediately",
          "Define the question, source, unit of analysis and quality checks",
          "Remove all missing rows without review",
          "Assume correlation proves causation"
        ],
        "answerIndex": 1,
        "explanation": "A defensible analysis starts with clear questions, data provenance and validation before conclusions."
      }
    ]
  },
  {
    "id": "module-5",
    "week": 5,
    "title": "Python Foundations for Analysts",
    "objective": "Learn notebooks, Python types, functions, files, environments and reproducible scripts.",
    "lessons": [
      {
        "id": "lesson-5",
        "title": "Python Foundations for Analysts",
        "content": [
          "Learn notebooks, Python types, functions, files, environments and reproducible scripts. Start by stating the decision to be supported, the data source, the unit of analysis, and the limitations of available evidence.",
          "Practice on a small, non-sensitive sample first. Record each transformation, verify totals before and after cleaning, and explain what the result can and cannot establish."
        ],
        "bullets": [
          "Learning goal: Learn notebooks, Python types, functions, files, environments and reproducible scripts.",
          "Practical exercise: Import CSV files and calculate key indicators.",
          "Deliverable: explain assumptions, reproduce the calculations, and document limitations."
        ]
      }
    ],
    "lab": {
      "title": "Week 5 practical project",
      "description": "Import CSV files and calculate key indicators.",
      "steps": [
        "Identify a suitable public or synthetic dataset and document its source.",
        "Define metrics, assumptions and a validation checklist.",
        "Complete the practical exercise and save reproducible evidence.",
        "Write a short interpretation with limitations and recommended next steps."
      ]
    },
    "quiz": [
      {
        "question": "What is the most reliable first step when starting python foundations for analysts?",
        "options": [
          "Publish conclusions immediately",
          "Define the question, source, unit of analysis and quality checks",
          "Remove all missing rows without review",
          "Assume correlation proves causation"
        ],
        "answerIndex": 1,
        "explanation": "A defensible analysis starts with clear questions, data provenance and validation before conclusions."
      }
    ]
  },
  {
    "id": "module-6",
    "week": 6,
    "title": "Pandas, NumPy and Data Cleaning",
    "objective": "Handle missing values, duplicates, data types, outliers, joins, groupby and quality assertions.",
    "lessons": [
      {
        "id": "lesson-6",
        "title": "Pandas, NumPy and Data Cleaning",
        "content": [
          "Handle missing values, duplicates, data types, outliers, joins, groupby and quality assertions. Start by stating the decision to be supported, the data source, the unit of analysis, and the limitations of available evidence.",
          "Practice on a small, non-sensitive sample first. Record each transformation, verify totals before and after cleaning, and explain what the result can and cannot establish."
        ],
        "bullets": [
          "Learning goal: Handle missing values, duplicates, data types, outliers, joins, groupby and quality assertions.",
          "Practical exercise: Build an auditable cleaning notebook.",
          "Deliverable: explain assumptions, reproduce the calculations, and document limitations."
        ]
      }
    ],
    "lab": {
      "title": "Week 6 practical project",
      "description": "Build an auditable cleaning notebook.",
      "steps": [
        "Identify a suitable public or synthetic dataset and document its source.",
        "Define metrics, assumptions and a validation checklist.",
        "Complete the practical exercise and save reproducible evidence.",
        "Write a short interpretation with limitations and recommended next steps."
      ]
    },
    "quiz": [
      {
        "question": "What is the most reliable first step when starting pandas, numpy and data cleaning?",
        "options": [
          "Publish conclusions immediately",
          "Define the question, source, unit of analysis and quality checks",
          "Remove all missing rows without review",
          "Assume correlation proves causation"
        ],
        "answerIndex": 1,
        "explanation": "A defensible analysis starts with clear questions, data provenance and validation before conclusions."
      }
    ]
  },
  {
    "id": "module-7",
    "week": 7,
    "title": "Exploratory Data Analysis",
    "objective": "Study distributions, cohorts, seasonality, segmentation, leakage and data storytelling.",
    "lessons": [
      {
        "id": "lesson-7",
        "title": "Exploratory Data Analysis",
        "content": [
          "Study distributions, cohorts, seasonality, segmentation, leakage and data storytelling. Start by stating the decision to be supported, the data source, the unit of analysis, and the limitations of available evidence.",
          "Practice on a small, non-sensitive sample first. Record each transformation, verify totals before and after cleaning, and explain what the result can and cannot establish."
        ],
        "bullets": [
          "Learning goal: Study distributions, cohorts, seasonality, segmentation, leakage and data storytelling.",
          "Practical exercise: Produce an exploratory report with five defensible findings.",
          "Deliverable: explain assumptions, reproduce the calculations, and document limitations."
        ]
      }
    ],
    "lab": {
      "title": "Week 7 practical project",
      "description": "Produce an exploratory report with five defensible findings.",
      "steps": [
        "Identify a suitable public or synthetic dataset and document its source.",
        "Define metrics, assumptions and a validation checklist.",
        "Complete the practical exercise and save reproducible evidence.",
        "Write a short interpretation with limitations and recommended next steps."
      ]
    },
    "quiz": [
      {
        "question": "What is the most reliable first step when starting exploratory data analysis?",
        "options": [
          "Publish conclusions immediately",
          "Define the question, source, unit of analysis and quality checks",
          "Remove all missing rows without review",
          "Assume correlation proves causation"
        ],
        "answerIndex": 1,
        "explanation": "A defensible analysis starts with clear questions, data provenance and validation before conclusions."
      }
    ]
  },
  {
    "id": "module-8",
    "week": 8,
    "title": "Data Visualization and Storytelling",
    "objective": "Apply chart selection, accessibility, annotations, uncertainty displays and executive narratives.",
    "lessons": [
      {
        "id": "lesson-8",
        "title": "Data Visualization and Storytelling",
        "content": [
          "Apply chart selection, accessibility, annotations, uncertainty displays and executive narratives. Start by stating the decision to be supported, the data source, the unit of analysis, and the limitations of available evidence.",
          "Practice on a small, non-sensitive sample first. Record each transformation, verify totals before and after cleaning, and explain what the result can and cannot establish."
        ],
        "bullets": [
          "Learning goal: Apply chart selection, accessibility, annotations, uncertainty displays and executive narratives.",
          "Practical exercise: Build a six-chart stakeholder presentation.",
          "Deliverable: explain assumptions, reproduce the calculations, and document limitations."
        ]
      }
    ],
    "lab": {
      "title": "Week 8 practical project",
      "description": "Build a six-chart stakeholder presentation.",
      "steps": [
        "Identify a suitable public or synthetic dataset and document its source.",
        "Define metrics, assumptions and a validation checklist.",
        "Complete the practical exercise and save reproducible evidence.",
        "Write a short interpretation with limitations and recommended next steps."
      ]
    },
    "quiz": [
      {
        "question": "What is the most reliable first step when starting data visualization and storytelling?",
        "options": [
          "Publish conclusions immediately",
          "Define the question, source, unit of analysis and quality checks",
          "Remove all missing rows without review",
          "Assume correlation proves causation"
        ],
        "answerIndex": 1,
        "explanation": "A defensible analysis starts with clear questions, data provenance and validation before conclusions."
      }
    ]
  },
  {
    "id": "module-9",
    "week": 9,
    "title": "Power BI and DAX",
    "objective": "Model star schemas, create relationships, measures, time intelligence, slicers and refresh plans.",
    "lessons": [
      {
        "id": "lesson-9",
        "title": "Power BI and DAX",
        "content": [
          "Model star schemas, create relationships, measures, time intelligence, slicers and refresh plans. Start by stating the decision to be supported, the data source, the unit of analysis, and the limitations of available evidence.",
          "Practice on a small, non-sensitive sample first. Record each transformation, verify totals before and after cleaning, and explain what the result can and cannot establish."
        ],
        "bullets": [
          "Learning goal: Model star schemas, create relationships, measures, time intelligence, slicers and refresh plans.",
          "Practical exercise: Deliver a sales dashboard with documented DAX measures.",
          "Deliverable: explain assumptions, reproduce the calculations, and document limitations."
        ]
      }
    ],
    "lab": {
      "title": "Week 9 practical project",
      "description": "Deliver a sales dashboard with documented DAX measures.",
      "steps": [
        "Identify a suitable public or synthetic dataset and document its source.",
        "Define metrics, assumptions and a validation checklist.",
        "Complete the practical exercise and save reproducible evidence.",
        "Write a short interpretation with limitations and recommended next steps."
      ]
    },
    "quiz": [
      {
        "question": "What is the most reliable first step when starting power bi and dax?",
        "options": [
          "Publish conclusions immediately",
          "Define the question, source, unit of analysis and quality checks",
          "Remove all missing rows without review",
          "Assume correlation proves causation"
        ],
        "answerIndex": 1,
        "explanation": "A defensible analysis starts with clear questions, data provenance and validation before conclusions."
      }
    ]
  },
  {
    "id": "module-10",
    "week": 10,
    "title": "Research Methods and Inferential Analysis",
    "objective": "Design surveys, distinguish study designs, estimate sample sizes, interpret regression and avoid p-hacking.",
    "lessons": [
      {
        "id": "lesson-10",
        "title": "Research Methods and Inferential Analysis",
        "content": [
          "Design surveys, distinguish study designs, estimate sample sizes, interpret regression and avoid p-hacking. Start by stating the decision to be supported, the data source, the unit of analysis, and the limitations of available evidence.",
          "Practice on a small, non-sensitive sample first. Record each transformation, verify totals before and after cleaning, and explain what the result can and cannot establish."
        ],
        "bullets": [
          "Learning goal: Design surveys, distinguish study designs, estimate sample sizes, interpret regression and avoid p-hacking.",
          "Practical exercise: Write an ethical research analysis plan and interpret sample output.",
          "Deliverable: explain assumptions, reproduce the calculations, and document limitations."
        ]
      }
    ],
    "lab": {
      "title": "Week 10 practical project",
      "description": "Write an ethical research analysis plan and interpret sample output.",
      "steps": [
        "Identify a suitable public or synthetic dataset and document its source.",
        "Define metrics, assumptions and a validation checklist.",
        "Complete the practical exercise and save reproducible evidence.",
        "Write a short interpretation with limitations and recommended next steps."
      ]
    },
    "quiz": [
      {
        "question": "What is the most reliable first step when starting research methods and inferential analysis?",
        "options": [
          "Publish conclusions immediately",
          "Define the question, source, unit of analysis and quality checks",
          "Remove all missing rows without review",
          "Assume correlation proves causation"
        ],
        "answerIndex": 1,
        "explanation": "A defensible analysis starts with clear questions, data provenance and validation before conclusions."
      }
    ]
  },
  {
    "id": "module-11",
    "week": 11,
    "title": "Forecasting and Business Experiments",
    "objective": "Use baseline forecasts, train/test time splits, MAE, MAPE limitations and A/B testing principles.",
    "lessons": [
      {
        "id": "lesson-11",
        "title": "Forecasting and Business Experiments",
        "content": [
          "Use baseline forecasts, train/test time splits, MAE, MAPE limitations and A/B testing principles. Start by stating the decision to be supported, the data source, the unit of analysis, and the limitations of available evidence.",
          "Practice on a small, non-sensitive sample first. Record each transformation, verify totals before and after cleaning, and explain what the result can and cannot establish."
        ],
        "bullets": [
          "Learning goal: Use baseline forecasts, train/test time splits, MAE, MAPE limitations and A/B testing principles.",
          "Practical exercise: Backtest a monthly demand forecast against a naive baseline.",
          "Deliverable: explain assumptions, reproduce the calculations, and document limitations."
        ]
      }
    ],
    "lab": {
      "title": "Week 11 practical project",
      "description": "Backtest a monthly demand forecast against a naive baseline.",
      "steps": [
        "Identify a suitable public or synthetic dataset and document its source.",
        "Define metrics, assumptions and a validation checklist.",
        "Complete the practical exercise and save reproducible evidence.",
        "Write a short interpretation with limitations and recommended next steps."
      ]
    },
    "quiz": [
      {
        "question": "What is the most reliable first step when starting forecasting and business experiments?",
        "options": [
          "Publish conclusions immediately",
          "Define the question, source, unit of analysis and quality checks",
          "Remove all missing rows without review",
          "Assume correlation proves causation"
        ],
        "answerIndex": 1,
        "explanation": "A defensible analysis starts with clear questions, data provenance and validation before conclusions."
      }
    ]
  },
  {
    "id": "module-12",
    "week": 12,
    "title": "Portfolio Capstone and Career Readiness",
    "objective": "Combine ingestion, cleaning, SQL, statistics, dashboarding, documentation, version control and stakeholder communication.",
    "lessons": [
      {
        "id": "lesson-12",
        "title": "Portfolio Capstone and Career Readiness",
        "content": [
          "Combine ingestion, cleaning, SQL, statistics, dashboarding, documentation, version control and stakeholder communication. Start by stating the decision to be supported, the data source, the unit of analysis, and the limitations of available evidence.",
          "Practice on a small, non-sensitive sample first. Record each transformation, verify totals before and after cleaning, and explain what the result can and cannot establish."
        ],
        "bullets": [
          "Learning goal: Combine ingestion, cleaning, SQL, statistics, dashboarding, documentation, version control and stakeholder communication.",
          "Practical exercise: Submit a reproducible portfolio with data dictionary, notebook, dashboard and decision memo.",
          "Deliverable: explain assumptions, reproduce the calculations, and document limitations."
        ]
      }
    ],
    "lab": {
      "title": "Week 12 practical project",
      "description": "Submit a reproducible portfolio with data dictionary, notebook, dashboard and decision memo.",
      "steps": [
        "Identify a suitable public or synthetic dataset and document its source.",
        "Define metrics, assumptions and a validation checklist.",
        "Complete the practical exercise and save reproducible evidence.",
        "Write a short interpretation with limitations and recommended next steps."
      ]
    },
    "quiz": [
      {
        "question": "What is the most reliable first step when starting portfolio capstone and career readiness?",
        "options": [
          "Publish conclusions immediately",
          "Define the question, source, unit of analysis and quality checks",
          "Remove all missing rows without review",
          "Assume correlation proves causation"
        ],
        "answerIndex": 1,
        "explanation": "A defensible analysis starts with clear questions, data provenance and validation before conclusions."
      }
    ]
  }
];
