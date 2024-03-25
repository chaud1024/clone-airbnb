import Image from "next/image";

const Avatar = () => {
  return (
    <Image
      className="rounded-full"
      width={30}
      height={30}
      src="/images/placeholder.jpg"
      alt="avatar"
    />
  );
};

export default Avatar;
