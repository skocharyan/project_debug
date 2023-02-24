export interface ISDeepGramDeleteResponse {
  message: string;
}

export interface IDeepGramCreateResponse {
  api_key_id: string;
  key: string;
  comment: string;
  scopes: string[];
  tags: string[];
  created: string;
  expiration_date: string;
}

export interface IReturnKey {
  keyId: string;
  key: string;
}
