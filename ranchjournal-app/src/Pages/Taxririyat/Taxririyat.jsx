import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import './Taxririyat.css';

export default function Taxririyat() {
    const [data, setData] = useState([]);
    const [journalInfo, setJournalInfo] = useState([]);
    const [taxData, setTaxData] = useState([]);
    const [taxData2, setTaxData2] = useState([]);
    // const [taxData3, setTaxData3] = useState([]);
    // const [taxData4, setTaxData4] = useState([]);
    // const [taxData5, setTaxData5] = useState([]);

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
            const updatedData = data;
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
                            <Link to={`/jurnalwiev/${item.id}`} key={item.id}>
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
                    {Array.isArray(taxData) && taxData.length > 0 ? (
                        taxData.map(item => (
                            <div key={item.id}>
                                <div className="TaxrirTitle">
                                    <h1>{item.name}</h1>
                                </div>
                                {Array.isArray(item.taxriryat_set) && item.taxriryat_set.length > 0 ? (
                                    item.taxriryat_set.map(taxriryat => (
                                        <div className="JournalContentContainer" key={taxriryat.id}>
                                            <div className="taxrirCon">
                                                <div className="taxrirConImg">
                                                    <img className="taxriryatImg" src={taxriryat.image} alt={taxriryat.full_name} />
                                                </div>
                                                <div className="taxrirRight">
                                                    <ul>
                                                        <li>{taxriryat.full_name}</li>
                                                        <li dangerouslySetInnerHTML={{ __html: taxriryat.daraja }}></li>
                                                        <li>{taxriryat.azo}</li>
                                                        <li>{taxriryat.lavozim}</li>
                                                        <li>Tel: {taxriryat.phone}</li>
                                                        <li>{taxriryat.email}</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No editorial team data available.</p>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No data available.</p>
                    )}
                </div>
            </div>
        </section>
    );
}
