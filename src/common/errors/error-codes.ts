import { Enum, EnumType } from 'ts-jenum';

@Enum<ErrorCode>('code')
export class ErrorCode extends EnumType<ErrorCode>() {
  private constructor(readonly code: string, readonly description: string) {
    super();
  }

  // 400

  static readonly ERR400_1 = new ErrorCode(
    'ERR400_1',
    'mail: invalid email or subject'
  );

  static readonly ERR400_2 = new ErrorCode(
    'ERR400_2',
    'wallet-manager: Transfer error'
  );

  static readonly ERR400_3 = new ErrorCode(
    'ERR400_3',
    'wallet-manager: Error to fetch balance'
  );

  static readonly ERR400_4 = new ErrorCode(
    'ERR400_4',
    'company: You have reached your limit'
  );

  //404
  static readonly ERR404_1 = new ErrorCode(
    'ERR404_1',
    'auth-horus-api: user not found'
  );

  static readonly ERR404_2 = new ErrorCode(
    'ERR404_2',
    'auth-horus-api: user is not active'
  );

  static readonly ERR404_3 = new ErrorCode(
    'ERR404_3',
    'bank-account-horus-api: bank account not found'
  );

  static readonly ERR404_4 = new ErrorCode(
    'ERR404_4',
    'request-payment-horus-api: Request payment'
  );

  static readonly ERR404_5 = new ErrorCode(
    'ERR404_5',
    'wallet-horus-api: Request payment'
  );

  static readonly ERR404_6 = new ErrorCode(
    'ERR404_6',
    'admin-wallet: Not found'
  );

  static readonly ERR404_7 = new ErrorCode('ERR404_7', 'token: Not found');

  //403
  static readonly ERR403_1 = new ErrorCode(
    'ERR403_1',
    'quote-horus-api: Quote has been expired'
  );

  static readonly ERR403_2 = new ErrorCode(
    'ERR403_2',
    'general: Account has been blocked by admin'
  );

  //409
  static readonly ERR409_1 = new ErrorCode(
    'ERR409_1',
    `user-api: user already exists`
  );

  //422
  static readonly ERR422_1 = new ErrorCode(
    'ERR422_1',
    `quote-api: quote already approved`
  );

  static readonly ERR422_2 = new ErrorCode(
    'ERR422_2',
    `auth-api: otp code not valid`
  );

  static readonly ERR422_3 = new ErrorCode(
    'ERR422_3',
    `wallet-manager: unsupported currency`
  );

  static readonly ERR422_4 = new ErrorCode(
    'ERR422_4',
    `withdraw-api: You can't send to this user`
  );

  //423
  static readonly ERR423_1 = new ErrorCode(
    'ERR423_1',
    `common: please try later`
  );

  //423
  static readonly ERR500_1 = new ErrorCode(
    'ERR500_1',
    `common: something went wrong`
  );
}
