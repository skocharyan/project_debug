import { PayKickstartIPNEvent } from '../../gateways/paykickstart/common/enums';

export type TPayKickstartEventsHandleEventPayload = {
  affiliate_commission_amount: string;
  affiliate_commission_percent: string;
  affiliate_email: string;
  affiliate_first_name: string;
  affiliate_last_name: string;
  amount: number;
  billing_address_1: string;
  billing_address_2: string;
  billing_city: string;
  billing_country: string;
  billing_state: string;
  billing_zip: string;
  buyer_email: string;
  buyer_first_name: string;
  buyer_ip: string;
  buyer_last_name: string;
  buyer_tax_name: string;
  buyer_tax_number: string;
  campaign_id: string;
  campaign_name: string;
  coupon_code: string;
  coupon_rate: string;
  coupon_type: string;
  currency: string;
  event: PayKickstartIPNEvent;
  invoice_id: string;
  is_rebill: string;
  mode: string;
  payment_processor: string;
  product_id: string;
  product_name: string;
  ref_affiliate_commission_amount: string;
  ref_affiliate_commission_percent: string;
  ref_affiliate_email: string;
  ref_affiliate_first_name: string;
  ref_affiliate_last_name: string;
  shipping_address_1: string;
  shipping_address_2: string;
  shipping_city: string;
  shipping_country: string;
  shipping_state: string;
  shipping_zip: string;
  tax_amount: string;
  tax_percent: string;
  tax_transaction_id: string;
  tracking_id: string;
  transaction_id: string;
  transaction_time: number;
  vendor_email: string;
  vendor_first_name: string;
  vendor_last_name: string;
  licenses: string;
  hash: string;
  verification_code: string;
};

export type TPayKickstartProductsByTypesEventHandlersPayload = {
  eventPayload: TPayKickstartEventsHandleEventPayload;
  // systemProduct: Product;
  // systemPurchase: Purchase;
  companyId: number;
};

export type TPayKickstartEventsHandler = (data: {
  payload: TPayKickstartEventsHandleEventPayload;
}) => Promise<void>;
