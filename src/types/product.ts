export interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    rating?: number;
    isNew?: boolean;
    isFeatured?: boolean;
    discount?: number;
}

export interface FeaturedProduct extends Product {
    isFeatured: true;
    description?: string;
}
