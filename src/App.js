import { Home } from "./component/Home";
import { About } from "./component/About";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Contact } from "./component/Contact";
import { Detail } from "./component/Detail";
import { AddEditContact } from "./component/AddEditContact";
import { LostRoute } from "./component/LostRoute";
import { LoginPage } from "./component/Login";
import { RegisterPage } from "./component/Register";
import { AuthUser } from "./component/AuthUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/" element={<LoginPage />} />
        <Route path="/register/" element={<RegisterPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/user" element={<AuthUser />} />
        <Route path="/contact/add" element={<AddEditContact page="Add Contact" />} />
        <Route path="/contact/detail/" element={<Detail />} />
        <Route path="/contact/edit/" element={<AddEditContact page="Edit Contact" />} />
        <Route path="/contact/edit/:req" element={<LostRoute />} />
        <Route path="/contact/:req" element={<LostRoute />} />
        <Route path="/about" element={<About />} />
        <Route path="/:req" element={<LostRoute />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
