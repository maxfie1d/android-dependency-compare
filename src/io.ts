export function readFileString(path: string): Promise<string> {
  return Deno.readTextFile(path);
}
