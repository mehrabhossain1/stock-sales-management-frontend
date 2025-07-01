import type { Product, FeaturedProduct } from "@/types/product";

// Mock API functions - replace with your actual API calls
export const fetchFeaturedProducts = async (): Promise<FeaturedProduct[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return [
        {
            id: "1",
            name: "Premium Wireless Headphones",
            price: 299.99,
            originalPrice: 399.99,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
            category: "Electronics",
            rating: 4.8,
            isNew: true,
            isFeatured: true,
            discount: 25,
            description:
                "High-quality wireless headphones with noise cancellation",
        },
        {
            id: "2",
            name: "Smart Fitness Watch",
            price: 199.99,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
            category: "Electronics",
            rating: 4.6,
            isFeatured: true,
            description:
                "Track your fitness goals with this advanced smartwatch",
        },
        {
            id: "3",
            name: "Organic Cotton T-Shirt",
            price: 29.99,
            originalPrice: 39.99,
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
            category: "Fashion",
            rating: 4.4,
            isFeatured: true,
            discount: 25,
            description: "Comfortable and sustainable organic cotton tee",
        },
    ];
};

export const fetchHighlightedProducts = async (): Promise<Product[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    return [
        {
            id: "4",
            name: "Leather Wallet",
            price: 79.99,
            image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=300&h=300&fit=crop",
            category: "Accessories",
            rating: 4.7,
            isNew: true,
        },
        {
            id: "5",
            name: "Coffee Maker",
            price: 149.99,
            originalPrice: 199.99,
            image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop",
            category: "Home",
            rating: 4.5,
            discount: 25,
        },
        {
            id: "6",
            name: "Running Shoes",
            price: 129.99,
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
            category: "Sports",
            rating: 4.8,
        },
        {
            id: "7",
            name: "Bluetooth Speaker",
            price: 89.99,
            originalPrice: 119.99,
            image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop",
            category: "Electronics",
            rating: 4.3,
            discount: 25,
        },
    ];
};
