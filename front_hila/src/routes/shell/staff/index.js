import { Staff } from './Staff';
import { UserType } from '../../../constants';

export default {
    path: "/staff",
    requierdUserTypes: [UserType.StaffMember, UserType.Admin],
    component: Staff,
    title: 'אנשי צוות'
};
