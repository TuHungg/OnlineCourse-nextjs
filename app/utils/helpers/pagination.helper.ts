import { IPagination } from "../../modules/shared/interfaces/pagination.interface";

export default class PaginationHelper implements IPagination {
    itemsPerPage: number;
    pageRange: number;
    totalItems: number;
    totalPage: number = 1;
    currentPage: number = 1;
    start: number = 1;
    end: number = 1;

    static calcTotalPage(totalItems: number, itemsPerPage: number) {
        return Math.ceil(totalItems / itemsPerPage)
    }

    constructor(itemsPerPage: number, pageRange: number, totalItems: number, currentPage: number) {
        this.itemsPerPage = itemsPerPage;
        this.pageRange = pageRange;
        this.totalItems = totalItems;
        this.currentPage = currentPage;
        this.totalPage = PaginationHelper.calcTotalPage(totalItems, itemsPerPage);
        this.start = this.getStartPage();
        this.end = this.getEndPage();
    }

    private getStartPage(): number {
        let startAt: number;
        let temp: number = Math.ceil(this.pageRange / 2); // 1

        if (this.currentPage <= temp) startAt = 1;
        else if (this.currentPage > (this.totalPage - (temp - 1))) {
            startAt = this.totalPage - temp;
        }
        else startAt = this.currentPage - temp + 1;
        return startAt;
    }

    private getEndPage(): number {
        let endAt: number;
        if (this.totalPage >= this.pageRange) endAt = this.start + this.pageRange - 1;
        else endAt = this.pageRange;
        return endAt;
    }

}