<template>
  <v-component>
    <div class="d-flex justify-space-around mb-3">
      <div>
        <h3>Diary</h3>
      </div>
      <div>
        <v-button v-on:click="handleLogout" color="red">LOGOUT</v-button>
      </div>
    </div>
  </v-component>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import ClientApiService from "@/services/ClientApiService";
import { removeAuthDataFromStorage } from "@/utils/auth-data";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();

    const handleLogout = async (): Promise<void> => {
      try {
        const res = await ClientApiService.logout();
        if (res.status === 200) {
          removeAuthDataFromStorage();
          router.push({ name: "login" });
        }
      } catch (err) {
        console.log(err);
      }
    };
    return {
      handleLogout,
    };
  },
});
</script>
