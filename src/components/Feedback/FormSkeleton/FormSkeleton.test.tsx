import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import FormSkeleton from "@/components/Feedback/FormSkeleton/FormSkeleton";

test("should have role and attribute", () => {
  const { getByRole } = render(<FormSkeleton />);
  const container = getByRole("alert");

  expect(container).toBeDefined();
  expect(container).toHaveAttribute("aria-busy", "true");
});
