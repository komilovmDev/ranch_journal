import archive from '../../assets/jv2.jpg'; // Ensure this file exists
import archive2 from '../../assets/jv1.jpg'; // Corrected file name
import './jurnal.css';

export default function JurnalTalablari() {
    return (
        <div className="ArchiveMain">
            <section className='Archivview'>
                <img src={archive} alt="Another Journal Requirement" />
                <img src={archive2} alt="Journal Requirements" />
            </section>
        </div>
    );
}
