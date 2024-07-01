import React from "react";
import "../../pages/productManage/styles.css"

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