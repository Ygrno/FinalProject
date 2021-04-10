import exteriorRoutes from './exterior';
import shellRoutes from './shell';

export const getAllowedRoutes = user => {
    debugger;

    return !user ? exteriorRoutes :
        shellRoutes.filter(({ requierdUserTypes }) =>
            !requierdUserTypes?.length || requierdUserTypes.includes(user.userType));
}