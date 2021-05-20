import { Quote } from "./Quote";

export type Book = {
  id?: number;
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  cover_image_url: string;
  quotes?: Quote[];
};
