import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeAmount, changeCurrencyFrom, changeCurrencyTo } from "../store/calculateSlice";
import { useGetCurrenciesQuery, useLazyGetConversionCurrencyQuery } from "../store/apis/currenciesApi"

function CalculateCurrency() {
    const calculate = useSelector(state => state.calculate)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { data: currencyData } = useGetCurrenciesQuery()
    const [trigger, { data: conversionCurrencyData, isFetching: conversionFetching }] = useLazyGetConversionCurrencyQuery()


    const handleConvert = () => {
        trigger({ from: calculate.currencyFrom, to: calculate.currencyTo, amount: calculate.amount })
    }
    const handleChangeSelectCurrencyFrom = (e) => {
        dispatch(changeCurrencyFrom(e.target.value))
    }
    const handleChangeSelectCurrencyTo = (e) => {
        dispatch(changeCurrencyTo(e.target.value))
    }
    const handleChangeAmount = (e) => {
        dispatch(changeAmount(Number(e.target.value)))
    }

    return (<>
        <button onClick={() => navigate(-1)} className="btn btn-sm btn-primary">Go Back</button>
        <section className="container text-center">
            <h1 className="display-1 my-4">Calculate Currencies</h1>
            <div className="d-flex flex-md-row flex-column justify-content-around align-items-center w-100 gap-4 my-5">
                <div className="w-100 text-start">
                    <h2>Cuantity</h2>
                    <div className="d-flex">
                        <input type="number" className="form-control w-75" onKeyUp={handleChangeAmount} />
                        <select name="" id="" className="form-select w-25" onChange={handleChangeSelectCurrencyFrom}>
                            <option value="">Select...</option>
                            {currencyData && currencyData.map((currency) => <option key={currency} value={currency}>{currency}</option>)}
                        </select>
                    </div>
                </div>
                <div className="w-100 text-start">
                    <h2>Convert to:</h2>
                    <div className="d-flex">
                        <input type="number" className="form-control w-75" value={conversionCurrencyData && conversionCurrencyData.result} disabled />
                        <select name="" id="" className="form-select w-25" onChange={handleChangeSelectCurrencyTo}>
                            <option value="">Select...</option>
                            {currencyData && currencyData.map((currency) => <option key={currency} value={currency}>{currency}</option>)}
                        </select>
                    </div>
                </div>
            </div>
            <button
                className="btn btn-outline-primary w-100 p-3 fs-4"
                disabled={!calculate.currencyFrom || !calculate.currencyTo || !calculate.amount || conversionFetching}
                onClick={handleConvert}
            >
                Make Conversion
            </button>
        </section>
    </>);
}

export default CalculateCurrency;