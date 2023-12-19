import { StaticSite, StackContext, use } from 'sst/constructs';
import API from './APIStack';

export default function FrontEndStack({ stack }: StackContext) {
  const api = use(API);

  const site = new StaticSite(stack, 'ReactSite', {
    path: 'packages/frontend',
    buildCommand: 'pnpm run build',
    buildOutput: 'dist',
    environment: {
      VITE_API_URL: api.url,
    },
  });

  stack.addOutputs({
    SiteUrl: site.url,
  });

  return site;
}
