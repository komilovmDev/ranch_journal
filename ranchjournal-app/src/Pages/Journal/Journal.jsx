// import { Link } from "react-router-dom";
// import { BiSolidBook } from "react-icons/bi";
// import { useEffect, useState } from "react";
// import axios from 'axios'


// export default function Journal() {


//     const [data, setData] = useState([]);

//     const getJournal = async () => {
//         try {
//             const response = await axios.get("https://api.ranchjournal.uz/journal-categories/");
//             setData(response.data);
//         } catch (error) {
//             console.error("Error fetching journal categories:", error);
//         }
//     }

//     useEffect(() => {
//         getJournal();
//     }, []);

//     return (
//         <section className="Journal">
//             <div className="JournalGlavTitle">
//                 <h1>Journal Section</h1>
//             </div>
//             <div className="JournalContainersBox">
//                 {
//                     data.map(item => (
//                         <Link to={`/jurnalwiev/${item.id}`} key={item.id} >
//                             <div className="JournalContainer">
//                                 <div className="JournalContainerIcon">
//                                     <BiSolidBook />
//                                 </div>
//                                 <div className="JournalContainerText">
//                                     {item.name}
//                                 </div>
//                             </div>
//                         </Link>
//                     ))
//                 }
//             </div>
//         </section>
//     )
// }