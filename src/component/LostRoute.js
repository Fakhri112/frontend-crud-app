import gambar from '../assets/question.png'
import { Header } from './Header';

export const LostRoute = () => {
  return (
    <div>
    <Header status="home" />
    <div className="col text-center">
        <img src={gambar} alt="" width="300" height="350"/>
        <h4>Are you lost?</h4>
        <a href="/contact">Go Back</a>
    </div>
    </div>
  );
};
