import { PageData } from "@cristal/api";

export interface APITypes {
  resolvePath(page: string, syntax: string): Promise<string>;

  readPage(path: string): Promise<PageData>;
}

// This is just a namehandler for an implicit global scope.
export const fileSystemStorage: APITypes | undefined = undefined;
