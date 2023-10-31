import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeCompareState } from "../store/compareSlice";
import CompareCard from "../components/CompareCard";
import { modifyCurrencies } from "../helper/modifyCurrencies";
import { useState } from "react";
import { useGetCurrenciesQuery, useLazyGetCompareCurrenciesQuery } from "../store/apis/currenciesApi";
import { verifyCurrency } from "../helper/verifyCurrency";


function CompareCurrency() {
    const [error, setError] = useState("")

    const compare = useSelector(state => state.compare)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let [trigger, { data: compareData, isLoading, isError, isFetching }] = useLazyGetCompareCurrenciesQuery()
    const { data: currencies } = useGetCurrenciesQuery()

    const handleWrite = (e) => {
        dispatch(changeCompareState(e.target.value))
    }
    const handleCompare = () => {
        trigger(compare)
        setError(verifyCurrency(currencies, compare))
    }
    const currenciesToMap = compareData && modifyCurrencies(compareData.result)

    return (<>
        <button onClick={() => navigate(-1)} className="btn btn-sm btn-primary">Go Back</button>
        <section className="container text-center">
            <h1 className="display-1 my-5">Compare Currency</h1>
            <div>
                <h2>Enter the currency: </h2>
                <input type="text" maxLength="3" className="form-control my-4 fs-3 text-center" onKeyUp={handleWrite} />
                <button className="btn btn-lg btn-dark px-5 py-2" onClick={handleCompare} disabled={isFetching}>Compare</button>
            </div>
            {(compareData && error != true && !isLoading && !isFetching) && < >
                <h1 className="m-5">{compareData.base} at {compareData.date} {new Date(compareData.timestamp).toLocaleTimeString()}</h1>
                <section className="container-cards">
                    {currenciesToMap.map(currency => <CompareCard key={currency.base} currency={currency} baseReal={compareData.base} />)}
                </section>
            </>}
            {(error && !isFetching) && <h1 className="m-5">Currency not exist </h1>}
            {isFetching && <h1 className="m-5">Loading ...</h1>}

        </section>
    </>);
}

export default CompareCurrency;