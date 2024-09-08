import React, { useContext, useState } from 'react';
import './Navbar.css';
import Logo from '../../logoJournal.png';
import { Link, useLocation } from 'react-router-dom';
import { MdMenu } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import AppContext from '../../context/AppContext';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const { leng, setLeng } = useContext(AppContext);
    const location = useLocation();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setLeng(item.toLowerCase());
        setMenuOpen(false);
    };

    const menuItems = {
        uz: [
            { label: 'Bosh sahifa', path: '/' },
            { label: 'Umumiy ma`lumotlar', path: '/Umumiy' },
            { label: 'Jurnal Talablari', path: '/Talablari' },
            { label: 'Tahririyat', path: '/Tahririyat' },
            { label: 'Arxiv', path: '/arxiv' },
            { label: 'Jurnal bo`limlari', path: '/jurnalwiev/4' }
        ],
        ru: [
            { label: 'ГЛАВНАЯ', path: '/' },
            { label: 'ОБЩАЯ ИНФОРМАЦИЯ', path: '/Umumiy' },
            { label: 'ТРЕБОВАНИЯ К ЖУРНАЛУ', path: '/Talablari' },
            { label: 'РЕДКОЛЛЕГИЯ', path: '/Tahririyat' },
            { label: 'АРХИВ', path: '/arxiv' },
            { label: 'РАЗДЕЛЫ ЖУРНАЛА', path: '/jurnalwiev/4' }
        ],
        en: [
            { label: 'HOME', path: '/' },
            { label: 'GENERAL INFORMATION', path: '/Umumiy' },
            { label: 'jOURNAL REQUIREMENTS', path: '/Talablari' },
            { label: 'EDITORIAL BOARD', path: '/Tahririyat' },
            { label: 'ARCHIVE', path: '/arxiv' },
            { label: 'JOURNAL SECTIONS', path: '/jurnalwiev/4' }
        ]
    };

    return (
        <div className="Navbar">
            <div className="NavLeftBox">
                <div className="NavBoxLogo">
                    <Link to={'/'}>
                        <img src={Logo} alt="" />
                    </Link>
                </div>
                <div className="NavBoxMenu">
                    <button onClick={toggleMenu}><MdMenu /></button>
                    <div className={menuOpen ? "dropdown-menu active" : "dropdown-menu"}>
                        <div className='Dropdown-content'>
                            <div className="CloseButton"><button onClick={toggleMenu}><IoClose /></button></div>
                            <div className="Burger-nav">
                                <div className="Burger-nav-logo">
                                    <img src={Logo} alt="" />
                                </div>
                                <ul>
                                    {menuItems[leng].map((item, index) => (
                                        <li key={index} onClick={toggleMenu}>
                                            <Link to={item.path} className={location.pathname === item.path ? 'active' : ''}>
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                    <div className="MultyLang">
                                        <button className="toggle-button" onClick={toggleMenu} style={{ fontSize: '3.5vw' }}>
                                            {selectedItem ? selectedItem.toUpperCase() : leng.toUpperCase()}
                                        </button>
                                        {menuOpen && (
                                            <div className="dropdown">
                                                <ul>
                                                    {Object.keys(menuItems).map(lang => (
                                                        <li key={lang} onClick={() => handleItemClick(lang)}>
                                                            {lang.toUpperCase()}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="navObsh">
                <nav>
                    <ul>
                        {menuItems[leng].map((item, index) => (
                            <li key={index}>
                                <Link to={item.path} className={location.pathname === item.path ? 'active' : ''}>
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="MultyLang-Obsh">
                    <button className="toggle-button" onClick={toggleMenu} style={{ fontSize: '1vw' }}>
                        {selectedItem ? selectedItem.toUpperCase() : leng.toUpperCase()}
                    </button>
                    {menuOpen && (
                        <div className="dropdown">
                            <ul>
                                {Object.keys(menuItems).map(lang => (
                                    <li key={lang} onClick={() => handleItemClick(lang)}>
                                        {lang.toUpperCase()}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
