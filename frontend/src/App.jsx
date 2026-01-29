import { useState } from 'react'
import './App.css'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  const [page, setPage] = useState("login");

  const handleChangePage = (nextPage) => {
    setPage(nextPage);
  };

  return (
    <>
    {page === "login" && <Login onChangePage={setPage} />}
    {page === "signup" && <Signup onChangePage={setPage} />}
    </>
  );
}

export default App;