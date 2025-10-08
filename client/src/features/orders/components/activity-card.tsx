import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ActivityCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  timestamp?: string;
  action?: React.ReactNode;
  children?: React.ReactNode;
}

const ActivityCard = ({
  icon,
  title,
  description,
  timestamp,
  action,
  children,
}: ActivityCardProps) => {
  const formattedTime = timestamp ? new Date(timestamp).toLocaleString() : "";
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
          {icon}
        </div>
        <div>
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
            {description}
          </CardDescription>
        </div>
        {timestamp && (
          <div className="ml-auto text-sm text-gray-400 dark:text-gray-500 flex-shrink-0">
            {formattedTime}
          </div>
        )}
      </CardHeader>
      {children && <CardContent>{children}</CardContent>}
      {action && <CardFooter>{action}</CardFooter>}
    </Card>
  );
};

export default ActivityCard;
