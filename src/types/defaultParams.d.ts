import { Custom, Link, Meta } from "./utils.d.ts";

type defaultParams = {
  title: string;
  description: string;
  path: string;
  metas: Meta[];
  links: Link[];
  customs: Custom[];
};

export type { defaultParams };
