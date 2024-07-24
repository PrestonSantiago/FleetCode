import { Link } from "react-router-dom";
import X from "../assets/icons/X.svg";

const FinishModal: React.FC<{
  restart: () => void;
  time: number;
}> = (props) => {
  //function FinishModal() {
  console.log(props.time);
  const numberFormatRegex = /\b(\d)\b/g;
  const formattedTime = {
    min: Math.floor(props.time / 60 / 1000)
      .toString()
      .replace(numberFormatRegex, "0$1"),
    sec: Math.floor((props.time / 1000) % 60)
      .toString()
      .replace(numberFormatRegex, "0$1"),
    ms: (props.time % 1000)
      .toString()
      .replace(numberFormatRegex, "00$1")
      .replace(/\b(\d{2})\b/g, "0$1"),
  };

  return (
    <div className="flex w-full h-full justify-center items-center">
      <section className="bg-primary-light w-150 h-120 rounded-xl text-center">
        <button className="float-right">
          <Link to="/" className="block">
            <img src={X} alt="Exit Icon" className="m-4" />
          </Link>
        </button>
        <div className="w-full h-96 flex flex-col justify-evenly">
          {props.time > 0 ? (
            <div>
              <h3 className="text-3xl m-4">You Finished This Practice In</h3>
              <h1 className="text-5xl m-4">
                {formattedTime.min}:{formattedTime.sec}:{formattedTime.ms}
              </h1>
            </div>
          ) : (
            <h1 className="text-3xl m-4">
              A time could not be saved. Please try again.
            </h1>
          )}

          <div className="flex justify-around">
            <button className="text-2xl border-2 border-black w-52 h-12 rounded-3xl">
              <Link to="/stats" className="block">
                View Stats
              </Link>
            </button>
            <button
              onClick={props.restart}
              className="text-2xl border-2 border-black w-52 h-12 rounded-3xl bg-secondary"
            >
              Practice Again?
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FinishModal;
