import { Landmark, Users, Shield } from 'lucide-react';
import { getPhaseStatus, getDaysUntil } from '../data/enforcementTimeline';

export const phaseIcons = {
  1: Landmark,
  2: Users,
  3: Shield
};

export const phaseColors = {
  1: '#10b981', // Green
  2: '#f59e0b', // Amber
  3: '#3b82f6'  // Blue
};

// Export getPhaseStatus from timeline for consistency
export { getPhaseStatus, getDaysUntil };
