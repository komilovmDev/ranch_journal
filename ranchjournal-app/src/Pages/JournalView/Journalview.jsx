import { Link, useParams } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import './Journalview.css';
import AppContext from "../../context/AppContext";

export default function Journalview() {
    const [data, setData] = useState([]);
    const [journalInfo, setJournalInfo] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const { id } = useParams();
    const { leng } = useContext(AppContext);

    const getJournal = async () => {
        try {
            const response = await axios.get("https://api.ranchjournal.uz/journal-categories/");
            setData(response.data.results);
        } catch (error) {
            console.error("Error fetching journal categories:", error);
        }
    }

    const getJournalInfo = async () => {
        try {
            const response = await axios.get(`https://api.ranchjournal.uz/jurnals/${id}/by_category/`);
            setJournalInfo(response.data.results || []); // Fallback to an empty array if results are undefined
        } catch (error) {
            console.error("Error fetching journal info:", error);
            setJournalInfo([]); // Set an empty array in case of error
        }
    }

    useEffect(() => {
        getJournal();
        getJournalInfo();
    }, [id]); // Refetch data when `id` changes

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

    return (
        <section className='Journalview'>
            <aside className="JournalviewAside">
                <div className="JournalasideTitle">
                    <h1>Jurnal bo'limlari</h1>
                </div>
                <div className="JournalButton">
                    {data.map(item => (
                        <Link key={item.id} onClick={() => getJournalInfo()} to={`/jurnalwiev/${item.id}`}>{item.name}</Link>
                    ))}
                </div>
            </aside>
            <div className="JournalContentRight">
                <div className="JournalTitle">
                    <h1>Actual problems of Mathematics, Physics and Mechanics</h1>
                </div>
                <div className="JournalContentContainer">
                    {currentItems.map(item => (
                        <div className="ContentContainerBox" key={item.id}>
                            <h3>{leng === 'uz' ? item.title : leng === 'ru' ? item.title_ru : item.title_en}</h3>
                            <p dangerouslySetInnerHTML={{ __html: leng === 'uz' ? item.desc : leng === 'ru' ? item.desc_ru : item.desc_en }}></p>
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
