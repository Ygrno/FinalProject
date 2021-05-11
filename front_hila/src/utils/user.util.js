import {UserType} from "../constants";

export const getUserTypes = userSession => !!userSession && userSession.Data?.contact.contact_sub_type.map(x => UserType[x]);