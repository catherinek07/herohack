import React from 'react'
import {Link } from "react-router-dom";
import CustomBtn from './CustomBtn'
import Button from 'react-bootstrap/Button'
import {Toolbar, Typography} from '@material-ui/core'
import {makeStyles} from "@material-ui/core/styles"; 

const styles = makeStyles({
    bar:{
        paddingTop: "1.15rem",
        paddingBottom: "1.15rem",
        backgroundColor: "#d3cfff",
        ['@media (max-width:780px)']: { 
           flexDirection: "column"
          }
    },
    menuItem: {
        cursor: "pointer", 
        flexGrow: 1,
        "&:hover": {
            color:  "#4f25c8"
        },
        ['@media (max-width:780px)']: { 
            paddingBottom: "1rem"    }
    }
    
})

function NavBar() {
    const classes = styles()
    return (
            <Toolbar position="sticky" color="rgba(0, 0, 0, 0.87)" className={classes.bar}>   
                <Typography variant="h6" className={classes.menuItem}>
                   <Link to="/About.js">
                        <Button variant="outline-primary">About</Button>{' '}
                    </Link>
                </Typography>
                <Typography variant="h6" className={classes.menuItem}>
                    Create
                </Typography>
<<<<<<< Updated upstream
                <CustomBtn txt="Log In"/>
=======
                <Typography variant="h6" className={classes.menuItem}>
                    Careers
                </Typography>
                <Typography variant="h6" className={classes.menuItem}>
                    Demos 
                </Typography>
                <Typography variant="h6" className={classes.menuItem}>
                    Contact Us 
                </Typography>
                <CustomBtn txt="Sign In"/>
>>>>>>> Stashed changes
            </Toolbar>
    )
}

export default NavBar
