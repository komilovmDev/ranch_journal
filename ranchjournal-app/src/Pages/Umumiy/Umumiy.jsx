import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import AppContext from "../../context/AppContext";

export default function Umumiy() {
    const [data, setData] = useState([]);
    const [journalInfo, setJournalInfo] = useState([]);
    const [data2, setData2] = useState([])

    const getInfos = async () => {
        const response = await axios.get("https://api.ranchjournal.uz/malumotlar/")
        setData2(response.data.results)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesResponse, journalsResponse] = await Promise.all([
                    axios.get("https://api.ranchjournal.uz/journal-categories/"),
                    axios.get("https://api.ranchjournal.uz/jurnals/")
                ]);
                setData(categoriesResponse.data.results);
                setJournalInfo(journalsResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
        getInfos()
    }, []);

    const { leng, setLeng } = useContext(AppContext)

    return (
        <section className='Journalview'>
            <aside>
                <div className="JournalasideTitle">
                    <h1>{leng == 'uz' ? "Journal bo'limlari" : leng == 'ru' ? "Разделы журнала" : "Journal sections"}</h1>
                </div>
                <div className="JournalButton">
                    {data.map(item => (
                        <Link key={item.id} to={`/jurnalwiev/${item.id}`}>{leng == 'uz' ? item.name : leng == 'ru' ? item.name_ru : item.name_en}</Link>
                    ))}
                </div>
            </aside>
            <div className="JournalContentRight">
                <div className="UmumiyTitle">
                    <h1>{leng == 'uz' ? "Umumiy malumotlar" : leng == 'ru' ? "Общая информация" : "General information"}</h1>
                </div>
                {
                    data2.map(item => (
                        <div className="UmumiyContentContainer">
                            <p dangerouslySetInnerHTML={{ __html: leng == 'uz' ? item.desc : leng == 'ru' ? item.desc_ru : item.desc_en }}></p>
                        </div>
                    ))
                }
            </div>
        </section>
    );
}
