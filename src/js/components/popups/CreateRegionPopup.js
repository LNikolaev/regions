import React, {useState} from "react";
import RegionService from "../../../service/RegionService";
import Form from "../Form";

const CreateRegionPopup = ({show, close, updateRegionState, refresh}) => {
  const initialRegionState = {
    id: null,
    name: "",
    countries: null,
    isActive: false
  };
  const [currentRegion, setCurrentRegion] = useState(initialRegionState);

  const updatePopupRegion = (region) => {
    setCurrentRegion(region);
  };

  const addRegion = (passedRegion) => {
    const data = {
      name: passedRegion.name,
      countries: passedRegion.countries,
      isActive: passedRegion.isActive
    };
    handleCreate(data);
    refresh();
  };

  const handleCreate = (data) => {
    RegionService.create(data)
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

  const clear = () => {
    setCurrentRegion(initialRegionState);
    close();
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
                <h2 className="modal_header-title">Creat New</h2>
              </header>
              <main className="modal_content">
                <Form
                  addRegion={addRegion}
                  close={close}
                  updatePopupRegion={updatePopupRegion}/>
              </main>
            </div>
          </div>
        : null
      }
    </>
  );
};

export default CreateRegionPopup;