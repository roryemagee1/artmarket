export interface IProduct {
  product: {
      _id: string;
      name: string;
      image: string;
      description: string;
      brand: string;
      category: string;
      price: number;
      countInStock: number;
      rating: number;
      numReviews: number;

      reviews?: [];
      createdAt?: string;
      updatedAt?: string;
      user?: string;
      __v?: number;
    }
  }

  export interface IProductKeys {
    _id: string;
    name: string;
    image: string;
    description: string;
    brand: string;
    category: string;
    price: number;
    countInStock: number;
    rating: number;
    numReviews: number;
    reviews?: [];
    createdAt?: string;
    updatedAt?: string;
    user?: string;
    __v?: number;
  }

  export interface IItemKeys extends IProductKeys {
    qty: number;
    reviews: [];
    user: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    product?: string;
  }

  export interface IItem {
    data: {
      qty: number;
      reviews: [];
      user: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
      _id: string;
      name: string;
      image: string;
      description: string;
      brand: string;
      category: string;
      price: number;
      countInStock: number;
      rating: number;
      numReviews: number;
    }
  }

  export interface IShippingAddress {
    address: string;
    city: string;
    country: string;
    postalCode: string;
  }

  export interface IUserKeys {
    name: string;
    email?: string;
    _id?: string;
    isAdmin?: boolean;
    password?: string;
  }

  export interface IUser {
    data: IUserKeys
  }

  export interface IOrderKeys {
    createdAt: string;
    isDelivered: boolean;
    isPaid: boolean;
    itemsPrice: number;
    orderItems: IItemKeys;
    paidAt?: string;
    deliveredAt?: string;
    paymentMethod: string;
    shippingAddress: IShippingAddress;
    shppingPrice: number;
    taxPrice: number;
    totalPrice: number;
    updatedAt: string;
    user: IUserKeys;
    __v: number;
    _id: string;
  }

  export interface IReviewKeys {
    _id: string;
    name: string;
    rating: number;
    comment: string;
    
    createdAt: string;
  }