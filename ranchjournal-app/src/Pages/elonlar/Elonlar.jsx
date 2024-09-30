import './elon.css'
import elonIMg from './elonimage.jpg'

export default function Elonlar() {
    return (
        <div className="elonlar">
            <p className="elon_title">Welcome to the International conference on “Priority directions of providing sustainable economic growth in the region” which will be held on 18th of December, 2024 in Urgench city, Uzbekistan</p>
            <img src={elonIMg} alt="" />
        </div>
    )
}