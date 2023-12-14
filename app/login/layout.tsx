import { Header } from "@/app/components/Header";
import Image from "next/image";
import banner from "../../public/banner.jpg";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full h-full flex gap-4">
      <div className="w-1/2 p-8 flex flex-col">
        <Header />
        {children}
      </div>
      <div className="relative w-1/2 h-full">
        <Image
          src={banner}
          sizes="100vw"
          object-fit="cover"
          fill
          alt="banner"
        />
      </div>
    </main>
  );
}
