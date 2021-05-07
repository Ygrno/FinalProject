import exteriorRoutes from './exterior';
import shellRoutes from './shell';
import { UserType } from '../constants';

export const getAllowedRoutes = userSession => {
    const userType = !!userSession && userSession.Data?.contact.contact_sub_type[0];

    return !userType ? exteriorRoutes :
        shellRoutes.filter(({ requierdUserTypes }) =>
            !requierdUserTypes?.length || requierdUserTypes.includes(UserType[userType]));

};