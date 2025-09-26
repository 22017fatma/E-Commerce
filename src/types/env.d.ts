declare namespace Node.JS{
  export interface processENV{
    DB_HOSt?: string;
    DB_USER?: string;
    DB_PASSWORD?: string;
    DB_NAME?: string;
    NODE_ENV?: string;
    DB_DIALECT?: string;
    SALT_ROUNDS?: number;
  }
}