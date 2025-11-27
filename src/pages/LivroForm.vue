<script setup>

import { reactive, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import { libraryStore } from "@/store/libraryStore";

import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Textarea from "primevue/textarea";
import Button from "primevue/button";

const route = useRoute();
const router = useRouter();

const authors = libraryStore.authors;
const publishers = libraryStore.publishers;

const isEdit = computed(() => route.params.id !== "novo");

const form = reactive({
  title: "",
  year: "",
  cover: "",
  authorId: null,
  publisherId: null,
  sinopsis: "",
});

onMounted(() => {
  if (isEdit.value) {
    const book = libraryStore.getBookById(route.params.id);
    if (book) Object.assign(form, book);
  }
});

function submitForm() {
  if (
    !form.title ||
    !form.year ||
    !form.cover ||
    !form.authorId ||
    !form.publisherId ||
    !form.sinopsis
  ) {
    alert("Preencha todos os campos!");
    return;
  }

  if (isEdit.value) {
    libraryStore.updateBook(route.params.id, { ...form });
  } else {
    const newBook = {
      id: libraryStore.getNextBookId(),
      ...form,
    };
    libraryStore.addBook(newBook);
  }

  router.push("/livros");
}

const fallbackImage =
  "https://www.shutterstock.com/image-vector/page-not-found-404-error-260nw-774749455.jpg";

function onImageError(event) {
  event.target.src = fallbackImage;
}
</script>

<template>
  <div class="p-4 md:p-6 max-w-4xl mx-auto">
    <div class="bg-white shadow-md rounded-lg p-6 border border-gray-200">

      <h2 class="text-2xl font-semibold text-gray-800 mb-6">
        {{ isEdit ? "Editar Livro" : "Cadastrar Novo Livro" }}
      </h2>

      <div v-if="isEdit && form.cover" class="flex justify-center mb-6">
        <img
          :src="form.cover"
          alt="Capa do livro"
          class="w-48 h-auto rounded shadow-md border"
          @error="onImageError"
        />
      </div>

      <form @submit.prevent="submitForm" class="grid gap-4">

        <div>
          <label class="block text-gray-700 font-medium mb-1">Título</label>
          <InputText
            v-model="form.title"
            placeholder="Digite o título do livro"
            class="w-full"
          />
        </div>

        <!-- ANO -->
        <div>
          <label class="block text-gray-700 font-medium mb-1">
            Ano de Publicação
          </label>
          <InputText
            v-model="form.year"
            placeholder="Ex: 1999"
            class="w-full"
            type="number"
            min="0"
          />
        </div>

        <div>
          <label class="block text-gray-700 font-medium mb-1">Foto de Capa (URL)</label>
          <InputText
            v-model="form.cover"
            placeholder="URL da imagem"
            class="w-full"
          />
        </div>

        <div>
          <label class="block text-gray-700 font-medium mb-1">Autor</label>
          <Dropdown
            v-model="form.authorId"
            :options="authors"
            optionLabel="name"
            optionValue="id"
            placeholder="Selecione o autor"
            class="w-full"
          />
        </div>

        <div>
          <label class="block text-gray-700 font-medium mb-1">Editora</label>
          <Dropdown
            v-model="form.publisherId"
            :options="publishers"
            optionLabel="name"
            optionValue="id"
            placeholder="Selecione a editora"
            class="w-full"
          />
        </div>

        <div>
          <label class="block text-gray-700 font-medium mb-1">Sinopse</label>
          <Textarea
            v-model="form.sinopsis"
            rows="5"
            placeholder="Digite a sinopse"
            class="w-full"
          />
        </div>

        <div class="flex gap-3 justify-end pt-4">
          <Button label="Cancelar" severity="secondary" @click="router.back()" />
          <Button label="Salvar" severity="primary" type="submit"/>
        </div>
      </form>
    </div>
  </div>
</template>



<style scoped>
</style>
