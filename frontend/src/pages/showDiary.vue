<template>
  <v-container>
    <h1>Diary</h1>
    <v-btn variant="outlined" class="my-3" color="indigo-darken-3">
      <router-link to="/">TOP</router-link>
    </v-btn>
    <v-card v-if="isEditMode" class="mx-auto" :key="isEditMode.valueof">
      <v-card-item>
        <v-card-title> [ {{ state.date }} ] {{ state.title }} </v-card-title>
      </v-card-item>
      <v-card-text class="bg-surface-light pt-4">
        {{ state.content }}
      </v-card-text>
    </v-card>
    <v-card v-else class="mx-auto">
      <v-card-title>edit diary</v-card-title>
      <v-card-text>
        <v-text-field v-model="state.title" label="title"> </v-text-field>
        <v-textarea v-model="state.content" label="content"> </v-textarea>
      </v-card-text>
      <v-card-actions class="d-flex justify-center">
        <v-btn v-on:click="handleEditDiary">UPDATE</v-btn>
      </v-card-actions>
    </v-card>
    <v-btn
      variant="outlined"
      class="my-3"
      color="indigo-darken-3"
      v-on:click="onEditMode"
    >
      {{ isEditMode ? "EDIT" : "SHOW" }}
    </v-btn>
    <v-btn
      variant="outlined"
      class="my-3 mx-2"
      color="indigo-darken-3"
      v-on:click="handleDeleteDiary"
    >
      DELETE
    </v-btn>
  </v-container>
</template>
<script lang="ts">
import DiaryApiService from "@/services/DiaryApiService";
import { defineComponent, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    const state = reactive({
      title: "",
      content: "",
      date: "",
    });
    const diary_id: string | undefined = route.query.diary_id as string;
    let isEditMode = ref(false);
    const handleGetDiary = async (): Promise<void> => {
      try {
        let id = parseInt(diary_id);
        const res = await DiaryApiService.getById(id);
        if (res.status === 200) {
          state.title = res.data.data.title;
          state.content = res.data.data.content;
          state.date = res.data.data.date;
        }
      } catch (err) {
        console.log(err);
      }
    };

    const handleEditDiary = async (): Promise<void> => {
      try {
        let id = parseInt(diary_id);
        const res = await DiaryApiService.updateDiary(id, state);
        if (res.status === 200) {
          handleGetDiary();
          isEditMode.value = false;
        }
      } catch (err) {
        console.log(err);
      }
    };

    const handleDeleteDiary = async (): Promise<void> => {
      try {
        let id = parseInt(diary_id);
        const res = await DiaryApiService.deleteDiary(id);
        if (res.status === 200) {
          router.push({ name: "top" });
        }
      } catch (err) {
        console.log(err);
      }
    };

    const onEditMode = () => {
      isEditMode.value = !isEditMode.value;
    };

    onMounted(() => {
      handleGetDiary();
    });
    return {
      state,
      diary_id,
      isEditMode,
      handleEditDiary,
      onEditMode,
      handleDeleteDiary,
    };
  },
});
</script>
