import { z } from 'zod';

export const phaseSchema = z.object({
  id: z.number(),
  name: z.string(),
  shortName: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format, use YYYY-MM-DD"),
  displayDate: z.string(),
  rules: z.array(z.number()),
  ruleCount: z.number().optional(), // We derive this now, so it might be optional in the future
  color: z.string(),
  bgColor: z.string(),
  borderColor: z.string(),
  description: z.string(),
  keyItems: z.array(z.string()),
  detailedScope: z.record(z.string(), z.string())
});

export const ruleSchema = z.object({
  id: z.number(),
  number: z.string(),
  title: z.string(),
  summary: z.string(),
  enforcementDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format, use YYYY-MM-DD"),
  phase: z.number(),
  linkedActSections: z.array(z.string()),
  relatedSchedule: z.string().nullable().optional(),
  content: z.string(),
  keyPoints: z.array(z.string())
});

export const definitionSchema = z.object({
  id: z.string(),
  term: z.string(),
  definition: z.string(),
  explanation: z.string(),
  examples: z.array(z.string()),
  relatedSections: z.array(z.string()),
  category: z.enum(['Core', 'Stakeholder', 'Process', 'Regulatory'])
});

export const sectionSchema = z.object({
  id: z.string(),
  number: z.string(),
  title: z.string(),
  content: z.string(),
  explanation: z.string(),
  keyPoints: z.array(z.string())
});

// Function to validate all data sources
export const validateDataStore = (data) => {
  try {
    const { phases, rules, definitions, sections } = data;
    
    if (phases) z.array(phaseSchema).parse(phases);
    if (rules) z.array(ruleSchema).parse(rules);
    if (definitions) z.array(definitionSchema).parse(definitions);
    if (sections) z.array(sectionSchema).parse(sections);
    
    console.log('✅ All DPDP data schemas validated successfully.');
    return true;
  } catch (error) {
    console.error('❌ Data Validation Error:', error);
    if (import.meta.env.DEV) {
      // Show error overlay in development if data is malformed
      throw new Error(`Data Validation Failed: ${error.message}`);
    }
    return false;
  }
};
