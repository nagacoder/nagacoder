import React, { Component } from 'react';
// import logo from './logo.svg';

// import './swiper.min.css'
import Twitter from '../assets/twitter.png'
import Github from '../assets/github.png'
// import Linkedin from './assets/linkedin.png'
// import Medium from './assets/medium.png'
// import logo1 from './assets/logo-1.png'
// import logo2 from './assets/logo-2.png'
// import logo3 from './assets/logo-3.png'
class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            showNav :false
        }
    }


    _handleNav = () => {
        
        this.setState({
            showNav:!this.state.showNav
        })
    }

  render() {
    return (
      <div>
      <header className="hero">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-6 col-xs-12">
            <nav>
              <div className="menu-toggle" onClick={()=>this._handleNav()}>
                <div className="hamburger">
                  <span className="line"></span>
                  <span className="line"></span>
                  <span className="line"></span>
                </div>
                <div className="cross">
                  <span className="line"></span>
                  <span className="line"></span>
                </div>
              </div>
              <ul className={`main-nav ${this.state.showNav ? 'show-it':null}`}>
                <li><a href="#">Home</a></li>
                <li><a href="#">Portfolio</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </nav>
            
            <div className="hero-text">
              <h1><span>Hi, I am</span><br/>Darvin Sinaga</h1>
              <h3>Frontend Engineer <span style={{
                color:'#c5c2c2'
              }}>from</span> Batam</h3>
              <a href="#" className="btn btn-lg btn-primary">hire me</a>
              <ul className="social-links">
                <li className="label">Join me here</li>
                <li><a href="https://twitter.com/nagacoder"><img src={Twitter}/></a></li>
                <li><a href="https://github.com/nagacoder"><img src={Github}/></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>

    {/* <section className="case-study">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h4 className="sub-heading">Exclusively</h4>
            <h1 className="heading purple">
            <span className="purple">works</span> with <br/>Startups and founders</h1>
         
            <div className="swiper-container ">
              <div className="swiper-wrapper" >
                <div className="swiper-slide client-box" style={{
                  width: 307 ,marginRight: 60
                }}>
                  <img src={logo2} className="client-logo"/>
                  <h3 className="text-left title">Visual identity for upsidedown</h3>
                  <p className="text-left tag">Branding, UI, Website</p>
                  <p className="text-left"><a href="#">Know More &#8594;</a></p>
                </div>
                <div className="swiper-slide client-box" style={{
                  width: 307 ,marginRight: 60
                }}>
                  <img src={logo1} className="client-logo"/>
                  <h3 className="text-left title">User Experience design for the AI</h3>
                  <p className="text-left tag">Branding, UI, Website</p>
                  <p className="text-left"><a href="#">Know More &#8594;</a></p>
                </div>
                <div className="swiper-slide client-box" style={{
                  width: 307 ,marginRight: 60
                }}>
                  <img src={logo3} className="client-logo"/>
                  <h3 className="text-left title">Rebranding of the best motion studio</h3>
                  <p className="text-left tag">Branding, UI, Website</p>
                  <p className="text-left"><a href="#">Know More &#8594;</a></p>
                </div>
                
              </div>
              
            </div>
        
            <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div>
          </div>
        </div>
      </div>
    </section> */}

    

  
    <footer>
      <div className="container-fluid">
        {/* <div className="row footer">
          <div className="col-md-12 text-center">
            <h1>Maria<br/><span>Ferrero</span></h1>
            <ul className="social-links">
              <li><a href="#"><img src="assets/behance.png"/></a></li>
              <li><a href="#"><img src="assets/dribbble.png"/></a></li>
              <li><a href="#"><img src="assets/twitter.png"/></a></li>
              <li><a href="#"><img src="assets/github.png"/></a></li>
            </ul>
          </div>
        </div> */}
        <div className="row sub-footer">
          <div className="col-md-12 text-center">
            <p>Designed by <a href="#" target="_blank">@nagacoder</a> | in <a href="">Batam</a></p>
          </div>
        </div>
      </div>
    </footer>
    </div>
    );
  }
}

export default Home;
