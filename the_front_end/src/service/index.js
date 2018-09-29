const API_END_POINT = 'http://127.0.0.1:3000/api/';

const customerService = () => {
   
    async function fetchCustomers () {
        const response = await fetch(`${API_END_POINT}customers/`, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        });
        if(!response.ok){
            throw new Error(`fetch customers failed, HTTP status ${ response.status }`);
        }
        const data = await response.json();
        return data;
    }
    return {
        fetchCustomers
    };
};
export default customerService();
