import { Quote } from "./Quote";

export type User = {
  id: string;
  created_at: Date;
  updated_at: Date;
  username: string;
  profile_image_url: string;
  provider: string;
  quotes?: Quote[];
  favorite_quotes?: Quote[];
};
