import { File } from './file';
import { Tag } from './tag';

export interface Garment {
  id: string;
  title: string;
  description: string;
  price: string;
  wearingAmount: number;
  isFavorite: boolean;
  tags?: Tag[];
  picture?: File;
}
