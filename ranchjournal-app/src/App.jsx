import './App.css';
import Arxiv from './Pages/Arxiv/Arxiv';
import ArxivMonth from './Pages/ArxivMinth/ArxivMonth';
import Archivview from './Pages/ArxivViev/ArxivView';
import Home from './Pages/Home/Home';
import Journal from './Pages/Journal/Journal';
import Journalview from './Pages/JournalView/Journalview';
import Navbar from './Pages/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Umumiy from './Pages/Umumiy/Umumiy';
import Taxririyat from './Pages/Taxririyat/Taxririyat';
import './Responsive/Responsive.css';
import AppContext from './context/AppContext';
import { useState } from 'react';
import JurnalTalablari from './Pages/jurnalTalablari/JurnalTalablari';
import NotificationBar from './nofeciton/NotificationBar';
import Footer from './Pages/Footer/Footer';
import Elonlar from './Pages/elonlar/Elonlar';

function App() {

  const [leng, setLeng] = useState('uz');
  console.log(leng);

  return (
    <AppContext.Provider value={{ leng, setLeng }}>
      <div className="App">
        <NotificationBar />
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/arxiv' element={<Arxiv />} />
          <Route path='/arxivmonth/:id' element={<ArxivMonth />} />
          <Route path='/arxivview/:id' element={<Archivview />} />
          <Route path='/journal/:id' element={<Journal />} />
          <Route path='/jurnalwiev/:id' element={<Journalview />} />
          <Route path='/Umumiy' element={<Umumiy />} />
          <Route path='/Talablari' element={<JurnalTalablari />} />
          <Route path='/Tahririyat' element={<Taxririyat leng={leng} setLeng={leng} />} />
          <Route path='/elonlar' element={<Elonlar />} />
        </Routes>
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default App;
