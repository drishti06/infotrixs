import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios"
import img1 from "./images/nature-1.jpg"
import moment from "moment"

function App() {
    const [authors, setAuthors] = useState([]);
    const [quote, setQuote] = useState("");
    const [authorName, setAuthorName] = useState("")
    const [selectedAuthor, setSelectedAuthor] = useState("");
    const [authorQuotes, setAuthorQuotes] = useState([]);
    axios.defaults.credentials = true;
    // Tell how much time left for midnight 
    const secondsToMidnight = (n) => {
        return (
            ((24 - n.getHours() - 1) * 60 * 60) + ((60 - n.getMinutes() - 1) * 60) + (60 - n.getSeconds())
        )
    }

    // Fetch a quote for the Quote of the Day
    const quoteOfTheDay = () => {
        axios
            .get("https://infotrixs-two.vercel.app/quoteOfDay")
            .then((response) => {
                const currentTime = new Date()
                const expiry = currentTime.getTime() + (secondsToMidnight(currentTime) * 1000)
                localStorage.quote = JSON.stringify(response.data.quote)
                localStorage.author = JSON.stringify(response.data.author)
                localStorage.expiry = expiry
                setAuthorName(response.data.author)
                console.log(response.data.author)
                setQuote(response.data.quote);
            })
            .catch((error) => {
                console.log(error);
                alert("Error happened!");
            })
    }

    // Fetch all quotes by author name
    const quoteByAuthor = (authorName) => {
        axios
            .post("https://infotrixs-two.vercel.app/authorQuotes", { author: authorName })
            .then((response) => {
                const quotes = response.data.map(item => item.quote); // Extract quotes from the response
                setSelectedAuthor(authorName);
                setAuthorQuotes(quotes);
            })
            .catch((error) => {
                console.log(error);
                alert("Error happened!");
            })
    }

    // Fetch all authors name
    const allAuthors = () => {
        axios
            .get("https://infotrixs-two.vercel.app/authors")
            .then((response) => {
                setAuthors(response.data);
            })
            .catch((error) => {
                setAuthors([]);
                console.log(error);
                alert("Error happened!");
            })
    }




    useEffect(() => {
        allAuthors();
        if (typeof localStorage !== "undefined" && localStorage.quote) {
            const quoteExpiry = parseInt(localStorage.getItem("expiry"));
            const now = new Date();
            if (now.getTime() > quoteExpiry) {
                localStorage.removeItem("quote");
                localStorage.removeItem("author");
                localStorage.removeItem("expiry");
                quoteOfTheDay();
            } else {
                const storedQuote = JSON.parse(localStorage.getItem("quote"));
                const storedAuthor = JSON.parse(localStorage.getItem("author"));
                setQuote(storedQuote);
                setAuthorName(storedAuthor)
            }
        }
    }, [secondsToMidnight])

    return (
        <>
            <div className='main'>
                <div className='main-top'>
                    <img src={img1} alt="img" />
                    <div>
                        <span className='bold'>Quote of the Day</span>
                        <span className='quote'>" {quote}"</span>
                        <span className='author-name'> - {authorName}</span>
                        <span className='time'>{moment().format("Do MMMM Y , dddd")}</span>
                    </div>
                </div>
                <div className='main-bottom'>
                    <div className='bottom-left'>
                        <span className='bold'>All Authors</span>
                        {authors.map((author, index) => {
                            return (
                                <div key={index} className='authors' onClick={() => quoteByAuthor(author)}>
                                    <div>
                                        <span>
                                            {index + 1}.
                                        </span>
                                        <span>
                                            {" "}{author}
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className='bottom-right'>
                        <span> <strong style={{ color: "black", fontWeight: "800" }}>Quotes by: </strong>{selectedAuthor}</span>
                        {selectedAuthor && (
                            <div className='quotes-by-author'>
                                {authorQuotes.map((quote, index) => {
                                    return (
                                        <div key={index} >
                                            <div>
                                                <span>
                                                    {index + 1}.
                                                </span>
                                                <span>
                                                    {" "}{quote}
                                                </span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div >
        </>
    )
}

export default App;
