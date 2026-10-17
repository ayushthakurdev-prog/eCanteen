import { describe, expect, it } from "vitest";

import { toggleWishlistItem, updateWishlistItem } from "@/lib/wishlist";

describe("Wishlist and Bucket list synchronization", () => {
  it("adds a wished-for dish only once", () => {
    expect(updateWishlistItem(["Dish 01"], "Dish 02", true)).toEqual(["Dish 01", "Dish 02"]);
    expect(updateWishlistItem(["Dish 01", "Dish 02"], "Dish 02", true)).toEqual(["Dish 01", "Dish 02"]);
  });

  it("removes a dish from the saved list when its wishlist status is removed", () => {
    expect(toggleWishlistItem(["Dish 01", "Dish 02"], "Dish 01")).toEqual(["Dish 02"]);
  });
});