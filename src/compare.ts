import { Dependency, Repo } from "./types.ts";
import { distinctBy } from "https://deno.land/std@0.219.0/collections/mod.ts";

export type CompareResult = {
  dependencies: Dependency[];
  repos: Repo[];
  table: Map<Dependency, Map<string, boolean>>;
};

export function compare(
  repos: Repo[],
): CompareResult {
  const mergedList = repos.flatMap((x) => x.dependencies);
  const uniqueList = distinctBy(mergedList, (x) => x.name);

  return {
    dependencies: uniqueList,
    repos: repos,
    table: new Map(uniqueList.map((dependency) => {
      return [
        dependency,
        new Map(repos.map((repo) => [repo.name, dependsOn(repo, dependency)])),
      ];
    })),
  };
}

function dependsOn(repo: Repo, dependency: Dependency): boolean {
  return repo.dependencies.map((x) => x.name).includes(dependency.name);
}
