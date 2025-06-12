"use client";

import Link from "next/link";
import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import { ArrowRight } from "lucide-react";

// ボタンの種類
type ButtonVariant =
  | "default"   // 青ベース
  | "secondary" // 緑ベース
  | "accent"    // 紫ベース
  | "cta"       // 赤ベース
  | "outline"   // アウトライン
  | "ghost";    // 透明背景

// ボタンのサイズ
type ButtonSize = "sm" | "md" | "lg" | "xl";

// アニメーション効果
type AnimationEffect = "none" | "bounce" | "pulse" | "scale";

export interface CtaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  animation?: AnimationEffect;
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  external?: boolean;
  className?: string;
}

const CtaButton = forwardRef<HTMLButtonElement, CtaButtonProps>(
  ({
    children,
    variant = "default",
    size = "md",
    animation = "none",
    href,
    icon,
    iconPosition = "right",
    fullWidth = false,
    external = false,
    className,
    ...props
  }, ref) => {
    // サイズに基づくクラス
    const sizeClasses = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
      xl: "px-10 py-5 text-xl",
    };

    // バリアントに基づくクラス - シンプル化（ダークモード対応を削除）
    const variantClasses = {
      default: "bg-blue-600 hover:bg-blue-700 text-white border-b-4 border-blue-700 hover:border-blue-800",
      secondary: "bg-green-500 hover:bg-green-600 text-white border-b-4 border-green-700 hover:border-green-800",
      accent: "bg-purple-500 hover:bg-purple-600 text-white border-b-4 border-purple-700 hover:border-purple-800",
      cta: "bg-red-500 hover:bg-red-600 text-white border-b-4 border-red-700 hover:border-red-800",
      outline: "bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white",
      ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
    };

    // アニメーションクラス
    const animationClasses = {
      none: "",
      bounce: "animate-bounce-slow",
      pulse: "animate-pulse",
      scale: "hover:scale-105 active:scale-95 transition-transform",
    };

    // 共通クラス
    const commonClasses = cn(
      "inline-flex items-center justify-center font-semibold rounded-full shadow-md transition-all duration-300 focus:outline-none",
      sizeClasses[size],
      variantClasses[variant],
      animationClasses[animation],
      fullWidth ? "w-full" : "",
      className
    );

    // アクティブ状態のクラス（押し込み効果）を追加
    const activeClasses = "active:translate-y-0.5 active:shadow-sm";

    // コンポーネントの中身
    const content = (
      <>
        {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
        <span>{children}</span>
        {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
        {!icon && iconPosition === "right" && (
          <ArrowRight className="ml-2 h-5 w-5" />
        )}
      </>
    );

    // リンクの場合
    if (href) {
        return (
          <Link
            href={href}
            className={cn(commonClasses, activeClasses)}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
          >
            {content}
          </Link>
        );
      }

    // ボタンの場合
    return (
      <button
        ref={ref}
        className={cn(commonClasses, activeClasses)}
        type="button"
        {...props}
      >
        {content}
      </button>
    );
  }
);

// 表示名の設定（React DevTools用）
CtaButton.displayName = "CtaButton";

export default CtaButton;