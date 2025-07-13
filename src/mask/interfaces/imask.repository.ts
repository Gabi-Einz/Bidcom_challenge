export interface IMaskRepository<T> {
  create(data: Partial<T>): Promise<T>;
  findOneByIdAndUserId(id: number, userId: number): Promise<T | null>;
  findOneOriginUrl(link: string): Promise<Partial<T> | null>;
  updateRedirectAmountById(id: number, newAmount: number): Promise<void>;
  invalidate(id: number, valid: boolean): Promise<void>;
}
