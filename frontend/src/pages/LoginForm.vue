<template>
  <v-component>
    <h2>LOGIN</h2>
    <div v-for="error in errors" :key="error">
      <v-alert density="compact" type="warning" class="my-3">
        {{ error }}
      </v-alert>
    </div>
    <v-sheet class="mx-auto" width="500">
      <div>
        <v-text-field v-model="formData.email" label="email"></v-text-field>
        <v-text-field
          v-model="formData.password"
          type="password"
          label="password"
        ></v-text-field>
        <v-btn v-on:click="handleLogin" class="mt-2" type="submit" block
          >LOGIN</v-btn
        >
      </div>
    </v-sheet>
  </v-component>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import ClientApiService from "@/services/ClientApiService";
import { useRouter } from "vue-router";
import { setAuthDataFromResponse } from "@/utils/auth-data";
import { AuthHeaders } from "@/types/auth";

export default defineComponent({
  setup() {
    const formData = reactive({
      email: "",
      password: "",
    });
    const router = useRouter();
    const errors = ref([]);
    const handleLogin = async (): Promise<void> => {
      try {
        const res = await ClientApiService.login(formData);
        console.log(res);
        if (res?.status === 200) {
          console.log(res);
          const authHeaders: AuthHeaders = {
            "access-token": res.headers["access-token"] as string,
            uid: res.headers.uid as string,
            client: res.headers.client as string,
            expiry: res.headers.expiry as string,
            "Content-Type": res.headers["Content-Type"] as string,
          };
          setAuthDataFromResponse(authHeaders);
          router.push({ name: "top" });
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
      handleLogin,
    };
  },
});
</script>
