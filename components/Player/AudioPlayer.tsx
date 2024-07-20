import { useRef } from "react"
import Controls from "./Controls"
import DisplayTrack from "./DisplayTrack"
import ProgressBar from "./ProgressBar"
import { Book } from "@/types/types"

interface Props {
    book: Book
}

const AudioPlayer: React.FC<Props> = ({ book }) => {

    const audioRef = useRef<HTMLAudioElement>(null)
    const progressBarRef = useRef<HTMLInputElement>(null)

    return (
        <div className="flex fixed w-full bg-[#042330] h-[80px] bottom-0 text-white items-center justify-center">
            <DisplayTrack currentTrack={book.audioLink} audioRef={audioRef} />
            <Controls audioRef={audioRef} />
            <ProgressBar audioRef={audioRef} progressBarRef={progressBarRef} />
        </div>
    )
}

export default AudioPlayer