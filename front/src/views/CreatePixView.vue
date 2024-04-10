<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores';
import * as Yup from 'yup';
import { Form, Field } from 'vee-validate';
import { ref } from 'vue';


const authStore = useAuthStore();
const { user: authUser } = storeToRefs(authStore);

const schema = Yup.object().shape({
    amount: Yup.number().required('Digite um valor maior que 0'),
    additionalInformation: Yup.string().required('Digite uma descrição adicional para o pix')
});

function onSubmit() {
    const requestStructure = {
        "type": "PIX_STATIC",
        "correlationId": "{{$guid}}",
        "description": `${authUser.value.lastName} - Vupix Static Pix`,
        "amount": requestAmount.value,
        "additionalInformation": requestAdditionalInformation.value
    };

    // Send requestStructure
    console.log(requestStructure);
}

// API Token Auth
const baKey = authUser.value.key
console.log(baKey);

// Request Data

const requestAmount = ref(0);
const requestAdditionalInformation = ref(`Pix para - ${authUser.value.lastName}`);

function validateInput() {
    if (requestAmount.value < 0) {
        requestAmount.value = 0;
    }
}

</script>

<template>
    <div>
    <div class="alert alert-info">
        Geração de Pix Estático<br/>
        Bank Account: {{authUser?.bankAccount}} <br/>
        key: {{ authUser?.key.substring(0, 30) }}...
    </div>
    <div>
        <h2>Gerar Pix</h2>
        <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">           
            <div class="form-group">
                <label>Valor</label>
                <Field name="amount" type="number" v-model="requestAmount" @input="validateInput" class="form-control" :class="{ 'is-invalid': errors.amount }" />
                <div class="invalid-feedback">{{errors.amount}}</div>
            </div>
            <div class="form-group">
                <label>Descrição Adicional</label>
                <Field name="additionalInformation" type="text" v-model="requestAdditionalInformation" class="form-control" :class="{ 'is-invalid': errors.additionalInformation }" />
                <div class="invalid-feedback">{{errors.additionalInformation}}</div>
            </div>          
            <div class="form-group">
                <button class="btn btn-primary" :disabled="isSubmitting">
                    <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                    Gerar Pix
                </button>
            </div>
            <div v-if="errors.apiError" class="alert alert-danger mt-3 mb-0">{{errors.apiError}}</div>
        </Form>
    </div>
    </div>
    
</template>