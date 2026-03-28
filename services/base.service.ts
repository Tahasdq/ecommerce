import axios from "axios";

export class BaseService {
  protected baseUrl: string; // we need to define type in here otherwise ts error

  constructor() {
    this.baseUrl =  "/api";
  }

  async get(url:any, params?:any) {
    try {
      const response = await axios.get(`${this.baseUrl}${url}`, { params, withCredentials: true });
      return response.data;
    } catch (error:any) {
      if(error.response){
        const{status , data , success} = error?.response
        throw  {
          message:data.message,
          status,
          success:success,
          original: error,
        }
      }
      throw {
        message :"check your internet connection"
      }
      
    }
  }
  async post(url:any, payload:any) {
    try {
      const response = await axios.post(`${this.baseUrl}${url}`, payload ,  { withCredentials: true  });
      return response.data;
    } catch (error:any) {
      if(error.response){
        const{status , data , success} = error?.response
        throw  {
          message:data.message,
          status,
          success:success,
          original: error,
        }
      }
      throw {
        message :"check your internet connection"
      }
      
    }
  }
  async put(url:any, payload:any) {
    try {
      const response = await axios.put(`${this.baseUrl}/${url}`, payload ,  { withCredentials: true });
      return response.data;
    } catch (error:any) {
      if(error.response){
        const{status , data , success} = error?.response
        throw  {
          message:data.message,
          status,
          success:success,
          original: error,
        }
      }
      throw {
        message :"check your internet connection"
      }
      
    }
  }
  async patch(url:any, payload:any) {
    try {
      const response = await axios.patch(`${this.baseUrl}/${url}`, payload ,  { withCredentials: true });
      return response.data;
    } catch (error:any) {
      if(error.response){
        const{status , data , success} = error?.response
        throw  {
          message:data.message,
          status,
          success:success,
          original: error,
        }
      }
      throw {
        message :"check your internet connection"
      }
      
    }
  }
  async delete(url:any , payload:any){
    try {
      const response = await axios.delete(`${this.baseUrl}/${url}`, { data: payload, withCredentials: true });
      return response.data;
    } catch (error:any) {
      if(error.response){
        const{status , data , success} = error?.response
        throw  {
          message:data.message,
          status,
          success:success,
          original: error,
        }
      }
      throw {
        message :"check your internet connection"
      }
      
    }
  }
}
