import React from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { map } from '@common/utils'

const createLinks = routers => map(routers, ({ path }, name, index) =>
  <li key={index}><Link to={path}>{name}</Link></li>
)

const componentWrapper = Component => () => {
  return (<div className="main">
    <Component />
  </div>)
}

const componentSubWrapper = (Component, filepath) => () => {
  return (<div className="sub-main">
    <div>
      <div className="sub-main-title">效果:</div>
      <Component />
    </div>
    <div>
      <div className="sub-main-title">说明以及源文件:</div>
      <div style={{ background: '#fffeea' }}>
        <ReactMarkdown source={require(`../stack${filepath}`)}/>
      </div>
    </div>
  </div>)
}

const createRoutes = routers => map(routers, ({ Component, path }, name, index) => {
  return <Route path={path} component={componentWrapper(Component)} key={index}/>
})

const createSubRoutes = routers => map(routers, ({ Component, path, filepath }, name, index) => {
  return <Route path={path} component={componentSubWrapper(Component, filepath)} key={index}/>
})

export default Routers =>
  <Router>
    <div className="container">
      <ul className="navigator">
        {createLinks(Routers)}
      </ul>
      <hr />
      {createRoutes(Routers)}
    </div>
  </Router>

export const generatorSubRouter = (Routers, title) => {
  return (<Router>
    <div>
      <ul className="navigator">
        <li>{title}</li>
        {createLinks(Routers)}
      </ul>
      <hr />
      {createSubRoutes(Routers)}
    </div>
  </Router>)
}
