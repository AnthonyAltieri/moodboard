import { type AvatarProps } from "@radix-ui/react-avatar";

import { Icons } from "~/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { User } from "~/types/user";

interface UserAvatarProps extends AvatarProps {
  user: User;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user.imageUrl ? (
        <AvatarImage alt="Picture" src={user.imageUrl} />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user.name}</span>
          <Icons.user className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
