import { ButtonProps } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { FiPlus } from 'react-icons/fi'
import lan from '../../../../utils/constants/lan.constant'
import Helper from '../../../../utils/helpers/helper.helper'
import ResponsiveButton from '../../../shared/components/ResponsiveButton'
import { TSize } from '../../../shared/types/size.type'
import { useAppDialog } from '../../providers/app-dialog.provider'
import { usePageParams } from '../../providers/page-params.provider'

export interface MainCreateButton extends ButtonProps {
    formComponent?: ReactNode
    size?: TSize
}

const MainCreateButton = ({ size = '2xl', formComponent, ...props }: MainCreateButton) => {
    const { modelName } = usePageParams()
    const { onShow } = useAppDialog()
    const onClick = () => {
        if (formComponent) {
            onShow({
                title: `${Helper.lodash.upperFirst(lan.CREATE)} ${Helper.lodash.upperFirst(
                    modelName
                )}`,
                body: formComponent,
                size,
            })
        }
    }
    return (
        <ResponsiveButton onClick={onClick} key={3} colorScheme={'blue'} icon={FiPlus} {...props}>
            {' '}
            {Helper.lodash.upperFirst(lan.CREATE)} {modelName}
        </ResponsiveButton>
    )
}

export default React.memo(MainCreateButton)
