import exteriorRoutes from './exterior';
import shellRoutes from './shell';
import {UserType} from '../constants';
import {getUserTypes} from "../utils/user.util";

const isUserPending = userTypes => userTypes.includes(UserType.Pending);

const isRouteAllowed = (route, userTypes) => !route.allowedUserTypes?.length || route.allowedUserTypes.some(x => userTypes.includes(x));

export const getAllowedRoutes = userSession => {
    const userTypes = getUserTypes(userSession);

    return !userTypes?.length || isUserPending(userTypes) ? exteriorRoutes :
        shellRoutes.filter(x => isRouteAllowed(x, userTypes));
};