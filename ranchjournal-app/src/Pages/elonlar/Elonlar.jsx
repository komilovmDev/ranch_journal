import './elon.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import AppContext from '../../context/AppContext';
import { useContext } from 'react';

export default function Elonlar() {
    const [data, setData] = useState([]);
    const [journalInfo, setJournalInfo] = useState([]);
    const [data2, setData2] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(3);
    
    const [loading, setLoading] = useState(true); // PDF yuklanish holatini saqlash

    const getInfos = async (categoryId: number) => {
        try {
            const response = await axios.get(`https://api.ranchjournal.uz/konfirensiya-content/?category_id=${categoryId}`);
            setData2(response.data.results);
            console.log("Loaded PDF URLs:", response.data.results.map(item => item.files_k));
        } catch (error) {
            console.error("Error fetching content:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesResponse, journalsResponse] = await Promise.all([
                    axios.get("https://api.ranchjournal.uz/konfirensiya-cats/"),
                    axios.get("https://api.ranchjournal.uz/jurnals/")
                ]);
                setData(categoriesResponse.data.results);
                setJournalInfo(journalsResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
        getInfos(selectedCategory);
    }, [selectedCategory]);

    const { leng } = useContext(AppContext);

    return (
        <section className='Journalview'>
            <aside>
                <div className="JournalasideTitle">
                    <h1>
                        {leng === 'uz' ? "Bo'limlar" :
                            leng === 'ru' ? "Разделы" :
                                "Sections"}
                    </h1>
                </div>
                <div className="JournalButton">
                    {data.map(item => (
                        <button
                            key={item.id}
                            onClick={() => {
                                setSelectedCategory(item.id);
                                setLoading(true); // Kategoriya almasahada loading boshlanadi
                            }}
                            className={selectedCategory === item.id ? "active" : ""}
                        >
                            {leng === 'uz' ? item.name_uz :
                                leng === 'ru' ? item.name_ru :
                                    item.name_en}
                        </button>
                    ))}
                </div>
            </aside>
            <div className="JournalContentRight" style={{ overflow: 'hidden' }}>
                {data2?.map(item => {
                    const imageUrl = leng === 'uz' ? item.images_k?.[0]?.image_uz
                        : leng === 'ru' ? item.images_k?.[0]?.image_ru
                            : item.images_k?.[0]?.image_en;

                    const pdfUrl = leng === 'uz' ? item.files_k?.[0]?.file_pdf_uz
                        : leng === 'ru' ? item.files_k?.[0]?.file_pdf_ru
                            : item.files_k?.[0]?.file_pdf_en;

                    return (
                        <div key={item.id} className="content-item">
                            {imageUrl && (
                                <img
                                    style={{ width: '100%' }}
                                    src={imageUrl}
                                    alt="Content Image"
                                />
                            )}

                            {pdfUrl ? (
                                <>
                                    <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="pdf-link">
                                        📄 PDF-ni yangi oynada ko‘rish
                                    </a>

                                    {loading && <p className="loading">📄 PDF yuklanmoqda...</p>}

                                    <iframe
                                        src={`https://docs.google.com/gview?url=${encodeURIComponent(pdfUrl)}&embedded=true`}
                                        title="PDF Viewer"
                                        className="responsiveIframe"
                                        onLoad={() => setLoading(false)} // PDF yuklanganda loading tugaydi
                                        style={{
                                            width: '100%',
                                            height: '500px',
                                            border: 'none',
                                            marginTop: '10px',
                                            display: loading ? 'none' : 'block'
                                        }}
                                    ></iframe>
                                </>
                            ) : (
                                <p>PDF mavjud emas</p>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
