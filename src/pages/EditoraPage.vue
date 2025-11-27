<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { libraryStore } from "@/store/libraryStore";

const route = useRoute();
const router = useRouter();

const publisherId = Number(route.params.id);

const publisher = computed(() =>
  libraryStore.publishers.find((p) => p.id === publisherId)
);

const books = computed(() =>
  libraryStore.books.filter((b) => b.publisherId === publisherId)
);

function goBack() {
  router.push("/livros");
}

function goToForm() {
  router.push(`/editoras/edit/${publisherId}`);
}

const goToBook = (id) => router.push(`/livros/${id}`);
const fallbackImage =
  "https://www.shutterstock.com/image-vector/page-not-found-404-error-260nw-774749455.jpg";

function onImageError(event) {
  event.target.src = fallbackImage;
}

</script>

<template>
  <div class="max-w-3xl mx-auto p-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold">Editora: {{ publisher.name }}</h1>

      <div class="space-x-2 flex">
        <button
          class="bg-gray-300 hover:bg-gray-400 text-black px-3 py-2 rounded"
          @click="goBack"
        >
          Voltar
        </button>

        <button
          class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded"
          @click="goToForm"
        >
          Editar Editora
        </button>
      </div>
    </div>

    <!-- Info Básica -->
    <div class="bg-white shadow rounded p-4 mb-6">
      <p><strong>ID:</strong> {{ publisher.id }}</p>
      <p><strong>Nome:</strong> {{ publisher.name }}</p>
    </div>

    <!-- Livros da Editora -->
    <div class="bg-white shadow rounded p-4">
      <h2 class="text-lg font-semibold mb-3">Livros desta Editora</h2>

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

      <p v-else class="text-gray-500">Nenhum livro cadastrado.</p>
    </div>
  </div>
</template>
