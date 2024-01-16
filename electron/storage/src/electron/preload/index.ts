import { contextBridge, ipcRenderer } from "electron";
import { APITypes } from "./apiTypes";
import { PageData } from "@cristal/api";

const api: APITypes = {
  readPage(path: string): Promise<PageData> {
    return ipcRenderer.invoke("readPage", { path });
  },
  resolvePath(page: string, syntax: string): Promise<string> {
    return ipcRenderer.invoke("resolvePath", { page, syntax });
  },
};
contextBridge.exposeInMainWorld("fileSystemStorage", api);
