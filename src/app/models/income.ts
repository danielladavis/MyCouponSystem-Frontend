import { IncomeDescription } from '../enum/income-description.enum';
import { Company } from './company';

export class Income {

    incomeID?: number;
    operatingName: string;
    executionDate: Date;
    incomeDescription: IncomeDescription;
    incomePrice: number;
    company?: Company;

}
