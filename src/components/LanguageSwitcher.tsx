import { Box, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const handleChange = (event: any) => {
    const newLang = event.target.value;
    i18n.changeLanguage(newLang);
  };

  return (
    <Box display="flex" justifyContent="flex-end" mb={2} sx={{ px: 2 }}>
      <FormControl size="small">
        <InputLabel id="language-select-label">Language</InputLabel>
        <Select
          labelId="language-select-label"
          id="language-select"
          value={i18n.language}
          onChange={handleChange}
          label="Language"
        >
          <MenuItem value="en">{t('language.en')}</MenuItem>
          <MenuItem value="bn">{t('language.bn')}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
