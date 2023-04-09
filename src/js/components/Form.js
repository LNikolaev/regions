import {useFieldArray, useForm} from "react-hook-form";
import {useEffect, useState} from "react";

const Form = (props) => {
  const initialRegionState = {
    id: null,
    name: "",
    countries: null,
    isActive: false
  };
  const {control, handleSubmit, reset} = useForm();
  const {fields, append, remove} = useFieldArray({
    control,
    name: "items",
  });

  useEffect(
    () => {
      append({})
    },
    [append]
  );

  const [currentRegion, setCurrentRegion] = useState(initialRegionState);

  const handleInputCountryChange = (index) => (event) => {
    let countries = currentRegion.countries;
    let newArray = countries ? [...countries] : [];
    newArray[index] = event.target.value;
    setCurrentRegion({...currentRegion, countries: newArray});
  };

  const handleInputNameChange = event => {
    setCurrentRegion({...currentRegion, name: event.target.value});
  };

  const handleChangeEnabled = e => {
    if (e.target.type === 'checkbox' && !e.target.checked) {
      setCurrentRegion({...currentRegion, isActive: false});
    } else {
      setCurrentRegion({...currentRegion, isActive: true});
    }
  };

  const clear = () => {
    setCurrentRegion(initialRegionState);
    reset();
    props.close();
  };

  const submitForm = () => {
    handleSubmit(props.addRegion(currentRegion))
  };

  return (
    <form action data-o-component="o-forms" onSubmit={submitForm}>
      <label className="o-forms-field" htmlFor="required">
        <span className="o-forms-input o-forms-input--text">
          <input
            id="required"
            type="text"
            name="text"
            required pattern=".{3,}"
            placeholder="Name of the region"
            onChange={handleInputNameChange}/>
          <span role="alert" className="o-forms-input__error">Please fill out this field</span>
        </span>
      </label>
      <br/>
      <br/>
      <button className="o-buttons o-buttons--primary" type="button" onClick={() => append({})}>New
        Country
      </button>
      {fields.map(({id, name}, index) => {
        return <label key={id} className="o-forms-field" htmlFor="required">
            <span id="countryBlock" className="o-forms-input o-forms-input--text">
            <input
              id="required"
              type="text"
              name={`items[${index}].name`}
              required pattern=".{3,}"
              placeholder="Name of the country"
              onChange={handleInputCountryChange(index)}
              defaultValue={name}/>
              {index !== 0 && (
                <button className="o-buttons o-buttons--secondary" type="button"
                        onClick={() => remove(index)}>Remove</button>
              )}
              <span role="alert" className="o-forms-input__error">Please fill out this field</span>
          </span>
        </label>
      })}
      <div className="o-forms-field o-forms-field">
        <span className="o-forms-input o-forms-input--checkbox">
          <label htmlFor="my-single-checkbox">
            <input
              id="my-single-checkbox"
              type="checkbox"
              name="my-single-checkbox"
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
        <button id="cancelButton" className="o-buttons o-buttons--secondary o-buttons--big" onClick={clear}>Cancel
        </button>
      </div>
    </form>
  );
};

export default Form;
