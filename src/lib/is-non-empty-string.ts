import { isEmpty } from "~/lib/is-empty";

export const isNonEmptyString = (value: unknown): value is string => {
  return typeof value === "string" && !isEmpty(value);
};
