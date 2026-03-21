import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KeyAlbum - Support",
  description: "KeyAlbumアプリのサポートページです。FAQ、お問い合わせ、プライバシーポリシーをご確認いただけます。",
  keywords: ["KeyAlbum", "support", "サポート", "FAQ", "写真", "動画", "プライバシー", "セキュリティ", "写真エディター", "生体認証"],
  openGraph: {
    title: "KeyAlbum - Support",
    description: "KeyAlbumアプリのサポートページです。",
    type: "website",
  },
};

export default function KeyAlbumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
