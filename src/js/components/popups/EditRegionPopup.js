import React, {useEffect, useState} from 'react';
import {useFieldArray, useForm} from "react-hook-form";
import RegionService from "../../../service/RegionService";

const EditRegionPopup = ({show, close, region, updateRegionState, refresh}) => {
  const initialRegionState = {
    id: null,
    name: "",
    countries: null,
    isActive: false
  };
  const [currentRegion, setCurrentRegion] = useState(region);

  useEffect(
    () => {
      setCurrentRegion(region)
    },
    [region]
  );

  const {control, handleSubmit, reset} = useForm();

  const {fields, append, remove, update} = useFieldArray({
    control,
    name: "items",
  });

  useEffect(() => {
    region.countries?.forEach((field: { [key: string]: any }, index: number) => {
      Object.keys(field).forEach((key) => {
        update(index, field[key])
      })
    })
  }, [region.countries, update])

  const handleInputNameChange = event => {
    setCurrentRegion({...currentRegion, name: event.target.value});
  };

  const editRegion = () => {
    const data = {
      id: region.id,
      name: currentRegion.name,
      countries: currentRegion.countries,
      isActive: currentRegion.isActive
    };
    handleEdit(data);
    refresh();
  };

  const handleEdit = (data) => {
    RegionService.update(region.id, data)
      .then(response => {
        setCurrentRegion({
          id: response.data.id,
          name: response.data.name,
          countries: response.data.countries,
          isActive: response.data.isActive
        });
        updateRegionState(currentRegion);
      })
      .catch(e => {
        console.log(e);
      });
    clear();
  };

  const handleInputCountryChange = (index) => (event) => {
    let countries = currentRegion.countries;
    let newArray = countries ? [...countries] : [];
    newArray[index] = event.target.value;
    setCurrentRegion({...currentRegion, countries: newArray});
  };

  const handleChangeEnabled = e => {
    if (e.target.type === 'checkbox' && !e.target.checked) {
      setCurrentRegion({...currentRegion, isActive: false});
    } else {
      setCurrentRegion({...currentRegion, isActive: true});
    }
  };

  const clear = () => {
    reset();
    close();
    setCurrentRegion(initialRegionState);
  };

  return (
    <>
      {
        show ?
          <div
            className="modalContainer"
            onClick={() => close()}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <header className="modal_header">
                <h2 className="modal_header-title">Edit</h2>
              </header>
              <main className="modal_content">
                <form action data-o-component="o-forms" onSubmit={handleSubmit(editRegion)}>
                  <label className="o-forms-field" htmlFor="required">
                    <label className="o-forms-title__main" htmlFor="invalid">Id</label>
                    <span className="o-forms-input o-forms-input--text">
                      <input
                        type="text"
                        disabled={true}
                        name="text"
                        value={region.id}/>
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
                        defaultValue={region.name}
                        required pattern=".{3,}"
                        placeholder="Name of the region"
                        onChange={handleInputNameChange}/>
                      <span role="alert" className="o-forms-input__error">Please fill out this field</span>
                    </span>
                  </label>
                  <br/>
                  <br/>
                  {fields?.map(({id, name}, index) => {
                    return <label key={id} className="o-forms-field" htmlFor="required">
                        <span id="countryBlock" className="o-forms-input o-forms-input--text">
                        <input
                          type="text"
                          defaultValue={region.countries?.[index]}
                          required pattern=".{3,}"
                          placeholder="Name of the region"
                          onChange={handleInputCountryChange(index)}
                        />
                          {index !== 0 && (
                            <button className="o-buttons o-buttons--secondary" type="button"
                                    onClick={() => remove(index)}>Remove</button>
                          )}
                          <span role="alert" className="o-forms-input__error">Please fill out this field</span>
                      </span>
                    </label>
                  })}
                  <button className="o-buttons o-buttons--primary" type="button" onClick={() => append({})}>New
                    Country
                  </button>
                  <br/>

                  <div className="o-forms-field o-forms-field">
                    <span className="o-forms-input o-forms-input--checkbox">
                      <label htmlFor="my-single-checkbox">
                        <input
                          id="my-single-checkbox"
                          type="checkbox"
                          name="my-single-checkbox"
                          defaultChecked={region.isActive}
                          onChange={handleChangeEnabled}/>
                        <span className="o-forms-input__label">Enabled</span>
                      </label>
                    </span>
                  </div>
                  <div className="buttonsGroup">
                    <button
                      type="submit"
                      className="o-buttons o-buttons--primary o-buttons-icon o-buttons-icon--arrow-right o-buttons--big">Submit
                    </button>
                    <button id="cancelButton" className="o-buttons o-buttons--secondary o-buttons--big"
                            onClick={clear}>Cancel
                    </button>
                  </div>
                </form>
              </main>
            </div>
          </div>
          : null
      }
    </>
  );
};

export default EditRegionPopup;