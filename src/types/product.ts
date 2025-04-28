export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
    reviews?: Review[];
    availabilityStatus: string;
    tags: string[];
    warrantyInformation: string;
}

export interface Review {
    id: number;
    comment: string;
    rating: number;
    
}
export interface ProductResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

export type CategoryResponse = string[];