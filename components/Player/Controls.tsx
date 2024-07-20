import Image from "next/image";
import { LegacyRef, useCallback, useEffect, useRef, useState } from "react";
import { FaCirclePlay, FaCirclePause } from "react-icons/fa6";

interface Props {
  audioRef: React.RefObject<HTMLAudioElement>;
  progressBarRef: React.RefObject<HTMLInputElement>;
  duration: number;
  setTimeProgress: (value: number) => void;
}

const Controls: React.FC<Props> = ({ audioRef, progressBarRef, duration, setTimeProgress }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const playAnimationRef = useRef<number | null>();

  const skipForward = () => {
    if (!!audioRef.current) audioRef.current.currentTime += 10

  }

  const skipBackward = () => {
    if (!!audioRef.current) audioRef.current.currentTime -= 10
  }

  const repeat = useCallback(() => {
    if (!!playAnimationRef.current && !!progressBarRef.current) {
      const currentTime = audioRef.current?.currentTime 
      setTimeProgress(Number(currentTime))
      progressBarRef.current.value = String(currentTime)
      progressBarRef.current.style.setProperty(
        '--range-progress',
        `${(Number(progressBarRef.current.value) / duration) * 100}%`
      )

    }
    
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  useEffect(() => {
    if (audioRef) {
      if (isPlaying) {
        audioRef.current?.play();
        playAnimationRef.current = requestAnimationFrame(repeat);
      } else {
        audioRef.current?.pause();
      }
    }
  }, [isPlaying, audioRef]);

  return (
    <div className="flex flex-row items-center justify-center gap-4 mx-4 w-1/3">
      <Image
        onClick={skipBackward}
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
        onClick={skipForward}
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
