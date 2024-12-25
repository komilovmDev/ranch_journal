import archive from '../../assets/j3.jpg';
import archive2 from '../../assets/j4.jpg';
import './jurnal.css';

export default function JurnalTalablari() {
    return (
        <div className="ArchiveMain">
            <section className='Archivview'>
                <img src={archive2} alt="Journal Requirements" />
                <img src={archive} alt="Another Journal Requirement" />
            </section>
        </div>
    );
}
