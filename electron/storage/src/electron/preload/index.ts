import { contextBridge, ipcRenderer } from "electron";
import { APITypes } from "./apiTypes";

const api: APITypes = {
  readPage: (path: string) => {
    return ipcRenderer.invoke("readPage", { path });
  },
  resolvePath: (page: string, syntax: string) => {
    console.log("IN RESOLVE PATH");
    return ipcRenderer.invoke("resolvePath", { page, syntax });
  },
};
console.log("LOADING PRELOAD");
contextBridge.exposeInMainWorld("fileSystemStorage", api);
