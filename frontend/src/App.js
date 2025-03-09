import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './index.css';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import FooterLogo from './components/FooterLogo/FooterLogo';
import TextSection from './components/TextSection/TextSection';
import ArtistSection from './components/ArtistSection/ArtistSection';
import ArtistsWorksSection from './components/ArtistsWorksSection/ArtistsWorksSection';
import Artists from './components/Artists/Artists';
import ArtistsText from './components/ArtistsText/ArtistsText';
import ArtistPersonalPage from './components/ArtistPersonalPage/ArtistPersonalPage';
import ArtPersonalPage from './components/ArtPersonalPage/ArtPersonalPage';
import FramedCanvas from "./components/FramedCanvas/FramedCanvas";
import ClassicFrames from "./components/ClassicFrames/ClassicFrames";
import Events from "./components/Events/Events";
import TermsOfUse from "./components/TermsofUse/TermsofUse";
import AboutUs from "./components/AboutUs/AboutUs";

function App() {
  // Состояния для данных из API
  const [artists, setArtists] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [products, setProducts] = useState([]);
  

  useEffect(() => {
    // Получение данных артистов
    axios.get('/api/artists/')
      .then(response => {
        setArtists(response.data);
      })
      .catch(error => {
        console.error("Ошибка при загрузке данных артистов", error);
      });

    // Получение данных событий
    axios.get('/api/events/')
      .then(response => {
        setEventsData(response.data);
      })
      .catch(error => {
        console.error("Ошибка при загрузке данных событий", error);
      });

    // Получение данных товаров
    axios.get('/api/products/')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("Ошибка при загрузке данных товаров", error);
      });
  }, []);

  // Фильтруем товары по категориям, если в product есть поле category
  const framedItems = products.filter(p => p.category === 'painting');
  const classicItems = products.filter(p => p.category !== 'painting');

  return (
    <Router>
      <Header />
      <Routes>
        {/* Главная страница */}
        <Route
          path="/"
          element={
            <>
              <TextSection />
              <ArtistSection artists={artists} />
              <ArtistsWorksSection products={products} />
              <FooterLogo />
              <Footer />
            </>
          }
        />

        {/* Страница со всеми художниками */}
        <Route
          path="/artist"
          element={
            <>
              <Artists ArtistsPage={artists} />
              <ArtistsText />
              <FooterLogo />
              <Footer />
            </>
          }
        />

        {/* Страница одного художника */}
        <Route
          path="/artistpersonalpage/:artistId"
          element={
            <>
              <ArtistPersonalPage ArtistInfoPage={artists} works={products} />
              <FooterLogo />
              <Footer />
            </>
          }
        />

        {/* Страница одной работы */}
        <Route
          path="/artpersonalpage/:workId"
          element={
            <>
              <ArtPersonalPage works={products} artists={artists} />
              <FooterLogo />
              <Footer />
            </>
          }
        />

        {/* Страница с рамками, фильтруем по категориям */}
        <Route
          path="/framed-canvas"
          element={<FramedCanvas products={framedItems} />}
        />
        <Route
          path="/classic-frames"
          element={<ClassicFrames products={classicItems} />}
        />

        <Route
          path="/events"
          element={<Events events={eventsData} />}
        />

        <Route
          path="/terms"
          element={
            <>
              <TermsOfUse />
              <Footer />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <AboutUs />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
