export interface IPost {
  title: string;
  slug: string;
  date: string;
  content: {
    json: string[];
  };
  annotation: {
    json: string[];
  };
}
