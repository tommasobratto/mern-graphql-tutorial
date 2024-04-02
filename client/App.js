import { Route, Routes } from "react-router-dom";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import NavBar from "./components/navbar";

const App = () => {
    return (
        <div>
            <NavBar />
            <Routes>
                <Route exact path="/" element={<RecordList />} />
                <Route path="edit/:id" element={<Edit />}/>
                <Route path="/create" element={<Create />}/>
            </Routes>
        </div>
    );
};

export default App;