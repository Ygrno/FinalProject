import {UserType} from "../constants";

export const isUserPending = userSession => getUserTypes(userSession).includes(UserType.Pending);

export const getUserTypes = userSession => !!userSession && userSession.Data?.contact.contact_sub_type.map(x => UserType[x]);