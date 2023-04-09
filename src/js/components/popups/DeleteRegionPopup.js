import React from 'react';
import RegionService from "../../../service/RegionService";

const DeleteRegionPopup = ({show, close, region, updateRegionState, refresh}) => {

  const deleteRegion = id => {
    updateRegionState(id);
    handleDelete(id).then();
  };

  const handleDelete = (regionId) => (
    RegionService.remove(regionId).then(refresh).then(close())
  );

  return (
    <>
      {
        show ?
          <div
            className="modalContainer"
            onClick={() => close()}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <header className="modal_header">
                <h2 className="modal_header-title">DELETE</h2>
              </header>
              <main className="modal_content">
                <h4>Are you sure you want to delete this region: <b>{region.name}</b> ?</h4>
                <br/>

                <div className="buttonsGroup">
                  <button
                    className="o-buttons o-buttons--primary o-buttons-icon o-buttons-icon--arrow-right o-buttons--big"
                    id="deleteButton"
                    onClick={() => deleteRegion(region.id)}
                  >Delete
                  </button>

                  <button
                    id="cancelButton"
                    className="o-buttons o-buttons--primary o-buttons--big"
                    onClick={() => close()}>Cancel
                  </button>
                </div>
              </main>
            </div>
          </div>
          : null
      }
    </>
  );
};

export default DeleteRegionPopup;