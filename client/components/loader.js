function Loader({ isLoading }) {
    return isLoading
        ? (
            <div className="overlay d-flex justify-content-center align-items-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only"></span>
                </div>
            </div>
        )
        : (<></>);
}

export default Loader;