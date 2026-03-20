import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PixVault - Support",
  description: "PixVaultアプリのサポートページです。FAQ、お問い合わせ、プライバシーポリシーをご確認いただけます。",
  keywords: ["PixVault", "support", "サポート", "FAQ", "写真", "動画", "プライバシー", "セキュリティ"],
  openGraph: {
    title: "PixVault - Support",
    description: "PixVaultアプリのサポートページです。",
    type: "website",
  },
};

export default function PixVaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
