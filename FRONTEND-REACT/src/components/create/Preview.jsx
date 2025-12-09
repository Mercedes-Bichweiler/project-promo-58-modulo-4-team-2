import Card from "./Card";

function Preview({ cardData }) {
  const changeData = cardData;

  return (
    <section className="preview">
      <div
        className="projectImage"
        style={{
          backgroundImage: cardData.photo ? `url(${cardData.photo})` : null,
        }}
      ></div>
      <Card changeData={changeData} />
    </section>
  );
}

export default Preview;
