import {
  getCurrentSeller,
  getSellerById,
  getSellerByName,
} from "@/api/sellers/seller.service";
import {
  UseSellerByIdProps,
  UseSellerByNameProps,
} from "@/api/sellers/seller.types";
import { useQueryWithSideEffects } from "@/hooks/useQueryWithSideEffects";
import { useAuthStore } from "@/store/use-auth.store";
import { toast } from "sonner";



