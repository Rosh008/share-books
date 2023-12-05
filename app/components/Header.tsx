import Image from "next/image";

export function Header() {
  return (
    <nav className="w-full flex">
      <div>
        <Image src="/logo.png" height={300} width={300} alt="app logo" />
      </div>
    </nav>
  );
}
