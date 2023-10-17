import { FiMenu } from "react-icons/fi"
import { AiFillCloseCircle } from "react-icons/ai"
import {Link} from "react-router-dom"
import Footer from "../Components/Footer"
function HomeLayout({children}) {

    function changewidth() {
        const drawerSide = document.getElementsByClassName("drawer-Side")
        drawerSide[0].style.width = 0
    }

    function hideDrawer() {
        const element = document.getElementsByClassName("drawer-toggle");
        element[0].checked = false;

        changewidth()

    }
  return (
    <div className="min-h-[90vh]">
      <div className="drawer absolute left-0 z-50 w-fit">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drwer-content">
          <label htmlFor="my-drawer" className="cursor-pointer relative">
            <FiMenu
              onClick={changewidth}
              size={"32px"}
              className="font-bold text-white  m-4"
            />
          </label>
        </div>
        <div className="drawer-side w-0">
                  <label htmlFor="my-drawer" className="drawer-overlay"></label>
           <ul className="menu p-4 w-48 sm:80 bg-base-100 text-base-content relative">
                      <li className="w-fit absolute right-2 z-50">
                          <button onClick={hideDrawer}>
                              <AiFillCloseCircle size={24}/>
                          </button>
                      </li> 
                      <li>
                          <Link to="/">Home</Link>
                      </li>
                      <li>
                          <Link to="/courses">All Courese</Link>
                      </li>
                      <li>
                          <Link to="/contact"> Contact us</Link>
                      </li>
                      <li>
                          <Link to="/about">About us</Link>
                      </li>
           </ul>
        </div>
          </div>
          {children}
          <Footer/>
    </div>
  );
}

export default HomeLayout;
