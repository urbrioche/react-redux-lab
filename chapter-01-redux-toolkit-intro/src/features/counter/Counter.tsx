import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {decrement, increment, reset, incrementByAmount} from "./counterSlice";
import {useState} from "react";

const Counter = () => {
    console.log('rendering CounterRedux');
    const count = useSelector((state: RootState) => state.counter.count);
    const dispatch = useDispatch();
    const [incrementAmount, setIncrementAmount] = useState(0);
    const addValue = Number(incrementAmount) || 0;
    const resetAll = () => {
        setIncrementAmount(0);
        dispatch(reset());
    };

    return (
        <section>
            <p>{count}</p>
            <div>
                <button onClick={() => dispatch(increment())}>+</button>
                <button onClick={() => dispatch(decrement())}>-</button>
            </div>
            <input type="number" value={incrementAmount} onChange={(e) => setIncrementAmount(Number(e.target.value))}/>
            <div>
                <button onClick={() => dispatch(incrementByAmount(addValue))}>Add Amount</button>
                <button onClick={resetAll}>Reset</button>
            </div>
        </section>
    );
};

export default Counter;