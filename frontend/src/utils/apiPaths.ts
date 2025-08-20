export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
  AUTH: {
    REGISTER: "api/auth/register",
    LOGIN: "/api/auth/login",
    LOGOUT: "/api/auth/logout",
    GET_PROFILE: "/api/auth/profile",
  },
  IMAGE: {
    UPLOAD_IMAGE: "/api/auth/upload-image",
  },
  LESSON: {
    CREATE: "/api/lessons/create",
    GET_ALL: "/api/lessons/my-lessons",
    GET_ONE: (id: string) => `/api/lessons/${id}`,
    DELETE: (id: string) => `/api/lessons/${id}`,
  },
  QUESTION: {
    ADD_TO_LESSON: "/api/questions/add",
    PIN: (id: string) => `/api/questions/${id}/pin`,
    UPDATE_NOTE: (id: string) => `/api/questions/${id}/note`,
  },
  AI: {
    GENERATE_QUESTIONS: "/api/ai/generate-questions",
    GENERATE_EXPLANATION: "/api/ai/generate-explanation",
  },
};
