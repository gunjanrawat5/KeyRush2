'use client'
import React, { useEffect, useState } from 'react'
import { supabaseBrowser } from '../lib/supabase/client'

const Login = () => {
  const [signedIn, setSignedIn] = useState(false)

  useEffect(() => {
    supabaseBrowser.auth.getUser().then(({ data }) => {
      setSignedIn(!!data.user)
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

  return (
    <div className="flex gap-10">
      {!signedIn ? (
        <div>
          <div className="ml-10 mt-10 w-15 h-15 border-2">
            <button onClick={signIn} className="w-full h-full cursor-pointer" />
          </div>
          <p className="ml-12.5">Login</p>
        </div>
      ) : (
        <div>
          <div className="ml-10 mt-10 w-15 h-15 border-2">
            <button onClick={signOut} className="w-full h-full cursor-pointer" />
          </div>
          <p className="ml-11">Logout</p>
        </div>
      )}
    </div>
  )
}

export default Login
