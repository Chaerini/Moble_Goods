import './minecoupon.css';

const MineCoupon = () => {
    return (
        <div className="minecoupon">
            <table className="minecoupon-table">
                <colgroup>
                    <col style={{ width: '45%' }} />
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '15%' }} />
                </colgroup>
                <tr>
                    <th className='minecoupon-th'>쿠폰명</th>
                    <th className='minecoupon-th'>할인 혜택</th>
                    <th className='minecoupon-th'>적용 기준</th>
                    <th className='minecoupon-th'>유효 기간</th>
                    <th className='minecoupon-th'>비고</th>
                </tr>
                <tr className='minecoupon-tr'>
                    <td className='minecoupon-td'>[4월] 한번 더! 봄맞이 20%</td>
                    <td className='minecoupon-td'>20%</td>
                    <td className='minecoupon-td'>15000원 이상 구매시</td>
                    <td className='minecoupon-td'>2024/05/05까지</td>
                    <td className='minecoupon-td'><button className='minecoupon-button'>소멸 예정</button></td>
                </tr>
            </table>
        </div>
    );
};

export default MineCoupon;