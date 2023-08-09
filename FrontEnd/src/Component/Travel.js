import React,{ useEffect }from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link} from 'react-router-dom';
import styles from '../../src/Component/Travel.css';
import about1 from '../../src/images/about-1.jpg';
import about2 from '../../src/images/about-2.jpg';
import about3 from '../../src/images/about-3.jpg';
import about4 from '../../src/images/about-4.jpg';
import bg_5 from '../../src/images/bg_5.jpg.webp';
import blog1 from '../../src/images/blog1.jpg';
import blog2 from '../../src/images/blog2.jpg';
import blog3 from '../../src/images/blog3.jpg';
import destination1 from '../../src/images/destination1.jpg';
import destination2 from '../../src/images/destination2.jpg';
import destination3 from '../../src/images/destination3.jpg';
import destination4 from '../../src/images/destination4.jpg';
import destination5 from '../../src/images/destination5.jpg';
import destination6 from '../../src/images/destination6.jpg';
import guide1 from '../../src/images/guide1.png';
import guide2 from '../../src/images/guide2.png';
import guide3 from '../../src/images/guide3.png';
import guide4 from '../../src/images/guide4.png';
import package1 from '../../src/images/package1.png';
import package2 from '../../src/images/package2.png';
import package3 from '../../src/images/package3.png';
import package4 from '../../src/images/package4.png';
import package5 from '../../src/images/package5.png';
import package6 from '../../src/images/package6.png';
import footer from '../../src/images/footer.jpg';
import bgmal from '../../src/images/bgmal.jpg';

const handleUserIconClick = () => {
  console.log('User icon clicked.');
};

const Travel = () => {
  useEffect(() => {
    const handleScroll = () => {
      const headerArea = document.querySelector('.header-area');
      if (window.scrollY > 1) {
        headerArea.classList.add('sticky');
      } else {
        headerArea.classList.remove('sticky');
      }
    };

    const menuIcon = document.querySelector('.menu-icon i');
    const menuList = document.querySelector('.header ul');

    menuIcon.onclick = () => {
      menuIcon.classList.toggle('bx-x');
      menuList.classList.toggle('open');
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <header className="header-area">
        <link rel="stylesheet" href="/path/to/boxicons.min.css"></link>
        <div className="container">
          <div className="header-top">
            <div className="header-left">
              <a href="mailto:info@jaflong.com"><i className='bx bx-envelope'></i> info@travel.com</a>
              <a href="tel:+0 (555) 123 45 67"><i className='bx bx-phone'></i> +0 (555) 123 45 67</a>
            </div>
            <div className="header-social">
              <a href=""><FontAwesomeIcon icon={faFacebook} /></a>
              <a href=""><FontAwesomeIcon icon={faTwitter} /></a>
              <a href=""><FontAwesomeIcon icon={faInstagram} /></a>
              <a href=""><FontAwesomeIcon icon={faLinkedin} /></a>
            </div>
          </div>
          <div className="header">
            <a href="#about-area" className="logo">Beyond Boundaries</a>
            <ul>
              <li><a href="#about-area">Home</a></li>
              <li><a href="#destinations-area">Destinations</a></li>
              <li><a href="#package-area">Tours</a></li>
              <li><a href="#guides-area">Guides</a></li>
              <li><a href="#blogs-area">Blogs</a></li>
            </ul>
            <span className="menu-icon">
              <i className='bx bx-menu'></i>
            </span>
            <div className="user-icon" onClick={handleUserIconClick}>
              <Link to="/chooselog">
              <a href="" className="btn">LOGIN</a>
              </Link>
            </div>
            {/* <a href="" className="btn">LOGIN</a> */}
          </div>
        </div>
      </header>

      <section className="bannar-area" style={{ backgroundImage: `url(${bgmal})` }}>
        <div className="container">
          <div className="bannar">
            <h4>welcome to Explore </h4>
            <h2>explore the world <br /> with your journey with us</h2>
            <a href="" className="btn">explore now</a>
          </div>
        </div>
      </section>
      
      <section id="about-area">
        <div className="container">
          <div className="about">
            <div className="about-content">
              <span>welcome </span>
              <h4>It's time to start your adventure</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum tenetur vitae ad laborum aliquam distinctio in reiciendis deleniti quos</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure hic magnam adipisci ut quisquam earum voluptate nam dolore iusto quod!</p>
              <a href="" className="btn">read more</a>
            </div>
            <div className="about-img">
              <div className="single-about">
                <img src={about1} alt="" />
              </div>
              <div className="single-about">
                <img src={about2} alt="" />
              </div>
              <div className="single-about">
                <img src={about3} alt="" />
              </div>
              <div className="single-about">
                <img src={about4} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="destinations-area">
        <div className="container">
          <div className="section-title">
            <p>top destinations</p>
            <h4>Explore Top Destinations</h4>
          </div>
          <div className="destinations">
            <div className="single-destination">
              <img src={destination1} alt="" />
              <div className="destination-content">
                <h4>Greece<span><i className='bx bx-briefcase-alt-2'></i> 4 trips available</span></h4>
                <a href=""><i className='bx bx-right-arrow-alt'></i></a>
              </div>
            </div>
            <div className="single-destination">
              <img src={destination2} alt="" />
              <div className="destination-content">
                <h4>Switzerland<span><i className='bx bx-briefcase-alt-2'></i> 2 trips available</span></h4>
                <a href=""><i className='bx bx-right-arrow-alt'></i></a>
              </div>
            </div>
            <div className="single-destination">
              <img src={destination3} alt="" />
              <div className="destination-content">
                <h4>Maldives <span><i className='bx bx-briefcase-alt-2'></i> 4 trips available</span></h4>
                <a href=""><i className='bx bx-right-arrow-alt'></i></a>
              </div>
            </div>
            <div className="single-destination">
              <img src={destination4} alt="" />
              <div className="destination-content">
                <h4>Germany <span><i className='bx bx-briefcase-alt-2'></i> 2 trips available</span></h4>
                <a href=""><i className='bx bx-right-arrow-alt'></i></a>
              </div>
            </div>
            <div className="single-destination">
              <img src={destination5} alt="" />
              <div className="destination-content">
                <h4>Paris <span><i className='bx bx-briefcase-alt-2'></i> 3 trips available</span></h4>
                <a href=""><i className='bx bx-right-arrow-alt'></i></a>
              </div>
            </div>
            <div className="single-destination">
              <img src={destination6} alt="" />
              <div className="destination-content">
                <h4>Bali<span><i className='bx bx-briefcase-alt-2'></i> 4 trips available</span></h4>
                <a href=""><i className='bx bx-right-arrow-alt'></i></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="package-area">
        <div className="container">
          <div className="section-title">
            <p>Perfect for You</p>
            <h4>Popular Tour Packages</h4>
          </div>
          <div className="packages">
            <div className="single-package">
              <img src={package1} alt="" />
              <h4>Ferry Beach</h4>
              <div className="package-meta">
                <span><i className='bx bx-map'></i>Maldives</span>
                <span><i className='bx bxs-watch'></i> 4 Days / 5 Nights</span>
                <span><i className='bx bx-money'></i>$59</span>
              </div>
              <a href="">explore now <i className='bx bxs-right-arrow-circle'></i></a>
            </div>
            <div className="single-package">
              <img src={package2} alt="" />
              <h4>Snowfall hills</h4>
              <div className="package-meta">
                <span><i className='bx bx-map'></i>Switzerland</span>
                <span><i className='bx bxs-watch'></i> 7 Days / 8 Nights</span>
                <span><i className='bx bx-money'></i>$509</span>
              </div>
              <a href="">explore now <i className='bx bxs-right-arrow-circle'></i></a>
            </div>
            <div className="single-package">
              <img src={package3} alt="" />
              <h4>Beaches</h4>
              <div className="package-meta">
                <span><i className='bx bx-map'></i>Bali</span>
                <span><i className='bx bxs-watch'></i> 3 Days / 4 Nights</span>
                <span><i className='bx bx-money'></i>$119</span>
              </div>
              <a href="">explore now <i className='bx bxs-right-arrow-circle'></i></a>
            </div>
            <div className="single-package">
              <img src={package4} alt="" />
              <h4>Fort of Fun</h4>
              <div className="package-meta">
                <span><i className='bx bx-map'></i>Greece</span>
                <span><i className='bx bxs-watch'></i> 5 Days / 6 Nights</span>
                <span><i className='bx bx-money'></i>$159</span>
              </div>
              <a href="">explore now <i className='bx bxs-right-arrow-circle'></i></a>
            </div>
            <div className="single-package">
              <img src={package5} alt="" />
              <h4>National Capitol of Cuba</h4>
              <div className="package-meta">
                <span><i className='bx bx-map'></i>USA</span>
                <span><i className='bx bxs-watch'></i> 3 Days / 4 Nights</span>
                <span><i className='bx bx-money'></i>$59</span>
              </div>
              <a href="">explore now <i className='bx bxs-right-arrow-circle'></i></a>
            </div>
            <div className="single-package">
              <img src={package6} alt="" />
              <h4>White Fort</h4>
              <div className="package-meta">
                <span><i className='bx bx-map'></i> Greece</span>
                <span><i className='bx bxs-watch'></i> 2 Days / 3 Nights</span>
                <span><i className='bx bx-money'></i>$29</span>
              </div>
              <a href="">explore now <i className='bx bxs-right-arrow-circle'></i></a>
            </div>
          </div>
        </div>
      </section>

      <section id="guides-area">
        <div className="container">
          <div className="section-title">
            <p>Tour Guides</p>
            <h4>Meet Our Excellent Guides</h4>
          </div>
          <div className="guides">
            <div className="single-guide">
              <img src={guide1} alt="" />
              <h4>John <span>Tour guide</span></h4>
            </div>
            <div className="single-guide">
              <img src={guide2} alt="" />
              <h4>Mark <span>Tour guide</span></h4>
            </div>
            <div className="single-guide">
              <img src={guide3} alt="" />
              <h4>Dane <span>Tour guide</span></h4>
            </div>
            <div className="single-guide">
              <img src={guide4} alt="" />
              <h4>Joe <span>Tour guide</span></h4>
            </div>
          </div>
        </div>
      </section>

      <section id="blogs-area">
        <div className="container">
          <div className="section-title">
            <p>news & article</p>
            <h4>latest travel blogs</h4>
          </div>
          <div className="blogs">
            <div className="single-blog">
              <div className="blog-img">
                <img src={blog1} alt="" />
                <span>category</span>
              </div>
              <div className="blog-meta">
                <a href=""><i className='bx bx-user-circle'></i>Joe</a>
                <a href=""><i className='bx bxs-calendar'></i> 03 nov 2022</a>
              </div>
              <h4>Learn How To Motivate Yourself</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nam facilis cum eius soluta qui distinctio vel voluptate, optio facere!</p>
              <a href="">read more</a>
            </div>
            <div className="single-blog">
              <div className="blog-img">
                <img src={blog2} alt="" />
                <span>category</span>
              </div>
              <div className="blog-meta">
                <a href=""><i className='bx bx-user-circle'></i>Mark</a>
                <a href=""><i className='bx bxs-calendar'></i> 05 jan 2022</a>
              </div>
              <h4>Learn How To Motivate Yourself</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nam facilis cum eius soluta qui distinctio vel voluptate, optio facere!</p>
              <a href="">read more</a>
            </div>
            <div className="single-blog">
              <div className="blog-img">
                <img src={blog3} alt="" />
                <span>category</span>
              </div>
              <div className="blog-meta">
                <a href=""><i className='bx bx-user-circle'></i> Dane</a>
                <a href=""><i className='bx bxs-calendar'></i> 02 mar 2022</a>
              </div>
              <h4>Learn How To Motivate Yourself</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nam facilis cum eius soluta qui distinctio vel voluptate, optio facere!</p>
              <a href="">read more</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer-area" style={{ backgroundImage: `url(${footer})` }}>
        <div className="container">
          <div className="footer">
            <div className="single-footer">
              <h2>Voyage</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati ex perspiciatis temporibus nobis id reprehenderit illum tempore soluta consequatur.</p>
              <div className="footer-social">
                <a href=""><FontAwesomeIcon icon={faFacebook} /></a>
                <a href=""><FontAwesomeIcon icon={faTwitter} /></a>
                <a href=""><FontAwesomeIcon icon={faInstagram} /></a>
                <a href=""><FontAwesomeIcon icon={faLinkedin} /></a>
              </div>
            </div>
            <div className="single-footer">
              <h4>quick links</h4>
              <ul>
                <li><a href=""><i className='bx bx-chevrons-right'></i> Home</a></li>
                <li><a href=""><i className='bx bx-chevrons-right'></i> About</a></li>
                <li><a href=""><i className='bx bx-chevrons-right'></i> Services</a></li>
                <li><a href=""><i className='bx bx-chevrons-right'></i> Tours</a></li>
                <li><a href=""><i className='bx bx-chevrons-right'></i> Contact</a></li>
              </ul>
            </div>
            <div className="single-footer">
              <h4>tour type</h4>
              <ul>
                <li><a href=""><i className='bx bx-chevrons-right'></i> Adventure Tour</a></li>
                <li><a href=""><i className='bx bx-chevrons-right'></i> Couple Tour</a></li>
                <li><a href=""><i className='bx bx-chevrons-right'></i> Family Tour</a></li>
                <li><a href=""><i className='bx bx-chevrons-right'></i> Group Tour</a></li>
                <li><a href=""><i className='bx bx-chevrons-right'></i> Village Tour</a></li>
              </ul>
            </div>
            <div className="single-footer">
              <h4>get in touch</h4>
              <ul>
                <li><i className='bx bx-map'></i> Callison Laney Buoy, Michigan, USA</li>
                <li><i className='bx bx-phone'></i> +0 (555) 123 45 67</li>
                <li><i className='bx bx-mobile-alt'></i> +0 (555) 123 45 67</li>
                <li><i className='bx bx-envelope'></i> info@jaflong.com</li>
                <li><i className='bx bx-globe'></i> www.jaflong.com</li>
              </ul>
            </div>
          </div>
          <p className="copy">&copy; 2023. all rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}


export default Travel;
