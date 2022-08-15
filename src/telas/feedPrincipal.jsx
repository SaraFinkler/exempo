import { Header, ListaAmizade, Post } from "../componetes";
import "./feedPrincipal.css";

export function FeedPrincipal() {
  return (
    <section className="feedPrincipal">
      <Header />
      <Post />
      <ListaAmizade />
    </section>
  );
}
