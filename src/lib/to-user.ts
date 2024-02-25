import type { useUser, currentUser } from "@clerk/nextjs";
import { createFullName } from "~/lib/create-full-name";
import { isNonEmptyString } from "~/lib/is-non-empty-string";
import type { NotUndefinedOrNull } from "~/types/not-undefined-or-null";
import type { User } from "~/types/user";

type UserFromUseUser = NotUndefinedOrNull<ReturnType<typeof useUser>["user"]>;
type UserFromCurrentUser = NotUndefinedOrNull<
  Awaited<ReturnType<typeof currentUser>>
>;

export const toUserFromUseUser = (user: UserFromUseUser): User => {
  const email = isNonEmptyString(user.primaryEmailAddress)
    ? user.primaryEmailAddress
    : null;

  const name = createFullName(user.firstName, user.lastName);
  const imageUrl = isNonEmptyString(user.imageUrl) ? user.imageUrl : null;

  return { id: user.id, name, imageUrl, email };
};

export const toUserFromCurrentUser = (user: UserFromCurrentUser): User => {
  const primaryEmailId = isNonEmptyString(user.primaryEmailAddressId)
    ? user.primaryEmailAddressId
    : null;
  const email =
    primaryEmailId == null
      ? null
      : user.emailAddresses.find((ea) => ea.id === primaryEmailId)
          ?.emailAddress ?? null;

  const name = createFullName(user.firstName, user.lastName);
  const imageUrl = isNonEmptyString(user.imageUrl) ? user.imageUrl : null;


  return { id: user.id, name, imageUrl, email };
};
