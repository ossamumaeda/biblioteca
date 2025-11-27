<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { libraryStore } from "@/store/libraryStore";
import Button from "primevue/button";

const route = useRoute();
const router = useRouter();

const authorId = Number(route.params.id);

const defaultCover =
  "https://www.shutterstock.com/image-vector/page-not-found-404-error-260nw-774749455.jpg";

const author = computed(() => libraryStore.authors.find((a) => a.id === authorId));

const books = computed(() => libraryStore.books.filter((b) => b.authorId === authorId));

const goToBook = (id) => router.push(`/livros/${id}`);

const goToAuthorForm = () => router.push(`/autores/edit/${authorId}`);

const goToBooks = () => router.push(`/livros`);

const fallbackImage =
  "https://www.shutterstock.com/image-vector/page-not-found-404-error-260nw-774749455.jpg";

function onImageError(event) {
  event.target.src = fallbackImage;
}

</script>

<template>
  <div class="p-4 max-w-4xl mx-auto">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-slate-800">
        Autor: {{ author?.name || "Autor não encontrado" }}
      </h1>
      <div class="flex gap-2 mt-4">
        <Button
          label="Voltar"
          icon="pi pi-arrow-left"
          class="p-button-secondary"
          @click="goToBooks()"
        />

        <Button
          label="Editar Autor"
          icon="pi pi-pencil"
          class="p-button-primary"
          @click="goToAuthorForm()"
        />
      </div>
    </div>

    <!-- Author data -->
    <div class="bg-white p-5 shadow rounded">
      <p><strong>ID:</strong> {{ author?.id }}</p>
      <p><strong>Nome:</strong> {{ author?.name }}</p>
      <p><strong>Ano de Nascimento:</strong> {{ author?.birthYear }}</p>
    </div>

    <!-- Books -->
    <h2 class="text-xl font-semibold mt-8 mb-3">Livros do Autor</h2>

    <div v-if="books.length > 0" class="grid md:grid-cols-2 gap-4">
      <div
        v-for="book in books"
        :key="book.id"
        class="bg-white p-4 shadow rounded flex gap-4 cursor-pointer hover:bg-gray-50"
        @click="goToBook(book.id)"
      >
        <img :src="book.cover || defaultCover" class="w-20 h-28 object-cover rounded" @error="onImageError"/>

        <div>
          <p class="font-semibold text-slate-800">{{ book.title }}</p>
          <p class="text-sm text-gray-600">{{ book.publisherName }}</p>
          <p class="text-sm text-gray-600">Ano: {{ book.year }}</p>
        </div>
      </div>
    </div>

    <p v-else class="mt-4 text-gray-500 text-center">
      Nenhum livro encontrado para este autor.
    </p>
  </div>
</template>

<style scoped></style>
