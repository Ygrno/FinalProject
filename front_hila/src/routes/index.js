import exteriorRoutes from './exterior';
import shellRoutes from './shell';
import {getUserTypes, isUserPending} from "../utils/user.util";

const isRouteAllowed = (route, userTypes) => !route.allowedUserTypes?.length || route.allowedUserTypes.some(x => userTypes.includes(x));

export const getAllowedRoutes = userSession => {
    const userTypes = getUserTypes(userSession);

    return !userTypes?.length || isUserPending(userSession) ? exteriorRoutes :
        shellRoutes.filter(x => isRouteAllowed(x, userTypes));
};