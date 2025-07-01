import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
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

export function NavigationMenuComponent() {
    return (
        <div className=" bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4">
                <div className="flex justify-center py-3">
                    <NavigationMenu>
                        <NavigationMenuList>
                            {navLinks.slice(0, 4).map((link) => (
                                <NavigationMenuItem key={link.path}>
                                    <Link to={link.path}>
                                        <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm uppercase font-semibold transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                                            {link.label}
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                            ))}

                            {/* Mega Menu */}
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="text-sm uppercase font-semibold">
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
                                        <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm uppercase font-semibold transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                                            {link.label}
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div>
        </div>
    );
}
