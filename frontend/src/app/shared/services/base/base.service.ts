import { environment } from '@env/environment';

export class BaseService {
  protected api = environment.apiUrl;
}
