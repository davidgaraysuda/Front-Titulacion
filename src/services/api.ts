import getHeadersAndToken from '../utils/Headers';

interface Credentials {
  email: string;
  password: string;
}


const API_BASE_URL = 'https://sudamericanoconv.up.railway.app'; // Reemplaza con la URL real de tu API

export const api = async (
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body: any = null
  ) => {
    const options: any = {
      method,
      headers: getHeadersAndToken(),
    };
  
    if (body) {
      options.body = JSON.stringify(body);
    }
  
    try {
      const response = await fetch(API_BASE_URL + url, options);
      if (!response.ok) {
        throw new Error('Request failed');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  };

  const login = async (credentials: Credentials) => {
    const cokieActual = document.cookie;
    try {
      const response = await fetch('https://sudamericanoconv.up.railway.app/api/v1/auth/authenticate', {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'authorization': cokieActual.replace('token=','Bearer '),
          'Content-type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
  
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };
  
  export { login };
  