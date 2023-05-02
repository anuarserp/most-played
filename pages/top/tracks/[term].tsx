import RootLayout from "@/components/Layouts/RootLayout";
import TrackCard from "@/components/Tracks/TrackCard";
import { TrackProvider, useTrackPlayer } from "@/context/TrackContext";
import { Term } from "@/types/enums";
import { GetLayout, NextPageWithLayout } from "@/types/layout";
import { Track } from "@/types/spotify";
import { getPredominantColor } from "@/utils/colors";
import { getNestedLayout } from "@/utils/getNestedLayout";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getToken } from "next-auth/jwt";
import Image from "next/image";
import { useEffect } from "react";

interface Props {
  items: Track[];
}

const TopList: NextPageWithLayout = ({
  items,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { setTrack } = useTrackPlayer();

  useEffect(() => {
    setTrack(items[0]);
  }, []);

  return (
    <main
      className={`text-white flex flex-col min-h-screen max-h-60 py-2 text-center `}
    >
      <h1 className="text-5xl font-bold mb-16">Songs</h1>
      <div className="flex justify-evenly">
        <section className="w-1/2 flex justify-center">
          <TrackCard />
        </section>
        <section className="w-1/2">
          {items.map((item) => (
            <div key={item.id} onClick={() => setTrack(item)}>
              <h1>{item.name}</h1>
              <div className="">
                <Image
                  src={item.album.images[0].url}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="rounded-xl"
                />
                <div>
                  {item.artists.map((artist) => (
                    <span key={artist.id}>{artist.name}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
};

const rootLayout: GetLayout = (page) => <RootLayout>{page}</RootLayout>;
const getLayout: GetLayout = (page) => <TrackProvider>{page}</TrackProvider>;

TopList.getLayout = getNestedLayout(rootLayout, getLayout);

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const token = await getToken(ctx);

  if (!token) {
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
    `https://api.spotify.com/v1/me/top/tracks?limit=10&offset=0&time_range=${Term[term]}`,
    {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    }
  );

  const { items }: { items: Track[] } = await res.json();

  const itemsWithColor = Promise.all(
    items.map(async (item, i) => {
      const url = item.album.images[0].url;
      const { color } = await getPredominantColor(url);
      return {
        ...item,
        color,
        top: i + 1,
      };
    })
  );

  return {
    props: {
      items: await itemsWithColor,
    },
  };
};

export default TopList;
