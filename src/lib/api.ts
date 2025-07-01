import type { Product, FeaturedProduct } from "@/types/product";
import type { Category } from "@/types/category";
import type { Deal } from "@/types/deal";

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

export const fetchCategories = async (): Promise<Category[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    return [
        {
            id: "1",
            name: "Electronics",
            image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=300&fit=crop",
            slug: "electronics",
            productCount: 1250,
            color: "#3B82F6",
        },
        {
            id: "2",
            name: "Fashion",
            image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=300&fit=crop",
            slug: "fashion",
            productCount: 890,
            color: "#EC4899",
        },
        {
            id: "3",
            name: "Home & Garden",
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop",
            slug: "home-garden",
            productCount: 650,
            color: "#10B981",
        },
        {
            id: "4",
            name: "Sports & Fitness",
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
            slug: "sports-fitness",
            productCount: 420,
            color: "#F59E0B",
        },
        {
            id: "5",
            name: "Beauty & Health",
            image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop",
            slug: "beauty-health",
            productCount: 380,
            color: "#8B5CF6",
        },
        {
            id: "6",
            name: "Books & Media",
            image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop",
            slug: "books-media",
            productCount: 290,
            color: "#EF4444",
        },
        {
            id: "7",
            name: "Automotive",
            image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=300&h=300&fit=crop",
            slug: "automotive",
            productCount: 180,
            color: "#6366F1",
        },
        {
            id: "8",
            name: "Toys & Games",
            image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=300&h=300&fit=crop",
            slug: "toys-games",
            productCount: 340,
            color: "#14B8A6",
        },
    ];
};

export const fetchDealsOfTheDay = async (): Promise<Deal[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 900));

    // Create end dates (some ending soon, some with more time)
    const now = new Date();
    const endDate1 = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000); // 2 days from now
    const endDate2 = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000); // 5 days from now
    const endDate3 = new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000); // 1 day from now

    return [
        {
            id: "deal-1",
            title: "Premium Skincare Bundle Pack",
            description:
                "Complete skincare routine with shampoo, conditioner & facewash. Perfect for daily use with natural ingredients.",
            image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop",
            price: 150.0,
            originalPrice: 200.0,
            rating: 4.2,
            maxRating: 5,
            soldCount: 20,
            availableCount: 40,
            endDate: endDate1.toISOString(),
            category: "Beauty & Health",
            slug: "premium-skincare-bundle",
            discount: 25,
        },
        {
            id: "deal-2",
            title: "Rose Gold Diamond Earrings",
            description:
                "Elegant rose gold earrings with premium diamonds. Perfect for special occasions and daily wear.",
            image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=500&fit=crop",
            price: 1990.0,
            originalPrice: 2000.0,
            rating: 4.8,
            maxRating: 5,
            soldCount: 15,
            availableCount: 40,
            endDate: endDate2.toISOString(),
            category: "Jewelry",
            slug: "rose-gold-diamond-earrings",
            discount: 5,
        },
        {
            id: "deal-3",
            title: "Smart Home Security Camera",
            description:
                "Advanced security camera with night vision, motion detection, and mobile app control for complete home monitoring.",
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop",
            price: 299.99,
            originalPrice: 399.99,
            rating: 4.6,
            maxRating: 5,
            soldCount: 35,
            availableCount: 25,
            endDate: endDate3.toISOString(),
            category: "Electronics",
            slug: "smart-security-camera",
            discount: 25,
        },
    ];
};
