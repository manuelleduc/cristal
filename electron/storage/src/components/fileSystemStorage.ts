/**
 * See the LICENSE file distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation; either version 2.1 of
 * the License, or (at your option) any later version.
 *
 * This software is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public
 * License along with this software; if not, write to the Free
 * Software Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA
 * 02110-1301 USA, or see the FSF site: http://www.fsf.org.
 *
 * This file is part of the Cristal Wiki software prototype
 * @copyright  Copyright (c) 2023 XWiki SAS
 * @license    http://opensource.org/licenses/AGPL-3.0 AGPL-3.0
 *
 **/
import { inject, injectable } from "inversify";
import { DefaultPageData, Logger, PageData } from "@cristal/api";
import { AbstractStorage } from "@cristal/storage";
import { fileSystemStorage } from "../electron/preload/apiTypes";

@injectable()
export default class FileSystemStorage extends AbstractStorage {
  constructor(@inject<Logger>("Logger") logger: Logger) {
    super(logger, "storage.components.fileSystemStorage");
  }

  getEditField(jsonArticle: object, fieldName: string): Promise<string> {
    return Promise.resolve("");
  }

  getImageURL(page: string, image: string): string {
    return "";
  }

  async getPageContent(page: string, syntax: string): Promise<PageData> {
    if (fileSystemStorage === undefined) {
      // TODO: can probably be avoided.
      throw new Error("...");
    }
    const path = await fileSystemStorage.resolvePath(page, syntax);
    this.logger.error("PAGE", page);
    this.logger.error("SYNTAX", syntax);
    this.logger.error("PATH", path);
    return fileSystemStorage.readPage(path || "");
  }

  getPageFromViewURL(url: string): string | null {
    return null;
  }

  getPageRestURL(page: string, syntax: string): string {
    return "";
  }

  getPanelContent(
    panel: string,
    contextPage: string,
    syntax: string,
  ): Promise<PageData> {
    return Promise.resolve(new DefaultPageData());
  }

  isStorageReady(): Promise<boolean> {
    return Promise.resolve(true);
  }

  // getPage(wikiName: string, id: string): Promise<PageData | undefined> {

  // }
  //
  // savePage(wikiName: string, id: string, page: PageData): void {
  //   fs.writeFileSync(this.resolvePath(wikiName, id), this.serialize(page));
  // }
  //
  // updatePage(wikiName: string, id: string, page: PageData): void {
  //   this.savePage(wikiName, id, page);
  // }
  //
  //
  // private serialize(page: PageData) {
  //   return JSON.stringify(page.toObject());
  // }
}
