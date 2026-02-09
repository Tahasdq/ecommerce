import { BaseService } from "./base.service";

const ADD_PRODUCT = "product/createProduct"
const GET_ALL_PRODUCTS = "product"
const GET_PRODUCT_BY_ID = "product"
const DELETE_PRODUCT_BY_ID = "product"

interface FilterParams {
    categories?: string[];
    minPrice?: number;
    maxPrice?: number;
    sizes?: string[];
}

class ProductService extends BaseService{
    async createProduct(payload:any) {
       return this.post(ADD_PRODUCT,payload)
    }
    async getProducts(payload?:any){
        return this.get(GET_ALL_PRODUCTS)
    }
    async getFilteredProducts(filters: FilterParams) {
        const params = new URLSearchParams();
        
        if (filters.categories && filters.categories.length > 0) {
            params.append('categories', filters.categories.join(','));
        }
        if (filters.minPrice !== undefined) {
            params.append('minPrice', filters.minPrice.toString());
        }
        if (filters.maxPrice !== undefined) {
            params.append('maxPrice', filters.maxPrice.toString());
        }
        if (filters.sizes && filters.sizes.length > 0) {
            params.append('sizes', filters.sizes.join(','));
        }
        
        return this.get(`${GET_ALL_PRODUCTS}?${params.toString()}`)
    }
    async deleteProduct(id?:any,payload?:any){
        return this.delete(`${DELETE_PRODUCT_BY_ID}/${id}`,payload)
    }
    async getProductById(id?:any,payload?:any){
        return this.get(`${GET_PRODUCT_BY_ID}/${id}`,payload)
    }
}

export default ProductService