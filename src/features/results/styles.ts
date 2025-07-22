export const GRID_LAYOUT = {
  display: 'grid',
  gap: 3,
  gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
  gridTemplateAreas: {
    xs: `"chart" "main" "sidebar"`,
    md: `"chart chart" "main sidebar"`
  },
  '& > *': { minWidth: 0 },
  alignItems: 'stretch'
};

export const LIST_ITEM_STYLES = {
  '& .MuiListItem-root': {
    px: 2,
    py: 1,
    bgcolor: '#fafafa',
    borderRadius: 1,
    mb: 1
  }
};

export const UNIT_TOGGLE_STYLES = {
  width: '100%',
  '& .MuiToggleButton-root': {
    flex: 1,
    textTransform: 'none',
    borderColor: 'primary.main',
    '&.Mui-selected': {
      bgcolor: 'primary.main',
      color: 'white',
      '&:hover': {
        bgcolor: 'primary.dark',
      },
    },
  }
};

export const PAPER_STYLES = {
  p: 3,
  borderRadius: 2,
  bgcolor: '#f8fafc'
};

export const MAIN_PAPER_STYLES = {
  ...PAPER_STYLES,
  bgcolor: '#ffffff',
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
};
