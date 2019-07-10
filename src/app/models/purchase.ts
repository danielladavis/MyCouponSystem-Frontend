import { Coupon } from './coupon';
import { User } from './user';

export class Purchase {

    purchaseID?: number;
    purchaseDate?: Date;
    purchaseAmount: number;
    coupon?: Coupon;
    user?: User;

}
