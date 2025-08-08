import {
  Exchanges,
  FanoutPublisher,
  type Buyer_Received_Review_Event,
} from "@fvoid/shared-lib";

export class BuyerReceivedReviewPublisher extends FanoutPublisher<Buyer_Received_Review_Event> {
  exchangeName: Exchanges.Buyer_Received_Review =
    Exchanges.Buyer_Received_Review;
}
