import React from "react";
import "../../pages/productManage/styles.css"
import "./CommonTable.css";
const CommonTable = props =>{
    const {headersName, children} = props;

    return(
        <table className="common-table">
            <thead className="common-head">
                <tr>
                    {
                        headersName.map((item,index) =>{
                            return(
                                <td className="common-table-header-column" key={index}>{item}</td>
                            )
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {
                    children
                }
            </tbody>
        </table>       
    )
}
export default CommonTable;