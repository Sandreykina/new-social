import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const apiAction = ( type, getConfig ) => {
  const a =  createAsyncThunk(
    type,
    async (arg, thunkApi) => {
      const configForAxios = getConfig(arg, thunkApi);
      const {
        url,
        method = 'GET',
        params = {},
        data = {},
        onSuccess,
        onFailure,
      } = configForAxios;

      return axios({ url, method, params, data, })
        .then((res) => {
          if (onSuccess) onSuccess(res.data);
          return res.data;
        })
        .catch((err) => {
          if (onFailure) onFailure(err);
          throw err;
        });
    },
  )
  return [a];
};
