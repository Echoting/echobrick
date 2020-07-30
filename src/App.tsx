import React from 'react';

import Button, {ButtonSize, ButtonType} from './components/Button';
import Alert, {AlertType} from './components/Alert';

import Menu from './components/Menu/index';
// import MenuItem from './components/Menu/menu-item';
// import SubMenu from './components/Menu/sub-menu';




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

            <Alert type={AlertType.Success} message={'这里是success alert'} visible={true} defaultVisible={false} />
            <Alert type={AlertType.Info} message={'Info alert'} onClose={() => {
                console.log('关闭点击了')
            }}/>
            <Alert type={AlertType.Warning} message={'这里是Warning alert'} title={'这里是title'} />

            <Alert type={AlertType.Danger} message={'这里是Danger alert'} closable={false}/>


            <Menu defaultIndex={'0'} onSelect={index => {
                console.log(index)
            }}>
                <Menu.MenuItem>
                    cool link 1
                </Menu.MenuItem>
                <Menu.MenuItem>
                    cool link 2
                </Menu.MenuItem>
                <Menu.MenuItem>
                    cool link 3
                </Menu.MenuItem>

                <Menu.SubMenu title={'subMenu'}>
                    <Menu.MenuItem>
                        sub menu 1
                    </Menu.MenuItem>
                    <Menu.MenuItem>
                        sub menu 1
                    </Menu.MenuItem>
                </Menu.SubMenu>

            </Menu>


            <Menu defaultIndex={'0'} mode={'vertical'} defaultOpenSubMenus={['2', '2-2']} onSelect={index => {
                console.log(index)
            }}>
                <Menu.MenuItem>
                    cool link 1
                </Menu.MenuItem>
                <Menu.MenuItem>
                    cool link 2
                </Menu.MenuItem>
                <Menu.SubMenu title={'subMenu'}>
                    <Menu.MenuItem>
                        sub menu 1
                    </Menu.MenuItem>
                    <Menu.MenuItem>
                        sub menu 1
                    </Menu.MenuItem>
                    <Menu.SubMenu title={'subMenu'}>
                        <Menu.MenuItem>
                            sub menu 1
                        </Menu.MenuItem>
                        <Menu.MenuItem>
                            sub menu 1
                        </Menu.MenuItem>
                    </Menu.SubMenu>
                </Menu.SubMenu>
                <Menu.MenuItem>
                    cool link 3
                </Menu.MenuItem>
            </Menu>


        </div>
    );
}

export default App;
