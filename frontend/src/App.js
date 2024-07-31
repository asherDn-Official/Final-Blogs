import "./App.css";
import Protect from "./Components/Authentication/Protected";
import CreatePost from "./Components/CreatePost";
import EditPost from "./Components/EditPost";
import { Navbar } from "./Components/Header";
import Page from "./Components/Page";
import Pagedetail from "./Components/PageDetail";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Popup from "./Components/Popup";
import Footer from "./Components/Footer";
import ImageSlider from "./Components/Popup";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Page />} />
          <Route path="/:blogtype/:id" element={<Pagedetail />} />

          <Route element={<Protect />}>
            <Route path="/CreatePost" element={<CreatePost />} />
            <Route path="/EditPost/:id" element={<EditPost />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
