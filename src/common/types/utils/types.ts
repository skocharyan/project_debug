export type TAtLeastOneRequired<
  T,
  U = { [K in keyof T]: Pick<T, K> }
> = Partial<T> & U[keyof U];

export type TWithRequired<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;

export type TSize = {
  width: number;
  height: number;
};
