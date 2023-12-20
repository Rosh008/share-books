import Image from "next/image";
import logo from "../../public/logo.png";

export function Header() {
  return (
    <nav className="w-full flex">
      <Image
        src={logo}
        height="0"
        width="0"
        sizes="100vw"
        className="w-80"
        alt="app logo"
      />
    </nav>
  );
}
