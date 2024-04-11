<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores';
import * as Yup from 'yup';
import { Form, Field } from 'vee-validate';
import { ref } from 'vue';

const baseUrl = `${import.meta.env.VITE_API_URL}`;

const authStore = useAuthStore();
const { user: authUser } = storeToRefs(authStore);

const schema = Yup.object().shape({
    qrcPayload: Yup.string().required('Digite o QR Code Payload')
});

async function onSubmit(values, { setErrors }) {
    const requestStructure = {
        "payload": qrcPayload.value,
        "baKey": baKey
    };

    console.log('Objeto Pagamento enviado:', requestStructure);

    try {
        const response = await fetch(`${baseUrl}/api/payStaticPix`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestStructure)
        });

        if (!response.ok) {
            throw new Error('Erro ao tentar realizar o pagamento');
        }

        const responseData = await response.json();
        console.log('Resposta Pagamento:', responseData); // Imprime a resposta no console
        paidPix.value = responseData; // Guarda a resposta em generatedPix

        return responseData;
    } catch (error) {
        setErrors({ apiError: error.message });
    }
}

// API Token Auth
const baKey = authUser.value.key

// Request Data

const qrcPayload = ref('');

const paidPix = ref({});

</script>

<template>
    <div>
        <div class="alert alert-info">
            Pagamento de Pix Estático<br/>
            Bank Account: {{authUser?.bankAccount}} <br/>
            key: {{ authUser?.key.substring(0, 30) }}...
        </div>
        <h2>Pagar Pix</h2>
        <div>
        <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">           
            <div class="form-group">
                <label>Digite o QR Code Payload</label>
                <Field name="qrcPayload" type="text" v-model="qrcPayload" class="form-control" :class="{ 'is-invalid': errors.qrcPayload }" />
                <div class="invalid-feedback">{{errors.qrcPayload}}</div>
            </div>          
            <div class="form-group">
                <button class="btn btn-primary" :disabled="isSubmitting">
                    <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                    Pagar Pix
                </button>
            </div>
            <div v-if="errors.apiError" class="alert alert-danger mt-3 mb-0">{{errors.apiError}}</div>
        </Form>
    </div>
    </div>
</template>