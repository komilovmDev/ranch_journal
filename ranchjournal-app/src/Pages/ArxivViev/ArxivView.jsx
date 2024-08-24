import './ArxivView.css';
import { Link, useParams } from "react-router-dom";
import { FaArchive } from "react-icons/fa";
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AppContext from '../../context/AppContext';


export default function Archivview() {

    const [data, setData] = useState([])
    const [arxiv, setArxiv] = useState([])
    const { id } = useParams()

    const getCat = async () => {
        const response = await axios.get('https://api.ranchjournal.uz/arxiv/arxiv-cats/')
        setData(response.data.results)
    }

    const getArxiv = async () => {
        const response = await axios.get(`https://api.ranchjournal.uz/arxiv/arxivs/${id}/by_category/`);
        setArxiv(response.data.results)
    }

    useEffect(() => {
        getCat()
        getArxiv()
    }, [])

    const { leng, setLeng } = useContext(AppContext)


    return (
        <section className='Archivview'>
            <aside>
                <div className="AsideTitle">
                    <h1>Arxiv</h1>
                </div>
                <div className="AsideButton">
                    {
                        data && data.results && data.results.length > 0 ? (
                            data.results.map(item => (
                                <Link to={`/arxivmonth/${item.id}`}>Volume {item.name}</Link>
                            ))
                        ) : (
                            <p>No data available</p>
                        )
                    }
                </div>
            </aside>
            <div className="ContentRight">
                <div className="ArxivTitle">
                    <h1>Arxiv</h1>
                </div>
                <div className="ContentContainer">
                    {
                        arxiv.map(item => (
                            <Link>
                                <div className="ContantContainerBox">
                                    <div className="ContantIcon">
                                        <FaArchive />
                                    </div>
                                    <div className="ContantText">
                                        <div className="ContantTextTitle">
                                            <p>{leng == 'uz' ? item.title : leng == 'ru' ? item.title_ru : item.title_en}</p>
                                        </div>
                                        <div className="ContantTextPages">
                                            <p dangerouslySetInnerHTML={{ __html: leng == 'uz' ? item.desc : leng == 'ru' ? item.desc_ru : item.desc_en }}></p>
                                        </div>
                                        <div className="ContantTextTime">
                                            <p>{item.created_at}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}