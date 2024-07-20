import { useEffect, useState } from "react";

interface Props {
  audioRef: React.RefObject<HTMLAudioElement>;
  progressBarRef: React.RefObject<HTMLInputElement>
}

const ProgressBar: React.FC<Props> = ({ audioRef, progressBarRef }) => {
  const [duration, setDuration] = useState<number | undefined>(undefined);

  const durationFormat = (duration: number | any) => {
    if (isNaN(duration)) {
      return "error";
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

  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement) {
      const onLoadedMetadata = () => {
        setDuration(audioRef.current?.duration);
      };
      audioElement.addEventListener("loadedmetadata", onLoadedMetadata);
      return () =>
        audioElement?.removeEventListener("loadedmetadata", onLoadedMetadata);
    }
  }, [audioRef]);

  return (
    <div>
      <span>00:00</span>
      <div>
      <input type="range" min={0} max={100} value={90} className="w-full bg-green h-1 rounded-full appearance-none outline-none max-w-[300px]" />
      </div>
      {duration && <span>{durationFormat(duration)}</span>}
    </div>
  );
};

export default ProgressBar;
