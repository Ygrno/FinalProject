import React from 'react';
import { Card, Box } from '@material-ui/core';
import { Form, ConfigProvider } from 'antd';


const Home = (props) => {

    const [form] = Form.useForm();
    const p = props;
    //console.log(p.userSession.Data?.contact?.display_name);

    return (
        <Box>
            <Card>
                <div>

                    {p.userSession ? <h1> שלום {p.userSession.Data?.contact?.display_name} </h1> : <h1>דף הבית</h1>}
                    <h4>  תוכנית  מִשֶׁלִי  הוקמה בשנת 2018 מתוך מטרה להעניק סיוע בפתרון בעיות ומענה לצרכים היומיומיים לחיילים הבודדים המשוחררים, כדי שיוכלו להשתלב בצורה טובה במציאות החדשה ולהצליח בבניית העתיד המקצועי, התעסוקתי והמשפחתי </h4>
                </div>
            </Card>
        </Box>

    );
};
export default Home;





/*
export const Home = (props) => (
    <Box>
        <Card>
            <div>
                <h1>אודות העמותה</h1>
                <h4>  תוכנית  מִשֶׁלִי  הוקמה בשנת 2018 מתוך מטרה להעניק סיוע בפתרון בעיות ומענה לצרכים היומיומיים לחיילים הבודדים המשוחררים, כדי שיוכלו להשתלב בצורה טובה במציאות החדשה ולהצליח בבניית העתיד המקצועי, התעסוקתי והמשפחתי </h4>
            </div>
        </Card>
    </Box>

);
*/