import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import { getProducts } from 'services/product.service'
import displayToast from 'utils/toast.utility'
import { useFetchAndLoad } from 'hooks'
import Loading from 'common/Loading'

const ProductList = () => {
  const { loading, callEndpoint } = useFetchAndLoad()

  const [sort, setSort] = useState('Relevance')
  const [products, setProducts] = useState<any[]>([])

  const sortValues = {
    Relevance: 'Relevance',
    PriceLowToHigh: 'Price Low to High',
    PriceHighToLow: 'Price High to Low',
    RateLowToHigh: 'Rate Low to High',
    RateHighToLow: 'Rate High to Low',
  }

  const sortProducts = (e: any) => {
    setSort(e.target.value)
  }

  const getAllProducts = async () => {
    try {
      const response = await callEndpoint(getProducts())
      setProducts(response.data)
    } catch (error) {
      displayToast(error, 'error')
    }
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  const sortProductsHandler = (sortedProducts: any[]) => {
    switch (sort) {
      case sortValues.Relevance:
        return sortedProducts.sort((a, b) => a.id - b.id)
      case sortValues.PriceLowToHigh:
        return sortedProducts.sort((a, b) => a.price - b.price)
      case sortValues.PriceHighToLow:
        return sortedProducts.sort((a, b) => b.price - a.price)
      case sortValues.RateLowToHigh:
        return sortedProducts.sort((a, b) => a.rating.rate - b.rating.rate)
      case sortValues.RateHighToLow:
        return sortedProducts.sort((a, b) => b.rating.rate - a.rating.rate)
      default:
        return sortedProducts.sort((a, b) => a.id - b.id)
    }
  }

  useEffect(() => {
    const sortedProducts = sortProductsHandler([...products])
    setProducts(sortedProducts)
  }, [sort])

  if (loading) {
    return (
      <div className='flex items-center justify-center'>
        <Loading />
      </div>
    )
  }

  return (
    <>
      <div className='flex justify-end pb-10'>
        <div className='flex items-center'>
          <span className='text-gray-700 font-medium'>Sort</span>
          <span className='ml-1 text-gray-700 font-medium'>by</span>
        </div>
        <div className='relative ml-4 inline-flex w-full'>
          <select
            id='sort'
            name='sort'
            value={sort}
            onChange={sortProducts}
            className='rounded-md border border-gray-300 bg-white py-2 px-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm'
          >
            {Object.values(sortValues).map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          <svg
            className='absolute inset-y-0 right-0 h-full p-3 text-gray-400 hover:text-gray-500'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M5.293 7.293a1 1 0 011.414 0L10 10.293l4.293-4.293a1 1 0 011.414 1.414l-6 6a1 1 0 01-1.414-1.414L5.293 7.293z'
              clipRule='evenodd'
            />
          </svg>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-y-10 gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
        {products.length > 0 ? (
          products.map((product, i) => <ProductCard key={i} product={product} />)
        ) : (
          <div>No products found</div>
        )}
      </div>
    </>
  )
}

export default ProductList
