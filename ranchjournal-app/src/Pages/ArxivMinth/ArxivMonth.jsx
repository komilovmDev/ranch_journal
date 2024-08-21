import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaArchive } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import AppContext from "../../context/AppContext";

export default function ArxivMonth() {

    const [data, setData] = useState([])
    const id = useParams()

    const getArxivMonth = async () => {
        const response = await axios.get(`https://api.ranchjournal.uz/arxiv/arxiv-cats/${id.id}/`);
        setData(response.data)
    }

    useEffect(() => {
        getArxivMonth()
    }, [])

    const {leng , setLeng} = useContext(AppContext)

    return (
        <div className="Month">
            <section className="Arhiv">
                <div className="ArxivTitle">
                    <h1>Arxiv</h1>
                </div>
                <div className="ArxivContainersBox">
                    {data.children && data.children.map(item => (
                        <Link key={item.id} to={`/arxivview/${item.id}`}>
                            <div className="ArxivContainers">
                                <div className="ContainersIcons">
                                    <FaArchive />
                                </div>
                                <div className="ContainersText">
                                    {leng == 'uz' ? item.name : leng == 'ru' ? item.name_ru : item.name_en}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    )
}