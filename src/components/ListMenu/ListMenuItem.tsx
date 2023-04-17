import React, { useState } from 'react'

import CustomListItem, { CustomListItemI } from '../CustomListItem/CustomListItem'

interface ListMenuItemI extends CustomListItemI {

}

const ListMenuItemT: React.FC<ListMenuItemI> = (props) => {
  const [isActive, setIsActive] = useState(false)
  return (
    <CustomListItem 
    title={props.title}  
    active = {isActive} 
    disabled = {props.disabled} 
    onClick={props.onClick}
    dropdownItems={props.dropdownItems}
    >
        
    </CustomListItem>
  )
}

export default ListMenuItemT