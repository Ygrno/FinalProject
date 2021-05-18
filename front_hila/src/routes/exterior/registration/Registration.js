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
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center'
    }
}));

export const Registration = (props) => {
    const classes = useStyle();

    return (
        <div className={classes.container}>
            <Card className={classes.card}>
                <h1 className={classes.title}>הרשמה </h1>
                <RegisterForm startSession={props.startSession}/>
            </Card>
        </div>)
};


