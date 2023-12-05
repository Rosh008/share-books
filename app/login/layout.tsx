import { Header } from "@/app/components/Header";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full h-full flex gap-4">
      <div className="w-1/2 p-8">
        <Header />
        {children}
      </div>
      <div className="w-1/2 h-full">
        <img src="/banner.jpg" className="h-full w-full" alt="banner" />
      </div>
    </main>
  );
}
