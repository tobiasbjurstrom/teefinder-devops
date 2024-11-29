
import './App.css';
import GolfCoursesPresenter from './reactjs/golfCoursesPresenter';
import props from './reactjs/props';

function App(props) {
  return (
    <div>
      <GolfCoursesPresenter model={props.model} />
    </div>
  );
}

export default App;
