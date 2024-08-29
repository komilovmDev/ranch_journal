import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaArchive } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import AppContext from "../../context/AppContext";
import './arxivMonth.css'

export default function ArxivMonth() {

    const [data, setData] = useState([]);
    const { id } = useParams();

    const getArxivMonth = async () => {
        try {
            const response = await axios.get(`https://api.ranchjournal.uz/arxiv/arxivs/`);
            setData(response.data.results);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        getArxivMonth();
    }, []);

    const { leng, setLeng } = useContext(AppContext);

    return (
        <div className="Month">
            <section className="Arhiv">
                <div className="ArxivTitle">
                    <h1>Arxiv</h1>
                </div>
                <div className="ArxivContainersBoxs Journalview">
                    <aside className="ArxiveBox">
                        <div className="JournalasideTitle">
                            <h1>Yillar</h1>
                        </div>
                        <ul>
                            <li><a href="#">2024</a></li>
                            <li><a href="#">2023</a></li>
                            <li><a href="#">2022</a></li>
                        </ul>
                    </aside>
                    <div className="ArxiveBoxs">
                        {data.map((item, index) => (
                            <div key={index} className="arxiveBoxs1">
                                <img src={item.img} alt="" />
                                <a target="_blank" href={item.file}>{item.title}</a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
