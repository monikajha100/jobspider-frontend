import makeStyles from '@mui/styles/makeStyles';
const useStyles = makeStyles(() => ({
    root: {
      width:'100%',
      height:'100vh',
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      fontFamily:'Ubantu',
    }, box:{
        width:600,
        height:'auto',
        border:'1px solid #2c3e50',
        borderRadius:5,
        padding:15
    }
  }));export {useStyles}