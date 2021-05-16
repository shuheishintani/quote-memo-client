import { Book } from "../type/Book";

type TagInput = {
  name: string;
};

export type QuoteInput = {
  text: string;
  page: number;
  published: boolean;
  book?: Book;
  tags: TagInput[];
};
