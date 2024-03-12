import { CompareResult } from "./compare.ts";

export function renderResultAsCsv(result: CompareResult): string {
  const table: MarkdownTable = {
    header: ["", ...result.repos.map((x) => x.name)],
    rows: result.dependencies.map((dependency) => {
      return {
        dependency: dependency.name,
        values: result.repos.map((repo) =>
          result.table.get(dependency)!.get(repo.name)!
        ),
      };
    }),
  };

  table.rows.sort(compareTableRow);

  var csv = "";

  csv += table.header.join(",");
  table.rows
    .forEach((row) => {
      csv += "\n";
      csv += `${row.dependency},${
        row.values.map((x) => x ? TrueMark : FalseMark).join(",")
      }`;
    });

  return csv;
}

type MarkdownTable = {
  header: string[];
  rows: TableRow[];
};

type TableRow = {
  dependency: string;
  values: boolean[];
};

function compareTableRow(a: TableRow, b: TableRow): number {
  return -(a.values.filter((x) => x).length -
    b.values.filter((x) => x).length) ||
    a.dependency.localeCompare(b.dependency);
}

const TrueMark = "✅";
const FalseMark = "❌";
