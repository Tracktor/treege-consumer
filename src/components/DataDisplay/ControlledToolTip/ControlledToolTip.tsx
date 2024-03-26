import { Tooltip, TooltipProps } from "@tracktor/design-system";
import { ReactNode } from "react";

type ExtendedTooltipProps = TooltipProps & {
  children: ReactNode;
  parentRef?: string;
  disabled?: boolean;
};

/**
 * ControlledTooltip is a component to display a tooltip when a field is required or parentRef is empty. All TooltipProps are available
 * @param children
 * @param parentRef
 * @param disabled
 * @constructor
 */
const ControlledTooltip = ({ children, parentRef, disabled }: ExtendedTooltipProps) => (
  <Tooltip title={disabled && `${parentRef} must be completed`}>{children}</Tooltip>
);
export default ControlledTooltip;
