<!--
See the LICENSE file distributed with this work for additional
information regarding copyright ownership.

This is free software; you can redistribute it and/or modify it
under the terms of the GNU Lesser General Public License as
published by the Free Software Foundation; either version 2.1 of
the License, or (at your option) any later version.

This software is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this software; if not, write to the Free
Software Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA
02110-1301 USA, or see the FSF site: http://www.fsf.org.
-->
<script setup lang="ts">
import App from "../react/App";
import { CristalApp } from "@xwiki/cristal-api";
import {
  DocumentService,
  name as documentServiceName,
} from "@xwiki/cristal-document-api";
import { CArticle } from "@xwiki/cristal-skin";
import { inject, ref } from "vue";

import { ReactInVue } from "vuera-ts";
const cristal = inject<CristalApp>("cristal")!;
const container = cristal.getContainer();
const documentService = container.get<DocumentService>(documentServiceName);
const loading = documentService.isLoading();
const error = documentService.getError();
const currentPage = documentService.getCurrentDocument();
const title = ref(""); // TODO
const titlePlaceholder = ref(""); // TODO

const EditorComp = ReactInVue(App);
</script>

<template>
  <c-article
    :loading="loading"
    :error="error"
    :current-page="currentPage"
    :page-exist="true"
    before-u-i-x-p-id="edit.before"
    after-u-i-x-p-id="edit.after"
  >
    <template #title>
      <input
        v-model="title"
        type="text"
        :placeholder="titlePlaceholder"
        class="doc-title"
      />
    </template>
    <template #default>
      <EditorComp />
    </template>
  </c-article>
</template>

<style scoped></style>
