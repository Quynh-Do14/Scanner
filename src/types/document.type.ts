export interface Document {
  createdAt?: Date;
  updatedAt?: Date;
  title?: string;
  content?: Array<string>;
  password?: string;
  images?: Array<string>;
}
