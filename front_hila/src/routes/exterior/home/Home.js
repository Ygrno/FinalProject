import React from 'react';
import {Card, Box, makeStyles, Toolbar} from '@material-ui/core';
import {Form, ConfigProvider} from 'antd';
import {withRouter} from "react-router";


const useStyle = makeStyles(theme => ({
    container: {
        margin: theme.spacing(4),
        padding: theme.spacing(4),
        backgroundColor: '#e5eded',
        fontSize: 18,
        fontWeights: 'bold'

    },
    card: {
        padding: theme.spacing(4),
        marginInline: theme.spacing(4),
        backgroundColor: '#e5eded',
        margin: theme.spacing(2)
    },
    container2: {
        fontSize: 20,
        display: 'flex'
    },
    image: {
        height: '200px',
        display: 'block',
        borderColor: 'white',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 8,
        opacity: 1,
        margin: theme.spacing(2),
        shadows: '10'

        // marginInlineStart: '40px',
        //marginInlineEnd: '40px'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'inherit'
    }
}));

const Home = ({userSession}) => {
    const [form] = Form.useForm();
    const classes = useStyle();
    const getMessageByUser = () => {
        if (!userSession)
            return 'שלום אורח';
        if (userSession.Data?.contact?.contact_sub_type.includes("Pending"))
            return `${userSession.Data?.contact?.display_name}, הינך בתהליך אישור הרשמה.  \n בימים הקורבים תישלח אליך הודעת מייל עם שאר הפרטים `

        return `שלום ${userSession.Data?.contact?.display_name}`;
    }

    return (
        <Box>
            <Card className={classes.container}>
                <div>
                    <span className={classes.title}>{getMessageByUser()}</span>
                </div>
                <div>
                    <h4>תוכנית מִשֶׁלִי הוקמה בשנת 2018 מתוך מטרה להעניק סיוע בפתרון בעיות ומענה לצרכים היומיומיים
                        לחיילים הבודדים המשוחררים, כדי שיוכלו להשתלב בצורה טובה במציאות החדשה ולהצליח בבניית העתיד
                        המקצועי, התעסוקתי והמשפחתי. </h4>
                </div>
            </Card>
            <Box className={classes.container2}>
                <Card flex={1} className={classes.card}>
                    <span className={classes.title}>תחומי פעילות העמותה: </span>
                    <li> ריהוט לבית</li>
                    <li> עזרה בלימודים והכוונה</li>
                    <li>עזרה נפשית והכוונה לגורמים המקצועיים</li>
                    <li>מיצוי זכויות למול משרדי הממשלה</li>
                    <li>עזרה ומציאת מקום מגורים</li>
                    <li>חלוקת סלי מזון</li>
                    <li>אירועים חברתיים לקהילת החיילים הבודדים המשוחררים</li>
                </Card>
                <Box display='flex' flexDirection='column' >
                    <Box display='flex' >
                        <img className={classes.image} src='/images/groceriesPackage.png'/>
                        <img className={classes.image} src='/images/lonelySoldiers.png'/>
                    </Box>
                    <Box display='flex' justifyContent='center'>
                        <img className={classes.image} src='/images/goodPeopleForSoldiers.png'/>
                    </Box>
                </Box>
            </Box>

        </Box>

    );
};
export default withRouter(Home);

