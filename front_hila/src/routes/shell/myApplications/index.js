import {MyApplications} from './MyApplications';
import { UserType } from '../../../constants';

export default {
    path: "/myApplications",
    allowedUserTypes: [UserType.Soldier, UserType.Volunteer, UserType.Admin],
    component: MyApplications,
    title: 'הפניות שלי'
};


