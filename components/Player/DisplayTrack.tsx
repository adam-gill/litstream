import { LegacyRef } from "react"

interface Props {
    currentTrack: string
    audioRef: React.RefObject<HTMLAudioElement>
}

const DisplayTrack: React.FC<Props> = ({ currentTrack, audioRef }) => {
    return (
        <div>
            <audio ref={audioRef} src={currentTrack} controls />
        </div>
    )
}

export default DisplayTrack