import React from 'react';
import {Card, Box, makeStyles} from '@material-ui/core';
import { Form, ConfigProvider } from 'antd';
import { withRouter } from "react-router";


const useStyle = makeStyles(theme => ({
    container: {
        margin: theme.spacing(4),
        padding: theme.spacing(4),
        backgroundColor: '#e5eded',
        fontSize: 18
    }
}));

const Home = ({ userSession }) => {
    const [form] = Form.useForm();
    const classes = useStyle();
    const getMessageByUser = () => {
        if (!userSession)
            return 'שלום אורח';
        if (userSession.Data?.contact?.contact_sub_type.includes("Pending"))
            return 'משתמש יקר, הינך בתהליך אישור הרשמה. בימים הקורבים תישלח אליך הודעת מייל עם שאר הפרטים.';

        return `שלום ${userSession.Data?.contact?.display_name}`;
    }

    return (
        <Box>
            <Card className={classes.container}>
                <div>
                    <h2>{getMessageByUser()}</h2>
                </div>
                <div>
                    <h4>תוכנית  מִשֶׁלִי  הוקמה בשנת 2018 מתוך מטרה להעניק סיוע בפתרון בעיות ומענה לצרכים היומיומיים לחיילים הבודדים המשוחררים, כדי שיוכלו להשתלב בצורה טובה במציאות החדשה ולהצליח בבניית העתיד המקצועי, התעסוקתי והמשפחתי </h4>
                </div>
            </Card>
        </Box>

    );
};
export default withRouter(Home);

