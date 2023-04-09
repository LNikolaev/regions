const Search = (props) => {

  return (
    <div className="createAndSearchGroup">
      <label className="o-forms-field" htmlFor="required">
            <span className="o-forms-input o-forms-input--text">
              <input
                id="required"
                type="text"
                name="text"
                required pattern=".{3,}"
                placeholder="Search for region"
                onChange={props.handleSearchInput}
              />
              <span role="alert" className="o-forms-input__error">Please fill out this field</span>
            </span>
      </label>
      <button id="createRegionButton" className="o-buttons o-buttons--primary"
              onClick={props.toggleCreate}>Create Region
      </button>
    </div>
  );
};

export default Search;