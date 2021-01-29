import { exists, join } from "../deps.ts";
import { ConfigTRex } from "./types/config.d.ts";
import { defaultParams } from "./types/defaultParams.d.ts";
import { Template } from "./types/template.d.ts";

const RELATIVE_PATH = import.meta.url.replace("file:///", "");
const RELATIVE_FOLDER = join(RELATIVE_PATH, "../");

const RELATIVE_PATH_IMPORT = import.meta.url;
const RELATIVE_FOLDER_IMPORT = join(RELATIVE_PATH_IMPORT, "../");

let isInstalled_ = false;
let config_: ConfigTRex | null = null;

async function isInstalled(): Promise<boolean> {
  if (isInstalled_) return true;

  return (await readConfig()).installed;
}

async function readConfig(): Promise<ConfigTRex> {
  if (config_) return config_;
  const FILE_CONTENT = await Deno.readTextFile(
    join(RELATIVE_FOLDER, "../storage.json"),
  );
  config_ = (JSON.parse(FILE_CONTENT) as ConfigTRex);
  return config_;
}

function routy(prefix: string): ((path: string) => string) {
  return function (path: string) {
    return prefix + path;
  };
}

async function getThemeTemplate(
  templateName: string,
): Promise<9999 | unknown> {
  const CONFIG = await readConfig();
  const THEME_FOLDER = CONFIG.theme;
  const PATH = join(
    RELATIVE_FOLDER_IMPORT,
    "../themes/",
    THEME_FOLDER,
    templateName,
  );

  if (await exists(PATH.replace("file:/", ""))) {
    const template = (await import(PATH)).default;
    return template;
  } else {
    return 9999;
  }
}

async function renderTemplate(
  templateName: string,
  settings: defaultParams,
  extras: { [key: string]: any },
): Promise<string | boolean> {
  const template = (await getThemeTemplate(templateName) as 9999 | Template);

  if (template === 9999) {
    return false;
  }

  return template.layout(
    settings,
    template.header
      ? await renderString(template.header, settings, extras)
      : "",
    await renderString(template.body, settings, extras),
    template.footer ? await renderString(template.footer, settings, extras)
    : "",
  );
}

async function renderString(
  arg:
    | string
    | ((settings: defaultParams, args: { [key: string]: unknown }) => string),
  settings: defaultParams,
  extras: { [key: string]: any },
): Promise<string> {
  if (typeof arg === "string") {
    return arg;
  }

  return arg(settings, extras);
}

export { getThemeTemplate, isInstalled, readConfig, renderTemplate, routy };
