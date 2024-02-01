import { config } from "@debbl/eslint-config";
import solid from "eslint-plugin-solid/configs/recommended.js";

export default config({
  typescript: true,
  customConfig: [solid],
});
