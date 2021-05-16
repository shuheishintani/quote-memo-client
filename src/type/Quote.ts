import { Book } from "./Book";
import { Tag } from "./Tag";
import { User } from "./User";

export type Quote = {
  id: number;
  created_at: Date;
  updated_at: Date;
  text: string;
  page: number;
  published: boolean;
  book: Book;
  user: User;
  tags: Tag[];
};
