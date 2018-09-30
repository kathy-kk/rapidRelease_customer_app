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

    async function addCustomer (name , date_of_birth, email, phone) {
        const newCustomer = {
            name,
            date_of_birth,
            email,
            phone
        };
        const response = await fetch(`${API_END_POINT}customers/create`,{
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCustomer),
            method: 'POST'
        });
        if(!response.ok) {
            const error = await response.json();
            if(error.error) throw new Error(error.error);
            throw new Error(
                `add customer failed, HTTP status ${ response.status }`
            );
        }
        const data = await response.json();
        return data;
    }
    return {
        fetchCustomers,
        addCustomer
    };

};
export default customerService();