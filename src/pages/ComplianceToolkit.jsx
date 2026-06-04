import React from 'react';
import { motion } from 'framer-motion';
import { FileCheck, Calculator, ShieldQuestion, ArrowRight } from 'lucide-react';

const tools = [
  {
    id: 'wizard',
    title: 'Applicability Wizard',
    description: 'Am I a Significant Data Fiduciary (SDF)? Answer a few questions to find out your classification under the DPDP Act.',
    icon: ShieldQuestion,
    color: 'from-blue-500 to-cyan-400'
  },
  {
    id: 'checklist',
    title: 'Compliance Checklist',
    description: 'Readiness Assessment. A comprehensive step-by-step checklist to ensure your organization meets all DPDP requirements.',
    icon: FileCheck,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'penalty',
    title: 'Penalty Estimator',
    description: 'Calculate potential fines based on different types of contraventions and your business parameters.',
    icon: Calculator,
    color: 'from-orange-500 to-red-500'
  }
];

const ComplianceToolkit = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto text-gray-100">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 mb-4">
          Compliance Toolkit
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Interactive tools designed to help organizations assess their readiness, understand obligations, and estimate risks under the Digital Personal Data Protection Act.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tools.map((tool, index) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.15 }}
            className="group relative bg-[rgba(26,26,40,0.6)] border border-gray-800 rounded-2xl p-8 hover:border-gray-600 transition-all shadow-xl backdrop-blur-md overflow-hidden cursor-pointer"
          >
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${tool.color}`} />
            
            <div className={`w-14 h-14 rounded-full mb-6 flex items-center justify-center bg-gray-800/50 text-gray-200 group-hover:scale-110 transition-transform`}>
              <tool.icon className="w-7 h-7" />
            </div>
            
            <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-blue-300 transition-colors">
              {tool.title}
            </h3>
            
            <p className="text-gray-400 mb-8 leading-relaxed">
              {tool.description}
            </p>
            
            <div className="absolute bottom-8 right-8 text-gray-500 group-hover:text-white transition-colors">
              <ArrowRight className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ComplianceToolkit;
