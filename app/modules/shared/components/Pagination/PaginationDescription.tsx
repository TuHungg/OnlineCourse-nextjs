import React from 'react';
import Subtitle from '../Subtitle';
import { useAdminPagination } from '../../../admin/providers/admin-pagination-provider';

// DESCRIPTION
export const PaginationDescription = () => {
    const { currentPage, itemsPerPage, totalItems } = useAdminPagination();
    const firstNo = ((currentPage! - 1) * itemsPerPage) + 1;
    let lastNo = firstNo + itemsPerPage - 1;
    lastNo = lastNo > totalItems! ? totalItems! : lastNo;

    return (
        <Subtitle>
            {
                totalItems! > 0
                    ?
                    itemsPerPage > 1
                        ? `Showing ${firstNo} - ${lastNo} of ${totalItems} entries`
                        : `Showing ${firstNo}  of ${totalItems} entries`
                    : null
            }
        </Subtitle>
    );
};
