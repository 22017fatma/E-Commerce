export {};
declare namespace Node.JS {
  export interface processENV {
    DB_HOSt?: string;
    DB_USER?: string;
    DB_PASSWORD?: string;
    DB_NAME?: string;
    NODE_ENV?: string;
    DB_DIALECT?: string;
    SALT_ROUNDS?: number;
    JWT_SECRET_ACCESS?: string;
    JWT_SECRE_REFRESH?: string;
  }
}

declare global {
  namespace Express {
    interface Locals {
      user: {
        id: string;
        email: string;
        role: string;
        created_at: string;
        updated_at: string;
      };
    }
  }
  interface ProductFilters {
    name?: string;
    price?: number; 
    minPrice?: number; 
    maxPrice?: number; 
    stock?: number;
  }
}
