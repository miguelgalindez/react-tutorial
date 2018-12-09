import React, { Fragment } from "react"

export default ({title, published, description}) =>
    <Fragment>
        <h4>
            {title} 
            
            {published}
        </h4>
        <p>
            {description}
        </p>
    </Fragment>