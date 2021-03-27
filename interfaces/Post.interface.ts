export interface IPost {
  annotation: {
    json: string[];
  };
  content: {
    json: string[];
  };
  date: string;
  image: {
    preview: string;
    post: string;
  } | null;
  slug: string;
  title: string;
}
