import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Main Page</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/weather" className="nav-link">WeatherSearch</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/location" className="nav-link">LocationSearch</Link>
                        </li>
                    </ul>
                </div>

            </nav>
        )
    }
}