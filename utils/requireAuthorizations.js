
async function pay(token) {
    const url = 'http://127.0.0.1:5000/make_payment';
    const data = {
        token: token
    };
     
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });  

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
       return ('Success:', result);
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error; 
    }
}
module.exports = { pay };