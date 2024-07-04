import './myreview.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleExclamation
} from "@fortawesome/free-solid-svg-icons";
import WritableReview from '../../component/myreview/WritableReview.jsx';
import WrittenReview from '../../component/myreview/WrittenReview.jsx';
import Navbar from '../../component/navbar/navbar.jsx';
import Header from '../../component/header/header.jsx';
import Footer from '../../component/footer/footer.jsx';
import { useNavigate } from "react-router-dom";
import { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext.js';

const MyReview = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [isMenu, setIsMenu] = useState("writable");

    return (
        <>
            <Header />
            <Navbar />
            <div className='myreview'>
                <div className='myreview-container'>
                    <h1 className='myreview-h1'>나의 리뷰</h1>
                    <div className='myreview-button'>
                        <button className={isMenu === 'writable' ? ('myreview-writable-click') : ('myreview-writable')} onClick={() => setIsMenu('writable')}>작성 가능한 리뷰</button>
                        <button className={isMenu === 'written' ? ('myreview-written-click') : ('myreview-written')} onClick={() => setIsMenu('written')}>작성한 리뷰</button>
                    </div>
                    <div className='myreview-info'>
                        <FontAwesomeIcon icon={faCircleExclamation} className='myreview-icon' />
                        <span>리뷰는 구매 후 구매하신 제품에만 작성이 가능합니다.</span>
                    </div>
                    <div className='myreview-middle'>
                        {isMenu === 'writable' ? (<WritableReview />) : (<WrittenReview />)}
                    </div>
                    <div className='myreview-notice'>
                        <p className='myreview-notice-top'>리뷰 작성 안내</p>
                        <p className='myreview-notice-bottom'>· 리뷰는 구매 후 구매하신 제품에만 작성이 가능합니다.</p>
                        <p className='myreview-notice-bottom'>· 종료 상품 및 2주 이전에 구매한 상품은 리뷰를 작성할 수 없습니다.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default MyReview;