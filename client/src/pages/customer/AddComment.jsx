import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAlignLeft,
    faCircleExclamation,
    faX
} from "@fortawesome/free-solid-svg-icons";
import './addcomment.css';
import axios from "axios";

const AddComment = ({ setOpen, askid }) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [commentData, setCommentData] = useState({
        admin_id: user.id,
        ask_id: askid,
        contents: ''
    });

    const handleChange = (e) => {
        setCommentData({ ...commentData, contents: e.target.value });
    }

    // x 버튼 클릭했을 때 모달 없앰
    const xClick = () => {
        setOpen(false);
    }

    const handleClick = async () => {
        try {
            const res = await axios.post(`${apiUrl}/comments`, commentData, { headers: { 'auth-token': user.token }, withCredentials: true });
            console.log(res.data);
            alert("답변이 등록되었습니다.");
            setOpen(false);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="addcomment">
            <div className="addcomment-container">
                <div className='myorderdetail-top'>
                    <FontAwesomeIcon icon={faX} className="myorderdetail-icon" onClick={() => xClick()} />
                </div>
                <h1>답변 등록</h1>
                <input type="text" placeholder="답변을 입력해주세요" className="addcomment-input" value={commentData.contents} onChange={handleChange}></input>
                <button className="addcomment-button" onClick={handleClick}>등록</button>
            </div>
        </div>
    );
};

export default AddComment;