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
}

const CustomDropdown = (props: CustomDropdownProps) => {
  const {
    trigger,
    content,
    align = "start",
    contentClassName,
    triggerClassName,
  } = props;

  return (
    <DropdownMenu>
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
