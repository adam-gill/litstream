"use client";

import { Book } from "@/types/types";
import axios from "axios";
import { useState } from "react";
import { IoIosSearch, IoIosClose } from "react-icons/io";
import SearchBook from "./SearchBook";

const SearchBar = () => {
  const [query, setQuery] = useState<string>("");
  const [result, setResult] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const obj = {
    id: "5bxl50cz4bt",
    author: "Dale Carnegie",
    title: "How to Win Friends and Influence People in the Digital Age",
    subTitle: "Time-tested advice for the digital age",
    imageLink:
      "https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Fimages%2Fhow-to-win-friends-and-influence-people.png?alt=media&token=099193aa-4d85-4e22-8eb7-55f12a235fe2",
    audioLink:
      "https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Faudios%2Fhow-to-win-friends-and-influence-people.mp3?alt=media&token=60872755-13fc-43f4-8b75-bae3fcd73991",
    totalRating: 608,
    averageRating: 4.4,
    keyIdeas: 8,
    type: "Audio & Text",
    status: "recommended",
    subscriptionRequired: false,
    summary:
      "How to Win Friends and Influence People is a timeless classic written by Dale Carnegie, first published in 1936. The book is widely regarded as one of the best self-help books ever written and has sold over 30 million copies worldwide. In 2011, a revised edition was published, titled How to Win Friends and Influence People in the Digital Age. The book was updated to address the challenges of the digital age and provide guidance on how to navigate the complexities of modern communication and social media. \n\n The original book focused on the art of human communication and provided readers with strategies for building strong relationships, overcoming interpersonal conflicts, and becoming more effective communicators. The revised edition builds on these principles and updates them for the digital age. The book recognizes that the proliferation of technology and social media has created new opportunities for communication and connection, but has also made it more difficult to connect with others on a deep and meaningful level. \n\n The first section of the book is devoted to building relationships in the digital age. The author argues that despite the abundance of social media platforms, people are more isolated than ever before. He suggests that the key to building strong relationships is to focus on the needs and desires of others. He encourages readers to listen actively and empathetically, to show genuine interest in others, and to be generous with their time and resources. These strategies apply both online and offline and are essential for building strong relationships in the digital age. \n\n The second section of the book focuses on communicating effectively in the digital age. The author acknowledges that modern communication technology has made it easier than ever to communicate with others, but has also made it more difficult to convey complex emotions and ideas. He suggests that the key to effective communication is to be clear and concise, to use simple language and avoid jargon, and to be mindful of the tone and style of your message. He also stresses the importance of using technology appropriately, and suggests that people should avoid using text messaging and email for important conversations, as they are less personal and can easily be misinterpreted. \n\n The third section of the book focuses on influencing others in the digital age. The author argues that in the digital age, influence is more important than ever before. He suggests that the key to influencing others is to be genuine and authentic, to communicate your message clearly and persuasively, and to be mindful of the needs and desires of your audience. He also stresses the importance of building a personal brand, and suggests that people should focus on developing a strong online presence that reflects their values and expertise. \n\n The final section of the book focuses on leadership in the digital age. The author argues that in the digital age, leaders must be able to inspire and motivate their followers, and must be able to navigate the complex and rapidly changing world of technology and social media. He suggests that the key to effective leadership is to be a good listener, to be open to new ideas and perspectives, and to be willing to take risks and try new approaches. He also stresses the importance of building a strong team, and suggests that leaders should focus on creating a culture of collaboration and innovation. \n\n Overall, How to Win Friends and Influence People in the Digital Age is an excellent guide for anyone looking to improve their communication skills, build strong relationships, and become more effective leaders in the digital age. The book provides readers with practical strategies and advice for navigating the complex world of modern communication and social media, and is an essential resource for anyone looking to succeed in today's rapidly changing world.",
    tags: ["Communication Skills", "Technology & the Future"],
    bookDescription:
      '"How to Win Friends and Influence People" is a self-help book written by Dale Carnegie and first published in 1936. The book provides practical advice and techniques for improving one\'s communication and social skills, with the goal of building better relationships and becoming more influential in both personal and professional settings. The book covers topics such as the importance of smiling, listening actively, giving honest and sincere appreciation, avoiding criticism, and becoming genuinely interested in others. It also emphasizes the power of empathy and understanding other people\'s perspectives. "How to Win Friends and Influence People" has been widely read and praised for its timeless and practical advice, and is considered a classic in the field of self-improvement.',
    authorDescription:
      'Dale Carnegie (1888-1955) was an American author, lecturer, and developer of self-improvement courses. He is best known for his book "How to Win Friends and Influence People," which has sold over 30 million copies worldwide and is considered a classic in the self-help genre. Carnegie\'s teachings focused on improving interpersonal skills, communication, and leadership, and his courses and books were aimed at helping individuals become more confident, successful, and influential in both their personal and professional lives. He also founded the Dale Carnegie Training program, which is still in operation today and has helped millions of people around the world improve their communication and leadership skills.',
  };

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const handleChange = async (e: any) => {
    setQuery(e.target.value)
    getSearchResults(query)
  }

  const getSearchResults = async (query: string) => {
    setLoading(true);
    await delay(300)

    try {
      if (query) {
        const res = await axios.get(
          `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${query}`
        );
        setResult(res.data);
        setLoading(false);
      } else {
        setResult([])
        setLoading(false)
      }
    } catch (error) {
      console.log("error fetching search result: ", error);
    }
  };

  return (
    <>
      <div className="fixed flex justify-center items-center w-[100%] h-[84px] border-b-[1px] border-gray-200 bg-white z-50 ml-[225px]">
        <div className="w-full max-w-5xl mx-auto px-8">
          <div className="flex justify-end items-center relative">
            <input
              value={query}
              onChange={(e) => handleChange(e)}
              type="text"
              placeholder="Search for books"
              className="w-[340px] text-sm bg-gray-100 border-2 border-gray-300 rounded-md p-2 focus:outline-none"
            />
            <button
              className="relative h-full"
              onClick={() => {if (!!query) setQuery("")}}
            >
              {!!query ? (
                <IoIosClose
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black"
                size={36}
              />
                
              ) : (
                <IoIosSearch
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black"
                  size={28}
                />
              )}
            </button>

            <div className="w-[400px] min-h-12 max-h-[500px] overflow-auto bg-white shadow-2xl shadow-gray-700 absolute top-[100px] rounded-lg py-4 px-2">
              <div className="flex w-full flex-col">
                {result.length !== 0  && !!query ? (
                  result.map((book, index) => (
                    <SearchBook
                      key={book.id}
                      book={book}
                      notLast={index !== result.length - 1}
                    />
                  ))
                ) : (
                  <>
                    <div className="fcc font-bold">No books Found</div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
