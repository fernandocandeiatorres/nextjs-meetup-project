// colocamos o module para que o scopo desse arquivo css seja
// direcionado apenas para esse componente
// damos um nome, ex: classes, para que nextJS trate nos bastidores
// que o nome das classes sejam únicos por componente, mesmo no geral sendo
// iguais.
import classes from "./MeetupDetail.module.css";

function MeetupDetail(props) {
  return (
    <section className={classes.detail}>
      <img
        src="https://i.pinimg.com/originals/ce/2b/32/ce2b323c5cd34d1662eddbf1bb4ee48d.jpg"
        alt="A first meetup"
      />
      <h1>A First Meetup</h1>
      <address>Some Street 5, Some City</address>
      <p>The meetup description</p>
    </section>
  );
}

export default MeetupDetail;
