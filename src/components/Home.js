import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import {Typography} from '@material-ui/core'; 
import NavBar from './NavBar'
import Grid from './Grid'
import Footer from './Footer'
import './Home.css';
//changes to imports 
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import SearchIcon from '@material-ui/icons/Search';
const theme = createMuiTheme({
  palette: {
    primary: {
      main:"#2e1667",
    },
    secondary: {
      main:"#c7d8ed",
    },
  },
  typography: {
    fontFamily: [
      'Source Sans Pro'
    ],
    h4: {
      fontWeight: 600,
      fontSize: 28,
      lineHeight: '2rem',
      },
    h5: {
      fontWeight: 100,
      lineHeight: '2rem',
    },
  },
});

const styles = makeStyles({
  wrapper: {
    width: "65%",
    margin: "auto",
    textAlign: "center"
  },
  bigSpace: {
    marginTop: "5rem"
  },
  littleSpace:{
    marginTop: "2.5rem",
  },
  grid:{
    display: "flex", 
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap", 
  },
})

function Home() {
  const classes = styles(); 

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <NavBar/>
        <div className={classes.wrapper}>
          <Typography variant="h4" className={classes.bigSpace} color="primary">
             iNFiniTe
          </Typography>
          <Typography variant="h5" className={classes.littleSpace} color="primary">
            Welcome to your endless resources of motivational quotes, iNFiniTe. Upload a motivational quote and buy, sell, and react to other motivational quotes!
          </Typography>
        </div>
        <div className={`${classes.grid} ${classes.bigSpace}`}>
          <Grid icon={<ShoppingCartIcon style={{fill: "#4360A6", height:"125", width:"125"}}/>}  title="Buy" btnTitle="Let's Go" />
          <Grid icon={<AttachMoneyIcon style={{fill: "#449A76", height:"125", width:"125"}}/>} title="Sell" btnTitle="Let's Go"/>
          <Grid icon={<SearchIcon style={{fill: "#D05B2D", height:"125", width:"125"}}/>}  title="Explore" btnTitle="Let's Go"/>
        </div>
        <div className={classes.bigSpace}>
          <Footer/>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default Home;
