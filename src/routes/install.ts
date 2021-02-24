import { Router } from '../../deps.ts';
import { renderTemplate, routy } from '../core.ts';

const R = routy('/install');

const Route = new Router();
Route.get(R(''), async (ctx) => {
  const renderedFile = await renderTemplate(
    'install.ts',
    {
      title: 'string',
      description: 'string',
      path: 'string',
      metas: [],
      links: [],
      customs: [],
    },
    {}
  );

  ctx.response.headers.append('Content-Type', 'text/html');
  ctx.response.body = renderedFile;
});

export default Route;
