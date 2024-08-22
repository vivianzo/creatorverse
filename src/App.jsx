import Header from "./components/Header"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddCreator from "./components/pages/AddCreator";
import ViewCreators from "./components/pages/ViewCreators";
import { supabase } from "./client";
import { useEffect, useState } from "react";
import ShowSingleCreator from "./components/pages/ShowSingleCreator";
import EditCreator from "./components/pages/EditCreator";

function App() {
  const [creators, setCreators] = useState([])

  useEffect(() => {
    getCreators();
  }, []);

  async function getCreators() {
    const {data, error} = await supabase.from("creators").select();
    setCreators(data);
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header creators={creators} />} />
        <Route path="/add-creator" element={<AddCreator />} />
        <Route path="/view-creators" element={<ViewCreators creators={creators}/>} />
        <Route path="/creator/:id" element={<ShowSingleCreator />} />
        <Route path="/edit/:id" element={<EditCreator />} />
      </Routes>
    </Router>
  )
}

export default App
