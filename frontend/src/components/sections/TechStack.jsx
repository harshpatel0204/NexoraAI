import { motion } from 'framer-motion'
import SectionLabel from '../ui/SectionLabel'

const techCategories = [
  {
    label: 'Foundation Models',
    techs: ['GPT-4o', 'Claude 3.5', 'Llama 3', 'Gemini Pro', 'Mistral', 'Cohere'],
  },
  {
    label: 'Frameworks',
    techs: ['LangChain', 'LangGraph', 'LlamaIndex', 'Haystack', 'Semantic Kernel', 'CrewAI'],
  },
  {
    label: 'Vector DBs',
    techs: ['Pinecone', 'Weaviate', 'pgvector', 'Chroma', 'Qdrant', 'Milvus'],
  },
  {
    label: 'Infrastructure',
    techs: ['AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes', 'Terraform'],
  },
  {
    label: 'Data Stack',
    techs: ['Snowflake', 'dbt', 'Airflow', 'Spark', 'Kafka', 'BigQuery'],
  },
  {
    label: 'Vision & ML',
    techs: ['PyTorch', 'TensorFlow', 'ONNX', 'OpenCV', 'Hugging Face', 'scikit-learn'],
  },
]

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function TechStack() {
  return (
    <section className="py-24 md:py-32 bg-neutral-900">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-brand-400 text-xs font-bold tracking-widest uppercase">
            <span className="w-5 h-px bg-brand-500" />
            Tech Stack
            <span className="w-5 h-px bg-brand-500" />
          </div>
          <h2 className="font-display font-bold text-display-xl text-white tracking-tight mt-4">
            Built on the Best.<br />Tuned for Your Needs.
          </h2>
          <p className="text-neutral-400 mt-5 max-w-2xl mx-auto leading-relaxed">
            We don't have a single-stack bias. Every project gets the right combination of models, frameworks, and infrastructure for the problem at hand.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {techCategories.map((category) => (
            <motion.div key={category.label} variants={itemVariants}>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-3 block">
                {category.label}
              </span>
              <div className="flex flex-wrap gap-2">
                {category.techs.map((tech) => (
                  <span
                    key={tech}
                    className="bg-neutral-800 text-neutral-300 border border-neutral-700 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-neutral-700 hover:text-white hover:border-neutral-600 transition-all cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center text-neutral-500 italic mt-16 max-w-xl mx-auto"
        >
          "We choose the right tool for your problem — not the one we're comfortable with."
        </motion.p>
      </div>
    </section>
  )
}
