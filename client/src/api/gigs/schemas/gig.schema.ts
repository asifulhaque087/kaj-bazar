export interface Gig {
  id: number;
  sellerId: number;
  username: string;
  email: string;
  profilePicture: string | null;
  title: string;
  description: string;
  basicTitle: string;
  basicDescription: string;
  category: string;
  subCategories: string[];
  tags: string[] | null;
  active: boolean;
  expectedDelivery: string;
  ratingsCount: number;
  ratingSum: number;
  ratingCategories: {
    five: { star: number; count: number };
    four: { star: number; count: number };
    three: { star: number; count: number };
    two: { star: number; count: number };
    one: { star: number; count: number };
  };
  price: number;
  sortId: number | null;
  coverImage: string;
  createdAt: Date;
}
