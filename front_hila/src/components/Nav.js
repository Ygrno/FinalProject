import {Link, NavLink} from "react-router-dom";
import {AppBar, IconButton, makeStyles, Toolbar, Box} from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {useHistory} from "react-router-dom";
import {message} from 'antd';
import {logout} from "../services/api-service";
import theme from "../theme/create-theme";

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

const logout_handler = async (session, endSession, onLogoutfinish) => {
    const userDetails = {
        email: session.Data?.contact?.email
    };
    const logoutResult = await logout(userDetails);
    console.log("logout details: ", userDetails);
    if (logoutResult.data["is_error"]) {
        message.error(logoutResult.data["is_error"]);
    } else {
        endSession();
        onLogoutfinish();
    }
};

export const Nav = ({userSession, endSession, routes}) => {
    const classes = useStyle();

    let history = useHistory();
    const onLogoutFinish = () => {
        history.push("/login");
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Box display='flex' flexDirection='row' alignItems='center'>
                    <img className={classes.icon} src="/images/appicon.png"/>
                </Box>
                <Box display='flex' flex={1}>
                    {
                        routes.map(({path, title}) => (
                            <NavLink key={path} to={path} className={classes.navLink}
                                     activeStyle={{
                                         fontWeight: "bold",
                                         color: theme.palette.secondary.main
                                     }}>
                                <span>{title}</span>
                            </NavLink>
                        ))
                    }
                </Box>
                <Box>
                    {!!userSession &&
                    <IconButton color='inherit'
                                onClick={() => logout_handler(userSession, endSession, onLogoutFinish)}><ExitToAppIcon/></IconButton>
                    }
                </Box>
            </Toolbar>
        </AppBar>
    );
};
