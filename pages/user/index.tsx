import BookingCard from '@components/BookingCard';
import CardDisclosure from '@components/CardDisclosure';
import Layout from '@components/Layout';
import { useBookContext } from '@context/BookingContext';
import { useRequestContext } from '@context/RequestContext';
import dynamic from 'next/dynamic';

const RequestCard = dynamic(() => import("@components/RequestCard"))

const HomeUser = () => {
	const { books } = useBookContext();

	const { requests } = useRequestContext()

	const requestElement = requests?.map((req) => <RequestCard key={req.id} {...req} />)

	return (
		<Layout title="Dashboard">
			<main className='max-md:p-5 p-10'>
				<CardDisclosure title='Bookings' element={books.map((book) => <BookingCard key={book.booking_id} {...book} />)} />
				<hr className='my-5 border-black' />
				<CardDisclosure title={'Requests you created'} element={requestElement} />
			</main>
		</Layout>
	)
}

export default HomeUser
