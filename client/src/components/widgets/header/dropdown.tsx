import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";

interface CustomDropdownProps {
  trigger: ReactNode;
  content: ReactNode;
  align?: DropdownMenuContentProps["align"];
  contentClassName?: string;
  triggerClassName?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const CustomDropdown = (props: CustomDropdownProps) => {
  const {
    trigger,
    content,
    align = "start",
    contentClassName,
    triggerClassName,
    onOpenChange,
  } = props;

  return (
    <DropdownMenu onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild className={triggerClassName}>
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent className={contentClassName} align={align}>
        {content}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CustomDropdown;
