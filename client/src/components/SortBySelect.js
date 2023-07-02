import { MenuItem, Select, Typography } from '@mui/material';
import { useGlobal } from 'hooks';
import HorizontalStack from './util/HorizontalStack';

const SortBySelect = ({ onSortBy, sortBy, sorts }) => {
  const { translate } = useGlobal();

  return (
    <HorizontalStack spacing={1}>
      <Typography
        color="text.secondary"
        variant="subtitle2"
        sx={{
          display: {
            xs: 'none',
            sm: 'block',
          },
        }}
      >
        {translate('sortBy')}:
      </Typography>
      <Select
        size="small"
        value={sorts[sortBy]}
        sx={{ minWidth: 150 }}
        onChange={onSortBy}
      >
        {Object.keys(sorts).map((sortName, i) => (
          <MenuItem value={sorts[sortName]} key={i}>
            {sorts[sortName]}
          </MenuItem>
        ))}
      </Select>
    </HorizontalStack>
  );
};

export default SortBySelect;
