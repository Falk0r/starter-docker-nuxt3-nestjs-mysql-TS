import type {UseFetchOptions} from "nuxt/app";
import {defu} from "defu";

export async function useApiFetch<T>(
  url: string,
  options: UseFetchOptions<T> = {}
) {
  const userAuth = useCookie("auth:token");
  const config = useRuntimeConfig();

  const defaults: UseFetchOptions<T> = {
    baseURL: "http://localhost:3500/",
    // cache request
    key: url,

    // set user token if connected
    headers: userAuth.value ? {Authorization: `Bearer ${userAuth.value}`} : {},

    onResponse(_ctx) {
      // _ctx.response._data = new myBusinessResponse(_ctx.response._data)
    },

    onResponseError(_ctx) {
      // throw new myBusinessError()
    },
  };

  const params = defu(options, defaults);

  return useFetch(url, params);
}
