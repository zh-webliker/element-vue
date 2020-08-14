/***
 * 封装接口
 */

import axios from "axios";

export const queryTrzk = (params) => {
  return axios.get('trhjAction!queryTrzk', {
    params
  })
};

export const queryTrzkQX = (params) => {
  return axios.get('trhjAction!queryTrzkQX', {
    params
  })
};