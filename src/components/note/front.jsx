'use strict'

import Title from './title.jsx'
import Text from './text.jsx'
import CloseIcon from '../icons/close.jsx'
import EditIcon from '../icons/edit.jsx'
import DragIcon from '../icons/drag.jsx'

const Front = (props) => {
  return (
    <div className='front'>
      <Title {...props} />
      <Text {...props} />
      <CloseIcon {...props} />
      <EditIcon {...props} />
      <DragIcon {...props} />
    </div>
  )
}

export default Front
