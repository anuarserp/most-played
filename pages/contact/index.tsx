import RootLayout from "@/components/Layouts/RootLayout";
import { NextPageWithLayout } from "@/types/layout";
import Link from "next/link";

const Contact: NextPageWithLayout = () => {
  return (
    <div className="text-white flex flex-col items-center justify-center min-h-screen max-h-60 py-2 lg:-mt-32 text-center">
      <h1 className="text-6xl font-bold">Contact</h1>
      <p className="mt-9 text-2xl mx-64 text-justify">
        Hi, nice to meet you! I am Anuar Sepulveda, a passionate web developer
        with extensive experience in designing and programming high quality and
        functional websites. If you have any questions, comments, suggestions or
        just want to say hello, you can write me through my email or through the
        social networks where I am present. My email is{" "}
        <span className="font-semibold hover:underline hover:text-green-400">
          anuarserp@protonmain.com
        </span>
        , I will be happy to receive your message and respond as soon as
        possible.You can also find me on social media, you can find me on
        Twitter as{" "}
        <Link href={"https://twitter.com/anuarserp"} target="blank">
          <span className="font-semibold hover:underline hover:text-green-400">
            anuarserp
          </span>
        </Link>
        , on Instagram as{" "}
        <Link href={"https://www.instagram.com/public.anuar"} target="blank">
          <span className="font-semibold hover:underline hover:text-green-400">
            public.anuar
          </span>
        </Link>
        , or on LinkedIn as{" "}
        <Link
          href={
            "https://www.linkedin.com/in/anuar-andres-sepulveda-padilla-19b2b920a"
          }
          target="blank"
        >
          <span className="font-semibold hover:underline hover:text-green-400">
            Anuar Andres Sepulveda Padilla
          </span>
        </Link>
        .
      </p>
    </div>
  );
};

Contact.getLayout = (page) => <RootLayout>{page}</RootLayout>;

export default Contact;
