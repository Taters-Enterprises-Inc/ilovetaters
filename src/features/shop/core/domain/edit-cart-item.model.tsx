export interface EditCartItemModel {
  quantity: number;
  currentFlavor: number | undefined;
  currentSize: number | undefined;
  product_id:string | undefined
  sizeName:string,
  flavorName:string,
  total_amount:number | undefined
  prod_multiflavors:string | undefined
}
