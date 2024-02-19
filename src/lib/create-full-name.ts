import { isNonEmptyString } from "~/lib/is-non-empty-string";

export const createFullName = (
  firstName: string | null | undefined,
  lastName: string | null | undefined,
): string | null => {
  const fullName = [firstName ?? "", lastName ?? ""].join(" ");
  return isNonEmptyString(fullName) ? fullName : null;
};
