import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function BMIGraph({ answers }: { answers: Record<string, string> }) {
  const { t } = useTranslation();

  const categories = [
    { key: 'low', color: '#2e7d32', range: '< 18.5' },
    { key: 'normal', color: '#66bb6a', range: '18.5 - 24.9' },
    { key: 'elevated', color: '#ffa726', range: '25 - 29.9' },
    { key: 'high', color: '#ef5350', range: '30 - 34.9' },
    { key: 'very_high', color: '#d32f2f', range: '35+' }
  ];

  return (
    <Box sx={{ mt: 4 }} role="region" aria-labelledby="bmi-chart-title">
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" gutterBottom id="bmi-chart-title">
          {t('results.bmi_chart.title')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('results.bmi_chart.description')}
        </Typography>
      </Box>
      <Box 
        sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}
        role="list"
        aria-label={t('results.bmi_chart.title')}
      >
        {categories.map((bmi, idx) => (
          <Box 
            key={idx}
            role="listitem"
            sx={{ 
              backgroundColor: bmi.color, 
              padding: '8px 12px', 
              borderRadius: 1, 
              color: '#fff', 
              minWidth: 100 
            }}
          >
            <Typography 
              variant="body2" 
              fontWeight="bold"
              component="div"
              aria-label={t(`results.bmi.${bmi.key}.label`, { defaultValue: bmi.key })}
            >
              {t(`results.bmi.${bmi.key}.label`, { defaultValue: bmi.key })}
            </Typography>
            <Typography 
              variant="caption"
              component="div"
            >
              {t(`results.bmi.${bmi.key}.range`, { defaultValue: bmi.range })}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
