import X from "../assets/icons/X.svg";
function FinishModal() {
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
}

export default FinishModal;
