import { Staff } from './Staff';
import { UserType } from '../../../constants';

export default {
    path: "/staff",
    requierdUserTypes: [UserType.StaffMemeber, UserType.Admin],
    component: Staff,
    title: 'אנשי צוות'
};

