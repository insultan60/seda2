// Saves /idx-wrapper's output as public/idx-wrapper.html, the static file IDX
// Broker fetches. Run with the dev server up: `npm run idx:wrapper`.
// The page builds its links from the host it's asked on, so the request
// carries the production host and the saved file points at aklahomes.com.
import { writeFile } from "node:fs/promises";

const res = await fetch("http://localhost:3000/idx-wrapper", {
  headers: { "x-forwarded-host": "www.aklahomes.com", "x-forwarded-proto": "https" },
});
let html = await res.text();
html = html.replaceAll("http://localhost:3000", "https://www.aklahomes.com");
if (!html.includes('id="idxStart"') || !html.includes('id="idxStop"')) {
  throw new Error("The wrapper is missing its idxStart/idxStop markers; not saved.");
}
await writeFile(new URL("../public/idx-wrapper.html", import.meta.url), html);
console.log("Saved public/idx-wrapper.html");
