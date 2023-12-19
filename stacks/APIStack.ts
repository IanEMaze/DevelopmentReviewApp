import { Api, StackContext, use } from "sst/constructs";
import DB from "./DBStack";

export default function API({ stack }: StackContext) {
  const {table} = use(DB)
  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        // Bind the table name to our API
        bind: [table],
        environment: {
          TABLE_NAME: table.tableName,
          REGION: stack.region
        }
      },
    },
    routes: {
      "POST /review": "packages/functions/src/postReview.handler",
    },
  });

  // Show the API endpoint in the output
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
  return api;
}
