"use client";
import { useAuthStore } from '@/store/(auth)/useAuth';
import { useEffect } from 'react'

function ZustWrapper() {
    const {reinstateUser} = useAuthStore()

    useEffect(()=>{
        reinstateUser();
    },[])

  return (
    null
  )
}

export default ZustWrapper