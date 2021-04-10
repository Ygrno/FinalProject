import { Link } from "react-router-dom";
import { AppBar, IconButton, makeStyles, Toolbar, Box } from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyle = makeStyles(theme => ({
    navLink: {
        textDecoration: 'none',
        color: 'inherit',
        margin: theme.spacing(2),
        fontSize: 20
    },
    icon: {
        height: 100,
        width: 100
    }
}));

export const Nav = ({ routes }) => {
    const logout = () => { alert('logout') };
    const classes = useStyle();

    return (
        <AppBar position="static">
            <Toolbar>
                <Box display='flex' flexDirection='row' alignItems='center'>
                    <img className={classes.icon} src="/images/appicon.png" />
                </Box>
                <Box display='flex' flex={1}>
                    {
                        routes.map(({ path, title }) => (
                            <Link key={path} to={path} className={classes.navLink}>
                                <span>{title}</span>
                            </Link>
                        ))
                    }
                </Box>
                <Box>
                    <IconButton color='inherit' onClick={logout}><ExitToAppIcon /></IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};
