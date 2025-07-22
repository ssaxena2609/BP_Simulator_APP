import { List, ListItem, ListItemText } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { LIST_ITEM_STYLES } from '../styles';
import { BPCategory } from '../types';

interface RecommendationListProps {
  items: string[];
  category: BPCategory;
  type: 'lifestyle' | 'medical';
  'aria-label': string;
}

export const RecommendationList = ({ items, category, type, 'aria-label': ariaLabel }: RecommendationListProps) => {
  const { t } = useTranslation();

  return (
    <List aria-label={ariaLabel} sx={LIST_ITEM_STYLES}>
      {items.map((item, idx) => (
        <ListItem key={idx}>
          <ListItemText 
            primary={t(`results.categories.${category}.${type}.${idx}`, { defaultValue: item })} 
          />
        </ListItem>
      ))}
    </List>
  );
};

export default RecommendationList;
