import "../styles/App.scss";

import LogoBrand from "../images/laptop-code-solid.svg";
import LogoAdalab from "../images/adalab.png";

import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Hero from "./layout/Hero";
import Preview from "./create/Preview";
import Form from "./create/Form";

import LandingPage from "./pages/LandingPage";

import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";



function App() {
  const [cardData, setCardData] = useState({
    name: "",
    slogan: "",
    repo: "",
    demo: "",
    technologies: "",
    desc: "",
    author: "",
    job: "",
    photo: "",
    image: "",
  });

  const [cardURL, setCardURL] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

    //evita que desaparezca lo escrito al recargar la página
  useEffect(() => {
    const savedData = localStorage.getItem("form-backup");

    if(savedData) {
      setCardData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    // Este código se lanza cuando cambie cardData
    localStorage.setItem("form-backup", JSON.stringify(cardData));
  }, [cardData]);

  const handleInputCard = (ev) => {
    setCardData({
      ...cardData,
      [ev.target.name]: ev.target.value,
    });
  };

  const handleClick = () => {
    fetch("https://dev.adalab.es/api/projectCard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cardData),
    })
      .then((res) => res.json())
      .then((responseData) => {
        if (responseData.success) {
          const cardURL = responseData.cardURL;
          setCardURL(cardURL);
          setErrorMsg("");
          console.log(cardURL);
        } else {
          setErrorMsg(responseData.error);
          setCardURL("");
        }
      })
      .catch((error) => {
        console.error("Error en la petición:", error);
      });
  };

  return (
    <div className="container">
      <Header />
      <main className="main">
        <Routes>
          {/*ruta para la landing*/}
          <Route path="/" element={<LandingPage />} />

          {/*ruta para crear la tarjeta*/}
          <Route
            path="/create"
            element={
              <>
                <Hero />
                <Preview cardData={cardData} />
                <Form
                  handleInputCard={handleInputCard}
                  cardData={cardData}
                  setCardData={setCardData}
                  handleClick={handleClick}
                  cardURL={cardURL}
                  errorMsg={errorMsg}
                />
              </>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

