import React, { useState, useEffect, Suspense } from 'react';
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
import { CartProvider } from './context/CartContext';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import { AuthProvider } from './context/AuthContext';
import SearchPage from './components/SearchPage/SearchPage';



// Ленивая загрузка компонентов
const ArtistPersonalPage = React.lazy(() => import('./components/ArtistPersonalPage/ArtistPersonalPage'));
const ArtPersonalPage = React.lazy(() => import('./components/ArtPersonalPage/ArtPersonalPage'));
const FramedCanvas = React.lazy(() => import('./components/FramedCanvas/FramedCanvas'));
const ClassicFrames = React.lazy(() => import('./components/ClassicFrames/ClassicFrames'));
const Events = React.lazy(() => import('./components/Events/Events'));
const TermsOfUse = React.lazy(() => import('./components/TermsofUse/TermsofUse'));
const AboutUs = React.lazy(() => import('./components/AboutUs/AboutUs'));
const CartPage = React.lazy(() => import('./components/CartPage/CartPage'));
const Auth = React.lazy(() => import('./components/AuthPage/AuthPage'));
const AccountPage = React.lazy(() => import('./components/AccountPage/AccountPage'));


function App() {
  const [artists, setArtists] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Функция для загрузки данных
  const fetchData = async (url, setData) => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (err) {
      console.error(`Ошибка при загрузке данных с ${url}:`, err);
      setError(err.message);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        await Promise.all([
          fetchData('/api/artists/', setArtists),
          fetchData('/api/products/', setProducts),
        ]);
      } catch (err) {
        setError("Ошибка при загрузке данных. Пожалуйста, попробуйте позже.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Фильтруем товары по категориям
  const framedItems = products.filter(p => p.category === 'painting');
  const classicItems = products.filter(p => p.category !== 'painting');

  // Если данные загружаются, показываем спиннер
  if (loading) {
    return <LoadingSpinner />;
  }


  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Header />
          <Suspense fallback={<LoadingSpinner />}>
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

              {/* Страница корзины */}
              <Route path="/cart" element={<CartPage />} />

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

              <Route
                path="/account"
                element={
                  <>
                    <AccountPage />
                    <Footer />
                  </>
                }
              />

              <Route 
                path="/search" 
                element={
                  <SearchPage />
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

              {/* Страница с рамками */}
              <Route
                path="/framed-canvas"
                element={<FramedCanvas products={framedItems} />}
              />
              <Route
                path="/classic-frames"
                element={<ClassicFrames products={classicItems} />}
              />

              {/* Страница событий */}
              <Route
                path="/events"
                element={<Events events={eventsData} />}
              />

              {/* Страница условий использования */}
              <Route
                path="/terms"
                element={
                  <>
                    <TermsOfUse />
                    <Footer />
                  </>
                }
              />

              {/* Страница "О нас" */}
              <Route
                path="/about"
                element={
                  <>
                    <AboutUs />
                    <Footer />
                  </>
                }
              />

              {/* Страница авторизации и регистрации */}
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </Suspense>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;