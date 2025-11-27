<script setup>
import { ref } from 'vue';
import { string, number } from 'yup';
import { useForm } from 'vee-validate';
import { useToast } from 'primevue/usetoast';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import FormItem from './FormItem.vue';

const formId = 'example';
const counter = ref(0);
const handleCounter = () => counter.value++;
const toast = useToast();

const schema = {

    texto: string().min(0).max(100).required().label('Texto'),
    numero: number().min(0).max(100).required().label('Numero')
};

const {

    defineField,
    handleSubmit,
    resetForm
    
} = useForm({ validationSchema: schema });

const [texto] = defineField('texto');
const [numero] = defineField('numero');

const onSubmit = handleSubmit((values) => {

    log(values);

    toast.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Informações salvas com sucesso!',
        life: 3000,
    });

}, (error) => {

    log(error)

    toast.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Não foi possível salvar!',
        life: 3000,
    });
});

</script>
<template>
    <div class="w-full">
        <div class="flex justify-center text-2xl">
            <span>Home</span>
        </div>

        <div class="card mt-10">
            <div class="title">Example of card</div>
            <p class="text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex
                ea commodo consequat.
            </p>
            <div class="mt-10">
                <Button
                    icon="pi pi-plus"
                    :label="`Clicks: ${counter}`"
                    @click="handleCounter"
                />
            </div>
        </div>

        <form
            @submit="onSubmit"
            :id="formId"
            autocomplete="off"
        >
            <div class="card mt-10">
                <div class="title">Form</div>

                <div class="flex gap-3">
                    <FormItem
                        name="texto"
                        label="Campo 1"
                        class="w-1/4"
                    >
                        <InputText
                            placeholder="placeholder"
                            v-model="texto"
                        />
                    </FormItem>
                    <FormItem
                        name="numero"
                        label="Campo 2"
                        class="w-64"
                    >
                        <InputNumber min="0" max="100" v-model="numero"/>
                    </FormItem>
                </div>

                <Button
                    @click="onSubmit"
                    type="submit"
                    :form="formId"
                    label="Salvar"
                    icon="pi pi-save"
                    severity="success"
                />
            </div>
        </form>


    </div>
</template>