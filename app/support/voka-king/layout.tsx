import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VOKA KING - Support",
  description:
    "VOKA KING 앱의 지원 페이지입니다. 자주 묻는 질문과 문의 방법을 안내합니다. Support page for VOKA KING app.",
  keywords: ["VOKA KING", "support", "지원", "FAQ", "도움말", "help"],
  openGraph: {
    title: "VOKA KING - Support",
    description: "VOKA KING 앱의 지원 페이지입니다.",
    type: "website",
  },
};

export default function VokaKingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
