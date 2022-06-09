import './Styles/App.scss';
import Header from './components/Header/Header';
import Main from './components/Content/Main';
import Menu from './components/Content/Menu/Menu';
import Notice from './components/Content/Notice/Notice';

function App() {
  return (
    <div className="App">
      <Header />
      <Menu />
      <Main />
      <Notice />
    </div>
  );
}

export default App;
