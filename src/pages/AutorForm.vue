<script setup>
import { useRoute, useRouter } from "vue-router";
import { libraryStore } from "@/store/libraryStore";
import { ref, computed, onMounted } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

const route = useRoute();
const router = useRouter();

const isNew = route.params.id === "novo";
const authorId = isNew ? null : Number(route.params.id);

const formData = ref({
  name: "",
  birthYear: "",
});

onMounted(() => {
  if (!isNew) {
    const author = libraryStore.getAuthorById(authorId);
    if (author) {
      formData.value = {
        name: author.name,
        birthYear: author.birthYear,
      };
    }
  }
});

const schema = yup.object({
  name: yup.string().required("Nome é obrigatório").min(2, "Muito curto"),
  birthYear: yup
    .number()
    .required("Ano de nascimento é obrigatório")
    .min(1, "Ano inválido")
    .max(new Date().getFullYear(), "Ano inválido"),
});

function handleSubmit(values) {
  if (isNew) {
    const newId = libraryStore.getNextAuthorId();
    libraryStore.addAuthor({
      id: newId,
      ...values,
    });
    router.push(`/autores/${libraryStore.getNextAuthorId() - 1 }`);
  } else {
    libraryStore.updateAuthor(authorId, values);
    router.push(`/autores/${authorId}`);
  }
}
</script>

<template>
  <div class="p-6 max-w-2xl mx-auto bg-white shadow rounded-lg mt-6">
    <h1 class="text-2xl font-bold mb-6 text-gray-800">
      {{ isNew ? "Cadastrar Autor" : "Editar Autor" }}
    </h1>

    <Form :validation-schema="schema" @submit="handleSubmit">
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-semibold mb-1">Nome</label>
          <Field
            name="name"
            v-model="formData.name"
            placeholder="Nome completo"
            class="w-full p-inputtext p-component"
          />
          <ErrorMessage name="name" class="text-red-500 text-sm" />
        </div>

        <div>
          <label class="block text-sm font-semibold mb-1">Ano de Nascimento</label>
          <Field
            name="birthYear"
            type="number"
            v-model="formData.birthYear"
            placeholder="Ex: 1972"
            class="w-full p-inputtext p-component"
          />
          <ErrorMessage name="birthYear" class="text-red-500 text-sm" />
        </div>

        <div class="flex justify-between pt-4">
          <button
            type="button"
            class="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
            @click="router.back()"
          >
            Voltar
          </button>

          <button
            type="submit"
            class="px-4 py-2 bg-[#10b981] text-white rounded "
          >
            {{ isNew ? "Criar Autor" : "Salvar Alterações" }}
          </button>
        </div>
      </div>
    </Form>
  </div>
</template>
