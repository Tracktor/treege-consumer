import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import FormSkeleton from "@/components/Feedback/FormSkeleton/FormSkeleton";

it("should have role and attribute", () => {
  const { getByRole } = render(<FormSkeleton />);
  const container = getByRole("alert");

  expect(container).toBeDefined();
  expect(container).toHaveAttribute("aria-busy", "true");
});
