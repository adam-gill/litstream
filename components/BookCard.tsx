"use client"

import axios from "axios"
import { Book } from "@/types/types"

interface Props {
    book: Book
}

const BookCard: React.FC<Props> = ({ book }) => {
    return (
        <>
            <h1>{book.title}</h1>
        </>
    )
}

export default BookCard;