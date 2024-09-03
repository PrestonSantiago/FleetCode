import NavBar from "../components/NavBar";

function ErrorPage() {
  return (
    <>
      <NavBar />
      <main>
        <h1>Oh no!</h1>
        <p>An error occured finding this page!</p>
      </main>
    </>
  );
}

export default ErrorPage;
