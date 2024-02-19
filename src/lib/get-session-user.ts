import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { toUserFromCurrentUser } from "~/lib/to-user";

export const getSessionUser = async () => {
  const cu = await currentUser();
  if (cu == null) redirect("/sign-in");

  return toUserFromCurrentUser(cu);
};
