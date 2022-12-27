import { useSession, useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import React, { useEffect, useState } from 'react'

const Turf = () => {
    const supabase = useSupabaseClient()
    const user = useUser()
    const session = useSession()
    const [username ,setUsername] = useState("")
    const [name, setName] = useState("")

    useEffect(() => {
        getProfile()
      }, [session])
    
      async function getProfile() {
        const { data, error } = await supabase
        .from('profiles')
        .select(`
        username,
        turfid(name)
        `).eq("id",user?.id)
        .single()
        console.log(data)
        if(data && !error){
            setUsername(data.username)

        }
      }
      console.log(name)

  return (
    <div>
        <div>
            {username} <br></br>
            {name}
        </div>
    </div>
  )
}

export default Turf