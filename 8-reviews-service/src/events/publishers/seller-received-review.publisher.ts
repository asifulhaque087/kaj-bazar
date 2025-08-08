import {
  Exchanges,
  FanoutPublisher,
  type Seller_Received_Review_Event,
} from "@fvoid/shared-lib";

export class SellerReceivedReviewPublisher extends FanoutPublisher<Seller_Received_Review_Event> {
  exchangeName: Exchanges.Seller_Received_Review =
    Exchanges.Seller_Received_Review;
}
