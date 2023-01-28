import { useMemo, useReducer } from 'react'
import Image from 'next/image'
import { imageConvert } from 'upload-images-converter'
import { Database } from 'src/types/database.types'
import { supabase } from 'src/lib/supabase'
import { useUserProfile } from 'src/context/UserProfileContext'

type Profiles = Database['public']['Tables']['profiles']['Row']

type State = {
	avatarUrl: Profiles['avatar_url'] | null
	uploading: boolean
}

type Action =
	| { type: 'SET_AVATAR_URL', avatarUrl: Profiles['avatar_url'] }
	| { type: 'SET_UPLOADING', uploading: boolean }

const initialState: State = {
	avatarUrl: null,
	uploading: false
}

function avatarReducer(state: State, action: Action): State {
	switch (action.type) {
		case 'SET_AVATAR_URL':
			return { ...state, avatarUrl: action.avatarUrl }
		case 'SET_UPLOADING':
			return { ...state, uploading: action.uploading }
		default:
			return state
	}
}

type Props = {
	showUploadButton?: boolean
}

export default function Avatar({ showUploadButton }: Props) {
	const [state, dispatch] = useReducer(avatarReducer, initialState)
	const { userProfile, updateUserProfile } = useUserProfile()

	useMemo(() => {
		async function downloadImage(path: string) {
			try {
				const { data, error } = await supabase.storage.from('avatars').download(path)
				if (error) {
					throw error
				}
				const url = URL.createObjectURL(data)
				dispatch({ type: 'SET_AVATAR_URL', avatarUrl: url })
			} catch (error) {
				console.log('Error downloading image: ', error)
			}
		}

		if (userProfile?.avatar_url) downloadImage(userProfile?.avatar_url)
	}, [userProfile?.avatar_url])

	const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
		try {
			dispatch({ type: 'SET_UPLOADING', uploading: true })

			if (!event.target.files || event.target.files.length === 0) {
				throw new Error('You must select an image to upload.')
			}

			const file = event.target.files[0]
			const fileExt = file.name.split('.').pop()
			const fileName = `${userProfile?.id}.${fileExt}`
			const filePath = `${fileName}`


			const convertedFile = await imageConvert(event.target.files, 200, 200, "image/webp", true)

			let { error: uploadError } = await supabase.storage
				.from('avatars')
				.upload(filePath, convertedFile[0], { upsert: true })

			if (uploadError) {
				throw uploadError
			}

			updateUserProfile({ avatar_url: filePath })

		} catch (error) {
			alert('Error uploading avatar!')
			console.log(error)
		} finally {
			dispatch({ type: 'SET_UPLOADING', uploading: false })
		}
	}

	return (
		<div>
			{state.avatarUrl ? (
				<Image
					src={state.avatarUrl}
					alt="Avatar"
					className="w-16 h-16 overflow-hidden rounded-full"
					width={300}
					height={300}
				/>
			) : (
				<div className="overflow-hidden rounded-full bg-[#333] border border-solid" />
			)}
			{showUploadButton && (
				<div className='w-96'>
					<label className="button primary block" htmlFor="single">
						{state.uploading ? 'Uploading ...' : 'Upload'}
					</label>
					<input
						style={{
							visibility: 'hidden',
							position: 'absolute',
						}}
						type="file"
						id="single"
						accept="image/*"
						onChange={uploadAvatar}
						disabled={state.uploading}
					/>
				</div>
			)}
		</div>
	)
}