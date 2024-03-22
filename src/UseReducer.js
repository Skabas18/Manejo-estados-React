import React from 'react'

const SECURITY_CODE = 'paradigma';
function UseReducer({ name }) {
    const [state, dispatch] = React.useReducer(reducer, initialState)

    const onConfrim = () => dispatch({ type: actionTypes.confirm });
    const onError = () => dispatch({ type: actionTypes.error });
    const onWrite = (event) => dispatch({ type: actionTypes.write, payload: event.target.value });
    const onCheck = () => dispatch({ type: actionTypes.check });
    const onDelete = () => dispatch({ type: actionTypes.delete });
    const onReset = () =>dispatch({ type: actionTypes.reset });
    
    React.useEffect(() => {
        console.log("Empezando el efecto");
        if (!!state.loading) {
            setTimeout(() => {
                console.log("Haciendo la validación");
                if (state.value === SECURITY_CODE) {
                    onConfrim();
                } else {
                    onError();
                }
                console.log("Terminando la validación");
            }, 3000);
        }
        console.log("Terminando el efecto");

    }, [state.loading])
    if (!state.deleted && !state.confirmed) {
        return (
            <div>
                <h2>Eliminar {name}</h2>
                <p>Por favor, escribe el código de seguridad.</p>
                {(state.error && !state.loading) && (
                    <p>Error: el código es incorrecto</p>
                )}
                {state.loading && (
                    <p>Cargando ...</p>
                )}
                <input placeholder='Código de seguridad' value={state.value} onChange={(event) => {
                    // dispatch({ type: actionTypes.write, payload: event.target.value });
                    onWrite(event);
                }} />
                <button onClick={onCheck}>Comprobar</button>
            </div>
        )
    } else if (!state.deleted && !!state.confirmed) {
        return (
            <React.Fragment>
                <p>¿Estas seguro de eliminar el UseState?</p>
                <button onClick={onDelete}>Sí, eliminar</button>
                <button onClick={onReset}>No, Me arrepentí</button>

            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <p>Eliminado con éxito</p>
                <button onClick={onReset}>Resetear, volver atrás</button>
            </React.Fragment>
        );
    }
}


const initialState = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false
}

const actionTypes = {
    confirm: 'CONFIRM',
    write: 'WRITE',
    delete: 'DELETE',
    error: 'ERROR',
    reset: 'RESET',
    check: 'CHECK'
}

const reducerObject = (state, payload) => ({
    [actionTypes.confirm]: {
        ...state,
        error: false,
        loading: false,
        confirmed: true
    },
    [actionTypes.error]: {
        ...state,
        error: true,
        loading: false,
    },
    [actionTypes.write]: {
        ...state,
        value: payload
    },
    [actionTypes.check]: {
        ...state,
        loading: true,
        error: false
    },
    [actionTypes.delete]: {
        ...state,
        deleted: true
    },
    [actionTypes.reset]: {
        ...state,
        confirmed: false,
        deleted: false,
        value: ''
    }
})

const reducer = (state, action) => {
    if (reducerObject(state)[action.type]) {
        return reducerObject(state, action.payload)[action.type]
    } else {
        return state;
    }
}

export { UseReducer }
