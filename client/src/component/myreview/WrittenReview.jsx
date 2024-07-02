import './writtenreview.css';

const WrittenReview = () => {
    return (
        <div className="writtenreview">
            <table className="writtenreview-table">
                <colgroup>
                    <col style={{ width: '60%' }} />
                    <col style={{ width: '13%' }} />
                    <col style={{ width: '13%' }} />
                    <col style={{ width: '13%' }} />
                </colgroup>
                <tr>
                    <th className='writtenreview-th'>리뷰내용</th>
                    <th className='writtenreview-th'>작성일자</th>
                    <th className='writtenreview-th'>작성자</th>
                    <th className='writtenreview-th'>수정/삭제</th>
                </tr>

                <tr className='writtenreview-tr'>
                    <td colSpan='4'>
                        <div className='writtenreview-top'>
                            <div className='writtenreview-top-left'>
                                <img src={`${process.env.PUBLIC_URL}/logo192.png`} className='writtenreview-image'></img>
                            </div>
                            <div className='writtenreview-top-right'>
                                <p className='writtenreview-title'>상품이름</p>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr className='writtenreview-tr-2'>
                    <td>
                        <img src={`${process.env.PUBLIC_URL}/logo192.png`} className='writtenreview-bottom-image'></img>
                        <img src={`${process.env.PUBLIC_URL}/logo192.png`} className='writtenreview-bottom-image'></img>
                        <img src={`${process.env.PUBLIC_URL}/logo192.png`} className='writtenreview-bottom-image'></img>
                        <img src={`${process.env.PUBLIC_URL}/logo192.png`} className='writtenreview-bottom-image'></img>
                        <p className='writtenreview-rating'>★★★★★</p>
                        <p className='writtenreview-contents'>
                            리뷰내용ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
                        </p>
                    </td>
                    <td className='writtenreview-td'>2024-04-11</td>
                    <td className='writtenreview-td'>2024-04-28(D-14)</td>
                    <td className='writtenreview-td'>
                        <button className='writtenreview-button'>리뷰수정</button>
                        <button className='writtenreview-button'>리뷰삭제</button>
                    </td>
                </tr>

                <tr className='writtenreview-tr'>
                    <td colSpan='4'>
                        <div className='writtenreview-top'>
                            <div className='writtenreview-top-left'>
                                <img src={`${process.env.PUBLIC_URL}/logo192.png`} className='writtenreview-image'></img>
                            </div>
                            <div className='writtenreview-top-right'>
                                <p className='writtenreview-title'>상품이름</p>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr className='writtenreview-tr-2'>
                    <td>
                        <img src={`${process.env.PUBLIC_URL}/logo192.png`} className='writtenreview-bottom-image'></img>
                        <img src={`${process.env.PUBLIC_URL}/logo192.png`} className='writtenreview-bottom-image'></img>
                        <img src={`${process.env.PUBLIC_URL}/logo192.png`} className='writtenreview-bottom-image'></img>
                        <img src={`${process.env.PUBLIC_URL}/logo192.png`} className='writtenreview-bottom-image'></img>
                        <p className='writtenreview-rating'>★★★★★</p>
                        <p className='writtenreview-contents'>
                            리뷰내용ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
                        </p>
                    </td>
                    <td className='writtenreview-td'>2024-04-11</td>
                    <td className='writtenreview-td'>2024-04-28(D-14)</td>
                    <td className='writtenreview-td'>
                        <button className='writtenreview-button'>리뷰수정</button>
                        <button className='writtenreview-button'>리뷰삭제</button>
                    </td>
                </tr>
            </table>
        </div>
    );
};

export default WrittenReview;