import type { CourseMeta, CourseModule } from "@/lib/courses/types";
export const courseMeta: CourseMeta = {
  "slug": "business-analytics",
  "title": "Business Analytics & Business Intelligence",
  "tagline": "Sales, finance, customer retention, KPIs, Power BI, forecasting and executive reporting",
  "duration": "10 modules",
  "pace": "5–8 hours/week",
  "level": "Beginner to Intermediate",
  "prerequisites": [
    "Basic spreadsheet literacy; prior programming is optional"
  ],
  "overview": [
    "An applied specialization in business analytics & business intelligence focused on sales, finance, customer retention, kpis, power bi, forecasting and executive reporting.",
    "Every module includes an exercise, quality checks, a knowledge assessment and an evidence-based interpretation."
  ],
  "objectives": [
    "Source and validate relevant domain datasets",
    "Apply descriptive and inferential techniques responsibly",
    "Create clear dashboards and reproducible analysis",
    "Present actionable conclusions and limitations"
  ],
  "tools": [
    {
      "category": "Analysis",
      "items": "Excel, SQL, Python, R"
    },
    {
      "category": "Reporting",
      "items": "Power BI, CSV, Jupyter"
    }
  ],
  "grading": [
    {
      "component": "Practical labs",
      "weight": "40%",
      "detail": "Reproducible module exercises"
    },
    {
      "component": "Quizzes",
      "weight": "20%",
      "detail": "Ten module checks"
    },
    {
      "component": "Capstone",
      "weight": "40%",
      "detail": "End-to-end domain portfolio"
    }
  ]
};
export const courseModules: CourseModule[] = [
  {
    "id": "module-1",
    "week": 1,
    "title": "Domain foundations and ethical data handling",
    "objective": "Apply domain foundations and ethical data handling to sales, finance, customer retention, kpis, power bi, forecasting and executive reporting.",
    "lessons": [
      {
        "id": "lesson-1",
        "title": "Domain foundations and ethical data handling",
        "content": [
          "In Business Analytics & Business Intelligence, domain foundations and ethical data handling must begin with a clear stakeholder question and documented data provenance. Sales, finance, customer retention, KPIs, Power BI, forecasting and executive reporting.",
          "Choose suitable variables, assess missingness and bias, and verify each transformation. Interpret findings in context rather than treating a statistical association as proof of causation."
        ],
        "bullets": [
          "Define the question and unit of analysis",
          "Document data quality, privacy and assumptions",
          "Reproduce calculations and explain limitations"
        ]
      }
    ],
    "lab": {
      "title": "Domain foundations and ethical data handling practical",
      "description": "Complete a guided business analytics & business intelligence exercise using public or synthetic data.",
      "steps": [
        "Choose a safe public or synthetic dataset and cite its source.",
        "Define measurable indicators and perform quality checks.",
        "Analyze and visualize the results with reproducible steps.",
        "Submit a one-page findings memo and limitations."
      ]
    },
    "quiz": [
      {
        "question": "What should be verified before interpreting results?",
        "options": [
          "Only chart colours",
          "Data provenance, quality and assumptions",
          "The number of slides",
          "The popularity of the software"
        ],
        "answerIndex": 1,
        "explanation": "Reliable analysis depends on documented provenance, validated inputs and explicit assumptions."
      }
    ]
  },
  {
    "id": "module-2",
    "week": 2,
    "title": "Data collection, sources and quality",
    "objective": "Apply data collection, sources and quality to sales, finance, customer retention, kpis, power bi, forecasting and executive reporting.",
    "lessons": [
      {
        "id": "lesson-2",
        "title": "Data collection, sources and quality",
        "content": [
          "In Business Analytics & Business Intelligence, data collection, sources and quality must begin with a clear stakeholder question and documented data provenance. Sales, finance, customer retention, KPIs, Power BI, forecasting and executive reporting.",
          "Choose suitable variables, assess missingness and bias, and verify each transformation. Interpret findings in context rather than treating a statistical association as proof of causation."
        ],
        "bullets": [
          "Define the question and unit of analysis",
          "Document data quality, privacy and assumptions",
          "Reproduce calculations and explain limitations"
        ]
      }
    ],
    "lab": {
      "title": "Data collection, sources and quality practical",
      "description": "Complete a guided business analytics & business intelligence exercise using public or synthetic data.",
      "steps": [
        "Choose a safe public or synthetic dataset and cite its source.",
        "Define measurable indicators and perform quality checks.",
        "Analyze and visualize the results with reproducible steps.",
        "Submit a one-page findings memo and limitations."
      ]
    },
    "quiz": [
      {
        "question": "What should be verified before interpreting results?",
        "options": [
          "Only chart colours",
          "Data provenance, quality and assumptions",
          "The number of slides",
          "The popularity of the software"
        ],
        "answerIndex": 1,
        "explanation": "Reliable analysis depends on documented provenance, validated inputs and explicit assumptions."
      }
    ]
  },
  {
    "id": "module-3",
    "week": 3,
    "title": "Spreadsheet cleaning and descriptive metrics",
    "objective": "Apply spreadsheet cleaning and descriptive metrics to sales, finance, customer retention, kpis, power bi, forecasting and executive reporting.",
    "lessons": [
      {
        "id": "lesson-3",
        "title": "Spreadsheet cleaning and descriptive metrics",
        "content": [
          "In Business Analytics & Business Intelligence, spreadsheet cleaning and descriptive metrics must begin with a clear stakeholder question and documented data provenance. Sales, finance, customer retention, KPIs, Power BI, forecasting and executive reporting.",
          "Choose suitable variables, assess missingness and bias, and verify each transformation. Interpret findings in context rather than treating a statistical association as proof of causation."
        ],
        "bullets": [
          "Define the question and unit of analysis",
          "Document data quality, privacy and assumptions",
          "Reproduce calculations and explain limitations"
        ]
      }
    ],
    "lab": {
      "title": "Spreadsheet cleaning and descriptive metrics practical",
      "description": "Complete a guided business analytics & business intelligence exercise using public or synthetic data.",
      "steps": [
        "Choose a safe public or synthetic dataset and cite its source.",
        "Define measurable indicators and perform quality checks.",
        "Analyze and visualize the results with reproducible steps.",
        "Submit a one-page findings memo and limitations."
      ]
    },
    "quiz": [
      {
        "question": "What should be verified before interpreting results?",
        "options": [
          "Only chart colours",
          "Data provenance, quality and assumptions",
          "The number of slides",
          "The popularity of the software"
        ],
        "answerIndex": 1,
        "explanation": "Reliable analysis depends on documented provenance, validated inputs and explicit assumptions."
      }
    ]
  },
  {
    "id": "module-4",
    "week": 4,
    "title": "SQL extraction and cohort analysis",
    "objective": "Apply sql extraction and cohort analysis to sales, finance, customer retention, kpis, power bi, forecasting and executive reporting.",
    "lessons": [
      {
        "id": "lesson-4",
        "title": "SQL extraction and cohort analysis",
        "content": [
          "In Business Analytics & Business Intelligence, sql extraction and cohort analysis must begin with a clear stakeholder question and documented data provenance. Sales, finance, customer retention, KPIs, Power BI, forecasting and executive reporting.",
          "Choose suitable variables, assess missingness and bias, and verify each transformation. Interpret findings in context rather than treating a statistical association as proof of causation."
        ],
        "bullets": [
          "Define the question and unit of analysis",
          "Document data quality, privacy and assumptions",
          "Reproduce calculations and explain limitations"
        ]
      }
    ],
    "lab": {
      "title": "SQL extraction and cohort analysis practical",
      "description": "Complete a guided business analytics & business intelligence exercise using public or synthetic data.",
      "steps": [
        "Choose a safe public or synthetic dataset and cite its source.",
        "Define measurable indicators and perform quality checks.",
        "Analyze and visualize the results with reproducible steps.",
        "Submit a one-page findings memo and limitations."
      ]
    },
    "quiz": [
      {
        "question": "What should be verified before interpreting results?",
        "options": [
          "Only chart colours",
          "Data provenance, quality and assumptions",
          "The number of slides",
          "The popularity of the software"
        ],
        "answerIndex": 1,
        "explanation": "Reliable analysis depends on documented provenance, validated inputs and explicit assumptions."
      }
    ]
  },
  {
    "id": "module-5",
    "week": 5,
    "title": "Statistical inference and uncertainty",
    "objective": "Apply statistical inference and uncertainty to sales, finance, customer retention, kpis, power bi, forecasting and executive reporting.",
    "lessons": [
      {
        "id": "lesson-5",
        "title": "Statistical inference and uncertainty",
        "content": [
          "In Business Analytics & Business Intelligence, statistical inference and uncertainty must begin with a clear stakeholder question and documented data provenance. Sales, finance, customer retention, KPIs, Power BI, forecasting and executive reporting.",
          "Choose suitable variables, assess missingness and bias, and verify each transformation. Interpret findings in context rather than treating a statistical association as proof of causation."
        ],
        "bullets": [
          "Define the question and unit of analysis",
          "Document data quality, privacy and assumptions",
          "Reproduce calculations and explain limitations"
        ]
      }
    ],
    "lab": {
      "title": "Statistical inference and uncertainty practical",
      "description": "Complete a guided business analytics & business intelligence exercise using public or synthetic data.",
      "steps": [
        "Choose a safe public or synthetic dataset and cite its source.",
        "Define measurable indicators and perform quality checks.",
        "Analyze and visualize the results with reproducible steps.",
        "Submit a one-page findings memo and limitations."
      ]
    },
    "quiz": [
      {
        "question": "What should be verified before interpreting results?",
        "options": [
          "Only chart colours",
          "Data provenance, quality and assumptions",
          "The number of slides",
          "The popularity of the software"
        ],
        "answerIndex": 1,
        "explanation": "Reliable analysis depends on documented provenance, validated inputs and explicit assumptions."
      }
    ]
  },
  {
    "id": "module-6",
    "week": 6,
    "title": "Python or R analytical workflows",
    "objective": "Apply python or r analytical workflows to sales, finance, customer retention, kpis, power bi, forecasting and executive reporting.",
    "lessons": [
      {
        "id": "lesson-6",
        "title": "Python or R analytical workflows",
        "content": [
          "In Business Analytics & Business Intelligence, python or r analytical workflows must begin with a clear stakeholder question and documented data provenance. Sales, finance, customer retention, KPIs, Power BI, forecasting and executive reporting.",
          "Choose suitable variables, assess missingness and bias, and verify each transformation. Interpret findings in context rather than treating a statistical association as proof of causation."
        ],
        "bullets": [
          "Define the question and unit of analysis",
          "Document data quality, privacy and assumptions",
          "Reproduce calculations and explain limitations"
        ]
      }
    ],
    "lab": {
      "title": "Python or R analytical workflows practical",
      "description": "Complete a guided business analytics & business intelligence exercise using public or synthetic data.",
      "steps": [
        "Choose a safe public or synthetic dataset and cite its source.",
        "Define measurable indicators and perform quality checks.",
        "Analyze and visualize the results with reproducible steps.",
        "Submit a one-page findings memo and limitations."
      ]
    },
    "quiz": [
      {
        "question": "What should be verified before interpreting results?",
        "options": [
          "Only chart colours",
          "Data provenance, quality and assumptions",
          "The number of slides",
          "The popularity of the software"
        ],
        "answerIndex": 1,
        "explanation": "Reliable analysis depends on documented provenance, validated inputs and explicit assumptions."
      }
    ]
  },
  {
    "id": "module-7",
    "week": 7,
    "title": "Visualization and domain dashboards",
    "objective": "Apply visualization and domain dashboards to sales, finance, customer retention, kpis, power bi, forecasting and executive reporting.",
    "lessons": [
      {
        "id": "lesson-7",
        "title": "Visualization and domain dashboards",
        "content": [
          "In Business Analytics & Business Intelligence, visualization and domain dashboards must begin with a clear stakeholder question and documented data provenance. Sales, finance, customer retention, KPIs, Power BI, forecasting and executive reporting.",
          "Choose suitable variables, assess missingness and bias, and verify each transformation. Interpret findings in context rather than treating a statistical association as proof of causation."
        ],
        "bullets": [
          "Define the question and unit of analysis",
          "Document data quality, privacy and assumptions",
          "Reproduce calculations and explain limitations"
        ]
      }
    ],
    "lab": {
      "title": "Visualization and domain dashboards practical",
      "description": "Complete a guided business analytics & business intelligence exercise using public or synthetic data.",
      "steps": [
        "Choose a safe public or synthetic dataset and cite its source.",
        "Define measurable indicators and perform quality checks.",
        "Analyze and visualize the results with reproducible steps.",
        "Submit a one-page findings memo and limitations."
      ]
    },
    "quiz": [
      {
        "question": "What should be verified before interpreting results?",
        "options": [
          "Only chart colours",
          "Data provenance, quality and assumptions",
          "The number of slides",
          "The popularity of the software"
        ],
        "answerIndex": 1,
        "explanation": "Reliable analysis depends on documented provenance, validated inputs and explicit assumptions."
      }
    ]
  },
  {
    "id": "module-8",
    "week": 8,
    "title": "Predictive analysis and model evaluation",
    "objective": "Apply predictive analysis and model evaluation to sales, finance, customer retention, kpis, power bi, forecasting and executive reporting.",
    "lessons": [
      {
        "id": "lesson-8",
        "title": "Predictive analysis and model evaluation",
        "content": [
          "In Business Analytics & Business Intelligence, predictive analysis and model evaluation must begin with a clear stakeholder question and documented data provenance. Sales, finance, customer retention, KPIs, Power BI, forecasting and executive reporting.",
          "Choose suitable variables, assess missingness and bias, and verify each transformation. Interpret findings in context rather than treating a statistical association as proof of causation."
        ],
        "bullets": [
          "Define the question and unit of analysis",
          "Document data quality, privacy and assumptions",
          "Reproduce calculations and explain limitations"
        ]
      }
    ],
    "lab": {
      "title": "Predictive analysis and model evaluation practical",
      "description": "Complete a guided business analytics & business intelligence exercise using public or synthetic data.",
      "steps": [
        "Choose a safe public or synthetic dataset and cite its source.",
        "Define measurable indicators and perform quality checks.",
        "Analyze and visualize the results with reproducible steps.",
        "Submit a one-page findings memo and limitations."
      ]
    },
    "quiz": [
      {
        "question": "What should be verified before interpreting results?",
        "options": [
          "Only chart colours",
          "Data provenance, quality and assumptions",
          "The number of slides",
          "The popularity of the software"
        ],
        "answerIndex": 1,
        "explanation": "Reliable analysis depends on documented provenance, validated inputs and explicit assumptions."
      }
    ]
  },
  {
    "id": "module-9",
    "week": 9,
    "title": "Decision communication and stakeholder reporting",
    "objective": "Apply decision communication and stakeholder reporting to sales, finance, customer retention, kpis, power bi, forecasting and executive reporting.",
    "lessons": [
      {
        "id": "lesson-9",
        "title": "Decision communication and stakeholder reporting",
        "content": [
          "In Business Analytics & Business Intelligence, decision communication and stakeholder reporting must begin with a clear stakeholder question and documented data provenance. Sales, finance, customer retention, KPIs, Power BI, forecasting and executive reporting.",
          "Choose suitable variables, assess missingness and bias, and verify each transformation. Interpret findings in context rather than treating a statistical association as proof of causation."
        ],
        "bullets": [
          "Define the question and unit of analysis",
          "Document data quality, privacy and assumptions",
          "Reproduce calculations and explain limitations"
        ]
      }
    ],
    "lab": {
      "title": "Decision communication and stakeholder reporting practical",
      "description": "Complete a guided business analytics & business intelligence exercise using public or synthetic data.",
      "steps": [
        "Choose a safe public or synthetic dataset and cite its source.",
        "Define measurable indicators and perform quality checks.",
        "Analyze and visualize the results with reproducible steps.",
        "Submit a one-page findings memo and limitations."
      ]
    },
    "quiz": [
      {
        "question": "What should be verified before interpreting results?",
        "options": [
          "Only chart colours",
          "Data provenance, quality and assumptions",
          "The number of slides",
          "The popularity of the software"
        ],
        "answerIndex": 1,
        "explanation": "Reliable analysis depends on documented provenance, validated inputs and explicit assumptions."
      }
    ]
  },
  {
    "id": "module-10",
    "week": 10,
    "title": "Applied portfolio capstone",
    "objective": "Apply applied portfolio capstone to sales, finance, customer retention, kpis, power bi, forecasting and executive reporting.",
    "lessons": [
      {
        "id": "lesson-10",
        "title": "Applied portfolio capstone",
        "content": [
          "In Business Analytics & Business Intelligence, applied portfolio capstone must begin with a clear stakeholder question and documented data provenance. Sales, finance, customer retention, KPIs, Power BI, forecasting and executive reporting.",
          "Choose suitable variables, assess missingness and bias, and verify each transformation. Interpret findings in context rather than treating a statistical association as proof of causation."
        ],
        "bullets": [
          "Define the question and unit of analysis",
          "Document data quality, privacy and assumptions",
          "Reproduce calculations and explain limitations"
        ]
      }
    ],
    "lab": {
      "title": "Applied portfolio capstone practical",
      "description": "Complete a guided business analytics & business intelligence exercise using public or synthetic data.",
      "steps": [
        "Choose a safe public or synthetic dataset and cite its source.",
        "Define measurable indicators and perform quality checks.",
        "Analyze and visualize the results with reproducible steps.",
        "Submit a one-page findings memo and limitations."
      ]
    },
    "quiz": [
      {
        "question": "What should be verified before interpreting results?",
        "options": [
          "Only chart colours",
          "Data provenance, quality and assumptions",
          "The number of slides",
          "The popularity of the software"
        ],
        "answerIndex": 1,
        "explanation": "Reliable analysis depends on documented provenance, validated inputs and explicit assumptions."
      }
    ]
  }
];
