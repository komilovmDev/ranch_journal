import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaArchive } from "react-icons/fa";
import { Link } from "react-router-dom";
import AppContext from "../../context/AppContext";

export default function Arxiv() {

    const [data, setData] = useState([])

    const getArxiv = async () => {
        const response = await axios.get('https://api.ranchjournal.uz/arxiv/arxiv-cats/')
        setData(response.data)
    }

    useEffect(() => {
        getArxiv()
    }, [])

    const { leng, setLeng } = useContext(AppContext)

    return (
        <section className="Arhiv">
            <div className="ArxivTitle">
                <h1>Arxiv</h1>
            </div>
            <div className="ArxivContainersBox">
                {
                    data && data.results && data.results.length > 0 ? (
                        data.results.map(item => (
                            <Link to={`/arxivmonth/${item.id}`} key={item.id}>
                                <div className="ArxivContainers">
                                    <div className="ContainersIcons">
                                        <FaArchive />
                                    </div>
                                    <div className="ContainersText">
                                        {item.name}
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p>No data available</p>
                    )
                }

            </div>
        </section>
    )
}