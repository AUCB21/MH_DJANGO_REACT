function NotFound(){
    const url = window.location.href;
    alert(`URL: ${url} no existe...`);
    return (<div>
        <h1>404 Not Found</h1>
        <p>La pagina buscada no existe...</p>
    </div>)
}

export default NotFound;