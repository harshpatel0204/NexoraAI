export const caseStudies = [
  {
    id: 1,
    industry: 'E-Commerce / Retail',
    challenge: 'Overstocking and stockouts costing $2.3M annually across 150+ retail locations.',
    solution: 'Demand forecasting AI trained on sales history, weather patterns, local events, and social trends — integrated directly into their ERP.',
    metrics: [
      { value: '67%', label: 'Fewer stockouts' },
      { value: '$1.8M', label: 'Saved — Year 1' },
      { value: '3 wks', label: 'To production' },
    ],
    techStack: ['Python', 'XGBoost', 'Airflow', 'Snowflake'],
  },
  {
    id: 2,
    industry: 'Legal Tech',
    challenge: 'Contract review taking 4+ hours per document, with a 12% error rate in clause extraction across 200+ templates.',
    solution: 'LLM-powered contract review system with custom fine-tuned extraction models, integrated with their document management system.',
    metrics: [
      { value: '85%', label: 'Faster review' },
      { value: '4.2 hrs', label: 'Saved per lawyer/day' },
      { value: '99.1%', label: 'Extraction accuracy' },
    ],
    techStack: ['GPT-4o', 'LangChain', 'Pinecone', 'FastAPI'],
  },
  {
    id: 3,
    industry: 'Manufacturing',
    challenge: 'Manual quality inspection missing 23% of surface defects on a production line running 24/7 across 3 facilities.',
    solution: 'Computer vision system with edge-deployed models performing real-time defect detection at 60fps, with automated reject routing.',
    metrics: [
      { value: '96%', label: 'Defect reduction' },
      { value: '$4.1M', label: 'Annual savings' },
      { value: '60fps', label: 'Processing speed' },
    ],
    techStack: ['PyTorch', 'ONNX', 'NVIDIA Triton', 'Kafka'],
  },
]
