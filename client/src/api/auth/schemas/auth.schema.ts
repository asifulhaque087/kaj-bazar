export interface Auth {
  username: string;
  email: string;
  profilePublicId: `${string}-${string}-${string}-${string}-${string}`;
  country: string | null;
  // browserName: string;
  // deviceType: "desktop" | "mobile" | "tablet";
  profilePicture: string;
  // emailVerificationToken: string;
  emailVerified: boolean;
}
