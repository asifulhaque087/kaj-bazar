import { Auth } from "@/schemas";

export interface UseBuyerByNameProps {
  username: string;
  isBuyer: boolean;
  authUser: Auth | null;
}
export interface UseBuyerByIdProps {
  id: string;
}
