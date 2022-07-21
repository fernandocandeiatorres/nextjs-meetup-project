// colocamos o module para que o scopo desse arquivo css seja
// direcionado apenas para esse componente
// damos um nome, ex: classes, para que nextJS trate nos bastidores
// que o nome das classes sejam únicos por componente, mesmo no geral sendo
// iguais.
import classes from "./MeetupDetail.module.css";

function MeetupDetail({ image, title, address, description }) {
  return (
    <section className={classes.detail}>
      <img src={image} alt="A first meetup" />
      <h1>{title}</h1>
      <address>{address}</address>
      <p>{description}</p>
    </section>
  );
}

export default MeetupDetail;
