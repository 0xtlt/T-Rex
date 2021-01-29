import { defaultParams } from "./defaultParams.d.ts";
import { LayoutFunction } from "./layout.d.ts";

type Template = {
  layout: LayoutFunction;
  header?:
    | string
    | ((settings: defaultParams, args: { [key: string]: unknown }) => string);
  footer?:
    | string
    | ((settings: defaultParams, args: { [key: string]: unknown }) => string);
  body:
    | string
    | ((settings: defaultParams, args: { [key: string]: unknown }) => string);
};

export type { Template };
