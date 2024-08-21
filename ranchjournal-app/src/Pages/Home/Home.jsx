import "./Home.css";
import { useEffect, useState } from "react";
import { FaArchive } from "react-icons/fa";
import { BiSolidBook } from "react-icons/bi";
import { Link } from "react-router-dom";
import Glavimg from "./../../assets/jurnal6.jpg";
import GlavimgRu from "./../../assets/ruskiy.jpg";
import GlavimgEn from "./../../assets/english.jpg";
import HD from "./../../assets/HD.mp4";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import axios from "axios";
import Header from "./Header";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import "swiper/css";


export default function Home() {

    const { leng, setLeng } = useContext(AppContext);

    const [data, setData] = useState([])

    const getArxiv = async () => {
        const response = await axios.get('https://api.ranchjournal.uz/arxiv/arxiv-cats/')
        setData(response.data.results)
    }

    const [data2, setData2] = useState([]);
    console.log(data2);

    const getJournal = async () => {
        try {
            const response = await axios.get("https://api.ranchjournal.uz/journal-categories/");
            setData2(response.data.results);
        } catch (error) {
            console.error("Error fetching journal categories:", error);
        }
    }

    const [dataHeader, setDataHeader] = useState([]);
    const getHeader = async () => {
        try {
            const response = await axios.get("https://api.ranchjournal.uz/homesliders/");
            setDataHeader(response.data.results)
        } catch (error) {
            console.error("Erroe getHeader :", error)
        }
    }

    useEffect(() => {
        getArxiv()
        getJournal()
        getHeader()
    }, [])



    return (
        <div className="Home">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {
                    dataHeader.map(item => (
                        <SwiperSlide>
                            <Header item={item} leng={leng} GlavimgEn={GlavimgEn} GlavimgRu={GlavimgRu} Glavimg={Glavimg} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            <section className="Arhiv">
                <div className="ArxivTitle">
                    <h1>{leng == 'uz' ? "Arxiv" : leng == 'ru' ? "АРХИВ" : "ARCHIVE"}</h1>
                </div>
                <div className="ArxivContainersBox">
                    {
                        data.map(item => (
                            <Link to={`/arxivmonth/${item.id}`}>
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
                    }
                </div>
            </section>
            <section className="Journal">
                <div className="JournalGlavTitle">
                    <h1>{leng == 'uz' ? "Journal Section" : leng == 'ru' ? "РАЗДЕЛ ЖУРНАЛА" : "Journal Section"}</h1>
                </div>
                <div className="JournalContainersBox">
                    {
                        data2.map(item => (
                            <Link to={`/jurnalwiev/${item.id}`}>
                                <div className="JournalContainer">
                                    <div className="JournalContainerIcon">
                                        <BiSolidBook />
                                    </div>
                                    <div className="JournalContainerText">
                                        {leng == 'uz' ? item.name : leng == 'ru' ? item.name_ru : item.name_en}
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </section>
            <section className="Video">
                <div className="background">
                    <div className="bckgroundimg"></div>
                </div>
                <div className="VieoBox">
                    <video controls>
                        <source src={HD} type="video/mp4" />
                    </video>
                </div>
            </section>
            <section className="Massage">
                <div className="MassageTitle">
                    <h1>{leng == 'ru' ? "НАПИШИТЕ НАМ СООБЩЕНИЕ" : leng == 'en' ? "DROP US A MESSAGE" : "DROP US A MESSAGE"}</h1>
                </div>
                <div className="MassageInputBox">
                    <input className="Name" type="text" placeholder="Name:" minLength={4} maxLength={13} />
                    <input className="Email" type="email" placeholder="Enter Email:" />
                    <label className="Type"><textarea name="massage" placeholder="Massage:" id="massage" cols="30" rows="10"></textarea></label>
                </div>
                <div className="MassageButton">
                    <button>{leng == 'uz' ? "Submit" : leng == 'ru' ? "Представить" : "Submit"}</button>
                </div>
            </section>
        </div>
    )
}