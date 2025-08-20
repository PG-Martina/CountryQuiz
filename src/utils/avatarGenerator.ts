import { createAvatar } from "@dicebear/core";
import { botttsNeutral } from "@dicebear/collection";

export const avatarGenerator = (usedAvatars?: string[]) => {
  let newAvatar = Math.random().toString(36).substring(2, 10);

  if (usedAvatars && usedAvatars.includes(newAvatar)) {
    do {
      newAvatar = Math.random().toString(36).substring(2, 10);
    } while (usedAvatars?.includes(newAvatar));
  }

  const avatarUri = createAvatar(botttsNeutral, {
    seed: newAvatar,
    size: 128,
  }).toDataUri();

  const avatar = { avatar: avatarUri, seed: newAvatar };

  return avatar;
};
