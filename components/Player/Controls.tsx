import Image from "next/image";
import { LegacyRef, useEffect, useState } from "react";
import { FaCirclePlay, FaCirclePause } from "react-icons/fa6";

interface Props {
  audioRef: React.RefObject<HTMLAudioElement>;
}

const Controls: React.FC<Props> = ({ audioRef }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (audioRef) {
      if (isPlaying) {
        audioRef.current?.play();
      } else {
        audioRef.current?.pause();
      }
    }
  }, [isPlaying, audioRef]);

  return (
    <div className="flex flex-row items-center justify-center gap-2 mx-4">
      <Image
        className="btn-hover"
        src="/assets/forward.svg"
        width={28}
        height={28}
        alt="forward 10 seconds"
      />

      {isPlaying ? (
        <FaCirclePause
        onClick={() => setIsPlaying(!isPlaying)}
        className="btn-hover"
        size={40}
      />
      ) : (
        <FaCirclePlay
          onClick={() => setIsPlaying(!isPlaying)}
          className="btn-hover"
          size={40}
        />
        
      )}
      <Image
        className="btn-hover"
        src="/assets/backward.svg"
        width={28}
        height={28}
        alt="back 10 seconds"
      />
    </div>
  );
};

export default Controls;
