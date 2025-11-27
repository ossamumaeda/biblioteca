<script setup>
import { inject, ref, computed } from "vue";
import data from "@/data.json";

import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Dialog from "primevue/dialog";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const dataStore = inject("dataStore");

const books = computed(() => dataStore.books);

const searchTitle = ref("");
const searchAuthor = ref("");
const searchPublisher = ref("");

const sortField = ref(null); // will hold 'id' | 'year' | 'authorName'
const sortOrder = ref("asc"); // 'asc' | 'desc'

// Dropdown options (label/value). We'll use optionValue="value" in template.
const sortOptions = [
  { label: "ID", value: "id" },
  { label: "Ano de Publicação", value: "year" },
  { label: "Autor", value: "authorName" },
];

// Modal
const selectedBook = ref(null);
const showModal = ref(false);

function openModal(book) {
  selectedBook.value = book;
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
  selectedBook.value = null;
}

// Build relational data
const booksWithRelations = computed(() => {
  return (data.books || []).map((book) => {
    const author = (data.authors || []).find((a) => a.id === book.authorId);
    const publisher = (data.publishers || []).find((p) => p.id === book.publisherId);

    return {
      ...book,
      authorName: author?.name ?? "Desconhecido",
      publisherName: publisher?.name ?? "Desconhecida",
    };
  });
});

// helper: get label text from sortField
function currentSortLabel() {
  const opt = sortOptions.find((o) => o.value === sortField.value);
  return opt ? opt.label : "—";
}

// Filters + Sorting using native JS sort
const filteredBooks = computed(() => {
  let result = booksWithRelations.value.slice();

  // Filters (case-insensitive)
  const st = searchTitle.value.trim().toLowerCase();
  const sa = searchAuthor.value.trim().toLowerCase();
  const sp = searchPublisher.value.trim().toLowerCase();

  if (st || sa || sp) {
    result = result.filter((b) => {
      const titleMatch = st
        ? String(b.title || "")
            .toLowerCase()
            .includes(st)
        : true;
      const authorMatch = sa
        ? String(b.authorName || "")
            .toLowerCase()
            .includes(sa)
        : true;
      const pubMatch = sp
        ? String(b.publisherName || "")
            .toLowerCase()
            .includes(sp)
        : true;
      return titleMatch && authorMatch && pubMatch;
    });
  }

  // Sorting
  if (sortField.value) {
    const field = sortField.value;
    result.sort((a, b) => {
      const va = a[field] == null ? "" : a[field];
      const vb = b[field] == null ? "" : b[field];

      // If numeric (both numbers), compare as numbers
      const na = Number(va);
      const nb = Number(vb);
      let cmp = 0;

      if (!Number.isNaN(na) && !Number.isNaN(nb)) {
        // numeric comparison
        cmp = na - nb;
      } else {
        // string comparison (case-insensitive)
        const sa = String(va).toLowerCase();
        const sb = String(vb).toLowerCase();
        if (sa < sb) cmp = -1;
        else if (sa > sb) cmp = 1;
        else cmp = 0;
      }

      return sortOrder.value === "asc" ? cmp : -cmp;
    });
  }

  return result;
});

function goToBook(book) {
  router.push(`/livros/${book.id}`);
}

function goToNewBook() {
  router.push("/livros/novo");
}

function goToAuthor(book) {
  router.push(`/autores/${book.authorId}`);
}

function goToNewAuthor() {
  router.push(`/autores/edit/novo`);
}

function goToPublisher(book) {
  router.push(`/editoras/${book.publisherId}`);
}

function goToNewPublisher() {
  router.push(`/editoras/edit/novo`);
}

const fallbackImage =
  "https://www.shutterstock.com/image-vector/page-not-found-404-error-260nw-774749455.jpg";

function onImageError(event) {
  event.target.src = fallbackImage;
}
</script>

<template>
  <div class="p-4 md:p-6 space-y-6">
    <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
      <h1 class="text-xl md:text-2xl font-bold text-center md:text-left">Biblioteca</h1>
      <div class="flex gap-2 mt-4">
        <Button
          label="Novo Livro"
          icon="pi pi-plus"
          class="p-button-success w-full md:w-auto"
          @click.stop="goToNewBook()"
        />
        <Button
          label="Novo Autor"
          icon="pi pi-plus"
          class="p-button-info w-full md:w-auto"
          @click.stop="goToNewAuthor()"
        />
        <Button
          label="Nova Editora"
          icon="pi pi-plus"
          severity="secondary"
          class="w-full md:w-auto"
          @click.stop="goToNewPublisher()"
        />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label class="text-sm font-semibold">Título</label>
        <InputText v-model="searchTitle" placeholder="Buscar por título" class="w-full" />
      </div>

      <div>
        <label class="text-sm font-semibold">Autor</label>
        <InputText v-model="searchAuthor" placeholder="Buscar por autor" class="w-full" />
      </div>

      <div>
        <label class="text-sm font-semibold">Editora</label>
        <InputText
          v-model="searchPublisher"
          placeholder="Buscar por editora"
          class="w-full"
        />
      </div>
    </div>

    <div class="flex flex-col md:flex-row md:items-center gap-4">
      <Dropdown
        v-model="sortField"
        :options="sortOptions"
        optionLabel="label"
        optionValue="value"
        placeholder="Ordenar por..."
        class="w-full md:w-56"
      />

      <div class="flex gap-2 justify-center md:justify-start">
        <Button
          label="↑"
          :class="sortOrder === 'asc' ? 'p-button-primary' : ''"
          class="p-button-sm"
          @click="() => (sortOrder = 'asc')"
        />
        <Button
          label="↓"
          :class="sortOrder === 'desc' ? 'p-button-primary' : ''"
          class="p-button-sm"
          @click="() => (sortOrder = 'desc')"
        />
      </div>

      <div class="text-sm text-gray-600 text-center md:text-left">
        Ordenando por: <strong>{{ currentSortLabel() }}</strong> —
        <em>{{ sortOrder }}</em>
      </div>
    </div>

    <!-- TABLE — Desktop Only -->
    <div class="hidden md:block overflow-x-auto">
      <table class="min-w-full border rounded-lg">
        <thead>
          <tr class="bg-gray-100 text-left">
            <th class="p-3">ID</th>
            <th class="p-3">Capa</th>
            <th class="p-3">Título</th>
            <th class="p-3">Ano</th>
            <th class="p-3">Autor</th>
            <th class="p-3">Editora</th>
            <th class="p-3">Ações</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="book in filteredBooks"
            :key="book.id"
            class="border-b hover:bg-gray-50 cursor-pointer"
            @click="openModal(book)"
          >
            <td class="p-3 align-top">{{ book.id }}</td>
            <td class="p-3">
              <img
                :src="book.cover"
                alt="Capa"
                class="w-12 h-16 object-cover rounded"
                @error="onImageError"
              />
            </td>
            <td class="p-3 align-top">{{ book.title }}</td>
            <td class="p-3 align-top">{{ book.year }}</td>
            <td class="p-3 align-top">{{ book.authorName }}</td>
            <td class="p-3 align-top">{{ book.publisherName }}</td>
            <td class="p-3 space-x-2 align-top">
              <Button label="Livro" class="p-button-sm" @click.stop="goToBook(book)" />
              <Button
                label="Autor"
                class="p-button-sm p-button-info"
                @click.stop="goToAuthor(book)"
              />
              <Button
                label="Editora"
                class="p-button-sm p-button-secondary"
                @click.stop="goToPublisher(book)"
              />
            </td>
          </tr>

          <tr v-if="filteredBooks.length === 0">
            <td colspan="7" class="p-4 text-center text-gray-500">
              Nenhum livro encontrado.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="md:hidden space-y-4">
      <div
        v-for="book in filteredBooks"
        :key="book.id"
        class="border rounded-lg p-4 flex gap-4 shadow-sm hover:shadow-md transition cursor-pointer"
        @click="openModal(book)"
      >
        <img
          :src="book.cover"
          class="w-20 h-28 object-cover rounded"
          @error="onImageError"
        />

        <div class="flex flex-col justify-between flex-1">
          <div>
            <h2 class="font-bold text-lg leading-tight">{{ book.title }}</h2>
            <p class="text-sm text-gray-600">Autor: {{ book.authorName }}</p>
            <p class="text-sm text-gray-600">Editora: {{ book.publisherName }}</p>
            <p class="text-sm text-gray-600">Ano: {{ book.year }}</p>
          </div>

          <div class="flex gap-2 mt-2">
            <Button
              label="Livro"
              class="p-button-sm w-full"
              @click.stop="goToBook(book)"
            />
            <Button
              label="Autor"
              class="p-button-sm p-button-info w-full"
              @click.stop="goToAuthor(book)"
            />
            <Button
              label="Editora"
              class="p-button-sm p-button-secondary w-full"
              @click.stop="goToPublisher(book)"
            />
          </div>
        </div>
      </div>

      <p v-if="filteredBooks.length === 0" class="text-center text-gray-500">
        Nenhum livro encontrado.
      </p>
    </div>

    <Dialog
      v-model:visible="showModal"
      modal
      header="Detalhes do Livro"
      :style="{ width: '90vw', maxWidth: '600px' }"
    >
      <template v-if="selectedBook">
        <div class="space-y-4">
          <img
            :src="selectedBook.cover"
            alt="Capa"
            class="w-full rounded shadow"
            @error="onImageError"
          />
          <h2 class="text-xl font-bold">{{ selectedBook.title }}</h2>
          <p><b>Autor:</b> {{ selectedBook.authorName }}</p>
          <p><b>Editora:</b> {{ selectedBook.publisherName }}</p>
          <p><b>Ano:</b> {{ selectedBook.year }}</p>

          <p><b>Sinopse:</b></p>
          <p class="text-gray-700 whitespace-pre-line">
            {{ selectedBook.sinopsis || "Sem sinopse disponível." }}
          </p>

          <div class="flex justify-end">
            <Button label="Fechar" icon="pi pi-times" @click="closeModal" />
          </div>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<style scoped>
@import "@/styles/livros.css";
</style>
