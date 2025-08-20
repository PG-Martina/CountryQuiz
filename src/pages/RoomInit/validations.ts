import z from "zod";

export const RoomInitSchema = z.object({
  roomID: z.string().length(4, "Room ID must be exactly 4 characters long"),
  nickname: z.string().min(3, "Nickname must be at least 3 characters long"),
});

export type RoomInitFormType = z.infer<typeof RoomInitSchema>;
