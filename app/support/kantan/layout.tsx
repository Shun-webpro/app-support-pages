import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "カン単 - Support",
  description:
    "カン単アプリのサポートページです。よくある質問やお問い合わせ方法をご案内します。Support page for Kantan app.",
  keywords: ["カン単", "Kantan", "英単語", "vocabulary", "support", "サポート", "FAQ"],
  openGraph: {
    title: "カン単 - Support",
    description: "カン単アプリのサポートページです。",
    type: "website",
  },
};

export default function KantanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
