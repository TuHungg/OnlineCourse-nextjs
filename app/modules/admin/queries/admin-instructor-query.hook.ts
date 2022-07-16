import { useQuery } from 'react-query'
import { fetchInstructorWithPayment } from '../../../apis/user-payment/user-payment.api'
import IInstructorWithPayment from '../interfaces/instructor-with-payment.interface'
import { useInstructorId } from './instructor-payments-query.hook'

export const RQK_ADMIN_INSTRUCTOR_WITH_PAYMENT = 'admin-instructor-with-payment'
export const useAdminInstructorWithPayment = () => {
    const instructorId = useInstructorId()
    return useQuery<IInstructorWithPayment>(
        [RQK_ADMIN_INSTRUCTOR_WITH_PAYMENT, instructorId],
        () => fetchInstructorWithPayment(instructorId),
        {
            notifyOnChangeProps: 'tracked',
            enabled: !!instructorId,
        }
    )
}
