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

import { TemplateComponent } from './templateTemplateProvider';
import { DefaultSkinManager } from './defaultSkinManager';
import { Container } from "inversify";
import { Logger, SkinManager } from '@cristal/api';
import { VueTemplateProvider } from '../api/vueTemplateProvider';
import { UIXVueTemplateProvider } from './uixVueTemplateProvider';
import { UIXLoginTemplateProvider } from './uixLoginTemplateProvider';
import { UIXTemplateProvider } from '../api/uixTemplateProvider';
import { UIXSearchTemplateProvider } from './uixSearchTemplateProvider';



export default class ComponentInit {

    logger : Logger;
   
    constructor(container : Container) {
        this.logger = container.get<Logger>("Logger");
        this.logger.setModule("skin.components.componentsInit");

        this.logger?.debug("Init Skin components begin")
        container.bind<UIXTemplateProvider>("UIXTemplateProvider").to(UIXLoginTemplateProvider).whenTargetNamed(UIXLoginTemplateProvider.extensionPoint);
        container.bind<UIXTemplateProvider>("UIXTemplateProvider").to(UIXSearchTemplateProvider).whenTargetNamed(UIXSearchTemplateProvider.extensionPoint);
        container.bind<SkinManager>("SkinManager").to(DefaultSkinManager);
        container.bind<VueTemplateProvider>("VueTemplateProvider").to(TemplateComponent);
        container.bind<VueTemplateProvider>("VueTemplateProvider").to(UIXVueTemplateProvider);
        this.logger?.debug("Init Skin components end")
    }
}

