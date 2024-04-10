import Loading from 'common/Loading'
import { useFetchAndLoad } from 'hooks'
import { Country } from 'interfaces/country.interface'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router'
import { getCountries } from 'services/countries.service'
import { confirmPayment, getPayment } from 'services/stripe.service'
import displayToast from 'utils/toast.utility'

const CheckoutForm = () => {
  const { loading, callEndpoint } = useFetchAndLoad()

  const [countries, setCountries] = useState<Country[]>([])
  const [total, setTotal] = useState(0)

  // payment

  const [paymentSucceeded, setPaymentSucceeded] = useState(false)

  const { id } = useParams()

  const handleGetPayment = async () => {
    try {
      if (id) {
        const response = await callEndpoint(getPayment(id))
        setTotal(response.data.amount)
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    handleGetPayment()
  }, [id])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (formData: any) => {
    const res = await callEndpoint(confirmPayment(id, formData))
    if (res.data.status === 'succeeded') {
      setPaymentSucceeded(true)
    }
  }

  const getAllCountries = async () => {
    try {
      const response = await callEndpoint(getCountries())
      const countriesSorted = response.data.sort((a: any, b: any) =>
        a.name.common.localeCompare(b.name.common),
      )
      setCountries(countriesSorted)
    } catch (error) {
      displayToast(error, 'error')
    }
  }

  useEffect(() => {
    getAllCountries()
  }, [])

  if (loading) {
    return (
      <div className='flex items-center justify-center'>
        <Loading />
      </div>
    )
  }

  if (paymentSucceeded)
    return (
      <div className='flex justify-center items-center h-[80vh]'>
        <div className=''>
          <div className='bg-white p-6  md:mx-auto'>
            <svg viewBox='0 0 24 24' className='text-green-600 w-16 h-16 mx-auto my-6'>
              <path
                fill='currentColor'
                d='M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z'
              ></path>
            </svg>
            <div className='text-center'>
              <h3 className='md:text-2xl text-base text-gray-900 font-semibold text-center'>
                Payment Done!
              </h3>
              <p className='text-gray-600 my-2'>
                Thank you for completing your secure online payment.
              </p>
              <p> Have a great day! </p>
              <div className='py-10 text-center'>
                <a
                  href='/'
                  className='px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3'
                >
                  GO BACK
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='max-w-md mx-3 sm:mx-auto mt-8'>
      <fieldset className='border border-gray-300 rounded-md p-4 mb-4'>
        <legend className='text-lg font-semibold mb-2'>Customer Information</legend>
        <div className='mb-4'>
          <label htmlFor='fullName' className='block mb-2'>
            Full Name
          </label>
          <input
            type='text'
            id='fullName'
            {...register('fullName', { required: true })}
            className='w-full p-2 border border-gray-300 rounded-md'
          />
          {errors.fullName && <span className='text-red-500'>This field is required</span>}
        </div>

        <div className='mb-4'>
          <label htmlFor='email' className='block mb-2'>
            Email
          </label>
          <input
            type='email'
            id='email'
            {...register('email', { required: true })}
            className='w-full p-2 border border-gray-300 rounded-md'
          />
          {errors.email && <span className='text-red-500'>This field is required</span>}
        </div>
      </fieldset>

      <fieldset className='border border-gray-300 rounded-md p-4 mb-4'>
        <legend className='text-lg font-semibold mb-2'>Billing Information</legend>
        <div className='mb-4'>
          <label htmlFor='address' className='block mb-2'>
            Address
          </label>
          <input
            type='text'
            id='address'
            {...register('address', { required: true })}
            className='w-full p-2 border border-gray-300 rounded-md'
          />
          {errors.address && <span className='text-red-500'>This field is required</span>}
        </div>

        <div className='grid grid-cols-2 gap-4 mb-4'>
          <div className='mb-4'>
            <label htmlFor='country' className='block mb-2'>
              Country
            </label>
            <select
              id='country'
              {...register('country', { required: true })}
              className='w-full p-2 border border-gray-300 rounded-md'
            >
              <option value=''>Select a country</option>
              {countries?.map((country, i) => (
                <option key={i} value={country?.name.cca2}>
                  {country?.name.common}
                </option>
              ))}
            </select>
            {errors.country && <span className='text-red-500'>This field is required</span>}
          </div>
          <div>
            <label htmlFor='zip' className='block mb-2'>
              Zip
            </label>
            <input
              type='text'
              id='zip'
              {...register('zip', { required: true })}
              className='w-full p-2 border border-gray-300 rounded-md'
            />
            {errors.zip && <span className='text-red-500'>This field is required</span>}
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4 mb-4'>
          <div>
            <label htmlFor='city' className='block mb-2'>
              City
            </label>
            <input
              type='text'
              id='city'
              {...register('city', { required: true })}
              className='w-full p-2 border border-gray-300 rounded-md'
            />
            {errors.city && <span className='text-red-500'>This field is required</span>}
          </div>
          <div>
            <label htmlFor='state' className='block mb-2'>
              State
            </label>
            <input
              type='text'
              id='state'
              {...register('state', { required: true })}
              className='w-full p-2 border border-gray-300 rounded-md'
            />
            {errors.state && <span className='text-red-500'>This field is required</span>}
          </div>
        </div>
      </fieldset>

      <fieldset className='border border-gray-300 rounded-md p-4 mb-4'>
        <legend className='text-lg font-semibold mb-2'>Payment Information</legend>
        <div className='mb-4'>
          <label htmlFor='cardNumber' className='block mb-2'>
            Card Number
          </label>
          <input
            type='number'
            id='cardNumber'
            {...register('cardNumber', {
              required: true,
              pattern: /^\d+$/,
              minLength: 16,
              maxLength: 16,
            })}
            className='w-full p-2 border border-gray-300 rounded-md'
          />
          {errors.cardNumber && errors.cardNumber.type === 'required' && (
            <span className='text-red-500'>This field is required</span>
          )}
          {errors.cardNumber && errors.cardNumber.type === 'pattern' && (
            <span className='text-red-500'>Please enter only numbers</span>
          )}
          {errors.cardNumber && errors.cardNumber.type === 'minLength' && (
            <span className='text-red-500'>Card number must be 16 digits</span>
          )}
          {errors.cardNumber && errors.cardNumber.type === 'maxLength' && (
            <span className='text-red-500'>Card number must be 16 digits</span>
          )}
        </div>

        <div className='grid grid-cols-3 gap-4 mb-4'>
          <div>
            <label htmlFor='expMonth' className='block mb-2'>
              Exp. Month
            </label>
            <input
              type='number'
              id='expMonth'
              {...register('expMonth', {
                required: true,
                pattern: /^\d+$/,
                minLength: 2,
                maxLength: 2,
              })}
              className='w-full p-2 border border-gray-300 rounded-md'
            />
            {errors.expMonth && errors.expMonth.type === 'required' && (
              <span className='text-red-500'>This field is required</span>
            )}
            {errors.expMonth && errors.expMonth.type === 'pattern' && (
              <span className='text-red-500'>Please enter only numbers</span>
            )}
            {errors.expMonth && errors.expMonth.type === 'minLength' && (
              <span className='text-red-500'>Month must be 2 digits</span>
            )}
            {errors.expMonth && errors.expMonth.type === 'maxLength' && (
              <span className='text-red-500'>Month must be 2 digits</span>
            )}
          </div>
          <div>
            <label htmlFor='expYear' className='block mb-2'>
              Exp. Year
            </label>
            <input
              type='number'
              id='expYear'
              {...register('expYear', {
                required: true,
                pattern: /^\d+$/,
                minLength: 4,
                maxLength: 4,
              })}
              className='w-full p-2 border border-gray-300 rounded-md'
            />
            {errors.expYear && errors.expYear.type === 'required' && (
              <span className='text-red-500'>This field is required</span>
            )}
            {errors.expYear && errors.expYear.type === 'pattern' && (
              <span className='text-red-500'>Please enter only numbers</span>
            )}
            {errors.expYear && errors.expYear.type === 'minLength' && (
              <span className='text-red-500'>Year must be 4 digits</span>
            )}
            {errors.expYear && errors.expYear.type === 'maxLength' && (
              <span className='text-red-500'>Year must be 4 digits</span>
            )}
          </div>
          <div>
            <label htmlFor='cvc' className='block mb-2'>
              CVC
            </label>
            <input
              type='password'
              id='cvc'
              {...register('cvc', {
                required: true,
                pattern: /^\d+$/,
                minLength: 3,
                maxLength: 3,
              })}
              className='w-full p-2 border border-gray-300 rounded-md'
            />
            {errors.cvc && errors.cvc.type === 'required' && (
              <span className='text-red-500'>This field is required</span>
            )}
            {errors.cvc && errors.cvc.type === 'pattern' && (
              <span className='text-red-500'>Please enter only numbers</span>
            )}
            {errors.cvc && errors.cvc.type === 'minLength' && (
              <span className='text-red-500'>CVC must be 3 digits</span>
            )}
            {errors.cvc && errors.cvc.type === 'maxLength' && (
              <span className='text-red-500'>CVC must be 3 digits</span>
            )}
          </div>
        </div>
      </fieldset>

      <div className='flex items-center justify-center mb-4'>
        Total Amount <span className='ml-2 font-bold text-green-500'>${total}</span>
      </div>

      <button
        type='submit'
        className='w-full bg-[#7661fe] text-white py-2 rounded-md hover:bg-[#4d40a2] mb-3'
      >
        Pay
      </button>
    </form>
  )
}

export default CheckoutForm
