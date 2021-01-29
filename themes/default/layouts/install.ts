import { html } from "../../../deps.ts";
import { defaultParams } from "../../../src/types/defaultParams.d.ts";

function InstallLayout(
  params: defaultParams,
  header: string,
  body: string,
  footer: string,
): string {
  return html`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Installation of your T-Rex Blog</title>
    <link rel="stylesheet" href="/_/build.css" />
    ${header}
</head>
<body>
    ${body}
    ${footer}
</body>
</html>
  `;
}

export default InstallLayout;
