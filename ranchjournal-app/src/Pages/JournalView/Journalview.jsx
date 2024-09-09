import { Link, useParams } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState, useEffect, useContext } from "react";
import './Journalview.css';
import AppContext from "../../context/AppContext";
import DOMPurify from 'dompurify';
import axios from 'axios';

export default function Journalview() {
    const [data, setData] = useState([]); // Categories data
    const [journalInfo, setJournalInfo] = useState([]); // Journal entries data
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const { id } = useParams();
    const { leng } = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedId, setExpandedId] = useState(null);
    const DOMAIN = "https://api.ranchjournal.uz";

    // Fetch journal categories
    const getJournal = async () => {
        try {
            const response = await axios.get("https://api.ranchjournal.uz/journal-categories/");
            setData(response.data.results || []); // Ensure `data` is always an array
        } catch (error) {
            console.error("Error fetching journal categories:", error);
            setData([]); // Fallback to an empty array in case of error
        }
    }

    // Fetch journal info based on category ID
    const getJournalInfo = async () => {
        if (id) {
            try {
                const response = await axios.get(`https://api.ranchjournal.uz/jurnals/${id}/by_category/`);
                setJournalInfo(response.data); // Ensure `journalInfo` is always an array
            } catch (error) {
                setJournalInfo("Failed to load journal data."); // Set an empty array in case of error
            } finally {
                setLoading(false);
            }
        } else {
            // Handle the case when no specific category is selected
            setJournalInfo([]);
            setLoading(false);
        }
    };



    useEffect(() => {
        getJournal();
        getJournalInfo();
    }, [id]);

    // Logic to calculate current items to display based on currentPage
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = journalInfo.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Rendering pagination buttons
    const renderPaginationButtons = () => {
        const totalPages = Math.ceil(journalInfo.length / itemsPerPage);
        const visiblePages = 5;
        const buttons = [];
        let startPage = currentPage - Math.floor(visiblePages / 2);
        startPage = Math.max(startPage, 1);
        let endPage = startPage + visiblePages - 1;
        endPage = Math.min(endPage, totalPages);

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button key={i} onClick={() => paginate(i)}>{i}</button>
            );
        }

        return buttons;
    }

    const toggleExpand = (itemId) => {
        setExpandedId(expandedId === itemId ? null : itemId);
    };

    return (
        <section className='Journalview'>
            <aside className="JournalviewAside">
                <div className="JournalasideTitle">
                    <h1>Jurnal bo'limlari</h1>
                </div>
                <div className="JournalButton">
                    {data.map(item => (
                        <Link
                            key={item.id}
                            to={`/jurnalwiev/${item.id}`}
                            className={item.id === parseInt(id) ? 'active' : ''}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </aside>
            <div className="JournalContentRight">
                <div className="JournalTitle">
                    <h1>Actual problems of Mathematics, Physics and Mechanics</h1>
                </div>
                <div className="JournalContentContainer">
                    {currentItems.map(item => (
                        <div className="ContentContainerBox" key={item}>
                            <img src={`${DOMAIN}${item.img}`} alt={item.title} />
                            <a target="_blank" href={`${DOMAIN}${item.file}`}>{leng === 'uz' ? item.title : leng === 'ru' ? item.title_ru : item.title_en}</a>
                        </div>
                    ))}
                </div>
                <div className="Pagination">
                    <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}><FaChevronLeft /></button>
                    {renderPaginationButtons()}
                    <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(journalInfo.length / itemsPerPage)}><FaChevronRight /></button>
                </div>
            </div>
        </section>
    )
}
