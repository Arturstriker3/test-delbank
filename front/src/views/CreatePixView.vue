<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores';

const authStore = useAuthStore();
const { user: authUser } = storeToRefs(authStore);

// API Token Auth
const baKey = authUser.value.key
console.log(baKey);



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
    </div>
    </div>
    
</template>