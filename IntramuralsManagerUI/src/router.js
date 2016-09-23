import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

// Layouts
import MainLayout from './components/layouts/main-layout'

// Pages
import PlayerListContainer from './components/containers/player-list-container'

export default (
  <Router history={browserHistory}>
    <Route path='/' component={MainLayout}>
      <Route path='/players'>
        <IndexRoute component={PlayerListContainer}/>
      </Route>
    </Route>
  </Router>

)
// <Route path='/login' component={LoginContainer}/>

// <Router history={browserHistory}>
//   <Route component={MainLayout}>
//     <Route path='/' component={Home} />
//       <Route path='users'>
//         <Route component={SearchLayoutContainer}>
//           <IndexRoute component={UserListContainer} />
//         </Route>
//         <Route path=':userId' component={UserProfileContainer} />
//       </Route>
//       <Route path='widgets'>
//         <Route component={SearchLayoutContainer}>
//           <IndexRoute component={WidgetListContainer} />
//         </Route>
//       </Route>
//   </Route>
// </Router>
