import { useAuth } from "../../context/AuthContext";

export const Pagination = () => {
  const {
    itemsPerPage,
    setItemsPerPage,
    totalPages,
    currentPage,
    setCurrentPage,
    currentVacantJobs,
    filteredResultsList,
  } = useAuth();
  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <>
      <div className="pagination-mainSection--container">
        <div className="pagination-section">
          <div className="pagination-info">
            <label htmlFor="itemsPerPage">Items per page:</label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={25}>25</option>
            </select>
          </div>

          {totalPages > 1 && (
            <div className="pagination-controls">
              {/* Previous Button */}
              <button
                className="btn btn-secondary"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              {/* Page Numbers */}
              <div className="page-numbers">
                {(() => {
                  const buttons = [];
                  for (let i = 1; i <= totalPages; i++) {
                    buttons.push(
                      <button
                        key={i}
                        className={`page-btn ${
                          currentPage === i ? "active" : ""
                        }`}
                        onClick={() => handlePageChange(i)}
                      >
                        {i}
                      </button>
                    );
                  }
                  return buttons;
                })()}
              </div>

              {/* Next Button */}
              <button
                className="btn btn-secondary"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
