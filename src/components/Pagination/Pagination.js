import Pagination from "rc-pagination"
import "./Pagination.scss"

export default function PaginationMovies(props){

    const {currentPage, totalItems, updatePageNumber} = props;

    return(
        <Pagination className="pagination"

            current={currentPage}
            pageSize={20}
            total={totalItems}
            onChange={updatePageNumber}

        />
    )
}