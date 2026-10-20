export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'

export interface OrderItem {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    quantity: number
}

export interface ShippingAddress {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string
}

export interface PaymentInfo
{
    cardNumber: string;
    cardHolder: string;
    expiry: string;
    cvv: string
}

export interface Order {
    id: string;
    items: OrderItem[];
    shipping: ShippingAddress;
    payment: {
        last4: string;
        cardHolder: string
    };
    subtotal: number;
    shipping_cost: number;
    tax: number;
    total: number;
    status: OrderStatus;
    createdAt: string
}