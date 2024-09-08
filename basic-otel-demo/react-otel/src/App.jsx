import { NODE_SERVER_API } from './utils/config';
import './App.css';

function App() {
    const clickhandler = async (e) => {
        e.preventDefault();
        // eslint-disable-next-line no-unused-vars
        const res = await fetch(`${NODE_SERVER_API}/api/test01`, {
            method: 'GET',
        });
        // const data = await res.json();
        // console.log(data);
    };
    return (
        <div>
            <h1>React Opentelemetry</h1>
            <button onClick={clickhandler}>test nodejs service</button>
        </div>
    );
}

export default App;
