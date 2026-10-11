import { renderToString } from "react-dom/server";
import App from "./App";

export { SITE_URL, business, pages, notFoundMeta } from "./lib/site";
export { categories } from "./lib/diensten";
export { projects } from "./lib/projecten";

export function render(path: string) {
  return renderToString(<App ssrPath={path} />);
}
