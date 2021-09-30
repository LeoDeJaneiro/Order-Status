export class Order {
  orderNo: string;
  tracking_number: string;
  courier: string;
  zip_code: string;
  city: string;
  destination_country_iso3: string;
  email: string;
  articleNo: string;
  articleImageUrl: string;
  quantity: number;
  product_name: string;
}

export class Checkpoint {
  tracking_number: string;
  location: string;
  timestamp: string;
  status: string;
  status_text: string;
  status_details: string;
}
