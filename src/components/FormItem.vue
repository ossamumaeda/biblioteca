<script setup>
    import { ErrorMessage, useFieldError } from 'vee-validate';

    const props = defineProps({
        label: {
            type: String,
        },
        name: {
            type: String,
        },
        error: {
            type: Boolean,
            default: false,
        },
        editable: {
            type: Boolean,
            default: true
        }
    });
    const message = props.editable && useFieldError(props.name);

</script>
<template>
    <div :class="{ 'form-item': true, 'has-error': editable && message }">
        <label
            :for="name"
            v-if='label'
        >{{ label }}</label>
        <slot name="default"></slot>
        <ErrorMessage
            :name="name"
            as="small"
            class="p-error"
            v-if="editable"
        />
    </div>
</template>
<style scoped lang="less">
.form-item {
    // flex: 0 0 auto;
    // padding: 0.5rem;
    // width: 100%;
    // box-sizing: border-box;
    margin-bottom: 1rem;

    >label {
        font-weight: 500;
        display: inline-block;
        margin-bottom: 0.5rem;
    }

    .label-slot {
        // font-weight: 500;
        display: inline-flex;
    }

    &.has-error {
        
        >label, > small{
            color: #e24c4c;
        }

        :deep(.p-component.p-inputtext) {
            border-color: #f0a9a7;

            &:enabled:focus {
                box-shadow: 0 0 0 1px #f0a9a7;
            }
        }

        :deep(.p-dropdown.p-component) {
            border-color: #f0a9a7;

            &:enabled:focus {
                box-shadow: 0 0 0 1px #f0a9a7;
            }
        }

        :deep(.picker-select) {
            border-color: #f0a9a7;

            &:enabled:focus {
                box-shadow: 0 0 0 1px #f0a9a7;
            }
        }

        :deep(.p-editor-container) {
            border-color: #f0a9a7;

            &:enabled:focus {
                box-shadow: 0 0 0 1px #f0a9a7;
            }
        }
    }

    //todo component dentro do form tem width 100%
    :deep(.p-component) {
        &.p-inputtext {
            width: 100%;
        }

        &.p-dropdown {
            width: 100%;
        }

        &.p-password {
            width: 100%;
        }

        &.p-inputnumber {
            width: 100%;
        }
    }

    //selectbutton width 100%
    :deep(.p-selectbutton) {
        display: flex;

        >div {
            flex-grow: 1;
        }
    }
}
</style>
