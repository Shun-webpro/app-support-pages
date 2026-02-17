import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ToDoo - Support",
  description:
    "ToDooアプリのサポートページです。よくある質問やお問い合わせ方法をご案内します。Support page for ToDoo app.",
  keywords: ["ToDoo", "support", "サポート", "FAQ", "ヘルプ", "help"],
  openGraph: {
    title: "ToDoo - Support",
    description: "ToDooアプリのサポートページです。",
    type: "website",
  },
};

export default function ToDooLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
