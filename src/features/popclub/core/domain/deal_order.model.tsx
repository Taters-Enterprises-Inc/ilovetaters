export interface DealOrderModel {
  deals_redeems: {
    client_id: number;
    id: number;
    redeem_code: string;
    purchase_amount: string;
    dateadded: string;
    expiration: string;
    type_of_service: string;
    status: number;
  };
  client_info: {
    add_name: string;
    add_contact: string;
    add_address: string;
    email: string;
    payops: number;
    store_id: number;
    store_name: string;
    store_address: string;
    store_contact_number: string;
    store_email: string;
  };
  deal_order_items: [
    {
      id: number;
      redeems_id: number;
      deal_id: number;
      price: number;
      product_price: number;
      deal_item_with_flavor: string;
      quantity: number;
      name: string;
      product_image: string;
    }
  ];
}
