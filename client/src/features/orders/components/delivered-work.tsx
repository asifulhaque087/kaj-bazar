import { Button } from "@/components/ui/button";
import ActivityCard from "@/features/orders/components/activity-card";
import { useApproveDelivery } from "@/features/orders/mutations/use-approve-delivery.mutation";
import { Order } from "@/schemas";
import { Package } from "lucide-react";

interface DeliveredWorkProps {
  order: Order;
  isBuyer: boolean;
}

const DeliveredWorkComponent = ({ order, isBuyer }: DeliveredWorkProps) => {
  const { mutate: approveDeliver } = useApproveDelivery();

  if (!order.deliveredWorks) return null;

  const lastDelivery = order.deliveredWorks[order.deliveredWorks.length - 1];

  return (
    <div className="space-y-6">
      <ActivityCard
        icon={<Package className="text-green-500" />}
        title="Order Delivered"
        // timestamp={lastDelivery.deliveredAt}
        timestamp={order?.orderDeliveredAt!}
        description={
          isBuyer
            ? `${order.seller.username} has delivered the work.`
            : `You have delivered the order.`
        }
      >
        <div className="mt-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
          {lastDelivery.file && (
            <p className="text-sm mb-2 font-medium">
              File:{" "}
              <a
                href={lastDelivery.file}
                className="text-blue-500 hover:underline"
              >
                Download
              </a>
            </p>
          )}
          {lastDelivery.message && (
            <p className="text-sm italic text-gray-600 dark:text-gray-300">
              "{lastDelivery.message}"
            </p>
          )}
        </div>

        {!order.accepted && (
          <div className="mt-4 p-4 border-t border-dashed border-gray-300 dark:border-gray-600">
            {isBuyer ? (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                    Ready to Approve?
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    If you're happy with the delivery, you can approve it to
                    complete the order.
                  </p>
                </div>
                <Button
                  onClick={() => approveDeliver(order.id)}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold"
                >
                  Yes, Approve Delivery
                </Button>
              </div>
            ) : (
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                Waiting for buyer approval...
              </h3>
            )}
          </div>
        )}
      </ActivityCard>
    </div>
  );
};

export default DeliveredWorkComponent;
