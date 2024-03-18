import { Tooltip, TooltipProps } from "@tracktor/design-system";
import { ReactNode } from "react";

type ExtendedTooltipProps = TooltipProps & {
  children: ReactNode;
  parentRef?: string;
};

/**
 * ControlledTooltip is a component to display a tooltip when a field is required or parentRef is empty. All TooltipProps are available
 * @param children
 * @param parentRef
 * @constructor
 */
const ControlledTooltip = ({ children, parentRef }: ExtendedTooltipProps) => (
  <Tooltip title={`${parentRef} must be completed`}>{children}</Tooltip>
);
export default ControlledTooltip;
