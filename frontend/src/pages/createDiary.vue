<template>
  <v-container>
    <v-card>
      <v-card-title>create diary</v-card-title>
      <div v-for="(value, key) of errors" :key="key">
        <v-alert density="compact" type="warning" class="my-3">
          {{ key + " : " + value.join(" / ") }}
        </v-alert>
      </div>
      <v-card-text>
        <v-text-field v-model="state.title" label="title"> </v-text-field>
        <v-textarea v-model="state.content" label="content"> </v-textarea>
      </v-card-text>
      <v-card-actions class="d-flex justify-center">
        <v-btn v-on:click="handlePostDiary">submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script lang="ts">
import DiaryApiService from "@/services/DiaryApiService";
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const state = reactive({
      title: "",
      content: "",
      date: "",
    });
    const errors = ref({});
    const handlePostDiary = async (): Promise<void> => {
      try {
        state.date = new Date().toISOString().split("T")[0];
        const res = await DiaryApiService.postDiary(state);
        if (res.data.status === 200) {
          router.push({ name: "top" });
        } else {
          errors.value = res.data.message;
        }
      } catch (err) {
        console.log(err);
      }
    };

    return {
      state,
      errors,
      handlePostDiary,
    };
  },
});
</script>
