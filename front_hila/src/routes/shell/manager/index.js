import { UserType } from '../../../constants';
import { Manager } from './Manager';

export default {
    path: "/manager",
    allowedUserTypes: [UserType.Admin, UserType.Administrators1],
    component: Manager,
    title: 'מנהל'
};

