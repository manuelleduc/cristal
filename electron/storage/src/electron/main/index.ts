import { join } from "path";
import { app } from "electron";
import fs from "fs";
import { PageData } from "@cristal/api";
import { ipcMain } from "electron/main";

const HOME_PATH = ".cristal";

export function resolvePath(wikiName: string, id: string): string {
  const homedir = app.getPath("home");
  return join(homedir, HOME_PATH, wikiName, id + ".json");
}

export function readPage(path: string): Promise<PageData> {
  return fs.promises
    .readFile(path)
    .then((pageContent: Buffer) => JSON.parse(pageContent.toString("utf8")));
}

ipcMain.on("resolvePath", (event, { page, syntax }) => {
  return resolvePath(page, syntax);
});
ipcMain.on("readPage", (event, { path }) => {
  return readPage(path);
});
