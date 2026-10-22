import Image from "next/image";

export default function Phone({ src, alt, children, className = "" }: { src?: string; alt?: string; children?: React.ReactNode; className?: string }) {
  return (
    <div className={`relative aspect-[9/19] w-full overflow-hidden rounded-[1.75rem] border-[5px] border-[#1d1d20] bg-bg shadow-2xl ${className}`}>
      {src ? <Image src={src} alt={alt ?? ""} fill sizes="220px" className="object-cover object-top" /> : children}
    </div>
  );
}
