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
  }

  export interface IItemKeys extends IProductKeys {
    qty: number;
    reviews: [];
    user: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
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