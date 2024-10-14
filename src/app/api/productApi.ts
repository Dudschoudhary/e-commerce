
import axios from 'axios';

class ProductApi {
    private apiUrl: string = 'https://fakestoreapi.com/products';

    public async fetchProducts() {
        try {
            const response = await axios.get(this.apiUrl);
            return response.data;
        }   catch (error) {
            console.error('some error', error)      
        }
    }
}

const productApi = new ProductApi();

export default productApi;



