function FooterHome() {
  return (
    <>
      <footer className="footer">
        <div className="content">
          <div className="body">
            <div className="contact">
              <div className="contact-left">
                <img
                  className="logo-contact"
                  src="./asset/img/logo-contact.svg"
                  alt=""
                />
                <p className="desc">
                  Need to help for your dream Career? trust us. With Lesson,
                  study becomes a lot easier with us.
                </p>
                <div className="social">
                  <a href="#!">
                    <img
                      src="./asset/img/twitter.svg"
                      alt=""
                      className="social-icon-t"
                    />
                  </a>
                  <a href="#!">
                    <img
                      src="./asset/img/facebook.svg"
                      alt=""
                      className="social-icon"
                    />
                  </a>
                  <a href="#!">
                    <img
                      src="./asset/img/linked_in.svg"
                      alt=""
                      className="social-icon"
                    />
                  </a>
                  <a href="#!">
                    <img
                      src="./asset/img/instagram.svg"
                      alt=""
                      className="social-icon"
                    />
                  </a>
                </div>
              </div>

              <div className="column">
                <h3 className="heading">
                  Company
                  <div className="hr-heading"></div>
                </h3>
                <ul className="list">
                  <li className="item">
                    <a href="#!">About Us</a>
                  </li>
                  <li className="item">
                    <a href="#!">Features</a>
                  </li>
                  <li className="item">
                    <a href="#!">Our Pricing</a>
                  </li>
                  <li className="item">
                    <a href="#!">Latest News</a>
                  </li>
                </ul>
              </div>
              <div className="column">
                <h3 className="heading">
                  Support
                  <div className="hr-heading"></div>
                </h3>
                <ul className="list">
                  <li className="item">
                    <a href="#!">FAQ’s</a>
                  </li>
                  <li className="item">
                    <a href="#!">Terms & Conditions</a>
                  </li>
                  <li className="item">
                    <a href="#!">Privacy Policy</a>
                  </li>
                  <li className="item">
                    <a href="#!">Contact Us</a>
                  </li>
                </ul>
              </div>
              <div className="column">
                <h3 className="heading">
                  Address
                  <div className="hr-heading"></div>
                </h3>
                <ul className="list">
                  <li className="item">
                    <p className="desc">
                      <span>Location:</span> 27 Division St, New York, NY 10002,
                      USA
                    </p>
                  </li>
                  <li className="item">
                    <p className="desc">
                      <span>Email: </span>email@gmail.com
                    </p>
                  </li>
                  <li className="item">
                    <p className="desc">
                      <span>Phone:</span> + 000 1234 567 890
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="hr-footer"></div>
            <div className="copy">
              <p className="desc">
                Copyright ©2022 webdesign.gdn All rights reserved
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default FooterHome;
