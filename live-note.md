1. react redux json-server moment materialize 

2. initialization

```bash
$ npx create-react-app client
$ npm i -D json-server concurrently
```

3. db.json file in root directory

```json
{
    "logs":[

    ],
    "techs":[

    ]
}
```

4. package.json

```json
    "json-server": "json-server --watch db.json --port 5000",
    "dev": "concurrently \"cd client && npm start\" \"npm run json-server\""
```

5. try out server in postman

6. add a proxy, package.json

```json
"proxy":"http://localhost:5000"
```

---------------------------------------------------------

7. materilize setup

```bash
npm i materilize-css monent react-moment
```

8. App.js

```js
import React,{Fragment,useEffect} from 'react';
import SearchBar from './components/layout/SearchBar';
import Logs from './components/logs/Logs';
import AddBtn from './components/layout/AddBtn';
import AddLogModal from './components/logs/AddLogModal';
import EditLogModal from './components/logs/EditLogModal';
import AddTechModal from './components/techs/AddTechModal';
import TechListModal from './components/techs/TechListModal';

import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

const App = ()=>{
    useEffect(()=>{
        M.AutoInit();
    })
    return 
    <Fragment>
        <SearchBar/>
        <div className='container'>
            <AddBtn />
            <AddLogModal />
            <AddTechModal />
            <EditLogModal />
            <TechListModal/>
            <Logs/>
        </div>
    </Fragment>
}

export default App;
```

9. materilize icon
```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

10. SearchBar 

- layout/SearchBar.js

```js
import React from 'react';

const SearchBar = ()=>{
    return(
        <nav style={{marginBottom:'30px'}} className="blue">
        <label className="nav-wrapper">
            <form>
                <ul class="input-field">
                    <input id="search" type="search" />
                    <label className="label-icon" htmlFor="search"><i classname="material-icons">search</i></label>

                    <i className="material-icons">close</i>
                <div>
            </form>
        </div>
        </nav>
    )
}

export default SearchBar;
```

11. logs/Logs.js

```js
import React, {useState, useEffect} from 'react';
import LogItem from './LogItem';
import PreLoader from './PreLoader';

const Logs = ()=>{
    const [logs, setLogs] = useState([]);
    const [loading, setLoaing] = useState(false);

    useEffect(()=>{
        getLogs();
        //eslint-disable-next-line
    },[])

    const getLogs = async ()=>{
        setLoading(true);
        const res = await fetch('/logs');

        const data = await res.json();

        setLogs(data);
        setLoading(false);
    }

    if(loading){
        return <PreLoader />
    }

    return(
        <ul className="collection with-header">
            <li className='collection-header'>
                <h4 className="center">System Logs</h4>
            </li>

            {!loading && logs.length === 0 ?(<p className='center'>No logs to show...</p>)
            :
            (
                logs.map(log=> <LogItem log={log} key={log.id}/>)
            )
            }
        </ul>
    )
}

export default Logs;
```

12. logs/LogItem.js

```js
import React, {useState, useEffect} from 'react';
import moment from 'react-moment';
import PropTypes from 'prop-types';

const LogItem = ({log})=>{

    return(
        <li className="collection-item">
            <div>
                <a href='#' className={`modal-trigger ${log.attention ? 'red-text':'blue-text'}`}>{log.message}
                </a>
                <br/>
                <span className='grey-text'>
                    <span className="black-text">ID #{log.tech}</span> last updated by John Doe
                    <span className="black-text">{log.tech}</span> on{' '} <Moment format="MMMM Do YYYY, h:mm:ss a">{log.date}</Moment>
                </span>
                <a href="#" className="secondary-content">
                    <i className="material-icons grey-text">delete<i>
                </a>
            </div>
        </li>
    )
}

LogItem.propTypes = {
    log: PropTypes.object.isRequired
}

export default LogItem;
```

13. PreLoader.js

```js
import React, {useState, useEffect} from 'react';

const PreLoader = ({log})=>{

    return(
        <div className="progress blue lighten-4">
            <div className="indeterminate blue"></div>
        </div>
    )
}

export default PreLoader;
```

14. AddBtn.js

```js
import React, {useState, useEffect} from 'react';

const AddBtn = ()=>{

    return(
        <div className="fixed-action-btn">
            <a href="#add-log-modal" className="btn-floating btn-large blue darken-2 modal-trigger">
                <i className="large material-icons">add</i>
            </a>
            <ul>
                <li>
                    <a href="#tech-list-modal" className="btn-floating green modal-trigger">
                        <i className="large material-icons">person</i>
                    </a>
                </li>
                <li>
                    <a href="#tech-modal" className="btn-floating red modal-trigger">
                        <i className="large material-icons">person_add</i>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default AddBtn;
```

15. logs/AddLogModal.js

```js
import React, {useState} from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';

const AddLogModal = ()=>{

    const [message, setMessage] = useState('');
    const [attention, setSAttention] = useState(false);
    const [tech, setTech] = useState('');

    const onSubmit = ()=>{
        if(message === '' || tech===''){
            M.toast({html: 'Please enter a message and tech.'})
        }
        else{
            console.log(message, attention, tech); 
            setMessage('');
            setAttention(false);
            setTech('');
        }
    }

    return(
        <div id="add-log-modal" className="modal" style={modalStyle} >
            <div className="modal-content">
                <h4> Enter System Log</h4>
                <div className='row'>
                    <div className="input-field">
                        <input type='text' name="message" value={message} onChange={e=> setMessage(e.target.value)}/>

                        <label htmlFor="message" className="active">
                            Log Message
                        </label>
                    </div>
                </div>
                <div className='row'>
                    <div className="input-field">
                        <select name="tech" value={tech} className='browser-default' onChange={e=> setTech(e.target.value)}>

                            <option value='' disabled>Select Techician</option>
                            <option value='John Doe'>John Doe</option>
                            <option value='Sam Smith'>Sam Smith</option>
                            <option value='Marry Jenifer'>Marry Jenifer</option>
                        </select>

                        <label htmlFor="message" className="active">
                            Log Message
                        </label>
                    </div>
                </div>

                <div className='row'>
                    <div className="input-field">
                        <p>
                            <label>
                                <input type='checkbox' className='filled-in' checked={attention} value={sttention}
                                onChange={e => setAttention(!attention)}
                                />
                                <span>Needs Attention</span>
                            </label>
                        </p>
                    </div>
                </div>
            </div>


            <div className='modal-footer'>
                <a href='#' onClick={onSubmit} className='modal-close waves-effect waves-green btn blue'>Enter</a>
            </div>
        </div>
    )
}

const modalStyle={
    width:'75%',
    height:'75%'
}

export default AddLogModal;
```

16. EditModal.js

```js
import React, {useState} from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';

const EditLogModal = ()=>{

    const [message, setMessage] = useState('');
    const [attention, setSAttention] = useState(false);
    const [tech, setTech] = useState('');

    const onSubmit = ()=>{
        if(message === '' || tech===''){
            M.toast({html: 'Please enter a message and tech.'})
        }
        else{
            console.log(message, attention, tech); 
            setMessage('');
            setAttention(false);
            setTech('');
        }
    }

    return(
        <div id="edit-log-modal" className="modal" style={modalStyle} >
            <div className="modal-content">
                <h4> Enter System Log</h4>
                <div className='row'>
                    <div className="input-field">
                        <input type='text' name="message" value={message} onChange={e=> setMessage(e.target.value)}/>

                        <label htmlFor="message" className="active">
                            Log Message
                        </label>
                    </div>
                </div>
                <div className='row'>
                    <div className="input-field">
                        <select name="tech" value={tech} className='browser-default' onChange={e=> setTech(e.target.value)}>

                            <option value='' disabled>Select Techician</option>
                            <option value='John Doe'>John Doe</option>
                            <option value='Sam Smith'>Sam Smith</option>
                            <option value='Marry Jenifer'>Marry Jenifer</option>
                        </select>

                        <label htmlFor="message" className="active">
                            Log Message
                        </label>
                    </div>
                </div>

                <div className='row'>
                    <div className="input-field">
                        <p>
                            <label>
                                <input type='checkbox' className='filled-in' checked={attention} value={sttention}
                                onChange={e => setAttention(!attention)}
                                />
                                <span>Needs Attention</span>
                            </label>
                        </p>
                    </div>
                </div>
            </div>


            <div className='modal-footer'>
                <a href='#' onClick={onSubmit} className='modal-close waves-effect waves-green btn blue'>Enter</a>
            </div>
        </div>
    )
}

const modalStyle={
    width:'75%',
    height:'75%'
}

export default EditLogModal;
```

17. techs/AddTechModal.js

```js
import React, {useState} from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';

const AddTechModal = ()=>{

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');


    const onSubmit = ()=>{
        if(firstName === '' || lastName===''){
            M.toast({html: 'Please enter the first and last name.'})
        }
        else{
            console.log(firName, lastName); 
            setFirstName('');
            setLastName('');
        }
    }

    return(
        // ref to AddBtn.js
        <div id="add-tech-modal" className="modal" >
            <div className="modal-content">
                <h4> New Technician</h4>
                <div className='row'>
                    <div className="input-field">
                        <input type='text' 
                            name="firstName" 
                            value={firstName} 
                            onChange={e=> setFirstName(e.target.value)}
                        />

                        <label htmlFor="firstName" className="active">
                            First Name
                        </label>
                    </div>
                </div>

                <div className='row'>
                    <div className="input-field">
                        <input type='text' 
                            name="lastName" 
                            value={lastName} 
                            onChange={e=> setLastName(e.target.value)}
                        />

                        <label htmlFor="firstName" className="active">
                            Last Name
                        </label>
                    </div>
                </div>

            </div>

            <div className='modal-footer'>
                <a href='#' onClick={onSubmit} className='modal-close waves-effect waves-green btn blue'>Enter</a>
            </div>
        </div>
    )
}

export default AddTechModal;
```

18. TechListModal.js

```js
import React, {useState, useEffect} from 'react';
import TechItem from './TechItem';

const TechListModal = ()=>{
    const [techs, setTechs] = useState([]);
    const [loading, setLoaing] = useState(false);

    useEffect(()=>{
        getTechs();
        //eslint-disable-next-line
    },[])

    const getTechs = async ()=>{
        setLoading(true);
        const res = await fetch('/techs');

        const data = await res.json();

        setTechs(data);
        setLoading(false);
    }

    if(loading){
        return <PreLoader />
    }

    return(
        <div id='tech-list-modal' className='modal'>
            <div className='modal-content'>
                    <h4>Technician List</h4>
                    <ul className='collection'>
                        {!loading && techs.map(tech=>{
                            return <TechItem tech={tech} key={tech.id}/>
                        })}
                    </ul>
            </div>
        </div>
    )
}

export default TechListModal;
```

19. TechItem.js

```js
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

const TechItem = ({tech})=>{

    return(
        <li className="collection-item">
            <div>
                {tech.firstName} {tech.lastName}
                <a href="#" className="secondary-content">
                    <i className="material-icons grey-text">delete<i>
                </a>
            </div>
        </li>
    )
}

TechItem.propTypes = {
    log: PropTypes.object.isRequired
}

export default TechItem;
```

20. redux

```bash
$ npm i redux react-redux redux-thunk redux-devtools-extension
```

21. store, reducers, Provider

22. types, actions.

23. connect, PropTypes, mapStateToProps, mapDispatchToProps

24. action 的定义格式，

```js
export const getLogs = () => async (dispatch) => {
    console.log('=====working')
    try {
        setLoading();
        const res = await fetch('/logs');
        const data = await res.json();

        dispatch({
            type: GET_LOGS,
            payload: data
        })
    }
    catch (err) {
        dispatch({
            type: LOGS_ERROR,
            payload: err
        })
    }
}

const mapStateToProps = state => ({
    log: state.log
})

const mapDispatchToProps = dispatch => ({
    getLogs: () => dispatch(getLogs())
})

export default connect(mapStateToProps, mapDispatchToProps)(Logs);
```

25. M.toast 也很重要。

26. useRef, query get request in json server

27. 关于 什么时候用 {} 什么时候用 () 的疑惑

```js
const TechSelectOptions = ({ getTechs, tech }) => {
    const { loading, techs } = tech;
    useEffect(() => {
        getTechs();
        //eslint-disable-next-line
    }, [])

    return (
        (!loading) && (techs !== null) && techs.map(tech =>
            <option key={tech.id} value={`${tech.firstName} ${tech.lastName}`}>
                {tech.firstName} {tech.lastName}
            </option>
        )
    )
}
```

28. onClick 依然混淆。正确的理解是 onClick 应该连接一个函数名，不带调用的形式。

29. 准备做 IT tracker project。

30. working on adding a mongoDB to the project. A seperate documentation about adding mongoDB + express backend to a front end application.

31. Working on the Mongo Backend boilerplate.

32. Happy new year 2021!

33. Solving problems on Leetcode today.

34. Solving problems on Leetcode today. 1/2

35. Solving problems on Leetcode today. 1/3

36. Solving problems on Leetcode today. 1/4

36. Solving problems on Leetcode today. 1/5

37. Solving problems on Leetcode today. 1/6

38. Solving problems on Leetcode today. 1/7

39. Solving problems on Leetcode today. 1/8

40. Solving problems on Leetcode today. 1/9

41. Solving problems on Leetcode today. 1/10

42. Solving problems on Leetcode today. 1/11

43. Solving problems on Leetcode today. 1/12

44. Solving problems on Leetcode today. 1/13

45. Solving problems on Leetcode today. 1/14

46. Solving problems on Leetcode today. 1/15

47. Solving problems on Leetcode today. 1/16

48. Solving problems on Leetcode today. 1/17

49. Solving problems on Leetcode today. 1/18

50. Solving problems on Leetcode today. 1/19

51. Solving problems on Leetcode today. 1/20

52. Solving problems on Leetcode today. 1/21

53. Solving problems on Leetcode today. 1/22

54. Solving problems on Leetcode today. 1/23

55. Solving problems on Leetcode today. 1/24

56. Solving problems on Leetcode today. 1/25

57. Solving problems on Leetcode today. 1/26

58. Solving problems on Leetcode today. 1/27

59. Solving problems on Leetcode today. 1/28

60. Solving problems on Leetcode today. 1/29

61. Solving problems on Leetcode today. 1/30

62. Solved all easy level problems. 1/31

63. Solved 9 medium problems. 2/1

64. Solved 6 medium problems. 2/2

65. Solved 6 medium problems. 2/3