import { isURL } from 'class-validator';
import { promises as dns } from 'dns';

export class UrlService {
  isValidFormat = (url: string): boolean => {
    return isURL(url, { require_protocol: true });
  };

  async isValidDomain(url: string): Promise<boolean> {
    try {
      const { hostname } = new URL(url);
      await dns.lookup(hostname);
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  }
}
