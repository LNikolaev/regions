const Table = (props) => {

  return(
    <div className="table-content">
      <table id="hoverTable" className="o-table o-table--row-stripes" data-o-component="o-table">
        <thead>
        <tr>
          <th scope="col" role="columnheader">id</th>
          <th scope="col" role="columnheader">name</th>
        </tr>
        </thead>
        {props.filteredData?.map(region => (
          <tbody>
          <tr>
            <td>{region.id}</td>
            <td
              id="regionName"
              onClick={
                () => {
                  props.updateRegion(region);
                  props.toggleInfo()
                }}
            >{region.name}</td>
            <td className="tableButtons">
              <button
                onClick={() => {
                  props.updateRegion(region)
                  props.toggleEdit();
                }}
                className="o-buttons o-buttons--secondary o-buttons-icon o-buttons-icon--edit">Edit
              </button>
              <button
                className="o-buttons o-buttons--secondary o-buttons-icon o-buttons-icon--warning"
                onClick={() => {
                  props.updateRegion(region)
                  props.toggleDelete();
                }}
              >Delete
              </button>
            </td>
          </tr>
          </tbody>
        ))
        }
      </table>
    </div>
  );
};

export default Table;