import { UserType } from '../../../constants';
import { Manager } from './Manager';

export default {
    path: "/manager",
    allowedUserTypes: [UserType.Admin, UserType.StaffMember],
    component: Manager,
    title: 'מנהל'
};

