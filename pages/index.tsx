import RootLayout from "@/components/Layouts/RootLayout";
import { NextPageWithLayout } from "@/types/layout";

const Home: NextPageWithLayout = () => {
  return (
    <div className="text-white flex flex-col items-center justify-center min-h-screen max-h-60 py-2 lg:-mt-32 text-center">
      <h1 className="text-5xl font-bold">Hello World</h1>
    </div>
  );
};

Home.getLayout = (page) => <RootLayout>{page}</RootLayout>;

export default Home;
