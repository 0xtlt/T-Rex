type Meta = {
  name: string;
  content?: string;
  description?: string;
};
type Link = {
  rel?: string;
  href?: string;
  media?: string;
};
type Custom = {
  name: string;
  content?: string;
  params?: { [key: string]: string };
};

export type { Custom, Link, Meta };
