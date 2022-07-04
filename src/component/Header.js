import React from 'react';

export const Header = (active) => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark mb-3">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              {
                (active.status === "home")
                  ? <a className="nav-link active" aria-current="page" href="/">Home</a>
                  : <a className="nav-link" aria-current="page" href="/">Home</a>
              }
            </li>
            <li className="nav-item">
              {
                (active.status === "contact")
                  ? <a className="nav-link active" aria-current="page" href="/contact">Contact</a>
                  : <a className="nav-link" aria-current="page" href="/contact">Contact</a>
              }
            </li>
            <li className="nav-item">
              {
                (active.status === "about")
                  ? <a className="nav-link active" aria-current="page" href="/about">About</a>
                  : <a className="nav-link" aria-current="page" href="/about">About</a>
              }
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
