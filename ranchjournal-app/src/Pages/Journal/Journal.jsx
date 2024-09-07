// import { Link, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import DOMPurify from 'dompurify';
// import './Journal.css';
// import axios from 'axios';

// export default function Journal() {
//     const [data, setData] = useState([]);
//     const [catData, setCatData] = useState({ results: [] });
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [expandedId, setExpandedId] = useState(null); // State to manage which item is expanded
//     const { id } = useParams();

//     const getfetchData = async () => {
//         try {
//             const response = await axios.get(`https://api.ranchjournal.uz/jurnals/${id}/by_category/`);
//             setData(response.data);
//         } catch (err) {
//             setError(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const getJournal = async () => {
//         try {
//             const response = await axios.get("https://api.ranchjournal.uz/journal-categories/");
//             setCatData(response.data);
//         } catch (error) {
//             console.error("Error fetching journal categories:", error);
//             setCatData({ results: [] });
//             setError("Failed to load journal categories.");
//         }
//     };

//     useEffect(() => {
//         getfetchData();
//         getJournal();
//     }, [id]);

//     const toggleExpand = (itemId) => {
//         setExpandedId(expandedId === itemId ? null : itemId);
//     };

//     return (
//         <div className="JournalBolimlar">
//             <div className="JournalGlavTitle">
//                 <h1>Journal Section</h1>
//             </div>
//             <section className="Journal">
//                 <aside className="Journal_A">
//                     <div className="JournalasideTitle">
//                         <h1>Jurnal bo'limlari</h1>
//                     </div>
//                     <div className="JournalButton">
//                         {catData.results && catData.results.length > 0 ? (
//                             catData.results.map(item => (
//                                 <Link to={`/journal/${item.id}`} key={item.id}>
//                                     {item.name}
//                                 </Link>
//                             ))
//                         ) : (
//                             <p>No categories available</p>
//                         )}
//                     </div>
//                 </aside>
//                 <div className="JournalBolimCon">
//                     {loading ? (
//                         <p>Loading...</p>
//                     ) : data.length > 0 ? (
//                         data.map(item => (
//                             <div className="JournalFaqParagraphs" key={item.id}>
//                                 <div className="JournalFaqParagraph">
//                                     <h2>{item.title}</h2>
//                                     <h3>{item.name}</h3>
//                                     <p
//                                         className="JournalText"
//                                         onClick={() => toggleExpand(item.id)}
//                                         dangerouslySetInnerHTML={{
//                                             __html: DOMPurify.sanitize(
//                                                 expandedId === item.id ? item.desc : item.desc.slice(0, 100) + (item.desc.length > 100 ? '...' : '')
//                                             )
//                                         }}
//                                     ></p>
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <p>No content available</p>
//                     )}
//                 </div>
//             </section>
//         </div>
//     );
// }
