import {
  Exchanges,
  FanoutPublisher,
  type ReviewSeeded,
} from "@fvoid/shared-lib";

export class ReviewSeededPublisher extends FanoutPublisher<ReviewSeeded> {
  exchangeName: Exchanges.ReviewSeeded = Exchanges.ReviewSeeded;
}
