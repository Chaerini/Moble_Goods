import React from "react";
import "../../pages/productManage/product.css"
const CommonTableRow = ({children}) =>{
    return(
        <tr className="common-table-row">
            {
                children
            }
        </tr>
    )
}
export default CommonTableRow;