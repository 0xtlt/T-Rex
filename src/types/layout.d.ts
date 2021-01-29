import { defaultParams } from "./defaultParams.d.ts";

type LayoutFunction = (
  settings: defaultParams,
  header: string,
  body: string,
  footer: string,
) => string;

export type { LayoutFunction };
