import React, { Component} from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Writers from "./writers"
import { NotFound } from "./errors/"
import Layout from "./layout"

export default class extends Component {
  state = {
    writers: []
  }

  async componentDidMount() {
    const writers = await (await fetch('http://localhost:3004/writers?_embed=texts')).json()
    this.setState({ writers })
  }

  render() {
    return (
      <BrowserRouter>
        <Layout writers={this.state.writers}>
          <hr />
          <Switch>
            <Route path="/writers" render={props => <Writers {...props} writers={this.state.writers} />} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}
