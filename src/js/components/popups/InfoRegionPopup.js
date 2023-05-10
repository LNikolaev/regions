import {useFieldArray, useForm} from "react-hook-form";
import {useEffect} from "react";
import {Modal} from "react-bootstrap";


const InfoRegionPopup = ({show, close, currentRegion}) => {

  const countries = currentRegion.countries && currentRegion.countries[0].length > 0 ? currentRegion.countries : [];

  const {control} = useForm();
  const {fields, update} = useFieldArray({
    control,
    name: "items",
  });

  useEffect(() => {
    currentRegion.countries?.forEach((field: { [key: string]: any }, index: number) => {
      Object.keys(field).forEach((key) => {
        update(index, field[key])
      })
    })
  }, [currentRegion.countries, update])

  return (
    <>
      {
        <Modal show={show}
               id={"popupForm"}
               onHide={close}
        >
          <div
            className="modalContainer"
            onClick={() => close()}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <header className="modal_header">
                <h2 className="modal_header-title">{currentRegion.name}</h2>
                <button
                  className="o-buttons o-buttons--secondary o-buttons-icon o-buttons-icon--arrow-left"
                  id="close"
                  onClick={() => close()}>
                  Go back
                </button>
              </header>
              <main className="modal_content">
                <form action data-o-component="o-forms">
                  <label className="o-forms-field" htmlFor="required">
                    <label className="o-forms-title__main" htmlFor="invalid">Id</label>
                    <span className="o-forms-input o-forms-input--text">
                      <input
                        type="text"
                        disabled={true}
                        name="text"
                        value={currentRegion.id}/>
                      <span role="alert" className="o-forms-input__error">Please fill out this field</span>
                    </span>
                  </label>
                  <label className="o-forms-field" htmlFor="required">
                    <label className="o-forms-title__main" htmlFor="invalid">Name</label>
                    <span className="o-forms-input o-forms-input--text">
                      <input
                        id="required"
                        type="text"
                        name="text"
                        value={currentRegion.name}
                        disabled={true}
                        required pattern=".{3,}"
                        placeholder="Name of the region"
                      />
                    </span>
                  </label>
                  <br/>
                  <br/>
                  <span>{countries.length ? 'Countries' : <p>No countries for this region</p>}</span>
                  {fields?.map(({id, name}, index) => {
                    return <label key={id} className="o-forms-field" htmlFor="required">
                      <span id="countryBlock" className="o-forms-input o-forms-input--text">
                        <input
                          type="text"
                          value={currentRegion.countries?.[index]}
                          disabled={true}
                          required pattern=".{3,}"
                          placeholder="Name of the region"
                        />
                      </span>
                    </label>
                  })}
                  <br/>
                  <div className="o-forms-field o-forms-field">
                    <span className="o-forms-input o-forms-input--checkbox">
                      <label htmlFor="my-single-checkbox">
                        <input
                          id="my-single-checkbox"
                          type="checkbox"
                          name="my-single-checkbox"
                          disabled={true}
                          checked={currentRegion.isActive}
                        />
                        <span className="o-forms-input__label">Active</span>
                      </label>
                    </span>
                  </div>
                </form>
              </main>
            </div>
          </div>
        </Modal>
      }
    </>
  );
};

export default InfoRegionPopup;