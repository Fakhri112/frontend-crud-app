import gambar from '../assets/hello.png'
import { Header } from './Header';

export const Home = () => {
  return (
    <div>
      <Header status="home" />
      <div className="col text-center">
        <img src={gambar} alt="" />
        <h1>This is home</h1>
        <h3>Proceed to contact menu please 👉</h3>
      </div>
    </div>
  );
};
