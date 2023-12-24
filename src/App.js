import './App.css';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import { Shlokas } from './Components/shlokas';
import { Chapters } from './Components/Chapters';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Shlokas/>}/>
        <Route exact path="/chapter" element={<Chapters/>}/>
      </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;
