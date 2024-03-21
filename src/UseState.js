import React from 'react'

const SECURITY_CODE = 'paradigma';
function UseState({ name }) {
  const [state, setState] = React.useState({
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false
  })

  const onConfrim = () => {
    setState({
      ...state,
      error: false,
      loading: false,
      confirmed: true
    });
  }

  const onError = () => {
    setState({
      ...state,
      error: true,
      loading: false
    });
  }

  const onWrite = (event) => {
    setState({
      ...state,
      value: event.target.value
    });
  }

  const onCheck = () => {
    setState({
      ...state,
      loading: true
    });
  }

  const onDelete = () => {
    setState({
      ...state,
      deleted: true
    })
  }

  const onReset = () => {
    setState({
      ...state,
      confirmed: false,
      deleted: false,
      value: ''
    })
  }
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
          onWrite(event);
        }} />
        <button onClick={() => {
          onCheck();
        }}>Comprobar</button>
      </div>
    )
  } else if (!state.deleted && !!state.confirmed) {
    return (
      <React.Fragment>
        <p>¿Estas seguro de eliminar el UseState?</p>
        <button onClick={() => {
          onDelete()
        }}>Sí, eliminar</button>
        <button onClick={() => {
          onReset()
        }}>No, Me arrepentí</button>

      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <p>Eliminado con éxito</p>
        <button onClick={() => {
          onReset()
        }}>Resetear, volver atrás</button>
      </React.Fragment>
    );
  }
}

export { UseState }