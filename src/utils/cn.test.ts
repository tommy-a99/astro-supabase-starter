import { expect, test } from "vitest";
import { cn } from "./cn";

test("cn combines class names", () => {
	expect(cn("foo", "bar")).toBe("foo bar");
});

test("cn merges tailwind classes", () => {
	expect(cn("p-4", "p-2")).toBe("p-2");
});
