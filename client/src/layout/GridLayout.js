import { Grid } from '@mui/material';

const GridLayout = (props) => {
  const { left, right } = props;

  return (
    <Grid container spacing={2}>
      <Grid item lg={9} xs={12} md={8}>
        {left}
      </Grid>
      <Grid
        item
        lg={3}
        md={4}
        sx={{ display: { xs: 'none', md: 'block' } }}
      >
        {right}
      </Grid>
    </Grid>
  );
};

export default GridLayout;
