import { Box, Link, LinkProps } from '@chakra-ui/react'
import NLink, { LinkProps as NLinkProps } from 'next/link'
import React from 'react'

interface NextLinkProps extends React.PropsWithChildren<NLinkProps> {
    enabled?: boolean
    linkProps?: LinkProps
}
export default function NextLink({
    enabled = true,
    linkProps = {},
    children,
    ...props
}: NextLinkProps) {
    return (
        <>
            {enabled ? (
                <NLink passHref {...props}>
                    <Link {...linkProps} _hover={{ textDecor: 'none' }} className="no-focus-shadow">
                        {children}
                    </Link>
                </NLink>
            ) : (
                children
            )}
        </>
    )
}
