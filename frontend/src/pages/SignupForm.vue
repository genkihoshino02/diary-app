<template>
  <v-component>
    <h2>SIGN UP</h2>
    <div v-for="error in errors" :key="error">
      <v-alert density="compact" type="warning" class="my-3">
        {{ error }}
      </v-alert>
    </div>
    <v-sheet class="mx-auto" width="500">
      <div>
        <v-text-field v-model="formData.name" label="name"></v-text-field>
        <v-text-field v-model="formData.email" label="email"></v-text-field>
        <v-text-field
          v-model="formData.password"
          type="password"
          label="password"
        ></v-text-field>
        <v-text-field
          v-model="formData.password_confirmation"
          type="password"
          label="password_confirmation"
        ></v-text-field>
        <v-btn v-on:click="handleSignUp" class="mt-2" type="submit" block
          >SIGN UP</v-btn
        >
      </div>
    </v-sheet>
    <v-btn variant="outlined" class="my-3" color="indigo-darken-3">
      <router-link to="/login">LOG IN PAGE</router-link>
    </v-btn>
  </v-component>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import ClientApiService from "@/services/ClientApiService";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const formData = reactive({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    });
    const router = useRouter();
    const errors = ref([]);
    const handleSignUp = async (): Promise<void> => {
      try {
        const res = await ClientApiService.signup(formData);
        if (res?.status === 200) {
          router.push({ name: "login" });
        }
      } catch (err: any) {
        console.log(err.response.data.errors);
        errors.value = Array.isArray(err.response.data.errors)
          ? err.response.data.errors
          : [err.response.data.errors];
      }
    };
    return {
      formData,
      errors,
      handleSignUp,
    };
  },
});
</script>
