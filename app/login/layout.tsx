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
      <div className="w-full  md:w-1/2 p-4 md:p-8 flex flex-col">
        <Header />
        {children}
      </div>
      <div className="hidden relative w-1/2 h-full md:block">
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
