import './writablereview.css';

const WritableReview = () => {
    return (
        <div className="writablereview">
            <table className="writablereview-table">
                <colgroup>
                    <col style={{ width: '60%' }} />
                    <col style={{ width: '13%' }} />
                    <col style={{ width: '13%' }} />
                    <col style={{ width: '13%' }} />
                </colgroup>
                <tr>
                    <th className='writablereview-th'>상품정보</th>
                    <th className='writablereview-th'>주문일자</th>
                    <th className='writablereview-th'>작성기한</th>
                    <th className='writablereview-th'>리뷰쓰기</th>
                </tr>
                <tr className='writablereview-tr'>
                    <td>
                        <div className='writablereview-row'>
                            <div><img src={`${process.env.PUBLIC_URL}/logo192.png`} className='writablereview-image'></img></div>
                            <div className='writablereview-right'>
                                <p className='writablereview-title'>상품이름</p>
                                <p className='writablereview-quantity'>수량 : 1개</p>
                            </div>
                        </div>
                    </td>
                    <td className='writablereview-td'>2024-04-11</td>
                    <td className='writablereview-td'>2024-04-28(D-14)</td>
                    <td className='writablereview-td'><button className='writablereview-button'>리뷰작성</button></td>
                </tr>
                <tr className='writablereview-tr'>
                    <td>
                        <div className='writablereview-row'>
                            <div><img src={`${process.env.PUBLIC_URL}/logo192.png`} className='writablereview-image'></img></div>
                            <div className='writablereview-right'>
                                <p className='writablereview-title'>상품이름</p>
                                <p className='writablereview-quantity'>수량 : 1개</p>
                            </div>
                        </div>
                    </td>
                    <td className='writablereview-td'>2024-04-11</td>
                    <td className='writablereview-td'>2024-04-28(D-14)</td>
                    <td className='writablereview-td'><button className='writablereview-button'>리뷰작성</button></td>
                </tr>
            </table>
        </div>
    );
};

export default WritableReview;