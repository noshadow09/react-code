import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../state/store';
import { decrement, increment, incrementByAmount, incrementAsync } from '../state/counter/counterSlice';

const MyComponent = () => {
    const count = useSelector((state: RootState) => state.counter.value);
    // need to specify the type of dispatch when working with async actions
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div>
            <h2>{count}</h2>
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(decrement())}>-</button>
            <button onClick={() => dispatch(incrementByAmount(10))}>+10</button>
            <button onClick={() => dispatch(incrementAsync(10))}>+10 (async)</button>
        </div>
    )
}

export default MyComponent;