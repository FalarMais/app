import { api } from "./api";

class ApiResponse {
  constructor(status, content, message, error) {
    this.status = status;
    this.content = content;
    this.message = message;
    this.error = error;
  }

  isOk() {
    return this.status >= 200 && this.status < 300;
  }

  getContent() {
    if (this.content) {
      return this.content;
    } else {
      throw new Error("Nenhum conteúdo retornado da API.");
    }
  }

  getErrorMessage() {
    if (this.message) {
      return this.message;
    } else if (this.error && this.error.length > 0) {
      return this.error.join("\n");
    } else {
      return "Erro desconhecido.";
    }
  }
}

class ApiClient {
  async post(url, data) {
    try {
      const response = await api.post(url, data);
      return new ApiResponse(
        response.status,
        response.data.content,
        response.data.message,
        response.data.error
      );
    } catch (error) {
      return new ApiResponse(
        error.response.status,
        null,
        error.response.data.message,
        error.response.data.error
      );
    }
  }

  async get(url) {
    try {
      const response = await api.get(url);
      return new ApiResponse(
        response.status,
        // response.data,
        response.data.content,
        response.data.message,
        response.data.error
      );
    } catch (error) {
      return new ApiResponse(
        error.response.status,
        null,
        error.response.data.message,
        error.response.data.error
      );
    }
  }

  async delete(url) {
    try {
      const response = await api.delete(url);
      return new ApiResponse(
        response.status,
        // response.data,
        response.data.content,
        response.data.message,
        response.data.error
      );
    } catch (error) {
      return new ApiResponse(
        error.response.status,
        null,
        error.response.data.message,
        error.response.data.error
      );
    }
  }

  async put(url, data) {
    try {
      const response = await api.put(url, data);
      return new ApiResponse(
        response.status,
        // response.data,
        response.data.content,
        response.data.message,
        response.data.error
      );
    } catch (error) {
      return new ApiResponse(
        error.response.status,
        null,
        error.response.data.message,
        error.response.data.error
      );
    }
  }
}

export { ApiClient, ApiResponse };
