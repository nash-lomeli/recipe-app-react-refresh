import React from 'react'
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';

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