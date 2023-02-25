import { StatusType } from './license-status.type';

export interface ICreateLicenseInput {
  key: string;
  status: StatusType;
}
