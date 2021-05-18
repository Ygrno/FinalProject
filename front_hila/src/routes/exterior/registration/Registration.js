import RegisterForm from './RegisterForm';
import {Card, makeStyles} from "@material-ui/core";

const useStyle = makeStyles(theme => ({
    container: {
      display: 'flex',
        alignItems: 'center',
      flexDirection: 'column'
    },
    card: {
        padding: theme.spacing(2),
        width: '60%',
        minWidth: 500,
        backgroundColor: theme.palette.card
    }
}));

export const Registration = (props) => {
    const classes = useStyle();

    return (
        <div className={classes.container}>
            <h1>הרשמה </h1>
            <Card className={classes.card}>
                <RegisterForm startSession={props.startSession}/>
            </Card>
        </div>)
};


