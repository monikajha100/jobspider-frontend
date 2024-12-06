// CompanyCss.js
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
    padding: '20px',
  },
  box: {
    width: '100%',
    maxWidth: '800px',
    padding: '30px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  titleLeft: {
    display: 'flex',
    flexDirection: 'column',
  },
  titleLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  
  
  textField: {
    marginBottom: '10px',
  },
});

// To use in your component, import { useStyles } and apply the classes
