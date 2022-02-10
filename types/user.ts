import { File } from './file';

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  avatar?: File;
}
