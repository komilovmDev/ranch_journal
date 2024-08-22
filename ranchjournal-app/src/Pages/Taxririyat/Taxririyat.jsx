import { Link } from "react-router-dom";
import { FaArchive, FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Добавлены стрелки
import { useState, useEffect } from "react";
import axios from 'axios';
import './Taxririyat.css';

export default function Taxririyat() {
    const [data, setData] = useState([]);
    const [journalInfo, setJournalInfo] = useState([]);

    const getJournal = async () => {
        try {
            const response = await axios.get("https://api.ranchjournal.uz/journal-categories/");
            setData(response.data);
        } catch (error) {
            console.error("Error fetching journal categories:", error);
        }
    }

    const getJournalInfo = async () => {
        try {
            const response = await axios.get("https://api.ranchjournal.uz/jurnals/");
            setJournalInfo(response.data);
        } catch (error) {
            console.error("Error fetching journal info:", error);
        }
    }

    const [taxData, setTaxData] = useState([])

    const getTaxriryat = async () => {
        const response = await axios.get("https://api.ranchjournal.uz/taxririyat/taxriryat/")
        setTaxData(response.data.results)
    }


    useEffect(() => {
        getJournal();
        getJournalInfo();
        getTaxriryat();
    }, []);


    return (
        <section className='Journalview'>
            <aside>
                <div className="JournalasideTitle">
                    <h1>Jurnal bo'limlari</h1>
                </div>
                <div className="JournalButton">
                    {
                        data && data.results && data.results.length > 0 ? (
                            data.results.map(item => (
                                <Link to={`/arxivmonth/${item.id}`} key={item.id}>
                                    {item.name}
                                </Link>
                            ))
                        ) : (
                            <p>NO data</p>
                        )
                    }

                </div>
            </aside>
            <div className="JournalContentRight">
                <div className="TaxrirTitle">
                    <h1>Tahririyat</h1>
                </div>
                {
                    taxData.map(item => (
                        <div className="JournalContentContainer">
                            <div className="taxrirCon">
                                <div className="taxrirConImg">
                                    <img src={item.image} alt="" />
                                </div>
                                <div className="taxrirRight">
                                    <ul>
                                        <li>{item.full_name}</li>
                                        <li dangerouslySetInnerHTML={{__html: item.mini_desc}}></li>
                                        <br />
                                        <label htmlFor="">telfon:</label>
                                        <li>{item.phone}</li>
                                        <br />
                                        {/* <label htmlFor="">Title:</label>
                                        <li>{item.title}</li> */}
                                        <br />
                                        <label htmlFor="">lavozim:</label>
                                        <li>{item.lavozim}</li>
                                        <br />
                                        <label htmlFor="">education:</label>
                                        <li>{item.education}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}
