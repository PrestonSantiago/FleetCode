import NavBar from "../components/NavBar";
import X from "../assets/icons/X.svg";

export default function PracticePage() {
  const showModal = false;

  if (showModal) {
    return (
      <div className="flex w-full h-full justify-center items-center">
        <section className="bg-primary-light w-150 h-120 rounded-xl text-center">
          <button className="float-right">
            <img src={X} alt="Exit Icon" className="m-4" />
          </button>
          <div className="w-full h-96 flex flex-col justify-evenly">
            <div>
              <h3 className="text-3xl m-4">You Finished This Practice In</h3>
              <h1 className="text-5xl m-4">00:00:000</h1>
            </div>
            <div className="flex justify-around">
              <button className="text-2xl border-2 border-black w-52 h-12 rounded-3xl">
                View Stats
              </button>
              <button className="text-2xl border-2 border-black w-52 h-12 rounded-3xl bg-secondary">
                Practice Again?
              </button>
            </div>
          </div>
        </section>
      </div>
    );
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
