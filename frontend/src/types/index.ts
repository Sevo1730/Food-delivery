export interface MenuItem {
  _id: string;
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface BackendFood {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: { _id: string; categoryName: string } | string;
  available: boolean;
}

export interface BackendOrder {
  _id: string;
  user: { _id: string; email: string; phoneNumber?: string } | string;
  foodOrderItems: {
    food: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
  }[];
  totalPrice: number;
  deliveryAddress: string;
  status: "PENDING" | "DELIVERED" | "CANCELED";
  createdAt: string;
}

export interface AuthUser {
  id: string;
  email: string;
}
