import * as path from "https://deno.land/std@0.219.0/path/mod.ts";

export function findVersionCatalog(repoRootPath: string): string {
  return path.join(repoRootPath, "gradle/libs.versions.toml");
}
