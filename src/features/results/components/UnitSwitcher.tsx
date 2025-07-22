import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function UnitSwitcher() {
  const { t } = useTranslation();
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');

  return (
    <>
      <Typography variant="subtitle1" gutterBottom>
        {t('results.unit_toggle')}
      </Typography>
      <ToggleButtonGroup
        value={unit}
        exclusive
        onChange={(_, newUnit) => newUnit && setUnit(newUnit)}
        aria-label="unit switch"
      >
        <ToggleButton value="metric" aria-label="metric unit">
          {t('results.unit_metric')}
        </ToggleButton>
        <ToggleButton value="imperial" aria-label="imperial unit">
          {t('results.unit_imperial')}
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}