import http from "@/http-common";
import { Diary } from "@/interfaces/index";
import { AxiosPromise } from "axios";

interface GetDiariesResponse {
  status: number;
  data: Diary[];
  message: string;
}

interface PostDiaryResponse {
  status: number;
  message: string;
}

interface DiaryResponse {
  status: number;
  data: Diary;
  message: string;
}

class DiaryApiService {
  getAll(): AxiosPromise<GetDiariesResponse> {
    return http.get("/diaries");
  }
  postDiary(data: Diary): AxiosPromise<PostDiaryResponse> {
    return http.post("/diaries", data);
  }
  getById(id: number): AxiosPromise<DiaryResponse> {
    return http.get(`/diaries/${id}`);
  }
  updateDiary(id: number, data: Diary): AxiosPromise<PostDiaryResponse> {
    return http.put(`/diaries/${id}`, data);
  }
  deleteDiary(id: number): AxiosPromise<DiaryResponse> {
    return http.delete(`/diaries/${id}`);
  }
}

export default new DiaryApiService();
