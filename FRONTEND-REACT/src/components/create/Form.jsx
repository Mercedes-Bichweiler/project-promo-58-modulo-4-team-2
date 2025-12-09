
import GetAvatar from "./getAvatar";

function Form({ handleInputCard, cardData, setCardData, handleClick, cardURL, errorMsg }) {

  const handleChangePhoto = (photoData) => {
      setCardData({
      ...cardData,
      photo: photoData,
    });
  };

  const handleChangeImage= (imageData) => {
    setCardData({
      ...cardData,
      image: imageData,
    });
  }

  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  return (
    <form className="addForm" onSubmit={handleSubmit}>
      <h2 className="title">Información</h2>
      <fieldset className="addForm__group">
        <legend className="addForm__title">Cuéntanos sobre el proyecto</legend>
        <input
          className="addForm__input"
          type="text"
          name="name"
          id="name"
          placeholder="Nombre del proyecto"
          value={cardData.name}
          onInput={handleInputCard}
        />
        <input
          className="addForm__input"
          type="text"
          name="slogan"
          id="slogan"
          placeholder="Slogan"
          value={cardData.slogan}
          onInput={handleInputCard}
        />
        <div className="addForm__2col">
          <input
            className="addForm__input"
            type="url"
            name="repo"
            id="repo"
            placeholder="Repositorio"
            value={cardData.repo}
            onInput={handleInputCard}
          />
          <input
            className="addForm__input"
            type="url"
            name="demo"
            id="demo"
            placeholder="Demo"
            value={cardData.demo}
            onInput={handleInputCard}
          />
        </div>
        <input
          className="addForm__input"
          type="text"
          name="technologies"
          id="technologies"
          placeholder="Tecnologías"
          value={cardData.technologies}
          onInput={handleInputCard}
        />
        <textarea
          className="addForm__input"
          type="text"
          name="desc"
          id="desc"
          placeholder="Descripción"
          value={cardData.desc}
          onInput={handleInputCard}
          rows="5"
        ></textarea>
      </fieldset>

      <fieldset className="addForm__group">
        <legend className="addForm__title">Cuéntanos sobre la autora</legend>
        <input
          className="addForm__input"
          type="text"
          name="author"
          id="author"
          placeholder="Nombre"
          value={cardData.author}
          onInput={handleInputCard}
        />
        <input
          className="addForm__input"
          type="text"
          name="job"
          id="job"
          placeholder="Trabajo"
          value={cardData.job}
          onInput={handleInputCard}
        />
      </fieldset>

      <fieldset className="addForm__group--upload">
        <GetAvatar
          text="Subir foto del proyecto"
          updateAvatar={handleChangePhoto}
        />

<GetAvatar text="Subir foto de la autora" updateAvatar={handleChangeImage} />

        <button className="button--large" onClick={handleClick}>Guardar proyecto</button>
        <p>{errorMsg}</p>
      {cardURL !== "" && (
        <a href={cardURL}>Pincha para ver tu tarjeta</a>
      )}
        
      </fieldset>
    </form>
  );
}

export default Form;
