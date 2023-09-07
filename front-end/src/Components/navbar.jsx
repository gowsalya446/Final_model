import { MdConfirmationNumber } from 'react-icons/md';
const NavBar=()=>{
    return(
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            
        <MdConfirmationNumber size={30} /> {/* Renders the ticket icon */}
          <a class="navbar-brand" href="#"><b>&nbsp;&nbsp;BOLETO</b></a>
         
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
              </div>
          </div>
          <div className="btn">
          <a  class="btn btn-dark" href='/registration'>SignUp</a>&nbsp;&nbsp;
         <a  class="btn btn-dark" href='/login'>Login</a>
          </div>
        </div>
      </nav>
           
    );
}
export default NavBar;