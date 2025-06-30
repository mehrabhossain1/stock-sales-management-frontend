"use client";

import { useState } from "react";

import { Search, ShoppingCart, Heart, User, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const navLinks = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
    { label: "Blog", path: "/blog" },
    { label: "Dashboard", path: "/dashboard" },
];

const megaMenuCategories = [
    {
        title: "Electronics",
        items: [
            { name: "Smartphones", href: "/category/smartphones" },
            { name: "Laptops", href: "/category/laptops" },
            { name: "Headphones", href: "/category/headphones" },
            { name: "Cameras", href: "/category/cameras" },
        ],
    },
    {
        title: "Fashion",
        items: [
            { name: "Men's Clothing", href: "/category/mens-clothing" },
            { name: "Women's Clothing", href: "/category/womens-clothing" },
            { name: "Shoes", href: "/category/shoes" },
            { name: "Accessories", href: "/category/accessories" },
        ],
    },
    {
        title: "Home & Garden",
        items: [
            { name: "Furniture", href: "/category/furniture" },
            { name: "Kitchen", href: "/category/kitchen" },
            { name: "Garden Tools", href: "/category/garden-tools" },
            { name: "Home Decor", href: "/category/home-decor" },
        ],
    },
    {
        title: "Sports & Outdoors",
        items: [
            { name: "Fitness Equipment", href: "/category/fitness" },
            { name: "Outdoor Gear", href: "/category/outdoor-gear" },
            { name: "Sports Apparel", href: "/category/sports-apparel" },
            { name: "Team Sports", href: "/category/team-sports" },
        ],
    },
];

export function Navbar() {
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Mock data - replace with actual state management
    const cartItemsCount = 3;
    const wishlistItemsCount = 5;

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4">
                {/* Top bar */}
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-sm">
                                MS
                            </span>
                        </div>
                        <span className="text-xl font-bold">MyShop</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <NavigationMenu className="hidden lg:flex">
                        <NavigationMenuList>
                            {navLinks.slice(0, 4).map((link) => (
                                <NavigationMenuItem key={link.path}>
                                    <Link to={link.path}>
                                        <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                                            {link.label}
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                            ))}

                            {/* Mega Menu */}
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>
                                    Categories
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <div className="grid w-[800px] grid-cols-4 gap-3 p-4">
                                        {megaMenuCategories.map((category) => (
                                            <div
                                                key={category.title}
                                                className="space-y-3"
                                            >
                                                <h4 className="text-sm font-medium leading-none text-muted-foreground">
                                                    {category.title}
                                                </h4>
                                                <ul className="space-y-2">
                                                    {category.items.map(
                                                        (item) => (
                                                            <li key={item.name}>
                                                                <Link
                                                                    to={
                                                                        item.href
                                                                    }
                                                                    className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                                                >
                                                                    <div className="text-sm font-medium leading-none">
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </div>
                                                                </Link>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            {navLinks.slice(4).map((link) => (
                                <NavigationMenuItem key={link.path}>
                                    <Link to={link.path}>
                                        <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                                            {link.label}
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>

                    {/* Search Bar */}
                    <div className="hidden md:flex flex-1 max-w-sm mx-4">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search products..."
                                className={cn(
                                    "pl-10 pr-4 transition-all duration-200",
                                    isSearchFocused && "ring-2 ring-primary"
                                )}
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setIsSearchFocused(false)}
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2">
                        {/* Mobile Search */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                        >
                            <Search className="h-5 w-5" />
                            <span className="sr-only">Search</span>
                        </Button>

                        {/* Wishlist */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative"
                            asChild
                        >
                            <Link to="/wishlist">
                                <Heart className="h-5 w-5" />
                                {wishlistItemsCount > 0 && (
                                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
                                        {wishlistItemsCount}
                                    </Badge>
                                )}
                                <span className="sr-only">Wishlist</span>
                            </Link>
                        </Button>

                        {/* Cart */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative"
                            asChild
                        >
                            <Link to="/cart">
                                <ShoppingCart className="h-5 w-5" />
                                {cartItemsCount > 0 && (
                                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
                                        {cartItemsCount}
                                    </Badge>
                                )}
                                <span className="sr-only">Shopping cart</span>
                            </Link>
                        </Button>

                        {/* Profile Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <User className="h-5 w-5" />
                                    <span className="sr-only">User menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuItem asChild>
                                    <Link to="/profile">My Profile</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link to="/orders">My Orders</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link to="/settings">Settings</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Sign Out</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Mobile Menu */}
                        <Sheet
                            open={isMobileMenuOpen}
                            onOpenChange={setIsMobileMenuOpen}
                        >
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="lg:hidden"
                                >
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="right"
                                className="w-[300px] sm:w-[400px]"
                            >
                                <SheetHeader>
                                    <SheetTitle>Menu</SheetTitle>
                                </SheetHeader>
                                <div className="mt-6 space-y-6">
                                    {/* Mobile Search */}
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            type="search"
                                            placeholder="Search products..."
                                            className="pl-10"
                                        />
                                    </div>

                                    {/* Navigation Links */}
                                    <nav className="space-y-2">
                                        {navLinks.map((link) => (
                                            <Link
                                                key={link.path}
                                                to={link.path}
                                                className="block px-3 py-2 text-base font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                                                onClick={() =>
                                                    setIsMobileMenuOpen(false)
                                                }
                                            >
                                                {link.label}
                                            </Link>
                                        ))}
                                    </nav>

                                    {/* Categories */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold">
                                            Categories
                                        </h3>
                                        {megaMenuCategories.map((category) => (
                                            <div
                                                key={category.title}
                                                className="space-y-2"
                                            >
                                                <h4 className="text-sm font-medium text-muted-foreground">
                                                    {category.title}
                                                </h4>
                                                <div className="space-y-1 pl-4">
                                                    {category.items.map(
                                                        (item) => (
                                                            <Link
                                                                key={item.name}
                                                                to={item.href}
                                                                className="block py-1 text-sm hover:text-primary transition-colors"
                                                                onClick={() =>
                                                                    setIsMobileMenuOpen(
                                                                        false
                                                                    )
                                                                }
                                                            >
                                                                {item.name}
                                                            </Link>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}
