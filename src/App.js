import './App.css'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Bookshelves from './components/Bookshelves'
import NotFound from './components/NotFound'
import BookDetailsPage from './components/BookDetailsPage'
import ProtectedRoute from './components/ProtectedRoute'
// use the below bookshelvesList for rendering read status of book items in Bookshelves Route

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/shelf" component={Bookshelves} />
      <ProtectedRoute exact path="/books/:id" component={BookDetailsPage} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App
