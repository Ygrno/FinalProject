import { Link } from "react-router-dom";
import { AppBar, IconButton, makeStyles, Toolbar, Box } from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from "react-router-dom";
import { Form, Input, Upload, message, InputNumber, Menu, ConfigProvider, Select, Space, Avatar } from 'antd';
import { logout } from "../services/api-service";


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

export const Nav = (props) => {
    //const logout = () => { alert('logout') };
    const classes = useStyle();

    let history = useHistory();
    const onLogoutFinish = () => {
        history.push("/login");
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Box display='flex' flexDirection='row' alignItems='center'>
                    <img className={classes.icon} src="/images/appicon.png" />
                </Box>
                <Box display='flex' flex={1}>
                    {
                        props.routes.map(({ path, title }) => (
                            <Link key={path} to={path} className={classes.navLink}>
                                <span>{title}</span>
                            </Link>
                        ))
                    }
                </Box>
                <Box>
                    <IconButton color='inherit' onClick={() => logout_handler(props.userSession, props.endSession, onLogoutFinish)}><ExitToAppIcon /></IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};
