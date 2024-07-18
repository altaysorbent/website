import { Document } from '@contentful/rich-text-types';

export interface IPost {
  annotation: {
    json: Document;
  };
  content: {
    json: Document;
    links: any;
  };
  date: string;
  image: {
    preview: string;
    post: string;
  } | null;
  slug: string;
  title: string;
}
