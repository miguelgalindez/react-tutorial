import React, { Fragment } from "react"
import { Link, Route, Switch } from "react-router-dom"
import Writer from "./writer"
import { NotFound } from "../errors"

export default ({ match: { url }, writers }) => (
    <Fragment>
        <ul>
            {writers.map(({ id, name }) => (
                <li key={id}>
                    <Link to={`${url}/${id}`}>{name}</Link>
                </li>
            ))}
        </ul>
        <Switch>
            <Route exact path={url} render={() => <h3>Please select a writer from above.</h3>} />
            <Route path={`${url}/:writerId`}
                render={(props) => {
                    const writer = writers.find(writer => writer.id === props.match.params.writerId)
                    if (!writer) {
                        return <NotFound />
                    }
                    return <Writer {...props} {...writer} />
                }} />
        </Switch>
    </Fragment>
)