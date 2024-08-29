import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaArchive } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import AppContext from "../../context/AppContext";
import './arxivMonth.css'

export default function ArxivMonth() {

    // const [data, setData] = useState([])
    // const id = useParams()

    // const getArxivMonth = async () => {
    //     const response = await axios.get(`https://api.ranchjournal.uz/arxiv/arxiv-cats/${id.id}/`);
    //     setData(response.data.results)
    // }

    // useEffect(() => {
    //     getArxivMonth()
    // }, [])

    const { leng, setLeng } = useContext(AppContext)

    return (
        <div className="Month">
            <section className="Arhiv">
                <div className="ArxivTitle">
                    <h1>Arxiv</h1>
                </div>
                <div className="ArxivContainersBoxs Journalview">
                    <aside className="ArxiveBox">
                        <div className="JournalasideTitle">
                            <h1> Yillar </h1>
                        </div>
                        <ul>
                            <li>
                                <a href="">2024</a>
                            </li>
                            <li>
                                <a href="">2023</a>
                            </li>
                            <li>
                                <a href="">2022</a>
                            </li>
                        </ul>
                    </aside>
                    <div className="ArxiveBoxs">
                        <div className="arxiveBoxs1">
                            <p>a</p>
                            <p>a</p>
                            <p>a</p>

                        </div>
                        <div className="arxiveBoxs1">
                            <p>a</p>
                            <p>a</p>
                            <p>a</p>

                        </div>
                    </div>
                </div>

            </section>
        </div>
    )
}
