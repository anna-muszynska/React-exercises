import QuoteList from "../components/quotes/QuoteList";

const DUMMY_QUOTES = [
    {id: 1, author: 'Ania', text: 'Learning React is fun!'},
    {id: 2, author: 'Maria', text: 'Learning React is great!'},
];

const AllQuotes = () => {
    return <QuoteList quotes={DUMMY_QUOTES}/>
};

export default AllQuotes;