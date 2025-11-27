
<script setup>
import { reactive, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { libraryStore } from "@/store/libraryStore";

const route = useRoute();
const router = useRouter();

const isNew = computed(() => route.params.id === "novo");
const editId = Number(route.params.id);

let form = reactive({
  name: ""
});

const errors = reactive({});

if (!isNew.value) {
  const publisher = libraryStore.publishers.find(p => p.id === editId);
  if (publisher) {
    form.name = publisher.name;
  }
}

function validate() {
  errors.name = form.name.trim() ? "" : "Nome é obrigatório.";

  return !errors.name;
}

function save() {
  if (!validate()) return;

  if (isNew.value) {
    const newId = Math.max(...libraryStore.publishers.map(p => p.id)) + 1;
    libraryStore.publishers.push({
      id: newId,
      name: form.name
    });
  } else {
    const index = libraryStore.publishers.findIndex(p => p.id === editId);
    libraryStore.publishers[index].name = form.name;
  }

  router.push(`/editoras/${isNew.value ? libraryStore.publishers.length : editId}`);
}

function goBack() {
  router.push("/livros");
}

function onImageError(event) {
  event.target.src = fallbackImage;
}
</script>

<template>
  <div class="max-w-xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">
      {{ isNew ? "Nova Editora" : "Editar Editora" }}
    </h1>

    <form class="bg-white shadow-md p-6 rounded space-y-4" @submit.prevent="save">
      <div>
        <label class="font-medium">Nome da Editora</label>
        <input
          v-model="form.name"
          type="text"
          placeholder="Digite o nome da editora"
          class="w-full border rounded p-2 mt-1"
        />
        <p v-if="errors.name" class="text-red-600 text-sm">{{ errors.name }}</p>
      </div>

      <div class="flex justify-between mt-6">
        <button
          type="button"
          class="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
          @click="goBack"
        >
          Voltar
        </button>

        <button
          type="submit"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Salvar
        </button>
      </div>
    </form>
  </div>
</template>

