import { Category } from "./category.model";

export class Product {

  id?: number;
  category_id?: number;
  category?: Category;
  code?: string;
  name?: string;
  description?: string;
  purchase_price?: number;
  sale_price?: number;

}
