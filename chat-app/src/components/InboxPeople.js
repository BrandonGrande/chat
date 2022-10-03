import React from 'react'
import { SearchBox } from './SearchBox'
import { Sidebar } from './Sidebar'

export const InboxPeople = () => {
    return (
        
         <div className="inbox_people">

         {/* <!-- Searchbox inicio --> */}
            <SearchBox/>
         {/* <!-- Searchbox Fin --> */}


         {/* <!-- Sidebar inicio --> */}
            <Sidebar/>
         {/* <!-- Sidebar Fin --> */}

     </div>
    )
}
