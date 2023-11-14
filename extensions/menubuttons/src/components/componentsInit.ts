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

import { MenuEntryButton1 } from './menuEntryButton1';
import { UIXMenuTemplateProvider } from './uixMenuTemplateProvider';
import { UIXMenuTemplateProvider2 } from './uixMenuTemplateProvider2';
import { Container } from "inversify";
import { UIXTemplateProvider } from '@cristal/skin';
import { MenuEntry } from '../api/menuEntry';
import { Logger } from '@cristal/api';


export class ComponentInit {
    logger : Logger;

    constructor(container : Container) {
        this.logger = container.get<Logger>("Logger");
        this.logger.setModule("menubuttons.components.componentsInit");

        this.logger?.debug("Init MenuButtons components begin")
        container.bind<MenuEntry>("MenuEntry").to(MenuEntryButton1);
        container.bind<UIXTemplateProvider>("UIXTemplateProvider").to(UIXMenuTemplateProvider).whenTargetNamed(UIXMenuTemplateProvider.extensionPoint);
        container.bind<UIXTemplateProvider>("UIXTemplateProvider").to(UIXMenuTemplateProvider2).whenTargetNamed(UIXMenuTemplateProvider2.extensionPoint);

        this.logger?.debug("Init MenuButtons components end")
    }
}

