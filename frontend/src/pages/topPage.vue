<template>
  <v-container>
    <h1>My Diary</h1>
    <v-btn variant="outlined" class="my-3" color="indigo-darken-3">
      <router-link to="/create">CREATE NEW DIARY</router-link>
    </v-btn>
    <v-sheet class="d-flex flex-wrap">
      <div v-for="diary in state.diaries" :key="diary.id">
        <router-link :to="{ name: 'detail', query: { diary_id: diary.id } }">
          <v-card class="my-3 mx-2" max-width="344" hover>
            <v-card-item>
              <v-card-title> {{ diary.title }} </v-card-title>
            </v-card-item>
            <v-card-text>
              <small>{{ diary.date }}</small>
              <p>{{ diary.content }}</p>
            </v-card-text>
          </v-card>
        </router-link>
      </div>
    </v-sheet>
  </v-container>
</template>

<script lang="ts">
import DiaryApiService from "@/services/DiaryApiService";
import { defineComponent, onMounted, reactive } from "vue";
import { Diary } from "@/interfaces/index";

interface State {
  diaries: Diary[];
}

export default defineComponent({
  setup() {
    const state = reactive<State>({
      diaries: [],
    });

    const handleGetDiaries = async (): Promise<void> => {
      try {
        const res = await DiaryApiService.getAll();

        if (res.status === 200) {
          state.diaries = res.data.data;
        }
      } catch (err) {
        console.log(err);
      }
    };
    onMounted(() => {
      handleGetDiaries();
    });

    return {
      state,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

function handleGetDiaries() { throw new Error("Function not implemented."); }
