import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Rating,
} from '@material-tailwind/react'
import { useCart } from 'context/cartContext'
import { addProductToCart } from 'services/product.service'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()

  const handleAddToCart = (product) => {
    addToCart(product)
    addProductToCart(product)
  }

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text
    } else {
      return text.substring(0, maxLength) + '...'
    }
  }

  const truncateTitle = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text
    } else {
      return text.substring(0, maxLength)
    }
  }

  return (
    <Card className=''>
      <CardHeader shadow={false} floated={false} className=''>
        <img
          src={product.image}
          alt='card-image'
          className='h-20 w-full object-contain object-center md:h-64'
        />
      </CardHeader>
      <CardBody>
        <div className='mb-2 flex items-center justify-between flex-col'>
          <Typography color='blue-gray' className='font-medium max-w-40 text-xs sm:text-sm h-12'>
            {truncateTitle(product.title, 19)}
          </Typography>
          <Typography color='blue-gray' className='mt-4 sm:mt-0 font-bold'>
            ${product.price}
          </Typography>
        </div>
        <Typography
          variant='small'
          color='gray'
          className='hidden sm:flex font-normal opacity-75 h-24 md:h-fit'
        >
          {truncateText(product.description, 45)}
        </Typography>

        <div className='flex items-center flex-col md:mt-2 md:flex-row '>
          <Rating
            className='hidden sm:flex'
            value={Math.round(product.rating.rate)}
            readonly={true}
            size='small'
          />

          <Typography className='hidden sm:flex text-sm font-semibold bg-[#C3DDFD] px-2 text-[#155E75] rounded mt-3 md:ml-2 md:mt-0'>
            {product.rating.rate}
          </Typography>
        </div>
      </CardBody>
      <CardFooter className='pt-0'>
        <Button
          ripple={false}
          fullWidth={true}
          onClick={() => handleAddToCart(product)}
          className='bg-[#7661fe] flex justify-center items-center lowercase sm:uppercase px-2 text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100'
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ProductCard
