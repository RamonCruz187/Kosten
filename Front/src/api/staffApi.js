import axios from 'axios';

const API_URL = 'http://localhost:8080/api';
const API_URL_PROD = 'https://kostentours-api-10061c08f8f8.herokuapp.com';

export const createStaff = ( body ) => {

  const authLS = localStorage.getItem('userAuth');
    const auth = JSON.parse(authLS);

  return axios.post(
      `${API_URL_PROD}/staff/new`,
      body,
      {
        headers: {
          'Authorization': `Bearer ${auth.token}`
        }
      }
  );
};

export const getAllStaff = () => {

    const authLS = localStorage.getItem('userAuth');
    const auth = JSON.parse(authLS);

    return axios.get(
        `${API_URL_PROD}/staff/all`,
        {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        }
    );
};

export const getStaffById = ( id ) => {

    const authLS = localStorage.getItem('userAuth');
    const auth = JSON.parse(authLS);

    return axios.get(
        `${API_URL_PROD}/staff/${ id }`,
        {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        }
    );
};

export const updateStaff = ( body ) => {

    const authLS = localStorage.getItem('userAuth');
    const auth = JSON.parse(authLS);

    return axios.put(
        `${API_URL_PROD}/staff/update`,
        body,
        {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        }
    );
};

export const deletePackage = ( id ) => {

    const authLS = localStorage.getItem('userAuth');
    const auth = JSON.parse(authLS);

    return axios.delete(
        `${API_URL_PROD}/staff/${ id }`,
        {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        }
    );
};