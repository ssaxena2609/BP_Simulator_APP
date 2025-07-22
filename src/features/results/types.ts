export type BPCategory = 'low' | 'normal' | 'elevated' | 'high';

export interface Recommendation {
  lifestyle_recommendations: string[];
  medical_advice: string[];
  follow_up: string;
}

export interface ResultsProps {
  answers: Record<string, string>;
}

export interface ActionButtonsProps {
  navigate: () => void;
}

export interface RecommendationCardProps {
  answers: Record<string, string>;
  bpCategory: BPCategory;
  recommendation: Recommendation;
}
