import { parse } from "https://deno.land/std@0.207.0/toml/mod.ts";
import { VersionCatalog } from "../types.ts";

export function parseVersionCatalog(content: string): VersionCatalog {
  return parse(content) as VersionCatalog;
}
