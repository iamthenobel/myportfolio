import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Messages from "./pages/Messages";
import CreateBlog from "./pages/CreateBlog";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/create-blog" element={<CreateBlog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
