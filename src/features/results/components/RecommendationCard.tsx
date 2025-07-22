import { Paper, Typography, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";

type BPCategory = 'low' | 'normal' | 'elevated' | 'high';

interface RecommendationCardProps {
  answers: Record<string, string>;
  bpCategory: BPCategory;
  recommendation: {
    category: string;
    priority: string;
    summary: string;
    lifestyle_recommendations: string[];
    medical_advice: string[];
    follow_up: string;
    [key: string]: any;
  };
}

export default function RecommendationCard({
  bpCategory,
  recommendation
}: RecommendationCardProps) {
  const { t } = useTranslation();



  return (
    <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, bgcolor: "#f0f8ff" }}>
      <Typography variant="h6" gutterBottom>
        {t(`results.categories.${bpCategory}.title`, { defaultValue: recommendation.category })}
      </Typography>
      <Typography sx={{ mb: 2 }} component="div">
        {t(`results.categories.${bpCategory}.summary`, { defaultValue: recommendation.summary })}
      </Typography>
      <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2, mb: 0.5, fontSize: '0.75rem' }}>
        {t('results.follow_up_label')}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.primary' }}>
        {t(`results.categories.${bpCategory}.follow_up`, { defaultValue: recommendation.follow_up })}
      </Typography>
    </Paper>
  );
}
