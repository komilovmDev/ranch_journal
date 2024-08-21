

export default function Header({ leng, Glavimg, GlavimgEn, GlavimgRu, item }) {
    return (
        <>
            <header>
                <div className="background"><div className="bckgroundimg"></div></div>
                <div className="headerLeftBox">
                    <h1>{leng == 'uz' ? item.title_uz : leng == 'ru' ? item.title_ru : item.title_en}</h1>
                    <a href={leng == 'uz' ? item.file_url_uz : leng == 'ru' ? item.file_url_ru : item.file_url_en}><button style={{ cursor: 'pointer' }}>Downdload Now...</button></a>
                </div>
                <div className="headerRightBox">
                    <div className="RightImgBox">
                        <img src={leng == 'uz' ? item.image_uz : leng == 'ru' ? item.image_ru : item.image_en} alt="" />
                    </div>
                </div>
            </header>   
        </>
    )
}