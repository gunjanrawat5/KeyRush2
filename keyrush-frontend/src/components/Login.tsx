'use client'
import React, { useEffect, useState } from 'react'
import { supabaseBrowser } from '../lib/supabase/client'
import Image from 'next/image'

const Login = () => {
  const [signedIn, setSignedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabaseBrowser.auth.getUser().then(({ data }) => {
      setSignedIn(!!data.user)
      setLoading(false)
    })

    const { data: sub } = supabaseBrowser.auth.onAuthStateChange((_event, session) => {
      setSignedIn(!!session?.user)
    })

    return () => {
      sub.subscription.unsubscribe()
    }
  }, [])

  const signIn = async () => {
    await supabaseBrowser.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

  const signOut = async () => {
    await supabaseBrowser.auth.signOut()
    window.location.reload()
  }

  if (loading) {
  return (
    <div className="flex gap-10">
      <div>
        <div className="ml-10 mt-10 w-15 h-15 opacity-0" />
        <p className="ml-12 opacity-0">Login</p>
      </div>
    </div>
  )
}

  return (
    <div className="flex gap-10">
      {!signedIn ? (
        <div>
          <div className="ml-10 mt-10 w-15 h-15">
            <button onClick={signIn} className="w-full h-full cursor-pointer">
              <Image src = "/recycle_bin.png" alt='Login image' width={50} height={40}/>
            </button>
          </div>
          <p className="ml-12">Login</p>
        </div>
      ) : (
        <div>
          <div className="ml-10 mt-10 w-15 h-15">
            <button onClick={signOut} className="w-full h-full cursor-pointer">
              <Image src = "/recycle_bin_full.png" alt='Login image' width={50} height={40}/>
            </button>
          
          </div>
          <p className="ml-11">Logout</p>
        </div>
      )}
    </div>
  )
}

export default Login