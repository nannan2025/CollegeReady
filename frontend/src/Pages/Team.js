import MotionHoc from "./MotionHoc";
import './team.css';
import AnimationLottie from "../helper/animation-lottie";
import experience from '../lottie/code2.json';

const TeamComponent = () => {
  return (
    <div >
      <h1 class="center-text main">Our Mission</h1>
      <div class="text-box">
        <p class="center-text">
        Our mission is to provide comprehensive guidance to hardworking students who may not have access to traditional education agencies or college counselors at their schools. <br/>
        </p>
        <AnimationLottie animationPath={experience} />
      </div>
    </div>
    
  );
};

const Team = MotionHoc(TeamComponent);

export default Team;

