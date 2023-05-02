import { useTrackPlayer } from "@/context/TrackContext";
import Image from "next/image";
import Backward from "../Icons/Backward";
import Forward from "../Icons/Forward";
import Play from "../Icons/Play";
import Pause from "../Icons/Pause";
import { useSession } from "next-auth/react";

const TrackCard = () => {
  const { data } = useSession();
  const { track, audioRef, isPlaying, error } = useTrackPlayer();

  if (!track) return null;

  return (
    <div
      className="h-[500px] w-[400px] shadow-lg rounded-2xl flex justify-center items-center translate-x-1"
      style={{ backgroundColor: track.color.replace("1)", "0.7)") }}
    >
      <div className="relative w-full h-full flex flex-col mx-16 mt-8 mb-2 p-0">
        <div>
          <h2>
            {"playing from\u00A0"
              .concat(data?.user.name?.split(" ").shift() || "")
              .toUpperCase()}
          </h2>
          <h2 className="font-bold">{track.album.name.toUpperCase()}</h2>
        </div>
        <div className="flex justify-center items-center w-full h-[250px] mt-4">
          <Image
            src={track.album.images[0].url}
            alt={track.name}
            width={280}
            height={280}
            priority
            className="rounded-lg shadow-xl"
          />
        </div>
        <div className="flex justify-start text-2xl mt-6">
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
        </div>
        <div>{error && <p className="text-red-500">{error}</p>}</div>

        <div className="absolute bottom-8 w-full">
          <audio ref={audioRef} />
          <div className="flex w-full justify-evenly ">
            <button>
              <Backward className="w-10 h-10 fill-white" />
            </button>
            {!isPlaying ? (
              <button>
                <Pause className="w-10 h-10 fill-white" />
              </button>
            ) : (
              <button>
                <Play className="w-10 h-10 fill-white" />
              </button>
            )}
            <button>
              <Forward className="w-10 h-10 fill-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackCard;
