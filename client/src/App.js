import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Header from "./components/Header";
import Create from "./Pages/Create";
import PostPage from "./Pages/PostPage";
import Edit from "./Pages/Edit";
import ProfilePage from "./Pages/ProfilePage";


function App() {
  return (
    <div>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/login' element={<Login/>} />
      <Route path="/create" element={<Create/>}/>
      <Route path="/post/:id" element={<PostPage/>} />
      <Route path="post/edit/:id" element={<Edit/>} />
      <Route path="user/profile/:id" element={<ProfilePage/>}/>
    </Routes>
    </div>
  );
}

export default App;
