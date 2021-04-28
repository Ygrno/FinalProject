import exteriorRoutes from './exterior';
import shellRoutes from './shell';

export const getAllowedRoutes = (userSession) => {
    !!userSession ? console.log(userSession.Data?.contact.contact_type) : console.log("no user");
    return (
        !userSession ? exteriorRoutes :
            shellRoutes.filter(({ requierdUserTypes }) =>
                !requierdUserTypes?.length || requierdUserTypes.includes(userSession.Data?.contact?.contact_type))
    );
};


