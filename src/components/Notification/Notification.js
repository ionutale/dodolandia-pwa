import React from 'react';
import MainContextApi from '../../context/MainContextApi';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  error: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));


export default function Notification() {
  const { error, removeError } = MainContextApi();

  const classes = useStyles();

  const handleSubmit = () => {
    removeError();
  };

  const displayAlert = () => {
    console.log('display error', error)
    if (error === null || error === undefined ) return null
    return (
    <Alert onClose={handleSubmit} className={classes.error} severity={error.severity}>
        <AlertTitle>Alert - {error.code}</AlertTitle>
        {error.message}
    </Alert>
    )
  }

  return (
    <React.Fragment>
      {displayAlert()}
    </React.Fragment>
  )
}