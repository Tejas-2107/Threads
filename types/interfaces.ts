export interface Product {
    title: string;
    category: string;
    price: number;
    stock: number;
    color: string;
    size: string;
    description: string;
    date?: Date;
}
export interface User {
    username: string;
    email: string;
    password: string;
    phone: string;
    isAdmin?: boolean;
    isActive?: boolean;
    address: string;
    date?: Date; 
  }

  export interface UserResponse{
    username: string;
    email: string;
    isAdmin: boolean;
    _id: string;
    date: Date; 
  }
  
