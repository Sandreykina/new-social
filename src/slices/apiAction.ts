import axios, { Method, AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface ConfigForAxiosType {
  url?: string,
  method?: Method,
  data?: any,
  onSuccess?: (res: any) => void,
  onFailure: (err?: AxiosError) => void,
}

export const apiAction = ( 
  type: string, 
  getConfig: (arg: ConfigForAxiosType, thunkApi: any) => ConfigForAxiosType
  )  => {
  const asyncThunk =  createAsyncThunk(
    type,
    async (arg: ConfigForAxiosType, thunkApi) => {
      //const configForAxios: ConfigForAxiosType = getConfig(arg, thunkApi);
      const {
        url,
        method,
        data = {},
        onSuccess,
        onFailure,
      } =  getConfig(arg, thunkApi);

      return axios({ url, method, data }) 
        .then((res) => {
          if (onSuccess) onSuccess(res.data);
          return res.data;
        })
        .catch((err) => {
          if (onFailure) onFailure(err);
          throw err;
        });
    }
  )
  return [asyncThunk];
};
