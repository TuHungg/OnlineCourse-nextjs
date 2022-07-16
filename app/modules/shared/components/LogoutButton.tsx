import { Button } from '@chakra-ui/react'
import React from 'react'
import { useAuth } from '../../auth/providers/auth.provider'

export default function LogoutButton() {
    const {
        state: { user },
        methods: { onLogout },
    } = useAuth()
    if (!user) return <></>
    return <Button onClick={onLogout}>Logout</Button>
}
