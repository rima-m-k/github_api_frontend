// import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import RepoList from "./pages/RepoList/RepoList";
import RepoDesc from "./pages/RepoDesc/RepoDesc";
import FollowersList from "./pages/FollowersList/FollowersList";
import Error from "./pages/Error/Error";
import Layout from "./components/Layouts/Layout/Layout";

function App() {
  return (
    <div className="App">
      <>
        <BrowserRouter>

          <Routes> 
            <Route path="/" element={<Layout />}>

              <Route index element={<Home />} />        
              <Route path="/repository-list" element={<RepoList />} />
              <Route path="/repository-details" element={<RepoDesc />} />
              <Route path="/followers-list" element={<FollowersList />} />
              <Route path="*" element={<Error />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </>

    </div>
  );
}

export default App;
