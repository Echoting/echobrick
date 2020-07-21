import React from 'react';

import Button, {ButtonSize, ButtonType} from './components/Button';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                {/*<img src={logo} className="App-logo" alt="logo" />*/}
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>

            <h1>test</h1>
            <h2>test</h2>
            <h3>test</h3>

            <Button>test</Button>
            <Button btnType={ButtonType.Link} disabled={true}>link button</Button>
            <Button btnType={ButtonType.Link}>link button</Button>

            <Button btnType={ButtonType.Primary} onClick={() => {
                console.log('按钮被点击了')
            }} disabled={true}>primary button</Button>
            <Button btnType={ButtonType.Danger} size={ButtonSize.Large}>large button</Button>

        </div>
    );
}

export default App;
