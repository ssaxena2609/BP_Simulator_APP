import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useTranslation } from 'react-i18next';
import surveyJson from '../../data/survey.json';
import { useState, useCallback, memo } from 'react';
import BMIGraph from './components/BMIGraph';
import RecommendationCard from './components/RecommendationCard';
import ActionButtons from './components/ActionButtons';
import RecommendationList from './components/RecommendationList';
import { BPCategory } from './types';
import { GRID_LAYOUT, UNIT_TOGGLE_STYLES, PAPER_STYLES, MAIN_PAPER_STYLES } from './styles';

const MemoizedBMIGraph = memo(BMIGraph);
const MemoizedRecommendationCard = memo(RecommendationCard);
const MemoizedActionButtons = memo(ActionButtons);

const getSimulatedBpCategory = (() => {
  const categories = Object.keys(surveyJson.survey.bpTest.recommendations) as BPCategory[];
  return (): BPCategory => {
    const index = Math.floor(Math.random() * categories.length);
    return categories[index];
  };
})();

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { answers } = location.state as { answers: Record<string, string> };
  const [unit, setUnit] = useState<'metric' | 'imperial'>('imperial');

  const handleUnitChange = useCallback((_: React.MouseEvent<HTMLElement>, newUnit: 'metric' | 'imperial' | null) => {
    if (newUnit) setUnit(newUnit);
  }, []);

  const handleRetest = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const bpCategory = getSimulatedBpCategory();
  const recommendation = surveyJson.survey.bpTest.recommendations[bpCategory];

  return (
    <Container maxWidth="lg" component="main" role="region" aria-labelledby="results-heading" sx={{ py: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" fontWeight="bold">
          {t('app.title')}
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" gutterBottom>
          {t('survey.title')}
        </Typography>
      </Box>
      
      <Box sx={GRID_LAYOUT}>
        <Box sx={{ gridArea: 'chart' }}>
          <Paper elevation={3} sx={PAPER_STYLES}>
            <MemoizedBMIGraph answers={answers} />
          </Paper>
        </Box>
        
        <Box sx={{ gridArea: 'main', height: '100%' }}>
          <Paper elevation={3} sx={MAIN_PAPER_STYLES}>
            <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 2 }}>
              {t('results.lifestyle')}
            </Typography>
            
            <RecommendationList
              items={recommendation.lifestyle_recommendations}
              category={bpCategory}
              type="lifestyle"
              aria-label="Lifestyle Recommendations"
            />

            <Typography variant="subtitle1" fontWeight="medium" sx={{ mt: 4, mb: 2 }}>
              {t('results.medical')}
            </Typography>
            
            <RecommendationList
              items={recommendation.medical_advice}
              category={bpCategory}
              type="medical"
              aria-label="Medical Advice"
            />

            <Typography variant="h6" sx={{ mt: 3 }}>{t('results.follow_up')}</Typography>
            <Typography>
              {t(`results.categories.${bpCategory}.follow_up`, { defaultValue: recommendation.follow_up })}
            </Typography>

            <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 4 }}>
              {t('results.disclaimer')}
            </Typography>
          </Paper>
        </Box>

        <Box sx={{ gridArea: 'sidebar', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ mb: 3, flex: 'none' }}>
            <Paper elevation={3} sx={PAPER_STYLES}>
              <Typography variant="h6" gutterBottom>{t('results.unit_label')}</Typography>
              <ToggleButtonGroup
                value={unit}
                exclusive
                onChange={handleUnitChange}
                aria-label={t('results.unit_toggle')}
                size="small"
                sx={UNIT_TOGGLE_STYLES}
              >
                <ToggleButton value="metric">{t('buttons.metric')}</ToggleButton>
                <ToggleButton value="imperial">{t('buttons.imperial')}</ToggleButton>
              </ToggleButtonGroup>
            </Paper>
          </Box>
          
          <Paper 
            elevation={3} 
            sx={{ 
              ...PAPER_STYLES,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Box sx={{ flexGrow: 1, mb: 3 }}>
              <MemoizedRecommendationCard answers={answers} bpCategory={bpCategory} recommendation={recommendation} />
            </Box>
            <MemoizedActionButtons navigate={handleRetest} />
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}
