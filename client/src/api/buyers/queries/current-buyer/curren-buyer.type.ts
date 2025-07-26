export interface Buyer {
  username: string;
  email: string;
  profilePublicId: `${string}-${string}-${string}-${string}-${string}`;
  country: string | null;
  profilePicture: string;
  isSeller: boolean;
}
