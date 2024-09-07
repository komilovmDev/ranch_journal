import archive from '../../assets/jurnal_talablari.jpg'; // Ensure this file exists
import archive2 from '../../assets/journal_talablari.jpg'; // Corrected file name
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
