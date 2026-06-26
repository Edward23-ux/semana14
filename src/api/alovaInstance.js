import { createAlova } from 'alova';
import ReactHook from 'alova/react';
import adapterFetch from 'alova/fetch';


export const alovaInstance = createAlova({
  baseURL: 'https://rickandmortyapi.com/api',
  statesHook: ReactHook,
  requestAdapter: adapterFetch(),
  cacheFor: null,
  responded: (response) => response.json()
});

export const getCharacters = () => alovaInstance.Get('/character');
