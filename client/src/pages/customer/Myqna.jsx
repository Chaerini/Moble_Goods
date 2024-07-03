const Myqna = () => {
  return (
    <div className="CommonTable">
      <table headersName={[]}>
        <ul>
          <h2>1:1 문의</h2>
          <thead>
            <tr>
              <th>문의유형</th>
              //문의 내용을 선택해 주세요, 세부선택
              <th>내용</th>
            </tr>
          </thead>
          {/* {notice.map((notice) => (
            <div>
              <>{notice.id}</>
              <>{notice.title}</>
              <>{notice.content}</>
              <button className="update">
                <Link to={`/updatenotice/${notice.id}`}>수정</Link>
              </button>
            </div>
          ))} */}
        </ul>
      </table>
    </div>
  );
};

export default Myqna;
