import http from "@/http-common";
import { Diary } from "@/interfaces/index";
import { getAuthDataFromStorage } from "@/utils/auth-data";
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
    return http.get("/diaries", {
      headers: getAuthDataFromStorage(),
    });
  }
  postDiary(data: Diary): AxiosPromise<PostDiaryResponse> {
    return http.post("/diaries", data, {
      headers: getAuthDataFromStorage(),
    });
  }
  getById(id: number): AxiosPromise<DiaryResponse> {
    return http.get(`/diaries/${id}`, {
      headers: getAuthDataFromStorage(),
    });
  }
  updateDiary(id: number, data: Diary): AxiosPromise<PostDiaryResponse> {
    return http.put(`/diaries/${id}`, data, {
      headers: getAuthDataFromStorage(),
    });
  }
  deleteDiary(id: number): AxiosPromise<DiaryResponse> {
    return http.delete(`/diaries/${id}`, {
      headers: getAuthDataFromStorage(),
    });
  }
}

export default new DiaryApiService();
