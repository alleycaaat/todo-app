/* these API methods will call the functions in the backend to make the database things do */

const readall = () => {
    return fetch('/.netlify/functions/readall').then((response) => {
        return response.json();
    });
};

const create = (data) => {
    return fetch('/.netlify/functions/create', {
        body: JSON.stringify(data),
        method: 'POST',
    }).then((response) => {
        return response.json();
    }); 
};

const erase = (id) => {
    return fetch('/.netlify/functions/erase', {
        method: 'POST',
        body: JSON.stringify(id),
    }).then((response) => {
        return response.json();
    });
};
const api = {
    create,
    readall,
    erase,
};

export default api;
