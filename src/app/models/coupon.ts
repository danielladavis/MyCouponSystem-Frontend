import { CategoryType } from '../enum/category-type.enum';
import { Company } from './company';
import { Image } from './image';

export class Coupon {

    couponID?: number;
    couponTitle: string;
    startDate: Date;
    endDate: Date;
    unitsInStock: number;
    categoryType: CategoryType;
    couponMessage: string;
    couponPrice: number;
    image?: Image;
    company?: Company;

}
