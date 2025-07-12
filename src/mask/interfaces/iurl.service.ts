export interface IUrlService {
  isValidFormat(url: string): boolean;
  isValidDomain(url: string): Promise<boolean>;
}
