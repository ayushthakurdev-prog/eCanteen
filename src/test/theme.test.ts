import { describe, expect, it } from "vitest";
import { resolveThemePreference } from "@/lib/theme";

describe("theme preference", () => {
  it("restores dark mode when the saved preference is dark", () => {
    expect(resolveThemePreference("dark")).toBe("dark");
  });

  it("defaults to light mode when no dark preference is saved", () => {
    expect(resolveThemePreference(null)).toBe("light");
    expect(resolveThemePreference("light")).toBe("light");
  });
});