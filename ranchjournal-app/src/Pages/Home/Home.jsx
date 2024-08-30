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

    const sendMessageToTelegram = async (name, email, message) => {
        const telegramApiUrl = `https://api.telegram.org/bot7294170389:AAGyi8pTzRQCRNDVKOhVznu5kye5Pqzb_Lw/sendMessage`;
        const chatId = 984573662; // Replace with your actual chat ID

        const text = `
        Name: ${name}
        Email: ${email}
        Message: ${message}
        `;

        try {
            await axios.post(telegramApiUrl, {
                chat_id: chatId,
                text: text,
            });
            alert('Message sent successfully!');
        } catch (error) {
            console.error("Error sending message to Telegram:", error);
            alert('Failed to send message. Please try again later.');
        }
    }

    const handleSubmit = () => {
        const name = document.querySelector('.Name').value;
        const email = document.querySelector('.Email').value;
        const message = document.querySelector('#massage').value;

        sendMessageToTelegram(name, email, message);
    }


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
                    <h1>{leng === 'ru' ? "НАПИШИТЕ НАМ СООБЩЕНИЕ" : leng === 'en' ? "DROP US A MESSAGE" : "DROP US A MESSAGE"}</h1>
                </div>
                <div className="MassageInputBox">
                    <input className="Name" type="text" placeholder="Name:" minLength={4} maxLength={13} autoComplete="off" />
                    <input className="Email" type="email" placeholder="Enter Email:" autoComplete="off" />
                    <label className="Type"><textarea name="massage" placeholder="Massage:" id="massage" cols="30" rows="10"></textarea></label>
                </div>
                <div className="MassageButton">
                    <button onClick={handleSubmit}>{leng === 'uz' ? "Submit" : leng === 'ru' ? "Представить" : "Submit"}</button>
                </div>
            </section>
        </div>
    )
}