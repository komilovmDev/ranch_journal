import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import './Taxririyat.css';

export default function Taxririyat() {
    const [data, setData] = useState([]);
    const [journalInfo, setJournalInfo] = useState([]);
    const [taxData, setTaxData] = useState([]);
    const [taxData2, setTaxData2] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null); // Add error state

    const getJournal = async () => {
        try {
            const response = await axios.get("https://api.ranchjournal.uz/journal-categories/");
            setData(response.data);
        } catch (error) {
            console.error("Error fetching journal categories:", error);
            setError("Failed to load journal categories.");
        }
    };

    const getJournalInfo = async () => {
        try {
            const response = await axios.get("https://api.ranchjournal.uz/jurnals/");
            setJournalInfo(response.data);
        } catch (error) {
            console.error("Error fetching journal info:", error);
            setError("Failed to load journal info.");
        }
    };

    const getTaxriryat = async () => {
        try {
            const response = await axios.get("https://api.ranchjournal.uz/taxririyat/taxriryat/");
            const data = response.data.results;
            // Exclude the first element
            const updatedData = data.slice(1);
            setTaxData(updatedData);
            setTaxData2(response.data.results);
        } catch (error) {
            console.error("Error fetching taxriryat data:", error);
            setError("Failed to load taxriryat data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getJournal();
        getJournalInfo();
        getTaxriryat();
    }, []);

    if (loading) {
        return <p>Loading...</p>; // Display loading text while fetching data
    }

    if (error) {
        return <p>{error}</p>; // Display error message if any error occurs
    }

    return (
        <section className='Journalview'>
            <aside>
                <div className="JournalasideTitle">
                    <h1>Jurnal bo'limlari</h1>
                </div>
                <div className="JournalButton">
                    {data && data.results && data.results.length > 0 ? (
                        data.results.map(item => (
                            <Link to={`/arxivmonth/${item.id}`} key={item.id}>
                                {item.name}
                            </Link>
                        ))
                    ) : (
                        <p>No data</p>
                    )}
                </div>
            </aside>
            <div>
                <div className="JournalContentRight">
                    <div className="TaxrirTitle">
                        <h1>Tahririyat</h1>
                    </div>
                    {taxData.length > 0 && (
                        <div className="JournalContentContainer">
                            <div className="taxrirCon">
                                <div className="taxrirConImg">
                                    <img src={taxData2[0].image} alt={taxData[0].full_name} />
                                </div>
                                <div className="taxrirRight">
                                    <ul>
                                        <li>{taxData2[0].full_name}</li>
                                        <li dangerouslySetInnerHTML={{ __html: taxData2[0].mini_desc }}></li>
                                        <li>{taxData2[0].phone}</li>
                                        <li>{taxData2[0].lavozim}</li>
                                        <li>{taxData2[0].education}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="JournalContentRight">
                    <div className="TaxrirTitle">
                        <h1>Tahririyat</h1>
                    </div>
                    {taxData.map(item => (
                        <div className="JournalContentContainer" key={item.id}>
                            <div className="taxrirCon">
                                <div className="taxrirConImg">
                                    <img src={item.image} alt={item.full_name} />
                                </div>
                                <div className="taxrirRight">
                                    <ul>
                                        <li>{item.full_name}</li>
                                        <li dangerouslySetInnerHTML={{ __html: item.mini_desc }}></li>
                                        <li>{item.phone}</li>
                                        <li>{item.lavozim}</li>
                                        <li>{item.education}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
