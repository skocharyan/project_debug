export enum Role {
  superAdmin = 'SUPER_ADMIN',
  admin = 'ADMIN',
  corporate = 'CORPORATE',
  incorporate = 'INCORPORATE',
  support = 'SUPPORT',
  senior = 'SENIOR'
}

export type Identity = {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  role?: Role;
};

export enum AccountStatus {
  pending = 'PENDING',
  active = 'ACTIVE',
  banned = 'BANNED'
}
