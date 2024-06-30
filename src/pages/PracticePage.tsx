import NavBar from "../components/NavBar";
import FinishModal from "../components/FinishModal";

export default function PracticePage() {
  const showModal = false;

  if (showModal) {
    return <FinishModal />;
  } else {
    return (
      <>
        <NavBar />
        <section className="flex justify-between pb-8 px-8">
          <aside className="w-72 h-24 pl-2 flex flex-col justify-center text-2xl bg-primary-light">
            <h3>Enter to Submit</h3>
            <h3>Ctrl + Backspace to Quit</h3>
          </aside>
          <aside className="w-72 h-24 text-center flex flex-col justify-center text-5xl bg-primary-light">
            00:00:000
          </aside>
        </section>
        <section className="w-3/4 h-2/5 m-auto p-8 flex justify-center bg-primary-light ">
          <h1 className="m-auto text-7xl">Command Prompt</h1>
        </section>
        <section className="w-3/4  mx-auto mt-8 flex justify-center bg-primary-light ">
          <input
            className="w-full h-28 p-4 text-7xl bg-primary-light"
            type="text"
          />
        </section>
      </>
    );
  }
}
