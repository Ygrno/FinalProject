import exteriorRoutes from './exterior';
import shellRoutes from './shell';
import { UserType } from '../constants';

export const getAllowedRoutes = (userSession) => {
    let user = null;
    let usertype = 0;
    !!userSession ? user = userSession.Data?.contact.contact_sub_type[0] : console.log("no user");
    if (!!userSession) {
        if (user == 'StaffMember')
            usertype = 3
    }
    else console.log(usertype);

    //const user = userSession.Data?.contact?.contact_sub_type[0];
    if (user == 'StaffMember') { usertype = 3 }

    return (
        !userSession ? exteriorRoutes :
            shellRoutes.filter(({ requierdUserTypes }) =>
                !requierdUserTypes?.length || requierdUserTypes.includes(usertype))
    );
};


//userSession.Data?.contact?.contact_sub_type[0]