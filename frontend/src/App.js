import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { FaUser } from 'react-icons/fa';

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
  // Создаем состояние для данных, которые будем получать из бэкенда:
  const [artists, setArtists] = useState([]);
  const [artistInfo, setArtistInfo] = useState([]);
  const [artistWorks, setArtistWorks] = useState([]);
  const [artistsPage, setArtistsPage] = useState([]);
  const [framedItems, setFramedItems] = useState([]);
  const [classicItems, setClassicItems] = useState([]);
  const [eventsData, setEventsData] = useState([]);

  // useEffect для загрузки данных при монтировании компонента:
  useEffect(() => {
    // Пример запроса для получения художников:
    axios.get('/api/artists/')
      .then(response => {
        setArtists(response.data);
        // Если у тебя отдельный эндпоинт с детальной информацией по художникам:
        setArtistInfo(response.data); // или другой URL, если они отличаются
      })
      .catch(error => {
        console.error("Ошибка при загрузке данных художников", error);
      });

    // Пример запроса для получения работ художников:
    axios.get('/api/artist-works/')
      .then(response => {
        setArtistWorks(response.data);
      })
      .catch(error => {
        console.error("Ошибка при загрузке работ", error);
      });

    // Пример запроса для получения данных для страницы художников:
    axios.get('/api/artists-page/')
      .then(response => {
        setArtistsPage(response.data);
      })
      .catch(error => {
        console.error("Ошибка при загрузке страницы художников", error);
      });

    // Пример запроса для получения данных о рамках:
    axios.get('/api/framed-items/')
      .then(response => {
        setFramedItems(response.data);
      })
      .catch(error => {
        console.error("Ошибка при загрузке рамок", error);
      });

    axios.get('/api/classic-items/')
      .then(response => {
        setClassicItems(response.data);
      })
      .catch(error => {
        console.error("Ошибка при загрузке классических рамок", error);
      });

    // Пример запроса для получения событий:
    axios.get('/api/events/')
      .then(response => {
        setEventsData(response.data);
      })
      .catch(error => {
        console.error("Ошибка при загрузке событий", error);
      });
  }, []);

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
              <ArtistsWorksSection artistsWorks={artistWorks} />
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
              <Artists ArtistsPage={artistsPage} />
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
              <ArtistPersonalPage ArtistInfoPage={artistInfo} works={artistWorks} />
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
              <ArtPersonalPage works={artistWorks} artists={artists} />
              <FooterLogo />
              <Footer />
            </>
          }
        />

        <Route
          path="/framed-canvas"
          element={<FramedCanvas items={framedItems} />}
        />
        <Route
          path="/classic-frames"
          element={<ClassicFrames items={classicItems} />}
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
