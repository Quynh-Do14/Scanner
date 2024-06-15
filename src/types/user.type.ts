export interface User {
  fullname: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  image: string;
  method?: "facebook" | "google" | "email" | "phone";
  id: string;
  phone?: string;
}
