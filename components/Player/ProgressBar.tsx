import { useEffect, useState } from "react";

interface Props {
  audioRef: React.RefObject<HTMLAudioElement>;
  progressBarRef: React.RefObject<HTMLInputElement>;
  timeProgress: number;
  duration: number;
}

const ProgressBar: React.FC<Props> = ({ audioRef, progressBarRef, timeProgress, duration }) => {
  // const [duration, setDuration] = useState<number | undefined>(undefined);

  const durationFormat = (duration: number | any) => {
    if (isNaN(duration)) {
      return "00:00";
    } else {
      let min: string = "" + Math.floor(duration / 60);
      let sec: string = "" + Math.floor(duration % 60);

      if (min.length < 2) {
        min = "0" + min;
      }
      if (sec.length < 2) {
        sec = "0" + sec;
      }

      return min + ":" + sec;
    }
  };

  const handleProgressChange = () => {
    if (audioRef.current && progressBarRef.current) {
      audioRef.current.currentTime = Number(progressBarRef.current.value);
    }
  };

  

  

  return (
    <div className="flex flex-row items-center justify-end gap-3 w-1/3 pr-8">
      <span>{durationFormat(timeProgress)}</span>
      <div className="flex w-full max-w-[300px] items-center justify-center">
        <input
          type="range"
          ref={progressBarRef}
          onChange={handleProgressChange}
          defaultValue={0}
          style={{
            background: `linear-gradient(to right, rgb(43, 217, 124) ${timeProgress / duration * 100}%, rgb(109, 120, 125) ${timeProgress / duration * 100}%)`,
          }}
          className="audio h-1 w-full cursor-pointer appearance-none rounded-lg outline-none"
        />
      </div>
      <span>{durationFormat(duration)}</span>
      {/* {duration && <span>{durationFormat(duration)}</span>} */}
    </div>
  );
};

export default ProgressBar;
