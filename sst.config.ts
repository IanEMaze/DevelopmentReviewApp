import { SSTConfig } from "sst";
import DB from "./stacks/DBStack";
import API from "./stacks/APIStack";
import FrontEndStack from "./stacks/FrontEndStack";

export default {
  config() {
    return {
      name: "dev-review-form",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(DB);
    app.stack(API);
    app.stack(FrontEndStack);
  }
} satisfies SSTConfig;
