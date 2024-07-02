import React from "react";
import "../../pages/productManage/product.css"

const CommonTableColumn = ({children}) =>{
    return(
        <td className="common-table-column">
            {
                children
            }
        </td>
    )
}
export default CommonTableColumn;