import { parseArgs } from "https://deno.land/std@0.207.0/cli/parse_args.ts";
import { readFileString } from "./io.ts";
import { parseVersionCatalog } from "./versioncatalog/parser.ts";
import { convert } from "./convert.ts";
import { compare } from "./compare.ts";
import { findVersionCatalog } from "./versioncatalog/finder.ts";
import * as path from "https://deno.land/std@0.219.0/path/mod.ts";
import { renderResultAsCsv } from "./render.ts";

export async function main() {
  const flags = parseArgs(Deno.args, {
    collect: ["repo"],
  });

  const repoPaths = flags["repo"] as string[];

  const repos = await Promise.all(repoPaths.map(async (repoPath) => {
    const versionCatalogPath = findVersionCatalog(repoPath);
    const repoName = path.basename(repoPath);
    const content = await readFileString(versionCatalogPath);
    const versionCatalog = parseVersionCatalog(content);
    const repo = convert(repoName, versionCatalog);
    return repo;
  }));

  const result = compare(repos);

  const csv = renderResultAsCsv(result);

  console.log(csv);
}
