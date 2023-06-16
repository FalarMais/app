import { api } from "./api";

class ApiResponse {
  constructor(status, content, error, message) {
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
        response.data.statusCode,
        response.data.content,
        response.data.errors,
        response.data.message
      );
    } catch (error) {
      return new ApiResponse(
        error.data.statusCode,
        error.data.content,
        error.data.errors,
        error.data.message
      );
    }
  }

  async get(url) {
    try {
      const response = await api.get(url);
      return new ApiResponse(
        response.data.statusCode,
        response.data.content,
        response.data.errors,
        response.data.message
      );
    } catch (error) {
      return new ApiResponse(
        error.data.statusCode,
        error.data.content,
        error.data.errors,
        error.data.message
      );
    }
  }

  async delete(url) {
    try {
      const response = await api.delete(url);
      return new ApiResponse(
        response.data.statusCode,
        response.data.content,
        response.data.errors,
        response.data.message
      );
    } catch (error) {
      return new ApiResponse(
        error.data.statusCode,
        error.data.content,
        error.data.errors,
        error.data.message
      );
    }
  }

  async put(url, data) {
    try {
      const response = await api.put(url, data);
      return new ApiResponse(
        response.data.statusCode,
        response.data.content,
        response.data.errors,
        response.data.message
      );
    } catch (error) {
      return new ApiResponse(
        error.data.statusCode,
        error.data.content,
        error.data.errors,
        error.data.message
      );
    }
  }
}

export { ApiClient, ApiResponse };
