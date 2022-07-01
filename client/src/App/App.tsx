import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "../components/organisms/NavBar";
import CustomCardCreation from "../components/pages/CustomCardCreation";
import ErrorPage from "../components/pages/ErrorPage";
import Home from "../components/pages/Home";
import Login from "../components/pages/Login";
import UserCollection from "../components/pages/UserCollection";
import { User } from "../models/models";

// ** TODO: Create an error page for a route that doesn't exist ** //

const App: React.FC = () => {
  const [currentUser, setCurrentuser] = useState<User>({
    user_id: 1,
    username: "Guest",
    name: "",
    password: "",
    avatar: "",
  });

  return (
    <BrowserRouter>
      <NavBar user={currentUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login currentUser={currentUser} setUser={setCurrentuser} />}
        />
        <Route
          path="/collection"
          element={<UserCollection currentUser={currentUser} />}
        />
        <Route path="/custom" element={<CustomCardCreation />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
