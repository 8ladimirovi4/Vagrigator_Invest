import { Routes, Route } from 'react-router-dom';
import './index.css';
import Registration from './features/Auth/Registration/Registration';
import Footer from './features/Footer/Footer';
import ItemDescription from './features/List/ItemDescription';
import List from './features/List/List';
import Lk from './features/Lk/Lk';
import Page404 from './features/404/Page404';
import Header from './features/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import News from "./features/News/News";


function App() {
  const dispatch = useDispatch();

  const {user} = useSelector((state) => state.user)

  useEffect(()=> {

    const dispatchUser = async () => {
      const response = await fetch('/api/auth/dispatchUser');
      const data = await response.json();

  
      dispatch({type: "AddUser", payload: data})

    };
    dispatchUser();
  }, []);
  return (
    <>
      {user.id ? (
        <div className="main__wrapper">
          <Routes>
            {/* <Route
        path="/"
        element={
          <>
            <Header />
            <Registration />
            <Footer />
          </>
        }
      /> */}
            <Route
              path="/cabinet"
              element={
                <>
                  <Header />
                  <Lk />
                  <Footer />
                </>
              }
            />
            <Route
              path="/list"
              element={
                <>
                  <Header />
                  <List />
                  <Footer />
                </>
              }
            />
            <Route path="/list" element={<List />} />
            <Route
              path="list/:ticker/:figi"
              element={
                <>
                  <Header />
                  <ItemDescription />
                  <Footer />
                </>
              }
            />
       <Route path="/news" element={
        <>
        <Header />
         <News />
         <Footer />
        </>
     } />
            <Route
              path="*"
              element={
                <>
                  <Header />
                  <Page404 />
                  <Footer />
                </>
              }
            />
          </Routes>
        </div>
      ) : (
        <div>
          <Routes>
            <Route
              path="*"
              element={
                <>
                  <Header />
                  <Registration />
                  <Footer />
                </>
              }
            />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
