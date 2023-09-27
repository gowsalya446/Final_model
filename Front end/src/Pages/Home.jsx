import "./Home.css"
import Filter from "../Components/Filter";
const Home=()=>{
    return(<>
    <div className="btn">
    <a href="/Showhistory" className="btn btn-primary show">View History</a>

    </div>
    <div className='body'>
        <article className='center'>GET <span className='color'>MOVIE</span> TICKETS</article>
           <p className='art'>Buy movie tickets in advance,find movie times watch trailers,<br/>read movie reviews and much more</p>
       
      </div>
       
     
      <Filter/>

     
      </>
    );
}

export default Home;