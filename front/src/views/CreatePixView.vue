<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores';
import * as Yup from 'yup';
import { Form, Field } from 'vee-validate';
import { ref } from 'vue';


const authStore = useAuthStore();
const { user: authUser } = storeToRefs(authStore);

const schema = Yup.object().shape({
    username: Yup.string().required('Usuário é necessário'),
    amount: Yup.number().required('Digite um valor maior que 0'),
    additionalInformation: Yup.string().required('Digite uma descrição adicional para o pix')
});

function onSubmit(values, { setErrors }) {
    const authStore = useAuthStore();
    const { username, password } = values;

    return authStore.login(username, password)
        .catch(error => setErrors({ apiError: error }));
}

// API Token Auth
const baKey = authUser.value.key
console.log(baKey);

// Request Data

const theUser = authUser.value.lastName
console.log(theUser);

const requestAmount = ref(0);

function validateInput() {
    if (requestAmount.value < 0) {
        requestAmount.value = 0;
    }
}

const requestAdditionalInformation = ref(`Pix para - ${theUser}`);

const requestStructure = {
    "type": "PIX_STATIC",
    "correlationId": "{{$guid}}",
    "description": `${theUser} - Vupix Static Pix`,
    "amount": requestAmount,
    "additionalInformation": requestAdditionalInformation
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