import { UserType } from '../enum/user-type.enum';

export class UserLogin {

    userName: string;
    userPassword?: string;
    clientType?: UserType;
    token?: string;

}
