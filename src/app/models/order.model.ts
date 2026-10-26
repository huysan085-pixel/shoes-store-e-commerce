export type PaymentMethod = 'cod' | 'aba' | 'card';

export const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  cod: 'Cash on Delivery',
  aba: 'ABA PayWay (demo)',
  card: 'Credit or Debit Card (demo)',
};

export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

export interface OrderItem {
  productId: number;
  name: string;
  brand: string;
  sku: string;
  image: string;
  size: string;
  color: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface Order {
  id: string;
  invoiceNumber: string;
  createdAt: string;
  customer: CustomerInfo;
  paymentMethod: PaymentMethod;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  promoCode: string | null;
  total: number;
  status: string;
}
