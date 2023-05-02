import { useTrackPlayer } from "@/context/TrackContext";
import Image from "next/image";

const TrackCard = () => {
  const { track, audioRef } = useTrackPlayer();

  if (!track) return null;

  return (
    <div
      className="h-[450px] w-[380px] shadow-lg rounded-3xl flex justify-center items-center"
      style={{ backgroundColor: track.color.replace("1)", "0.9)") }}
    >
      <div className="w-ful h-full mt-24 flex flex-col">
        <div>
          <h1 className="text-2xl font-bold">Track: {track.top}</h1>
        </div>
        <div>
          <Image
            src={track.album.images[0].url}
            alt={track.name}
            width={250}
            height={250}
            priority
            className="rounded-3xl"
          />
        </div>
        <div className="flex justify-start text-3xl">
          <h2 className="">{track.name}</h2>
        </div>
        <div className="flex justify-start flex-wrap w-">
          {track.artists.map((artist) => (
            <span key={artist.id}>
              {artist.name}
              {artist.id !== track.artists[track.artists.length - 1].id &&
                ",\u00A0"}
            </span>
          ))}
          <div className="">
            <audio ref={audioRef} autoPlay />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackCard;
