import {createApi} from '@reduxjs/toolkit/query/react';
import type {BaseQueryFn} from '@reduxjs/toolkit/query';
import axios from 'axios';
import type {AxiosRequestConfig, AxiosError} from 'axios';

const axiosBaseQuery =
  (
    {baseUrl}: {baseUrl: string} = {baseUrl: ''},
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
    },
    unknown,
    unknown
  > =>
  async ({url, method, data, params}) => {
    try {
      const result = await axios({url: baseUrl + url, method, data, params});
      return {data: result.data};
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

const BASE_URL =
  'https://automation.orangedigital.au/api/od/challenge/react/redux/challenge-endpoint';

export const baseApi = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: () => ({}),
});

export const addTagTypes = ['API'] as const;

export const api = baseApi
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: build => ({
      getApi: build.query<any, void>({
        query: () => ({url: '/', method: 'GET'}),
        providesTags: ['API'],
      }),
    }),
  });
