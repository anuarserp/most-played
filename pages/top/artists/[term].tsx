import RootLayout from "@/components/Layouts/RootLayout";
import { Term } from "@/types/enums";
import { NextPageWithLayout } from "@/types/layout";
import { Artist } from "@/types/spotify";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getToken } from "next-auth/jwt";
import Image from "next/image";

interface Props {
  items: Artist[];
}

const TopList: NextPageWithLayout = ({
  items,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>TopList</h1>
      {items.map((item) => (
        <div key={item.id}>
          <h1>{item.name}</h1>
          <Image
            src={item.images[0].url}
            alt={item.name}
            width={300}
            height={200}
          />
          <div>
            {item.genres.map((genre) => (
              <span key={genre}>{genre}</span>
            )
          </div>
        </div>
      ))}
    </div>
  );
};

TopList.getLayout = (page) => <RootLayout>{page}</RootLayout>;

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const session = await getToken(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const { term }: { term: keyof typeof Term } = ctx.query;

  if (!Term[term]) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const res = await fetch(
    `https://api.spotify.com/v1/me/top/artists?limit=10&offset=0&time_range=${Term[term]}`,
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  );

  const data = await res.json();

  return {
    props: {
      items: data.items,
    },
  };
};

export default TopList;
