import {difference} from 'lodash';
import exteriorRoutes from './exterior';
import shellRoutes from './shell';
import {UserType} from '../constants';
import {getUserTypes} from "../utils/user.util";

const isUserPending = userTypes => userTypes.includes(UserType.Pending);

const isRouteAllowed = (route, userTypes) => !route.requierdUserTypes?.length || difference(route.requierdUserTypes, userTypes);

export const getAllowedRoutes = userSession => {
    const userTypes = getUserTypes(userSession);

    return !userTypes?.length || isUserPending(userTypes) ? exteriorRoutes :
        shellRoutes.filter(x => isRouteAllowed(x, userTypes));
};