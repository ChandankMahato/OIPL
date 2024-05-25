import React, { useEffect, useState }  from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./GlobalCSS/index.css";
import "./GlobalCSS/common.css";
import "./GlobalCSS/responsive.css";
import ErrorPage from './Components/ErrorPage/errorPage';
import AdminContent from './Containers/Admin/admin';
import ProtectedRoute from './Admin/ProtectedRoute';
import { UserAuthContextProvider} from './context/userAuthContext';
import { Slide, ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Header from './Components/Header/header';
import Theme from './Components/Theme/theme';
import Footer from './Components/Footer/footer';
import Messages from './Admin/Contact/messages';
import FacebookMsg from './Components/FacebookMsg/facebookMsg';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './Config/Firebase/config';
import Home from './Containers/Client/home';
import Introduction from './Containers/Client/introduction';
import Mission from './Containers/Client/mission';
import BoardOfDirector from './Containers/Client/BOD';
import ManagementTeam from './Containers/Client/Management';
import GalleryPage from './Containers/Client/Gallery';
import ReportPage from './Containers/Client/Report';
import CareerPage from './Containers/Client/Career';
import Requests from './Admin/Career/request';

function App() {

  const [day, setDay] = useState(false);

  const changeMode = () => {
    setDay((prevDay) => !prevDay);
    document.body.classList.toggle("dark");
  }

   useEffect(() => {
  const CACHE_KEY = "updateCache";
  const updateCollectionRef = collection(db, "update");

  const getUpdatedAtData = async () => {
    try {
      const data = await getDocs(updateCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const recentUpdate = {
        data: filteredData[0].updatedAt
      };

      const cached = localStorage.getItem(CACHE_KEY);

      if (cached) {
        const { data: cachedData } = JSON.parse(cached);
        const recentUpdateTimestamp = recentUpdate.data.seconds * 1000 + recentUpdate.data.nanoseconds / 1e6;
        const cachedTimestamp = cachedData.seconds * 1000 + cachedData.nanoseconds / 1e6;

        if (recentUpdateTimestamp > cachedTimestamp) {
          localStorage.clear();
        } else {
          toast.info("You are Viewing the Most Recent Version of the Website");
        }
      } else {
        localStorage.setItem(CACHE_KEY, JSON.stringify(recentUpdate));
      }
    } catch (error) {
      toast.error("Could not Load Update Flag");
    }
  };

  getUpdatedAtData();
}, []);


  return (
    <React.Fragment>
      <BrowserRouter>
        <UserAuthContextProvider>
          <Header day={day} changeMode = {changeMode}/>
          <Theme day={day} changeMode = {changeMode}/>
          <Routes>
            <Route
              path = "/" 
              element={<Home/>}
            />
            <Route 
              path= "/introduction"
              element={<Introduction/>}
            />
            <Route 
              path= "/mission-vision"
              element={<Mission/>}
            />
            <Route 
              path= "/bod"
              element={<BoardOfDirector/>}
            />
            <Route 
              path= "/management"
              element={<ManagementTeam/>}
            />
            <Route 
              path= "/gallery"
              element={<GalleryPage/>}
            />
            <Route 
              path= "/reports"
              element={<ReportPage/>}
            />
            <Route 
              path= "/career"
              element={<CareerPage/>}
            />
            <Route 
              path ="/qej8hh8jeq"
              element={
                <ProtectedRoute>
                  <AdminContent/>
                </ProtectedRoute>}
              />
            <Route 
              path="/qej8hh8jeq/messages"
              element={
                <ProtectedRoute>
                  {<Messages/>}
                </ProtectedRoute>
              }
            />
            <Route 
              path="/qej8hh8jeq/requests"
              element={
                <ProtectedRoute>
                  {<Requests/>}
                </ProtectedRoute>
              }
            />
            <Route 
              path = "*" 
              element={<ErrorPage/>}
            />
          </Routes>
          <Footer/>
        </UserAuthContextProvider>
      </BrowserRouter>
     <ToastContainer
      position="bottom-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      transition={Slide}
    />
    <FacebookMsg/>
    </React.Fragment>
  );
}

export default App;