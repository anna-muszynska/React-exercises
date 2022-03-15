import {Link, Route, useParams, useRouteMatch} from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";

const DUMMY_QUOTES = [
    {id: 1, author: 'Ania', text: 'Learning React is fun!'},
    {id: 2, author: 'Maria', text: 'Learning React is great!'},
];

const QuoteDetail = () => {
    const params = useParams();
    const match = useRouteMatch();

    const quote = DUMMY_QUOTES.find(quote => quote.id === Number(params.quoteId));

    if(!quote){
        return <p>No quote found!</p>
    }

    return (
        <section>
            <HighlightedQuote text={quote.text} author={quote.author}/>
            <Route path={match.path} exact>
                <div className='centered'>
                    <Link className='btn--flat' to={`${match.url}/comments`}>Load comments</Link>
                </div>
            </Route>
            <Route path={`${match.path}/comments`}>
                <Comments />
            </Route>
        </section>
    )
};

export default QuoteDetail;