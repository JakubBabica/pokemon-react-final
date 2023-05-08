import { Outlet, Link, useLoaderData, Form,redirect,} from "react-router-dom";
export async function action() {
  return redirect(`pokemons`);
}
export async function loader() {
  return { };
}
export default function Root() {
    return (
      <>
        <div id="sidebar">
          <h1>React Router</h1>
          <nav>
          <Link to={`pokemons`}>
                  <i>Pokemons</i>
          </Link>
          <Link to={`about`}>
                  <i>About</i>
          </Link>
          </nav>
        </div>
        <div id="detail">   <Outlet /></div>
      </>
    );
  }