import React, { Fragment } from "react"
import { Link, Route } from "react-router-dom"
import { NotFound } from "../../errors";
import Text from "./Text";

export default ({ match: { url }, name, born, deceased, description, image, texts }) => {
    return (
        <Fragment>
            <img src={image} alt={name} style={{ maxWidth: 300 }} />
            <h1>{name}</h1>
            <h3>{born} &ndash; {deceased}</h3>
            <p>{description}</p>
            <ul>
                {texts.map(({ id, title }) => (
                    <li key={id}>
                        <Link to={`${url}/texts/${id}`}>
                            {title}
                        </Link>
                    </li>
                ))}
            </ul>
            <Route path={`${url}/texts/:textId`} 
                render={(props)=>{
                    const text=texts.find(text=>text.id===props.match.params.textId)
                    console.log(text)
                    if(!text){
                        return <NotFound />
                    }
                    return <Text {...text} />
                }} />
        </Fragment>
    )
}