export enum Role {
  Buyer = "Buyer",
  Seller = "Seller",
}

export class User {
  id: string;
  fullname: string;
  email: string;
  password: string;
}
