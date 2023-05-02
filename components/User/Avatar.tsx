import Image from "next/image";

const Avatar = ({ image, name }: { image?: string | null; name: string }) => (
  <div className="w-10 h-10 rounded-full bg-dark flex justify-center items-center mr-2">
    {image ? (
      <Image src={image} alt={`Profile picture ${name}`} />
    ) : (
      <span className="font-bold text-white">{name.slice(0, 1)}</span>
    )}
  </div>
);

export default Avatar;
