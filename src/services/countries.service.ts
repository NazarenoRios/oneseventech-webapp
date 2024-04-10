import axios from 'axios'
import { loadAbort } from 'utils'

const countriesURL = process.env.REACT_APP_COUNTRIES_API

export const getCountries = () => {
  const controller = loadAbort()

  return {
    call: () =>
      axios.get(`${countriesURL}/all`, {
        signal: controller.signal,
      }),
    controller,
  }
}
