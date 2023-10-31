import { NavLink } from "react-router-dom";



function Home() {

    return (<section className="container home d-flex flex-column justify-content-center align-items-center">
        <h1 className="m-5 display-4 text-center">What operation do you want to do?</h1>
        <div className="w-50 d-flex justify-content-around flex-column flex-md-row gap-3">
            <NavLink className="btn btn-lg p-3 btn-outline-primary" to="/calculate">Calculate Currencies</NavLink>
            <NavLink className="btn btn-lg p-3 btn-outline-danger" to="/compare">Compare Currencies</NavLink>
        </div>
    </section>);
}

export default Home;