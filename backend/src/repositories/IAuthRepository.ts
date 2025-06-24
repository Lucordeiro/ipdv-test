import { Job } from '../entities/Job';

export interface IProductRepository {
    createProduct(product: Job): Promise<Job>;
    findProductById(product_id:string): Promise<Job>;
    // listProducts(): Promise<IProduct[]>;
    // updateProduct(product_id: string): Promise<IProduct>;
    // removeProduct(product_id: string): Promise<void>;
}