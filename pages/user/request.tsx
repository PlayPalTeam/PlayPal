import Layout from '@components/Layout'
import { useRequestContext } from '@context/RequestContext'
import useHelper from '@utils/helper'
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
			<main className='p-10 w-full'>
				<section>
					<div className="text-right">
						<button onClick={() => setIsOpen(true)}>Create Requests</button>
					</div>
					<RequestForm isOpen={isOpen} closeModal={() => setIsOpen(false)} />
				</section>
				<hr className='my-5 border-black' />
				<section>
					<div>
						{requests?.map((req) => <RequestCard key={req.id} {...req} />)}
					</div>
				</section>
			</main>
		</Layout>
	)

}

export default Request
