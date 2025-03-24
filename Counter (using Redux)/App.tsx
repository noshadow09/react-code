import './App.css'
import MyComponent from './components/MyComponent'

function App() {

  return (
    <>
    <h1>Redux Tutorial</h1>
      <MyComponent />
    </>
  )
}

export default App


// Store - holds all our state - THERE IS ONLY ONE STORE
// Slice - "reducer and action" creator for a specific part of state
// Reducer - a function that "returns" some state
// Action - an object that tells the reducer how "state" should change
// Dispatch - a function that sends actions to store
// Selector - a function that selects something from state