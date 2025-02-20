import { Carousel } from "react-bootstrap";
import pat1 from './images/pat1.png';
import pat2 from './images/pat2.png';
import pat3 from './images/pat3.png';
import pat4 from './images/pat4.png';
import pat5 from './images/pat5.png';
const PatientCarousel=()=>{
    return (
        <center style={{marginTop:40}}>
        <Carousel interval={800}> {/* 2 seconds slide interval */}

        <Carousel.Item>
          <img
            className="d-block w-50 h-50"
            src={pat1} // Use the imported image
            alt="First Doctor"
          />
          <Carousel.Caption>
            <h3 style={{color:'navy'}}>WellBee</h3>
            <p style={{color:'navy'}}>Your Health is Our Responsibilty.</p>
          </Carousel.Caption>
        </Carousel.Item>
  
        <Carousel.Item>
          <img
            className="d-block w-50 h-50"
            src={pat2} // Use the second image
            alt="Second Doctor"
          />
          <Carousel.Caption>
            <h3 style={{color:'navy'}}>WellBee</h3>
            <p style={{color:'navy'}}>"Caring for You, Every Step of the Way."</p>
          </Carousel.Caption>
        </Carousel.Item>
  
        <Carousel.Item>
          <img
            className="d-block w-50 h-50"
            src={pat3} // Use the third image
            alt="Third Doctor"
          />
          <Carousel.Caption>
            <h3 style={{color:'navy'}}>WellBee</h3>
            <p style={{color:'navy'}}>"Your Wellness, Our Commitment..</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-50 h-50"
            src={pat4} // Use the second image
            alt="Second Doctor"
          />
          <Carousel.Caption>
            <h3 style={{color:'navy'}}>WellBee</h3>
            <p style={{color:'navy'}}>"Caring for You, Every Step of the Way."</p>
          </Carousel.Caption>
        </Carousel.Item>


        <Carousel.Item>
          <img
            className="d-block w-50 h-50"
            src={pat5} // Use the second image
            alt="Second Doctor"
          />
          <Carousel.Caption>
            <h3 style={{color:'navy'}}>WellBee</h3>
            <p style={{color:'navy'}}>"Caring for You, Every Step of the Way."</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      </center>
      );
}
export default PatientCarousel;