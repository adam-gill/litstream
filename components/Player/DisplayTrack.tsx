import { LegacyRef } from "react"
import ProgressBar from "./ProgressBar"
import { Book } from "@/types/types"
import useAuth from "@/lib/useAuth"
import { db } from "@/firebase"
import { doc, getDoc, setDoc, arrayUnion, updateDoc } from "firebase/firestore"

interface Props {
    currentTrack: string
    audioRef: React.RefObject<HTMLAudioElement>
    progressBarRef: React.RefObject<HTMLInputElement>
    setDuration: (value: number) => void
    book: Book
}

const DisplayTrack: React.FC<Props> = ({ currentTrack, audioRef, progressBarRef, setDuration, book }) => {
    const { user } = useAuth()

    const addFinishedBook = async () => {
        if (!!user && !!user.email) {
          const docRef = doc(db, "finished", user.email)
          const docSnap = await getDoc(docRef)
    
          if (!docSnap.exists()) {
            await setDoc(docRef, { finishedBooks: [book] })
          } else {
            await updateDoc(docRef, {
              finishedBooks: arrayUnion(book)
            })
          }
        }
      }

    const onLoadedMetadata = () => {
        const seconds: any = audioRef.current?.duration
        if (seconds) setDuration(seconds)
        if (progressBarRef.current) progressBarRef.current.max = seconds
      }

    

    return (
        <div>
            <audio onEnded={addFinishedBook} ref={audioRef} src={currentTrack} onLoadedMetadata={onLoadedMetadata} className="hidden" controls />
        </div>
    )
}

export default DisplayTrack