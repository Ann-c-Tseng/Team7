import React from 'react';
import './Footer.css';
/**
 * The footer, with information about the site, plus contact information
 */
class Footer extends React.Component {
  /**
   * Renders the footer.
   * @component
   * @return {component}
   */
  render() {
    return (
      <footer className="footer">
        <div className="footer-column">
          <h5 className="footer-heading">About Us</h5>
          <p>About Chess Master</p>
          <p>Trust &amp; Safety</p>
          <p>Accessibities</p>
          <p>Terms of Services</p>
          <p>Privacy Policy</p>
        </div>
        <div className="footer-column">
          <h5 className="footer-heading">Contact Us</h5>
          <p>contact@ChessMaster.com</p>
          <p>555-555-5555</p>
          <p>Team</p>
          <p>Developers</p>
          <p>Bloggers</p>
        </div>
        <div className="footer-column">
          <h5 className="footer-heading">Follow Us</h5>
          <a href="www.#.com" className="footer-link">Facebook</a>
          <a href="www.#.com" className="footer-link">Twitter</a>
          <a href="www.#.com" className="footer-link">Instagram</a>
          <a href="www.#.com" className="footer-link">LinkedIn</a>
        </div>
      </footer>
    );
  }
}

export default Footer;
