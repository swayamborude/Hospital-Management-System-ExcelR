import { Carousel } from "react-bootstrap";
import adm1 from './images/adm1.png';
import adm2 from './images/adm2.png';
import adm3 from './images/adm3.png';
const AdminCarousel=()=>{
    return (
        <center style={{marginTop:40}}>
        <Carousel interval={800}> {/* 2 seconds slide interval */}

        <Carousel.Item>
          <img
            className="d-block w-50 h-50"
            src={adm1} // Use the imported image
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
            src={adm2} // Use the second image
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
            src={adm3} // Use the third image
            alt="Third Doctor"
          />
          <Carousel.Caption>
            <h3 style={{color:'navy'}}>WellBee</h3>
            <p style={{color:'navy'}}>"Your Wellness, Our Commitment..</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      </center>
      );
}
export default AdminCarousel;