import React from 'react'
import Tooltip from '@mui/material/Tooltip';
import { makeStyles } from 'tss-react/mui';

const useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
      color: theme.palette.common.black,
    },
    tooltip: {
      backgroundColor: theme.palette.common.black,
    },
  }));

export  function BlackTooltip(props) {
    const classes = useStylesBootstrap();
  
    return <Tooltip  disableFocusListener arrow classes={classes} {...props} />;
  }
// export default BlackTooltip