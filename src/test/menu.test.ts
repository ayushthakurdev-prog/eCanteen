import { describe, expect, it } from "vitest";
import { cartTotal, dishes, filterDishes, priceOf } from "@/lib/menu";

describe("menu", () => {
  it("has the exact prices", () => {
    expect(Object.fromEntries(dishes.map((d) => [d.name, d.price]))).toEqual({
      "Veg Sandwich": 50, "Cheese Sandwich": 60, Popcorn: 30, Samosa: 15,
      "Veg Pizza Slice": 70, "White Sauce Pasta": 80, "Appy Fizz": 10,
      "Cold Coffee": 40, "Masala Tea": 10, "Bourbon Biscuit": 10, "Choco Chip Cookie": 20,
    });
  });
  it("filters by category", () => {
    expect(filterDishes("Beverages", "").map((d) => d.name)).toEqual(["Appy Fizz", "Cold Coffee", "Masala Tea"]);
    expect(filterDishes("All", "")).toHaveLength(11);
  });
  it("totals the cart", () => {
    expect(cartTotal([{ price: priceOf("Samosa"), quantity: 2 }, { price: priceOf("Cold Coffee"), quantity: 1 }])).toBe(70);
  });
  it("has a photo for every dish", () => {
    expect(dishes.every((d) => d.image.startsWith("/__l5e/assets-v1/"))).toBe(true);
    expect(new Set(dishes.map((d) => d.image)).size).toBe(dishes.length);
  });

});
