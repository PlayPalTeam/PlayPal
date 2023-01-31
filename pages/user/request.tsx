import Layout from '@components/Layout'
import { useRequestContext } from '@context/RequestContext'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const RequestForm = dynamic(() => import("@components/RequestForm"))
const RequestCard = dynamic(() => import("@components/RequestCard"))

const Request: NextPage = () => {
	const [isOpen, setIsOpen] = useState(false);

	const { requests } = useRequestContext()

	return (
		<Layout title="Requests">
			<main className='px-10 w-full'>
				<section>
					<div className="text-right">
						<button className='bg-green-400 text-white px-4 py-2 rounded-lg hover:bg-green-500 active:bg-green-600' onClick={() => setIsOpen(true)}>Create Requests</button>
					</div>
					<RequestForm isOpen={isOpen} closeModal={() => setIsOpen(false)} />
				</section>
				<hr className='my-5 border-black' />
				<section className='space-y-5'>
					{requests?.map((req) => <RequestCard key={req.id} {...req} />)}
				</section>
			</main>
		</Layout>
	)

}

export default Request
