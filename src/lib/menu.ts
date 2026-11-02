import appyFizz from "@/assets/dish-appy-fizz.jpg";
import bourbonBiscuit from "@/assets/dish-bourbon-biscuit.jpg";
import cheeseSandwich from "@/assets/dish-cheese-sandwich.jpg";
import chocoChipCookie from "@/assets/dish-choco-chip-cookie.jpg";
import coldCoffee from "@/assets/dish-cold-coffee.jpg";
import masalaTea from "@/assets/dish-masala-tea.jpg";
import pizzaSlice from "@/assets/dish-pizza-slice.jpg";
import popcorn from "@/assets/dish-popcorn.jpg";
import samosa from "@/assets/dish-samosa.jpg";
import vegSandwich from "@/assets/dish-veg-sandwich.jpg";
import whiteSaucePasta from "@/assets/dish-white-sauce-pasta.jpg";

export type MenuCategory = "Sandwiches" | "Snacks" | "Fast Food" | "Beverages" | "Biscuits & Cookies";
export type Dish = { name: string; price: number; rating: string; category: MenuCategory; image: string };

export const ALL_CATEGORIES = "All" as const;

export const menuCategories: MenuCategory[] = ["Sandwiches", "Snacks", "Fast Food", "Beverages", "Biscuits & Cookies"];

export const dishes: Dish[] = [
  { name: "Veg Sandwich", price: 50, rating: "★★★★☆", category: "Sandwiches", image: vegSandwich},
  { name: "Cheese Sandwich", price: 60, rating: "★★★★★", category: "Sandwiches", image: cheeseSandwich },
  { name: "Popcorn", price: 30, rating: "★★★★☆", category: "Snacks", image: popcorn },
  { name: "Samosa", price: 15, rating: "★★★★★", category: "Snacks", image: samosa },
  { name: "Veg Pizza Slice", price: 70, rating: "★★★★☆", category: "Fast Food", image: pizzaSlice },
  { name: "White Sauce Pasta", price: 80, rating: "★★★★☆", category: "Fast Food", image: whiteSaucePasta },
  { name: "Appy Fizz", price: 10, rating: "★★★☆☆", category: "Beverages", image: appyFizz },
  { name: "Cold Coffee", price: 40, rating: "★★★★☆", category: "Beverages", image: coldCoffee },
  { name: "Masala Tea", price: 10, rating: "★★★★★", category: "Beverages", image: masalaTea },
  { name: "Bourbon Biscuit", price: 10, rating: "★★★★☆", category: "Biscuits & Cookies", image: bourbonBiscuit },
  { name: "Choco Chip Cookie", price: 20, rating: "★★★★☆", category: "Biscuits & Cookies", image: chocoChipCookie },
];

export function filterDishes(category: string, search: string): Dish[] {
  const q = search.trim().toLowerCase();
  return dishes.filter(
    (d) => (category === ALL_CATEGORIES || d.category === category) && d.name.toLowerCase().includes(q),
  );
}

export function priceOf(name: string): number {
  return dishes.find((d) => d.name === name)?.price ?? 0;
}

export function cartTotal(items: { price: number; quantity: number }[]): number {
  return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
}
