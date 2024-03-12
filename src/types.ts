export type Repo = {
  name: string;
  dependencies: Dependency[];
};

export type Dependency = {
  name: string;
};

export type VersionCatalog = {
  libraries: Record<string, VersionCatalogLibrary>;
};

export type VersionCatalogLibrary =
  | VersionCatalogLibrary1
  | VersionCatalogLibrary2
  | VersionCatalogLibrary3;

export type VersionCatalogLibrary1 = string;

export type VersionCatalogLibrary2 = {
  group: string;
  name: string;
};

export type VersionCatalogLibrary3 = {
  module: string;
};
