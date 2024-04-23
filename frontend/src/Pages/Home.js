import MotionHoc from "./MotionHoc";
import AnimationLottie from "../helper/animation-lottie";
import experience from '../lottie/code.json';
import './home.css';

const HomeComponent = () => {
  return (
    <div class="center-text">
      <h1>Welcome to CollegeReady</h1>
      <p> Your simplest go-to resource for navigating the college application process in the United States.</p>
      <AnimationLottie animationPath={experience} />

      
    </div>
    
  );
  
};


const Home = MotionHoc(HomeComponent);

export default Home;


