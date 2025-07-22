import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function ActionButtons({ navigate }: { navigate: any }) {
  const { t } = useTranslation();
  return (
    <Box mt={4} display="flex" justifyContent="space-between">
      <Button variant="outlined" color="primary" onClick={() => navigate('/')}> 
        {t('buttons.retest')}
      </Button>
      <Button variant="contained" color="primary">
        {t('buttons.next')}
      </Button>
    </Box>
  );
}
