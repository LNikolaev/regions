export default function Footer() {

  return (
    <footer className="o-footer o-footer--theme-light" data-o-component="o-footer" data-o-footer--no-js="">
      <div className="o-footer__container">
        <div>
          <ul className="o-footer__legal-links">
            <li>
              <a href="https://something.com/">Link to Something</a>
            </li>
            <li>
              <a href="https://example.com/">Link to Example</a>
            </li>
          </ul>
        </div>
        <div className="o-footer__copyright">
          <small>
            Some copyrights
          </small>
        </div>
      </div>
      <div className="o-footer__brand">
        <div className="o-footer__container">
          <div className="o-footer__brand-logo"></div>
        </div>
      </div>
    </footer>
  );
}
