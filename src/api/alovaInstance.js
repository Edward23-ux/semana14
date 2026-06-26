import { createAlova } from 'alova';
import ReactHook from 'alova/react';
import adapterFetch from 'alova/fetch';

// Instancia central de Alova: aquí se define la baseURL, el adaptador
// de petición (fetch) y el statesHook (cómo se integra con React).
export const alovaInstance = createAlova({
  baseURL: 'https://jsonplaceholder.typicode.com',
  statesHook: ReactHook,
  requestAdapter: adapterFetch(),
  cacheFor: null, // sin caché, para ver siempre datos frescos en la demo
  responded: (response) => response.json()
});

// "Method" reutilizable: obtener una lista de tareas (posts) de prueba.
export const getPosts = () => alovaInstance.Get('/posts', { params: { _limit: 5 } });
