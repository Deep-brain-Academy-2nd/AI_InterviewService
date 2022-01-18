import RegisterForm from "../components/registerForm";
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        width: '100vw', 
        height: '100vh'
    }
}))

const register = () => {

    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <RegisterForm />
        </Box>
      
    )
  }
  
  export default register;