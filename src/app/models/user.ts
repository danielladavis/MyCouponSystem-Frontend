import { UserType } from '../enum/user-type.enum';
import { Company } from './company';

export class User {

    userID?: number;
    username: string;
    userClientType: UserType;
    userPassword: string;
    company?: Company;

}
