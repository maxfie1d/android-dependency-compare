import {
  Dependency,
  Repo,
  VersionCatalog,
  VersionCatalogLibrary,
  VersionCatalogLibrary2,
  VersionCatalogLibrary3,
} from "./types.ts";
import { hasOwnProperty } from "https://deno.land/std@0.98.0/_util/has_own_property.ts";

export function convert(repoName: string, catalog: VersionCatalog): Repo {
  const libs = Object.values(catalog.libraries);

  return {
    name: repoName,
    dependencies: libs.map(mapVersionCatalogLibToDependency),
  };
}

function mapVersionCatalogLibToDependency(
  lib: VersionCatalogLibrary,
): Dependency {
  if (typeof lib == "string") {
    const [first, second] = lib.split(":");
    return { name: `${first}:${second}` };
  } else if (hasOwnProperty(lib, "group")) {
    const l = lib as VersionCatalogLibrary2;
    return { name: `${l.group}:${l.name}` };
  } else {
    const l = lib as VersionCatalogLibrary3;
    return { name: l.module };
  }
}
