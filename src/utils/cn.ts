import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * クラス名を結合するユーティリティ関数
 * clsxでクラス名を結合し、tailwind-mergeで競合するTailwindクラスを解決します
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}