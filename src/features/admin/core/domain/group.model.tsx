export interface GroupModel {
  shop: Array<{
    shop: any;
    id: number;
    name: string;
    description: string;
  }>;
  stock_order: Array<{
    id: number;
    name: string;
    description: string;
  }>;
  sales: Array<{
    id: number;
    name: string;
    description: string;
  }>;
}
