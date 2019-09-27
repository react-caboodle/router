const Link = ReactRouterDOM.Link,
Route = ReactRouterDOM.Route;

const App = props => (
    <ReactRouterDOM.BrowserRouter>
        <Route path="/" exact component={Home} />
        <Route path="/a" component={A} />
        <Route path="/b" component={B} />
        <Route path="/c" component={C} />
    </ReactRouterDOM.BrowserRouter>
);

const Home = props => {
    const changeHandler = (e)=>{
        if (e.target.value.length === 4) {
            return props.history.push('/a');            
        }
        return props.history.push('/');
    }
    return (
        <div>
            <input type='text' onChange={changeHandler} />
        </div>
    );        
}
const A = props => {
    let amount=0;
    let balance=1000;
    const cancelHandler = (e) =>{
        return props.history.push('/');
    }
    
    const continueHandler = (amount)=>{
        console.log('meol continue handler');
        return props.history.push({pathname:'/b', state: {amount, balance}});
    }

    const changeHandler = (e)=>{
        e.preventDefault();
        amount = e.target.value;
    }

    const backHandler = ()=>{
        props.history.push('/');
    }
    
    return (
        <div>
            <h3>Available Balance: ${balance}.00</h3>
            <form>
                <input type='text' placeholder='Amount to withdraw' onChange={changeHandler} />
                <button onClick={backHandler}>Back</button>
                <button onClick={cancelHandler}>Cancel</button>
                <button onClick={()=>continueHandler(amount)}>Continue</button>
            </form>
        </div>
    );
}
const B = props => {
    const amount  = parseInt(props.location.state.amount);
    const balance = parseInt(props.location.state.balance);
    const clickHandler=()=>{
        props.history.push('/');
    }
    return (
        <div>
            <h3>Withdrawn {amount}</h3>
            <p>Remaining balance is $ {balance-amount}.00</p>
            <button onClick={clickHandler}>Back</button>
        </div>
    );
}
const C = props => {
    return (
        <div>
            <h3>C</h3>
        </div>
    );
}

ReactDOM.render(<App />, document.querySelector('#root'));
