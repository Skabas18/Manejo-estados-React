import React from 'react';

class Loading extends React.Component {
    componentWillUnmount() {
        console.log("componentWillUnmount");
    }
    render() {
        return ( // Añadida la declaración de return aquí
            <p>Cargando...</p>
        );
    }
}

export { Loading };
