export default ({currentPage, pages, onPageChange})=> (
  <nav aria-label="Page navigation">
    <ul className="pagination">
      <li onClick={ (e) => onPageChange(currentPage - 1)}>
        <a href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      { [...Array(pages)].map((_,i) =>(
        <li onClick={ (e)=> onPageChange(i + 1)} key={i}><a href="#">{i + 1}</a></li>
      ))}
      <li onClick={ (e) => onPageChange(currentPage + 1)}>
        <a href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
)

