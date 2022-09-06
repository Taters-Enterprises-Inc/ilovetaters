export interface EditCartItemModel {
  quantity: number;
  currentFlavor: number;
  currentSize: number;
  product_id:string | undefined
  sizeName:string,
  flavorName:string,
  total_amount:number | undefined

}
