import type { CourseMeta, CourseModule } from "@/lib/courses/types";

export const courseMeta: CourseMeta = {
  slug: "data-science-analytics-engineering",
  title: "Data Science, Analytics & Engineering",
  tagline:
    "Comprehensive Big Data Pipelines, Advanced Analytics, and Corporate Visualization (2026 Edition)",
  duration: "8 Modules",
  pace: "6–8 hours/week",
  level: "Beginner to Intermediate",
  prerequisites: [
    "Basic computer literacy and fundamental numerical skills",
    "No prior programming experience required",
    "Python and SQL are taught from foundational principles",
  ],
  overview: [
    "In modern enterprise environments, data is useless without the infrastructure to capture it, the analytical tools to process it, and the narrative skills to translate it into business value. This course provides a complete, hands-on path through the modern data lifecycle, blending software engineering paradigms with deep analytical methods.",
    "You'll master database queries, write efficient data-wrangling scripts in Python, build performant big data pipelines using Apache Spark and Databricks, and design highly impactful, dynamic executive dashboards in Power BI and Tableau.",
  ],
  objectives: [
    "Query, join, and model relational database tables using advanced SQL techniques.",
    "Develop structured, clean Python programs to extract, clean, and process highly unstructured datasets.",
    "Architect scalable Extract-Transform-Load (ETL) data pipelines inside the Databricks Lakehouse environment.",
    "Leverage big data frameworks like Apache Spark to process multi-gigabyte data streams efficiently.",
    "Apply fundamental statistical modeling and descriptive analytics to uncover trends and patterns.",
    "Design and publish highly interactive, automated business intelligence dashboards using Power BI and Tableau.",
  ],
  tools: [
    {
      category: "Relational Databases & SQL",
      items: "PostgreSQL, pgAdmin, Snowflake",
    },
    {
      category: "Programming & Libraries",
      items: "Python, Jupyter, Pandas, NumPy, SciPy, Seaborn",
    },
    {
      category: "Big Data & Data Engineering",
      items: "Apache Spark (PySpark), Databricks, Delta Lake",
    },
    {
      category: "Business Intelligence & Dashboards",
      items: "Power BI, Tableau Desktop, dbt (Data Build Tool)",
    },
  ],
  grading: [
    {
      component: "Weekly Coding Labs",
      weight: "40%",
      detail:
        "Direct evaluation of analytical SQL scripts, clean Python notebooks, and Spark runtimes.",
    },
    {
      component: "Midterm Assessment",
      weight: "20%",
      detail:
        "Implementation of a database schema model and associated dbt transformations.",
    },
    {
      component: "Capstone Project",
      weight: "40%",
      detail:
        "Evaluation of pipeline design scalability, data formatting rigor, visual dashboard design impact, and video analysis.",
    },
  ],
};

export const courseModules: CourseModule[] = [
  {
    id: "module-1",
    week: 1,
    title: "Enterprise Relational Database Management with SQL",
    objective:
      "Extract, manipulate, and shape tabular data from complex transactional schemas using professional SQL commands.",
    lessons: [
      {
        id: "m1-l1",
        title: "Relational Foundations: Tables, Keys & Schemas",
        content: [
          "A relational database organizes data into tables of rows and columns, where every row is uniquely identified by a Primary Key. Tables relate to one another through Foreign Keys — a column in one table that points to the primary key of another — which is what lets a database model real-world relationships (a customer has many orders) without duplicating data.",
          "A schema is the blueprint of these tables and their relationships. Understanding schema design — what entities exist, how they connect, and which fields are required — is the prerequisite for writing correct queries: a query is only as good as your mental model of the schema underneath it.",
        ],
        bullets: [
          "Tables store rows and columns; a Primary Key uniquely identifies each row.",
          "Foreign Keys link tables together, modeling one-to-many relationships.",
          "A schema is the blueprint of tables, columns, and relationships.",
          "Correct queries start with a correct mental model of the schema.",
        ],
      },
      {
        id: "m1-l2",
        title: "Core Querying: SELECT, WHERE, ORDER BY, LIMIT",
        content: [
          "Every SQL query starts with SELECT to choose columns and FROM to name the table. WHERE filters rows to only those matching a condition, ORDER BY sorts the result set, and LIMIT caps how many rows come back — the four building blocks behind almost every question you'll ever ask a database.",
          "Getting comfortable chaining these clauses in the right order (SELECT → FROM → WHERE → ORDER BY → LIMIT) and reading query results critically is what turns SQL from memorized syntax into a genuine analytical tool.",
        ],
        code: {
          label: "Top 10 highest-value orders this year",
          body: "SELECT order_id, customer_id, order_total\nFROM orders\nWHERE order_date >= '2026-01-01'\nORDER BY order_total DESC\nLIMIT 10;",
        },
        bullets: [
          "SELECT chooses columns; FROM names the source table.",
          "WHERE filters rows before they're returned.",
          "ORDER BY sorts the result set; LIMIT caps row count.",
          "Clause order matters: SELECT, FROM, WHERE, ORDER BY, LIMIT.",
        ],
      },
      {
        id: "m1-l3",
        title: "Multi-Table Queries: JOINs",
        content: [
          "Real questions rarely live in one table. An INNER JOIN returns only rows that match in both tables — customers who have placed at least one order. A LEFT JOIN keeps every row from the left table regardless of a match, filling in NULLs where the right table has nothing — essential for finding customers with zero orders.",
          "RIGHT JOIN mirrors LEFT JOIN from the other table's perspective, and a FULL OUTER JOIN keeps unmatched rows from both sides at once. Choosing the right join type is really a business question in disguise: 'do I want to see everyone, or only the ones with a match?'",
        ],
        code: {
          label: "Customers and their orders, including customers with none",
          body: "SELECT c.customer_id, c.name, o.order_id, o.order_total\nFROM customers c\nLEFT JOIN orders o ON o.customer_id = c.customer_id;",
        },
        bullets: [
          "INNER JOIN: only rows matching in both tables.",
          "LEFT/RIGHT JOIN: all rows from one side, matched or NULL from the other.",
          "FULL OUTER JOIN: unmatched rows kept from both sides.",
          "The join type answers a business question about what to include.",
        ],
      },
      {
        id: "m1-l4",
        title: "Aggregation, Subqueries, CTEs & Window Functions",
        content: [
          "GROUP BY collapses many rows into one per group, paired with aggregate functions like SUM, AVG, and COUNT; HAVING then filters those aggregated groups (unlike WHERE, which filters rows before grouping). Subqueries and Common Table Expressions (CTEs, via WITH) let you build a query in named, readable steps instead of one tangled statement.",
          "Window functions are the professional-grade tool: unlike GROUP BY, they compute a value (a running total, a rank, a moving average) across a 'window' of rows without collapsing them — exactly what's needed for rolling retention metrics or ranking customers within each region while still showing every individual row.",
        ],
        code: {
          label: "Rolling 3-month revenue per customer with a window function",
          body: "SELECT customer_id, order_month, monthly_total,\n  SUM(monthly_total) OVER (\n    PARTITION BY customer_id\n    ORDER BY order_month\n    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW\n  ) AS rolling_3mo_total\nFROM monthly_customer_revenue;",
        },
        bullets: [
          "GROUP BY + aggregates collapse rows into summarized groups.",
          "HAVING filters aggregated groups; WHERE filters rows before grouping.",
          "CTEs (WITH) build multi-step queries in readable, named stages.",
          "Window functions compute per-row analytics (rank, running total) without collapsing rows.",
        ],
      },
    ],
    lab: {
      title: "Rolling Retention & Top-Percentile Analysis on an E-commerce Database",
      description:
        "Build a complex analytical query against an e-commerce database with millions of records to calculate rolling monthly customer retention metrics and identify the top 5% of users by purchase volume.",
      steps: [
        "Explore the schema: identify keys and relationships across customers, orders, and order line items.",
        "Join customers to orders and aggregate monthly purchase totals per customer.",
        "Write a window function to compute rolling monthly retention and running totals.",
        "Use a CTE with NTILE or PERCENT_RANK to isolate the top 5% of users by purchase volume.",
        "Validate the query against a smaller sample before running it at full scale.",
      ],
    },
    quiz: [
      {
        question:
          "What is the key difference between a LEFT JOIN and an INNER JOIN?",
        options: [
          "They always return identical results",
          "LEFT JOIN keeps all rows from the left table even without a match (filling NULLs); INNER JOIN keeps only rows matching in both tables",
          "INNER JOIN is faster but less accurate",
          "LEFT JOIN can only be used with a single table",
        ],
        answerIndex: 1,
        explanation:
          "An INNER JOIN returns only rows with a match in both tables, while a LEFT JOIN preserves every row from the left table, filling in NULLs where there is no matching right-table row — critical for finding records with zero matches.",
      },
      {
        question:
          "Why would you use a window function instead of a plain GROUP BY when calculating a rolling monthly total per customer?",
        options: [
          "Window functions are always faster to write",
          "Window functions compute values across a window of rows without collapsing them, preserving every individual row alongside the calculation",
          "GROUP BY cannot use aggregate functions",
          "Window functions only work with a single table",
        ],
        answerIndex: 1,
        explanation:
          "GROUP BY collapses rows into one per group, losing row-level detail. Window functions compute values like running totals or rankings across a defined window while still returning every original row.",
      },
      {
        question:
          "What is the difference between WHERE and HAVING in a SQL query?",
        options: [
          "They are interchangeable in every case",
          "WHERE filters individual rows before grouping; HAVING filters aggregated groups after GROUP BY",
          "HAVING can only be used without WHERE",
          "WHERE only works with numeric columns",
        ],
        answerIndex: 1,
        explanation:
          "WHERE filters rows before any grouping occurs, while HAVING filters the resulting aggregated groups — for example, keeping only customers whose SUM(order_total) exceeds a threshold.",
      },
    ],
  },
  {
    id: "module-2",
    week: 2,
    title: "Python for Data Analysis & Exploratory Wrangling",
    objective:
      "Write clean, modular Python scripts to parse, scrub, and visualize raw local datasets.",
    lessons: [
      {
        id: "m2-l1",
        title: "Python Foundations: Variables, Structures & Control Flow",
        content: [
          "Python programs are built from variables (named references to data), core data structures — lists for ordered collections, dictionaries for key-value lookups — and control flow (if/else branching, for/while loops) that decides what runs and how many times. These fundamentals apply identically whether you're processing 10 rows or 10 million.",
          "Getting comfortable with lists and dictionaries specifically pays off immediately in data work: a CSV row often becomes a dictionary, and a dataset often becomes a list of those dictionaries before you ever load a specialized library.",
        ],
        bullets: [
          "Variables name and reference data; lists hold ordered collections.",
          "Dictionaries store key-value pairs for fast lookups.",
          "if/else and for/while loops control what code executes and how often.",
          "A CSV row naturally maps to a dictionary; a dataset to a list of them.",
        ],
      },
      {
        id: "m2-l2",
        title: "Functions, Error Handling & File I/O",
        content: [
          "Writing a reusable function once — instead of copy-pasting the same logic five times — is the single habit that separates a script from a maintainable program. Functions take inputs, transform them predictably, and return outputs, which also makes them independently testable.",
          "Real-world data is messy: files are missing, malformed, or too large for the format you expected. try/except error handling lets a script react gracefully to bad input rather than crashing outright, while file I/O operations (open, read, write, and context managers like `with`) are how Python actually gets data in and results out.",
        ],
        code: {
          label: "Safe file reading with error handling",
          body: "def load_rows(path):\n    try:\n        with open(path, \"r\") as f:\n            return f.readlines()\n    except FileNotFoundError:\n        print(f\"Missing file: {path}\")\n        return []",
        },
        bullets: [
          "Functions make logic reusable, readable, and independently testable.",
          "try/except handles bad input gracefully instead of crashing.",
          "The `with` context manager safely opens and closes files.",
          "Robust I/O and error handling are what make a script production-worthy.",
        ],
      },
      {
        id: "m2-l3",
        title: "Mastering Pandas: DataFrames, Filtering & Grouping",
        content: [
          "Pandas' DataFrame is the workhorse of Python data analysis: a labeled, two-dimensional table where each column is a Series. Loading a CSV or database result into a DataFrame gives you vectorized filtering (`df[df.amount > 100]`), column selection, and sorting — all far faster and more readable than hand-written loops.",
          "groupby() mirrors SQL's GROUP BY: split the DataFrame into groups by a key, apply an aggregate function to each, and combine the results back into a summary table. Mastering the indexing model — `.loc` for label-based access, `.iloc` for position-based access — avoids the single most common source of Pandas bugs.",
        ],
        code: {
          label: "Group-and-aggregate with Pandas",
          body: "import pandas as pd\n\ndf = pd.read_csv(\"orders.csv\")\nrevenue_by_region = (\n    df[df[\"status\"] == \"completed\"]\n    .groupby(\"region\")[\"order_total\"]\n    .sum()\n    .sort_values(ascending=False)\n)",
        },
        bullets: [
          "DataFrames are labeled 2D tables; each column is a Series.",
          "Vectorized filtering and selection beat hand-written loops.",
          "groupby() mirrors SQL's GROUP BY for split-apply-combine analysis.",
          ".loc (label-based) vs. .iloc (position-based) indexing avoids common bugs.",
        ],
      },
      {
        id: "m2-l4",
        title: "NumPy & Visualizing Distributions",
        content: [
          "NumPy underlies Pandas: its array operations perform numerical calculations — sums, means, standard deviations, matrix math — orders of magnitude faster than plain Python loops, because operations run in compiled C code across the whole array at once (vectorization).",
          "Once data is clean, Matplotlib and Seaborn turn columns of numbers into visual understanding: histograms reveal distribution shape and skew, and a correlation heatmap makes relationships between many variables visible at a glance — the fastest way to spot which features are worth investigating further.",
        ],
        bullets: [
          "NumPy arrays vectorize numerical operations for major speed gains.",
          "Vectorization avoids slow, explicit Python loops over large datasets.",
          "Histograms (Matplotlib/Seaborn) reveal distribution shape and skew.",
          "Correlation heatmaps surface relationships across many variables at once.",
        ],
      },
    ],
    lab: {
      title: "Cleaning a Dirty Customer Feedback Dataset",
      description:
        "Import a dirty, real-world customer feedback dataset (containing missing rows, mismatched timestamps, and duplicate fields), clean it programmatically with Pandas, and construct a correlation matrix of buying behaviors.",
      steps: [
        "Load the raw dataset into a Pandas DataFrame and profile missingness and duplicates.",
        "Write functions to standardize mismatched timestamp formats and drop/impute missing values.",
        "Deduplicate records using a defined business key, not just exact row matches.",
        "Engineer a few numeric features describing buying behavior (frequency, recency, average spend).",
        "Compute and visualize a correlation matrix of those features with Seaborn.",
      ],
    },
    quiz: [
      {
        question:
          "Why does NumPy dramatically outperform plain Python loops for numerical calculations?",
        options: [
          "NumPy only works with integers",
          "NumPy vectorizes operations, running them in compiled code across an entire array at once instead of one Python-level iteration at a time",
          "NumPy automatically parallelizes across multiple machines",
          "NumPy replaces the need for Pandas entirely",
        ],
        answerIndex: 1,
        explanation:
          "Vectorization lets NumPy apply an operation to an entire array in compiled C code, avoiding the overhead of Python's interpreter looping over each element individually.",
      },
      {
        question:
          "What is the main difference between .loc and .iloc in Pandas?",
        options: [
          "They are identical and interchangeable",
          ".loc selects by label (index/column name); .iloc selects by integer position",
          ".iloc only works on Series, never DataFrames",
          ".loc can only be used for filtering rows, never columns",
        ],
        answerIndex: 1,
        explanation:
          ".loc is label-based, referencing index and column names directly, while .iloc is purely position-based, referencing integer row/column offsets — conflating the two is a very common source of bugs.",
      },
      {
        question:
          "Why is try/except error handling important when writing a script to load real-world files?",
        options: [
          "It makes the script run faster",
          "It lets the script handle missing or malformed files gracefully instead of crashing outright",
          "It replaces the need for functions",
          "It is only useful for network requests, not file I/O",
        ],
        answerIndex: 1,
        explanation:
          "Real-world data is messy — files may be missing or malformed. try/except lets a script catch these conditions and respond gracefully (e.g. logging and skipping) rather than terminating unexpectedly.",
      },
    ],
  },
  {
    id: "module-3",
    week: 3,
    title: "Modern Data Warehousing & Modeling Patterns",
    objective:
      "Structure raw transaction databases into clean data warehouses optimized for corporate business intelligence analytics.",
    lessons: [
      {
        id: "m3-l1",
        title: "Normalization vs. Denormalization",
        content: [
          "Normalization organizes data to eliminate redundancy: 1NF ensures atomic column values, 2NF removes partial dependencies on a composite key, and 3NF removes dependencies between non-key columns. This is exactly right for transactional systems (OLTP), where fast, consistent writes matter most and every fact should live in exactly one place.",
          "Analytics has the opposite priority: read speed and query simplicity matter more than write efficiency. Denormalization deliberately reintroduces redundancy — duplicating a customer's region onto every order row, for instance — to avoid expensive joins across many normalized tables when running large aggregate queries.",
        ],
        bullets: [
          "1NF/2NF/3NF eliminate redundancy for fast, consistent transactional writes.",
          "OLTP systems prioritize normalization; OLAP/analytics prioritizes read speed.",
          "Denormalization duplicates data deliberately to avoid expensive joins.",
          "The right level of normalization depends on the workload, not a universal rule.",
        ],
      },
      {
        id: "m3-l2",
        title: "Star & Snowflake Schemas",
        content: [
          "A Star Schema puts one central Fact table — the measurable events, like individual sales transactions — surrounded by Dimension tables that describe the who/what/where/when (customer, product, store, date). Every dimension joins directly to the fact table, which keeps queries simple and fast: exactly the profile BI tools like Power BI and Tableau are optimized for.",
          "A Snowflake Schema normalizes those dimension tables further (splitting 'product' into 'product' and 'product category', for example), trading some query simplicity for reduced storage redundancy. In practice, most modern analytics warehouses favor the Star Schema specifically because simple joins outperform storage savings at query time.",
        ],
        bullets: [
          "Fact tables hold measurable events; Dimension tables hold descriptive context.",
          "Star Schema: dimensions join directly to the fact table — simple, fast queries.",
          "Snowflake Schema: dimensions are further normalized, trading speed for storage efficiency.",
          "Most BI tools are optimized for the simpler Star Schema.",
        ],
      },
      {
        id: "m3-l3",
        title: "Slowly Changing Dimensions (SCD)",
        content: [
          "Dimension attributes change over time — a customer moves cities, a product gets reclassified — and Slowly Changing Dimension patterns define how a warehouse handles that. SCD Type 1 simply overwrites the old value, losing history but keeping the model simple; it's right when the old value truly doesn't matter for analysis.",
          "SCD Type 2 instead adds a new row with effective-date ranges, preserving full history — essential when you need to know 'what region was this customer in when they placed this order' months later. SCD Type 3 is a middle ground, adding a column for the 'previous value' when only one level of history is worth keeping.",
        ],
        bullets: [
          "SCD Type 1: overwrite the old value — no history, simplest model.",
          "SCD Type 2: add a new row with effective-date ranges — full history preserved.",
          "SCD Type 3: add a 'previous value' column — one level of history.",
          "The right SCD type depends on whether historical accuracy matters for analysis.",
        ],
      },
      {
        id: "m3-l4",
        title: "dbt Fundamentals: Build, Test, Document",
        content: [
          "dbt (Data Build Tool) lets analysts define transformations as version-controlled SQL SELECT statements — models — that dbt compiles and runs in dependency order inside the warehouse. This brings software-engineering discipline (version control, code review, modularity) to what used to be untracked, ad-hoc SQL scripts.",
          "dbt's built-in testing framework lets you assert data integrity directly in code: `not_null`, `unique`, and referential-integrity tests run automatically on every build, failing loudly the moment a data quality assumption breaks — turning 'we hope the data is right' into 'we verify the data is right, every run.'",
        ],
        code: {
          label: "A dbt schema test asserting referential integrity",
          body: "models:\n  - name: fact_orders\n    columns:\n      - name: customer_id\n        tests:\n          - not_null\n          - relationships:\n              to: ref('dim_customers')\n              field: customer_id",
        },
        bullets: [
          "dbt models are version-controlled SQL SELECT statements.",
          "dbt runs models in dependency order and auto-generates documentation.",
          "Built-in tests (not_null, unique, relationships) assert data integrity.",
          "Testing turns data quality from a hope into a verified, automated check.",
        ],
      },
    ],
    lab: {
      title: "Star Schema Conversion & dbt Integrity Testing",
      description:
        "Convert a flat, transactional operations log into a clean dimensional Star Schema within a database, and write automated dbt testing constraints to validate data integrity.",
      steps: [
        "Profile the flat operations log and identify candidate fact and dimension entities.",
        "Design a Star Schema: one fact table plus supporting dimension tables.",
        "Write the SQL/dbt models that transform the flat log into the new schema.",
        "Add dbt tests (not_null, unique, relationships) across the fact and dimension models.",
        "Run the dbt build and resolve any failing tests before finalizing the schema.",
      ],
    },
    quiz: [
      {
        question:
          "Why do analytical data warehouses often favor denormalization over strict 3NF normalization?",
        options: [
          "Denormalization is required by law for compliance",
          "Read speed and query simplicity matter more than write efficiency in analytics, so deliberate redundancy avoids expensive joins",
          "Denormalized data cannot be queried with SQL",
          "3NF is only usable for small datasets",
        ],
        answerIndex: 1,
        explanation:
          "Transactional systems prioritize normalized, redundancy-free writes. Analytics workloads prioritize fast, simple reads, so denormalizing (duplicating data to avoid joins) is a deliberate, appropriate trade-off.",
      },
      {
        question:
          "When would you choose an SCD Type 2 pattern over Type 1 for a dimension table?",
        options: [
          "When historical accuracy doesn't matter at all",
          "When you need to preserve full history of attribute changes, such as knowing what region a customer was in at the time of a past order",
          "When storage space is the only concern",
          "SCD Type 2 is never used in modern warehouses",
        ],
        answerIndex: 1,
        explanation:
          "SCD Type 2 adds new rows with effective-date ranges, preserving the full history of how a dimension attribute changed over time — essential when past analysis must reflect the value that was true at that point in time.",
      },
      {
        question:
          "What is the primary benefit of dbt's built-in testing framework?",
        options: [
          "It replaces the need for a data warehouse",
          "It lets you assert data integrity (not_null, unique, referential relationships) directly in code, failing automatically when an assumption breaks",
          "It only tests Python code, not SQL",
          "It eliminates the need for version control",
        ],
        answerIndex: 1,
        explanation:
          "dbt tests run automatically on every build, asserting conditions like non-null columns, uniqueness, and referential integrity — catching data quality regressions immediately instead of discovering them downstream.",
      },
    ],
  },
  {
    id: "module-4",
    week: 4,
    title: "Big Data Foundations & Apache Spark",
    objective:
      "Understand how to scale data computations from local environments to high-performance distributed computer clusters.",
    lessons: [
      {
        id: "m4-l1",
        title: "The Limits of Single-Node Computing",
        content: [
          "Pandas holds an entire dataset in the memory of one machine. This works beautifully until it doesn't: a dataset larger than available RAM causes swapping, crashes, or simply never finishing — the classic 'Pandas crashes on big data' failure mode that every analyst eventually hits.",
          "The fix isn't a faster single machine (vertical scaling has hard limits and diminishing returns) — it's horizontal scaling: splitting both the data and the computation across many machines working in parallel, so no single node ever needs to hold more than its share.",
        ],
        bullets: [
          "Single-node tools (Pandas) hold all data in one machine's memory.",
          "Datasets larger than RAM cause crashes or unacceptable slowdowns.",
          "Vertical scaling (a bigger machine) has hard limits and diminishing returns.",
          "Horizontal scaling splits data and computation across many machines.",
        ],
      },
      {
        id: "m4-l2",
        title: "Distributed Computing Mechanics: MapReduce",
        content: [
          "MapReduce is the foundational pattern behind distributed computing: a Map step applies a transformation to each piece of data independently and in parallel across many worker nodes, and a Reduce step combines those partial results into a final answer (a sum, a count, a sorted list).",
          "A driver program coordinates the job: splitting work into tasks, assigning them to worker nodes, and collecting results. Understanding this driver/worker split explains why distributed jobs behave so differently from local scripts — a slow or failed worker doesn't crash the whole job, but network communication between nodes becomes a real cost to design around.",
        ],
        bullets: [
          "Map: transform data independently and in parallel across workers.",
          "Reduce: combine partial results into a final answer.",
          "The driver coordinates task splitting, assignment, and result collection.",
          "Network communication between nodes is a real cost in distributed jobs.",
        ],
      },
      {
        id: "m4-l3",
        title: "Spark Architecture: RDDs, DataFrames & Lazy Evaluation",
        content: [
          "Apache Spark builds on MapReduce ideas but keeps data in memory across steps (rather than writing to disk between every stage), making iterative workloads dramatically faster. Its foundational abstraction, the Resilient Distributed Dataset (RDD), is a fault-tolerant collection of data partitioned across a cluster; Spark DataFrames layer a schema and a SQL-like API on top, similar in feel to Pandas but distributed.",
          "Spark uses lazy evaluation: transformations (filter, select, join) build up an execution plan without actually running anything, until an action (count, collect, write) triggers it. This lets Spark's optimizer (Catalyst) analyze the whole plan and choose the most efficient physical execution — something eager, step-by-step execution could never do.",
        ],
        bullets: [
          "RDDs: fault-tolerant, partitioned data collections across a cluster.",
          "Spark DataFrames: a schema-aware, SQL-like API on top of RDDs.",
          "Lazy evaluation builds an execution plan; actions trigger actual computation.",
          "Laziness lets Spark's optimizer choose the most efficient physical plan.",
        ],
      },
      {
        id: "m4-l4",
        title: "Querying Distributed Data with PySpark",
        content: [
          "PySpark exposes Spark's engine through a Python API that will feel familiar coming from Pandas: `.filter()`, `.groupBy()`, `.join()` — but every operation executes across the cluster rather than on one machine's memory. The mental shift is thinking in transformations-then-actions rather than immediate, line-by-line execution.",
          "Partitioning — how data is physically split across workers — has an outsized effect on performance. Poorly partitioned joins cause 'shuffles' (expensive data movement across the network), while thoughtful partitioning (on the join key, for instance) keeps related data co-located and dramatically speeds up large-scale joins.",
        ],
        code: {
          label: "A PySpark join and aggregation",
          body: "trips = spark.read.parquet(\"s3://data/trips/\")\nfares = spark.read.parquet(\"s3://data/fares/\")\n\nresult = (\n    trips.join(fares, on=\"trip_id\")\n    .groupBy(\"borough\")\n    .agg({\"fare_amount\": \"avg\"})\n)\nresult.show()",
        },
        bullets: [
          "PySpark's API mirrors Pandas but executes across the whole cluster.",
          "Think in transformations (lazy) followed by actions (trigger execution).",
          "Partitioning determines how data is physically split across workers.",
          "Poor partitioning causes expensive shuffles; good partitioning speeds up joins.",
        ],
      },
    ],
    lab: {
      title: "Distributed Joins on City-Wide Transportation Logs",
      description:
        "Initialize a PySpark environment, load a multi-gigabyte dataset of city-wide transportation logs, perform distributed joins, and optimize execution speeds using partitions.",
      steps: [
        "Initialize a local PySpark session and load the multi-gigabyte transportation dataset.",
        "Inspect the schema and partitioning of the loaded DataFrames.",
        "Perform a distributed join between trip and fare/location datasets.",
        "Measure execution time, then repartition on the join key and re-measure.",
        "Document the performance difference and explain the shuffle behavior observed.",
      ],
    },
    quiz: [
      {
        question:
          "Why does a dataset larger than available RAM cause Pandas to crash or slow down dramatically?",
        options: [
          "Pandas requires a special file format for large datasets",
          "Pandas holds the entire dataset in a single machine's memory, so anything exceeding available RAM causes swapping, crashes, or failure to complete",
          "Pandas cannot read CSV files above a certain size",
          "Pandas automatically distributes data across machines, causing network delays",
        ],
        answerIndex: 1,
        explanation:
          "Pandas is a single-node tool that loads data entirely into memory. When a dataset exceeds available RAM, performance degrades severely or the process crashes — the core motivation for distributed frameworks like Spark.",
      },
      {
        question:
          "What does Spark's lazy evaluation model actually do?",
        options: [
          "It executes every operation immediately, one line at a time",
          "It builds an execution plan from transformations without running them until an action is called, allowing the optimizer to choose the most efficient physical plan",
          "It only applies to reading files, not transformations",
          "It disables fault tolerance to improve speed",
        ],
        answerIndex: 1,
        explanation:
          "Transformations like filter, select, and join build up a logical plan lazily. Only when an action (count, collect, write) is called does Spark's Catalyst optimizer choose and execute the most efficient physical plan.",
      },
      {
        question:
          "Why does poor partitioning cause a 'shuffle' during a large distributed join, and why is that costly?",
        options: [
          "Shuffles only affect small datasets and can be ignored",
          "A shuffle moves large amounts of data across the network between worker nodes to co-locate matching join keys, which is expensive compared to data that's already partitioned correctly",
          "Shuffles happen only when using RDDs, never DataFrames",
          "Partitioning has no effect on join performance",
        ],
        answerIndex: 1,
        explanation:
          "When data isn't partitioned by the join key, Spark must shuffle records across the network so matching keys end up on the same worker — a network-bound operation that is far more expensive than a join on already co-located, well-partitioned data.",
      },
    ],
  },
  {
    id: "module-5",
    week: 5,
    title: "Cloud Data Engineering with Databricks & Delta Lake",
    objective:
      "Master cloud-native analytics development within Databricks, utilizing transaction-safe storage engines.",
    lessons: [
      {
        id: "m5-l1",
        title: "Databricks Workspace & Collaborative Notebooks",
        content: [
          "Databricks packages Spark into a managed cloud workspace: notebooks that support multiple languages in the same document (SQL, Python, Scala), shared between team members with version history and comments, running on managed compute clusters that spin up and scale down automatically.",
          "The cluster is the actual compute — a group of managed virtual machines running Spark — while the notebook is just the interface. Understanding this separation matters operationally: you can attach the same notebook to a small dev cluster or a large production cluster without changing a line of code.",
        ],
        bullets: [
          "Databricks notebooks support multiple languages in one document.",
          "Notebooks are collaborative, versioned, and shareable across a team.",
          "Clusters are the managed compute; notebooks are just the interface.",
          "The same code can run on a small dev cluster or a large production cluster.",
        ],
      },
      {
        id: "m5-l2",
        title: "The Lakehouse Architecture",
        content: [
          "Traditional data warehouses are structured and fast but expensive and rigid; data lakes (raw object storage like S3) are cheap and flexible but lack structure, transactions, or performance guarantees — leading to 'data swamps' nobody trusts. The Lakehouse architecture merges both: structured, governed tables built directly on top of cheap object storage.",
          "This means one copy of the data serves both large-scale, ad-hoc data science exploration and reliable, governed BI reporting — eliminating the costly, error-prone practice of maintaining separate lake and warehouse copies that inevitably drift out of sync with each other.",
        ],
        bullets: [
          "Data warehouses: structured and fast, but expensive and rigid.",
          "Data lakes: cheap and flexible, but lack structure and transaction guarantees.",
          "Lakehouse: structured, governed tables directly on cheap object storage.",
          "One copy of data serves both data science exploration and governed BI.",
        ],
      },
      {
        id: "m5-l3",
        title: "Delta Lake: ACID Transactions & Time Travel",
        content: [
          "Delta Lake adds a transaction log on top of plain object storage files, giving raw data lake storage the properties normally reserved for databases: ACID transactions mean concurrent readers and writers never see a half-finished write or corrupted state, even at massive scale.",
          "Time Travel lets you query a table exactly as it existed at a previous version or timestamp — invaluable for auditing ('what did this report show last Tuesday?') and for recovering instantly from a bad pipeline run by rolling back to the last known-good version, without restoring from a separate backup system.",
        ],
        code: {
          label: "Querying a previous table version with Time Travel",
          body: "SELECT * FROM sales_gold VERSION AS OF 42;\n\n-- or by timestamp\nSELECT * FROM sales_gold TIMESTAMP AS OF '2026-06-01';",
        },
        bullets: [
          "Delta Lake adds a transaction log for ACID guarantees on object storage.",
          "Concurrent readers/writers never see a half-finished write.",
          "Time Travel queries a table as it existed at a past version or timestamp.",
          "Enables auditing and instant rollback without a separate backup restore.",
        ],
      },
      {
        id: "m5-l4",
        title: "Multi-Hop Pipelines: Bronze, Silver, Gold",
        content: [
          "The medallion architecture organizes a Lakehouse pipeline into three progressively refined layers. Bronze holds raw, unmodified ingested data — exactly as it arrived, preserving a permanent, replayable source of truth even if the source system changes or disappears.",
          "Silver validates, cleans, and conforms that raw data (fixing schema anomalies, deduplicating, joining reference data), while Gold aggregates it into business-ready tables — the KPIs and summary metrics dashboards actually query. Each hop is a checkpoint with its own data-quality guarantees, and lineage tracking across all three makes it possible to trace any Gold-table number back to its exact Bronze source.",
        ],
        bullets: [
          "Bronze: raw, unmodified data — a permanent, replayable source of truth.",
          "Silver: validated, cleaned, conformed data with schema enforcement.",
          "Gold: business-ready, aggregated tables that dashboards query directly.",
          "Lineage tracking traces any Gold metric back to its Bronze source.",
        ],
      },
    ],
    lab: {
      title: "Bronze/Silver/Gold Telemetry Pipeline in Databricks",
      description:
        "Build a complete Databricks notebook pipeline that ingests raw telemetry files (Bronze), validates and cleans schema anomalies (Silver), and aggregates KPIs into an optimized business table (Gold) with complete data lineage tracking.",
      steps: [
        "Ingest raw telemetry files into a Bronze Delta table, preserving the data exactly as received.",
        "Build a Silver notebook step that validates schema, handles anomalies, and deduplicates records.",
        "Aggregate the Silver table into a Gold table of business KPIs.",
        "Use Delta Lake Time Travel to demonstrate rolling back a bad Silver transformation.",
        "Document the lineage from Gold metrics back to their Bronze source files.",
      ],
    },
    quiz: [
      {
        question:
          "What problem does the Lakehouse architecture solve compared to maintaining a separate data lake and data warehouse?",
        options: [
          "It eliminates the need for any structured tables",
          "It merges structured, governed tables with cheap object storage, so one copy of data serves both exploratory data science and reliable BI reporting instead of two drifting copies",
          "It only works for small datasets",
          "It removes the need for compute clusters",
        ],
        answerIndex: 1,
        explanation:
          "Maintaining a separate lake and warehouse means two copies of data that can drift out of sync. The Lakehouse architecture provides governed, structured tables directly on object storage, unifying both use cases on one copy of data.",
      },
      {
        question:
          "What capability does Delta Lake's 'Time Travel' feature provide?",
        options: [
          "It predicts future data trends",
          "It lets you query a table exactly as it existed at a previous version or timestamp, enabling auditing and instant rollback",
          "It speeds up Spark job execution automatically",
          "It only works with streaming data, not batch tables",
        ],
        answerIndex: 1,
        explanation:
          "Time Travel uses Delta Lake's transaction log to let you query any prior version or timestamp of a table, which is invaluable for auditing historical reports and rolling back a bad pipeline run without a separate backup restore.",
      },
      {
        question:
          "In the Bronze/Silver/Gold medallion architecture, what is the purpose of the Bronze layer?",
        options: [
          "To store final, business-ready KPI tables for dashboards",
          "To preserve raw, unmodified ingested data as a permanent, replayable source of truth",
          "To perform all data cleaning and deduplication",
          "To store only aggregated summary statistics",
        ],
        answerIndex: 1,
        explanation:
          "Bronze holds data exactly as it was ingested, unmodified. This preserves a permanent, replayable record that later Silver and Gold transformations can be re-derived from if logic changes or a source system disappears.",
      },
    ],
  },
  {
    id: "module-6",
    week: 6,
    title: "Executive Storytelling & Power BI Foundations",
    objective:
      "Connect business-level databases to Power BI, creating structured data models and calculated measures.",
    lessons: [
      {
        id: "m6-l1",
        title: "Connecting Power BI to Data Sources",
        content: [
          "Power BI connects to nearly any data source — local files, PostgreSQL, Snowflake, Databricks — through a common Get Data interface, with a critical choice up front: Import mode loads a compressed copy of the data into Power BI's in-memory engine for fast, offline-capable analysis, while DirectQuery leaves data in place and queries it live, trading some speed for always-current results.",
          "Choosing correctly matters at scale: Import is usually right for datasets that fit in memory and refresh on a schedule; DirectQuery is right when data is too large to import, changes constantly, or must respect row-level security enforced at the source.",
        ],
        bullets: [
          "Power BI connects to nearly any source via a common Get Data interface.",
          "Import mode: a compressed in-memory copy — fast, but needs scheduled refresh.",
          "DirectQuery: queries the live source directly — always current, but slower.",
          "Choose based on data size, freshness needs, and source-level security.",
        ],
      },
      {
        id: "m6-l2",
        title: "Power Query: Transforming, Pivoting & Merging",
        content: [
          "Power Query is Power BI's data-preparation layer, a graphical (and scriptable, via M) tool for shaping raw source data before it ever reaches the model: renaming columns, splitting fields, changing data types, filtering rows, and pivoting/unpivoting between wide and long formats.",
          "Merging queries in Power Query is the equivalent of a SQL join, letting you combine multiple sources (a local Excel file and a cloud database table, for instance) into a single clean query — and because every step is recorded, the entire transformation is repeatable and auditable on every refresh.",
        ],
        bullets: [
          "Power Query graphically shapes and cleans data before modeling.",
          "Pivoting/unpivoting reshapes data between wide and long formats.",
          "Merging queries performs join-like operations across multiple sources.",
          "Every transformation step is recorded, making refreshes repeatable and auditable.",
        ],
      },
      {
        id: "m6-l3",
        title: "Building a Clean Power BI Data Model",
        content: [
          "A Power BI data model is a set of tables connected by relationships — ideally mirroring the Star Schema principles from Module 3, with fact tables at the center and dimension tables radiating out. Clean, well-defined relationships are what let a single filter (like selecting a date range) ripple correctly across every visual on a report.",
          "Every relationship has a cardinality (one-to-many, many-to-many) and a direction of filter propagation. Managing 'active' vs. 'inactive' relationships — and knowing when to force an inactive path with DAX — is essential once a model has more than one plausible way two tables could connect (like both an order date and a ship date linking to the same date dimension).",
        ],
        bullets: [
          "Data models mirror Star Schema: fact tables at the center, dimensions radiating out.",
          "Relationships let one filter selection ripple across every report visual.",
          "Cardinality and filter direction determine how relationships propagate.",
          "Active vs. inactive relationships matter when tables connect more than one way.",
        ],
      },
      {
        id: "m6-l4",
        title: "Introduction to DAX: Measures & CALCULATE",
        content: [
          "DAX (Data Analysis Expressions) is Power BI's formula language. Calculated columns compute a value row-by-row and are stored in the model, while measures compute dynamically based on the current filter context — the report page, slicers, and visuals a user is currently interacting with — and are almost always the right choice for aggregations like totals or ratios.",
          "CALCULATE is DAX's most powerful function: it evaluates an expression within a modified filter context, which is exactly how you build comparisons like Year-over-Year growth or month-to-date totals — taking the 'current' filtered value and recalculating it against a deliberately different time window.",
        ],
        code: {
          label: "A Year-over-Year revenue measure with CALCULATE",
          body: "YoY Revenue Change =\nVAR CurrentRevenue = SUM(Sales[Revenue])\nVAR PriorYearRevenue =\n    CALCULATE(\n        SUM(Sales[Revenue]),\n        SAMEPERIODLASTYEAR('Date'[Date])\n    )\nRETURN\n    DIVIDE(CurrentRevenue - PriorYearRevenue, PriorYearRevenue)",
        },
        bullets: [
          "Calculated columns: computed row-by-row and stored in the model.",
          "Measures: computed dynamically based on the current filter context.",
          "CALCULATE evaluates an expression within a modified filter context.",
          "CALCULATE + time intelligence functions enable YoY and MTD comparisons.",
        ],
      },
    ],
    lab: {
      title: "Retail Sales Model with YoY & Month-to-Date DAX Measures",
      description:
        "Construct a comprehensive retail sales model in Power BI, using DAX to write high-impact custom measures for Year-over-Year (YoY) revenue changes and month-to-date performance comparisons.",
      steps: [
        "Connect Power BI to the retail sales data source and choose Import or DirectQuery appropriately.",
        "Clean and shape the source tables in Power Query.",
        "Build a Star Schema data model with a dedicated date dimension table.",
        "Write DAX measures for total revenue, YoY revenue change, and month-to-date performance.",
        "Assemble a report page that lets a user filter by region and product category.",
      ],
    },
    quiz: [
      {
        question:
          "What is the main trade-off between Power BI's Import mode and DirectQuery?",
        options: [
          "Import mode always shows live, real-time data",
          "Import mode loads a fast, in-memory copy of the data that needs scheduled refresh; DirectQuery queries the live source directly, trading speed for always-current results",
          "DirectQuery cannot be used with cloud data sources",
          "There is no meaningful difference between the two modes",
        ],
        answerIndex: 1,
        explanation:
          "Import mode compresses and loads data into memory for fast analysis but requires scheduled refreshes to stay current. DirectQuery queries the source live on every interaction, staying current at the cost of speed.",
      },
      {
        question:
          "Why are DAX measures generally preferred over calculated columns for aggregations like totals or ratios?",
        options: [
          "Calculated columns cannot store any values",
          "Measures compute dynamically based on the current filter context (the visuals and slicers in use), which is exactly what's needed for context-sensitive aggregations",
          "Measures are always faster regardless of what they calculate",
          "Calculated columns can only be used with text data",
        ],
        answerIndex: 1,
        explanation:
          "Measures recalculate based on the current filter context — the page, slicers, and visuals a user is interacting with — making them the right tool for aggregations like totals, ratios, and YoY comparisons that must respond to filtering.",
      },
      {
        question:
          "What does the CALCULATE function do in DAX?",
        options: [
          "It only formats numbers for display",
          "It evaluates an expression within a modified filter context, enabling comparisons like Year-over-Year growth",
          "It replaces the need for relationships in the data model",
          "It can only be used with text columns",
        ],
        answerIndex: 1,
        explanation:
          "CALCULATE evaluates an expression under a deliberately modified filter context — such as shifting the date filter back one year — which is the foundation for building YoY and other time-intelligence comparisons.",
      },
    ],
  },
  {
    id: "module-7",
    week: 7,
    title: "Advanced Visualization, Analytics & Tableau Dashboards",
    objective:
      "Build visually compelling, high-performance interactive stories using Tableau, focusing on dashboard design theory.",
    lessons: [
      {
        id: "m7-l1",
        title: "Visual Communication: Cognitive Load, Color & Typography",
        content: [
          "A dashboard's job is to reduce a viewer's cognitive load, not add to it. Cognitive load theory explains why cluttered dashboards fail: every extra color, gridline, or decorative element competes for limited working memory that should be spent understanding the data itself.",
          "Color theory and typography aren't decoration — they're functional tools. A restrained, consistent color palette should encode meaning (e.g., always red for 'below target'), and clear typographic hierarchy (size, weight) guides the eye to what matters first, second, and last on a busy executive dashboard.",
        ],
        bullets: [
          "Cognitive load theory: every unnecessary element competes for viewer attention.",
          "Restrained, consistent color use should encode meaning, not just decorate.",
          "Typographic hierarchy guides the eye to what matters most, first.",
          "Good dashboard design is a functional discipline, not an aesthetic afterthought.",
        ],
      },
      {
        id: "m7-l2",
        title: "Chart Types in Tableau",
        content: [
          "Choosing the right chart type is itself a communication decision. Bullet graphs compactly compare a metric against a target and qualitative ranges (poor/satisfactory/good) in far less space than a gauge. Heatmaps use color intensity to reveal patterns across two categorical dimensions at a glance — a spreadsheet a human could never scan that fast.",
          "Scatterplots with trend lines reveal the relationship between two continuous variables and whether it's strengthening or weakening; geographic maps let executives reason about performance spatially — which regions, postal codes, or shipment lanes are outliers — in a way a table of numbers never could.",
        ],
        bullets: [
          "Bullet graphs: compact metric-vs-target-vs-qualitative-range comparisons.",
          "Heatmaps: reveal patterns across two categorical dimensions via color intensity.",
          "Scatterplots with trend lines: relationships between two continuous variables.",
          "Geographic maps: spatial reasoning about regional or location-based performance.",
        ],
      },
      {
        id: "m7-l3",
        title: "Advanced Calculations: LOD Expressions & Parameters",
        content: [
          "Level of Detail (LOD) expressions solve a class of problems standard aggregations can't: computing a value at a different granularity than the current view, like 'each customer's total lifetime spend' shown alongside a per-order view. FIXED, INCLUDE, and EXCLUDE LOD expressions each control that granularity differently.",
          "Parameters are user-controlled inputs — a dynamic threshold, a metric switcher, a top-N selector — that let a single dashboard answer many different questions interactively, rather than forcing an analyst to build a dozen near-identical static views for every variation a stakeholder might ask for.",
        ],
        code: {
          label: "A FIXED LOD expression: customer lifetime value",
          body: "{ FIXED [Customer ID] : SUM([Order Total]) }",
        },
        bullets: [
          "LOD expressions compute values at a different granularity than the current view.",
          "FIXED, INCLUDE, and EXCLUDE control that granularity differently.",
          "Parameters are user-controlled inputs enabling dynamic, interactive views.",
          "One well-designed parameterized dashboard replaces many static ones.",
        ],
      },
      {
        id: "m7-l4",
        title: "Dashboard Actions, Publishing & Automated Refresh",
        content: [
          "Dashboard actions turn a static collection of charts into an interactive story: a Filter action lets clicking one mark filter every other chart on the dashboard, a Highlight action visually emphasizes related marks without hiding context, and a URL action can drill from a summary view out to an external system for deeper detail.",
          "Publishing to Tableau Server or Tableau Cloud makes a dashboard broadly available, but the real operational win is scheduled, automated data refresh — so the executive dashboard reflects yesterday's numbers every morning without anyone manually re-running anything.",
        ],
        bullets: [
          "Filter actions: clicking one mark filters the rest of the dashboard.",
          "Highlight actions emphasize related marks without hiding surrounding context.",
          "URL actions drill from a summary view to external detail.",
          "Scheduled automated refresh keeps published dashboards current without manual work.",
        ],
      },
    ],
    lab: {
      title: "Interactive Global Shipment Operations Dashboard",
      description:
        "Develop a high-impact operational dashboard in Tableau using a global shipment database, allowing executives to hover, drill down into individual postal codes, and dynamically filter lanes via parameters.",
      steps: [
        "Connect Tableau to the global shipment dataset and build core worksheets (map, trend, heatmap).",
        "Apply cognitive-load-conscious design: a restrained palette and clear visual hierarchy.",
        "Write LOD expressions to show shipment-lane-level and postal-code-level detail side by side.",
        "Add a parameter allowing executives to dynamically filter by shipment lane.",
        "Wire dashboard actions so clicking a region drills down into individual postal codes, then publish with a scheduled refresh.",
      ],
    },
    quiz: [
      {
        question:
          "Why does cognitive load theory matter when designing an executive dashboard?",
        options: [
          "It only applies to mobile dashboards",
          "Every unnecessary visual element competes for a viewer's limited working memory, so reducing clutter helps viewers actually understand the data",
          "It means dashboards should never use color",
          "It is only relevant for print reports, not interactive dashboards",
        ],
        answerIndex: 1,
        explanation:
          "Cognitive load theory explains that cluttered dashboards force viewers to expend mental effort filtering out noise instead of understanding the data. Deliberate, restrained design reduces that load and improves comprehension.",
      },
      {
        question:
          "What problem do Level of Detail (LOD) expressions solve in Tableau?",
        options: [
          "They only affect chart colors",
          "They compute a value at a different level of granularity than the current view, such as each customer's total lifetime spend shown alongside per-order detail",
          "They replace the need for parameters",
          "They can only be used with geographic maps",
        ],
        answerIndex: 1,
        explanation:
          "LOD expressions (FIXED, INCLUDE, EXCLUDE) let you calculate a value at a granularity independent of the current view's level of detail — essential for showing, e.g., a customer-level total alongside order-level rows.",
      },
      {
        question:
          "What is the benefit of using a Tableau parameter for a dynamic threshold or lane filter, compared to building separate static dashboards?",
        options: [
          "Parameters only work with numeric data",
          "A single parameterized dashboard can answer many different questions interactively, rather than requiring a separate near-identical dashboard for every variation",
          "Parameters remove the need for dashboard actions",
          "Parameters automatically publish the dashboard to the server",
        ],
        answerIndex: 1,
        explanation:
          "Parameters are user-controlled inputs that let one well-designed dashboard flex to answer many stakeholder questions dynamically, avoiding the maintenance burden of many near-duplicate static dashboards.",
      },
    ],
  },
  {
    id: "module-8",
    week: 8,
    title: "Capstone — End-to-End Enterprise Data Pipeline",
    objective:
      "Synthesize database operations, big data processing, and dashboard delivery into a single enterprise system.",
    lessons: [
      {
        id: "m8-l1",
        title: "Scoping the End-to-End Enterprise Data Platform",
        content: [
          "The capstone consolidates every module into one working system: an ingestion source (IoT telemetry, financial market feeds, or marketing clickstreams), a scalable processing layer, a dimensional model, and a published executive dashboard. Before building, define exactly what business question the platform must answer — a specific decision it should inform, not just 'show some charts.'",
          "Scoping well means choosing a data source with genuine messiness (so the cleaning and processing steps are meaningful) and a business question specific enough that the final dashboard's KPIs are obviously the right ones to have built — not an arbitrary assortment of charts.",
        ],
        bullets: [
          "Choose a raw, unstructured source: IoT telemetry, market feeds, or clickstreams.",
          "Define a specific business question or decision the platform must inform.",
          "A genuinely messy source data set makes the cleaning work meaningful.",
          "Good scoping makes the final dashboard's KPIs an obvious fit, not arbitrary.",
        ],
      },
      {
        id: "m8-l2",
        title: "Building the Scalable Pipeline & Dimensional Model",
        content: [
          "The processing layer runs PySpark inside Databricks/Delta Lake following the Bronze → Silver → Gold pattern from Module 5: raw ingestion, validation and cleaning, then business-ready aggregation — each hop auditable and independently re-runnable.",
          "From the Gold layer, build dimensional structures matching corporate analytical patterns from Module 3: a Star Schema with clear fact and dimension tables, so the eventual BI layer can query it with simple, fast joins rather than fighting a denormalized or overly complex source structure.",
        ],
        bullets: [
          "Processing layer: PySpark in Databricks/Delta Lake, Bronze → Silver → Gold.",
          "Each hop should be auditable and independently re-runnable.",
          "Gold-layer output should be shaped into a Star Schema dimensional model.",
          "A clean dimensional model keeps the downstream BI layer fast and simple.",
        ],
      },
      {
        id: "m8-l3",
        title: "Deliverables & Assessment",
        content: [
          "The capstone is graded on the whole chain working end-to-end, not any single piece in isolation: a scalable PySpark cleaning script, a dimensional model matching corporate patterns, and a published, automated dashboard with real calculated KPIs a business stakeholder would actually trust and use.",
          "The final 5-minute screencast is where you connect the technical pipeline to the business story — walking through why the architecture is built the way it is, and what the dashboard's insights actually mean for a decision-maker, not just how the charts were built.",
        ],
        bullets: [
          "Grading covers the full chain: ingestion, processing, modeling, and dashboarding.",
          "The dashboard must be published and automated, with real calculated KPIs.",
          "The screencast should connect architecture decisions to business value.",
          "Explain what the insights mean for a decision-maker, not just how they were built.",
        ],
      },
    ],
    lab: {
      title: "Capstone: Ship the End-to-End Enterprise Data Platform",
      description:
        "Architect and execute an End-to-End Enterprise Data Platform: ingest a raw unstructured stream, process it at scale with PySpark in Databricks/Delta Lake, model it dimensionally, and deliver a published executive dashboard with a screencast walkthrough.",
      steps: [
        "Select and ingest a raw, unstructured data stream (IoT, market feed, or clickstream).",
        "Build a scalable PySpark cleaning and processing pipeline in Databricks/Delta Lake (Bronze/Silver/Gold).",
        "Model the Gold layer into a Star Schema dimensional structure.",
        "Publish an automated executive dashboard (Power BI or Tableau) with interactive KPIs and calculated measures.",
        "Record a 5-minute screencast reviewing the pipeline architecture and the visual business story.",
      ],
    },
    quiz: [
      {
        question:
          "Why does the capstone require defining a specific business question before building the pipeline?",
        options: [
          "Business questions are only needed for the screencast, not the pipeline",
          "A specific question ensures the eventual dashboard's KPIs are a deliberate fit for a real decision, rather than an arbitrary assortment of charts",
          "It replaces the need for a dimensional model",
          "It only matters for the midterm assessment, not the capstone",
        ],
        answerIndex: 1,
        explanation:
          "Scoping around a specific business question ensures every downstream decision — what to clean, how to model it, which KPIs to calculate — serves an actual decision-maker's need, rather than producing charts for their own sake.",
      },
      {
        question:
          "Why should the Gold layer output be shaped into a Star Schema before reaching the BI layer?",
        options: [
          "Star Schemas are required by Databricks",
          "A Star Schema with clear fact and dimension tables keeps the downstream BI queries fast and simple, avoiding complex joins against a denormalized structure",
          "It removes the need for Delta Lake's ACID guarantees",
          "It is only relevant for Tableau, not Power BI",
        ],
        answerIndex: 1,
        explanation:
          "A Star Schema's simple, direct joins between fact and dimension tables are exactly what BI tools like Power BI and Tableau are optimized to query quickly, which is why Gold-layer output should be modeled this way before the dashboard layer.",
      },
      {
        question:
          "What is the primary purpose of the capstone's 5-minute screencast?",
        options: [
          "To demonstrate typing speed while building the dashboard",
          "To connect the technical pipeline architecture to the business story, explaining why it was built that way and what the resulting insights mean for a decision-maker",
          "To replace the need for a published dashboard",
          "To document only the SQL queries used",
        ],
        answerIndex: 1,
        explanation:
          "The screencast is where the technical work is translated into business value — explaining the architecture's rationale and what the dashboard's KPIs and insights actually mean for the people who will use them to make decisions.",
      },
    ],
  },
];
